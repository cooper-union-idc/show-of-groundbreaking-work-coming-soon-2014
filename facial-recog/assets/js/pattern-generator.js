
$(function() {
  //adjustable 
  var fWidth = 300,
      fHeight = 500,
      color = 'red',
      accentSize = 10; //default accent size
	
	//Do not adjust
	var cs = $('#container'),
	    face,
	    shapes = [],
	    faceMarkers = [],
	    resizeIncrement = 10,
	    cWidth,
	    cHeight;
	
	function getRand(min, max) {
	  var rand = Math.random() * (max - min) + min;
	  return rand;
	}
	
	function adjustDimensions() {
	  var wHeight = $(window).height(),
	      conHeight = $('#controls').outerHeight();
    cHeight = wHeight - conHeight;
    if(cHeight<fHeight) { //nooo don't reset the face, just scale it! we're using svgs!
      fHeight = cHeight - 10;
      fWidth = fHeight * 0.6;
    } else {
      fWidth = 300;
      fHeight = 500;
    }
	  $(cs).css('height', cHeight+'px');
	}

	function init() {
	  $(cs).empty();
	  adjustDimensions();
	  cWidth = $(cs).width(),
    centerX = Math.floor(cWidth / 2),
    centerY = Math.floor(cHeight / 2);
	  paper = Raphael("container", cWidth, cHeight);
	  canvas = $(cs).children()[0]; 
	  drawFace(fWidth, fHeight);
	}
	function drawFace(width, height) {
	  var rX = width / 2,
	      rY = height / 2;
    face = paper.ellipse(centerX, centerY, rX, rY).attr({'stroke-width':0});
    var points = [];
    points.push(findPoint(width, height, -1*Math.PI/2)); //top
    points.push(findPoint(width, height, 0)); //right
    points.push(findPoint(width, height, Math.PI/2)); //bottom
    points.push(findPoint(width, height, Math.PI)); //left
    var vert = true;
    for(i in points) {
      var mWidth = vert ? 10 : 20,
          mHeight = vert ? 20 : 10,
          marker = paper.rect(points[i].x, points[i].y, mWidth, mHeight).attr({fill: color});
      faceMarkers.push(marker);
      vert = !vert;
    }
	  return face;
	}
	function taller() {
	  faceMarkers[0].translate(0, -resizeIncrement);
	  faceMarkers[2].translate(0, resizeIncrement);
	  fHeight += 2*resizeIncrement;
	}
	function shorter() {
	  faceMarkers[0].translate(0, resizeIncrement);
	  faceMarkers[2].translate(0, -resizeIncrement);
	  fHeight -= 2*resizeIncrement;
	}
	function wider() {
	  faceMarkers[1].translate(resizeIncrement, 0);
	  faceMarkers[3].translate(-resizeIncrement, 0);
	  fWidth += 2*resizeIncrement;
	}
	function thinner() {
	  faceMarkers[1].translate(-resizeIncrement, 0);
	  faceMarkers[3].translate(resizeIncrement, 0);
	  fWidth -= 2*resizeIncrement;
	}
	function resetFace() {
    fWidth = 300;
    fHeight = 500;
    face.remove();
    for(i in faceMarkers) faceMarkers[i].remove()
    faceMarkers = [];
    face = null;
    drawFace(fWidth, fHeight); 
	}
	
	//find a point on the ellipse
	function findPoint(width, height, angle) {
	  //based on: x = a cos(t) && y = b sin(t)
	  var xPos = ((width / 2) * Math.cos(angle)) + centerX,
	      yPos = ((height / 2) * Math.sin(angle)) + centerY,
	      coord = {'x':xPos, 'y':yPos}
	  return coord;
	}
  
  //draw a curve between two random points on the ellipse
	function drawLine() {
	  var lowerBounds = -1*Math.PI/6, //-30º
	      upperBounds = Math.PI/4; //45º
	  var startAngle = getRand(lowerBounds, upperBounds);
	      start = findPoint(fWidth, fHeight, startAngle),
	      endAngle = startAngle + Math.PI,
	      end = findPoint(fWidth, fHeight, endAngle);
	  var handle1Angle = getRand(Math.PI/2, 3*Math.PI/2), //90º – 270º
	      handle1 = findPoint(fWidth, fHeight, handle1Angle),
	      handle2Angle = getRand(-1*Math.PI/2, Math.PI/2), //-90º – 90º
        handle2 = findPoint(fWidth, fHeight, handle2Angle);
    var line = {
      'start'   : start.x+' '+start.y,
      'handle1' : handle1.x+' '+handle1.y,
      'handle2' : handle2.x+' '+handle2.y,
      'end'     : end.x+' '+end.y
    };
    return line;
	}
	
	//draw a shape from two lines
	function drawShape() {
	  var line1 = drawLine(),
	      line2 = drawLine();
	  var path = 'M ' + line1.start + ' C ' + line1.handle1 + ' ' + line1.handle2 + ' ' + line1.end + ' ' +
	             'L ' + line2.end + ' C ' + line2.handle2 + ' ' + line2.handle1 + ' ' + line2.start + ' ' +
	             'L ' + line1.start;
	  var shape = paper.path(path).attr({fill: color, stroke: color});
	  shapes.push(shape);
	  return shape;
	}
	
	// draw lil guy shape 
	function drawAccent() {
	  var lowerBounds = 0,
	      upperBounds = 2*Math.PI,
	      angle = getRand(lowerBounds, upperBounds),
	      fraction = getRand(0, 1), //scale both radii by the same factor
	      r1 = fWidth * fraction, 
	      r2 = fHeight * fraction, 
	      start = findPoint(r1, r2, angle),
	      points = ['M', start.x+' '+start.y];
	  for(var i = 0; i < accentSize; i++) {
      points.push('s');
      var dX = getRand(-20, 20),
          dY = getRand(-20, 20),
          cX = getRand(-20, 20),
          cY = getRand(-20, 20);
      points.push(dX+' '+dY+' '+cX+' '+cY);
	  }
	  var path = points.join(' '),
	      path = paper.path(path).attr({'stroke-width':10, 'stroke':color});
	  shapes.push(path);
	  return path;
	}
	
	function removeShape() {
	  var lastShape = shapes[shapes.length-1];
	  lastShape.remove();
	  shapes = shapes.splice(0, shapes.length-1);
	}
	
  // CONTROLS
  $(window).on('resize', init);
	$('#fhUp').click(taller);
	$('#fhDown').click(shorter);
	$('#fwUp').click(wider);
	$('#fwDown').click(thinner);
	$('#reset').click(resetFace);
	$('#drawShape').click(drawShape);
	$('#drawAccent').click(drawAccent);
	$('#accentSize')
	  .val(accentSize)
  	.on('change', function() {
  	  accentSize = $(this).val();
  	});
	$('#undo').click(removeShape);
	$('#clear').click(init)

	// RUN IT!
	init();	
});
