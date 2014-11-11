

var firebaseRef = 'https://col.firebaseio.com/';
var base = new Firebase(firebaseRef);
var gifsRef = new Firebase(firebaseRef + 'gifs/');
var lclCount;
var startSwitch = 0;
var collection = [];
console.log("please wait a minute, stuff is happening.")
base.on('value', function(dataSnapshot) {
  lclCount = dataSnapshot.child('gifs').numChildren();
  console.log("New gif! there are now " + lclCount + " gifs.");
  dataSnapshot.forEach(function(snapshot) {
        var gifFrames = [];
        snapshot.forEach(function(snapshot) {
          gifFrames[gifFrames.length] = snapshot.val() ;
        });
        collection = gifFrames;
        console.log(collection.length);
  });
  //console.log("startSwitch is " + startSwitch);
  console.log("the collection has " + collection.length + " gifs");

  //startSwitch should only be 0 while everything is setting up then it will be 1 for rest of time
  if (startSwitch === 0 && isNaN(lclCount) == false){
    getGif();
    startSwitch = 1;
    } else{}
});

function getGif(){
  //console.log("startSwitch is " + startSwitch);
  //console.log("play new gif");
  var i = 0;
  var rand = Math.floor(Math.random() * lclCount);
  console.log("get gif " + rand + " out of " + lclCount);
  playGif(collection[rand]);
}

function playGif(frames){
  var count = 0;
  var timerId = setInterval(function(){
    //console.log(count);
    document.getElementById("pano").src=frames[count];

    count++;

    if(count === frames.length){
      //console.log("clear gif");
      count=0;
      clearInterval(timerId);
      getGif();
    }
  }, 100)
  
}


