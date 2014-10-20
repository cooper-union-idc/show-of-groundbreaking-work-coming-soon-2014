var doc = document;
var video = doc.getElementById("video");
var hCanvas = doc.getElementById("hCanvas");
var dCanvas = doc.getElementById("dCanvas");
var hContext = hCanvas.getContext("2d");
var dContext = dCanvas.getContext("2d");
var vendorUrl = window.URL || window.webkitURl;

    navigator.getMedia = navigator.getUserMedia || 
    navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.msGetUserMedia;

    navigator.getMedia({
        video: true,
        audio: false
    }, function (stream) {
        video.src = vendorUrl.createObjectURL(stream);

        console.log('play')
        video.play();
    }, function (error) {
        // an error occured
        // error.code
    });


    video.addEventListener('loadeddata', function () {
        hCanvas.setAttribute('width', video.offsetWidth);
        dCanvas.setAttribute('width', video.offsetWidth);
        hCanvas.setAttribute('height', video.offsetHeight);
        dCanvas.setAttribute('height', video.offsetHeight);
    }, false);




    video.addEventListener('loadeddata', function () {
        console.log(video.videoWidth)
        runAnalysis();

        console.log('loadedddata')
    });

var runAnalysis = function () {
    if (video.paused || video.ended) {
        return;
    }
    frameFix();
    if (window.requestAnimationFrame) {
        requestAnimationFrame(runAnalysis);
    } else {
        setTimeout(runAnalysis, 0);
    }
};

 //console.log("efv");

var frameFix = function () {

    var r1 = 150;
    var r2 = 40;

    var r3 = 255;
    var r4 = 80;

    var r5 = 70;
    var r6 = 30;

    console.log(val1, val2);
     console.log(val3, val4);
      console.log(val5, val6);

    hContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    var frame = hContext.getImageData(0, 0, video.videoWidth, video.videoHeight),
        data = frame.data,
        length = data.length,
        i;


    for (i = 0; i < length; i += 4)

    if ((data[i] < r1 && data[i] > r2) && (data[i+1] < r3 && data[i+1] > r4) && (data[i+2] < r5 && data[i+2] > r6)) data[i + 3] = 0;

    // if ((data[i] < r1 && data[i] > r2 ) && (data[i+1] < val3 && data[i+1] > val4) && (data[i+2] < val5 && data[i+2] > val6)) data[i + 3] = 0;

    dContext.putImageData(frame, 0, 0);
};


