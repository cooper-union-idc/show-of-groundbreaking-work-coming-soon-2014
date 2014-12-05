	//figure out how to adjust frames to 20 and lower fps
	

	var vid = document.getElementById('videoel');
	var overlay = document.getElementById('overlay');
	var overlayCC = overlay.getContext('2d');
	var psrElement = document.getElementById('percentage');
	var ctrack = new clm.tracker({useWebGL : true});
	var lefteye = document.getElementById('leftmask');
	var newlcy, newlcx,curscore;
	var maxframes = 100;

	////////////// ADDING FIREBASE STUFF ////////////////
	var firebaseRef = 'https://col.firebaseio.com/';
	var base = new Firebase(firebaseRef);
	var gifsRef = new Firebase(firebaseRef + 'gifs/');
	//document.getElementById("file-upload").addEventListener('change', pushGif, false);
	var lclCount;

	base.once('value', function(dataSnapshot) {
  		lclCount = dataSnapshot.child('gifs').numChildren();
  		console.log("There are " + lclCount + " gifs.");
	});

	function pushGif(listofGifFrames) {
		//define new child location for new gif
		console.log("push 12 frames ");
		var pushGifLocation = new Firebase(gifsRef + '/' );
		//take out splitlistofGifFrames when frames come in @only 12
		var splitlistofGifFrames = listofGifFrames.slice(0,12);
		pushGifLocation.push(splitlistofGifFrames);
	}
////////////////////////////////////////////////////////

	// var imgstream=new Array(maxframes);
	// var fullstream=new Array(maxframes); //only latest completed capture
	var playback = document.getElementById('recorded');
	var i=0,p=-1;
	var fps = 30;
	var n = 0, potential, recording, playingfull;
	
	width = 400;
	height = 300;
	
	ctrack.init(pModel);
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	document.getElementById('container').appendChild( stats.domElement );
	
	function enablestart() {
		var startbutton = document.getElementById('startbutton');
		startbutton.value = "start";
		startbutton.disabled = null;
	}
	
	var insertAltVideo = function(video) {
		if (supports_video()) {
			if (supports_ogg_theora_video()) {
				video.src = "./media/cap12_edit.ogv";
			} else if (supports_h264_baseline_video()) {
				video.src = "./media/cap12_edit.mp4";
			} else {
				return false;
			}
			//video.play();
			return true;
		} else return false;
	}
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

	// check for camerasupport
	if (navigator.getUserMedia) {
		// set up stream
		var videoSelector = {video : true};
		if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
			var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
			if (chromeVersion < 20) {
				videoSelector = "video";
			}
		};
	
		navigator.getUserMedia(videoSelector, function( stream ) {
			if (vid.mozCaptureStream) {
				vid.mozSrcObject = stream;
			} else {
				vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
			}
			vid.play();
		}, function(code) {
			alert("h"+code);
			insertAltVideo(vid);
			document.getElementById('gum').className = "hide";
			document.getElementById('nogum').className = "nohide";
			//alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
		});
	} else {
		insertAltVideo(vid);
		document.getElementById('gum').className = "hide";
		document.getElementById('nogum').className = "nohide";
		alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
	}

	vid.addEventListener('canplay', enablestart, false);




















var recording = [];
var finalRecording;

function makeRecord(dataURL, recording){
	recording.push(dataURL);
	return recording;
}

function checkToRec(){
	
	var record = shouldRec(ctrack.getScore().toFixed(4));
	
	if(record){
		console.log("recording...");
		var dataURL = overlay.toDataURL();
		if(endRecording(makeRecord(dataURL, recording))){
			console.log("save recording because recording length is 100 ");
			saveRec(recording);
		}
	} else {
		recording = [];
	}
}

function shouldRec(threshold){
	if ((threshold > .7) || (isRecording() && threshold > .65)) {
		return true;	
	} else {
		return false;
	}
}

function endRecording(recording){
	return recording.length === 100;
}

function saveRec(recording){
	finalRecording = recording;
	pushGif(finalRecording);
	recording.length = [];
}

function isRecording(){
	return recording.length > 0;
}

function playRec(){}

function drawLoop(){
	overlayCC.clearRect(0, 0, width, height);
	overlayCC.drawImage(vid, 0, 0, width, height);
	//ADDED TODAY///
	var positions = ctrack.getCurrentPosition();
	var lefteye = document.getElementById('leftmask');
	var newlcx = (1 - (positions[27][0]/675)).toFixed(3);
	var newlcy = (positions[27][1]/900).toFixed(3);
	console.log("eye coords: " + newlcx + newlcy);
	lefteye.setAttribute('cx', newlcx);
	lefteye.setAttribute('cy', newlcy);
	////////////////

	if (ctrack.getCurrentPosition()) {
		ctrack.draw(overlay);
		var curscore = ctrack.getScore().toFixed(4);
		psrElement.innerHTML = "Score : " + curscore;
	}
}


function startVideo(){
	ctrack.start(vid);
	setInterval(function(){
		
		checkToRec();
		
		drawLoop();
	}, 50);
}
count =0;
setInterval(function(){

		if(finalRecording){
			// playback.src=finalRecording[count];
			count++;
		}
		if(count === 99){count=0;}

}, 100)

