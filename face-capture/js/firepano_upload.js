//add uploading actual series of frames and combine with new face track code

var firebaseRef = 'https://col.firebaseio.com/';
var base = new Firebase(firebaseRef);
var gifsRef = new Firebase(firebaseRef + 'gifs/');
var sampleGifStills = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5', 'frame6'];
document.getElementById("file-upload").addEventListener('change', pushGif, false);
var lclCount;


base.once('value', function(dataSnapshot) {
  lclCount = dataSnapshot.child('gifs').numChildren();
  console.log("There are " + lclCount + " gifs.");
});

function pushGif(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(f);
  reader.onload = (function(theFile) {
    return function(e) {
      var file = e.target.result;
      var hash = Math.round( Math.random()*1000000 );
      var pushGifLocation = new Firebase(gifsRef + '/' + hash );
      pushGifLocation.set([file,file]);
    };
  })(f);
}

gifsRef.on('child_added', function (snapshot) {
  //console.log("new gif added");

});





