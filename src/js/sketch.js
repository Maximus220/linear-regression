var range;
var data = [];
var m=1; //Slope
var b=0; //Poit in y
const y = function(x){
  return m*x+b;
};
var size = 800;

function regression(){
  var xsum=0;
  var ysum=0;
  for(let i=0;i<data.length;i++){
    xsum += data[i][0].x;
    ysum += data[i][0].y;
  }
  var xmean = xsum/data.length;
  var ymean = ysum/data.length;

  var mnum=0;
  var mden=0;
  for(let i=0;i<data.length;i++){
    mnum+=(data[i][0].x-xmean)*(data[i][0].y-ymean);
    mden+=(data[i][0].x-xmean)**2;
  }
  m=mnum/mden;
  b=ymean-xmean*m;
}

var s1 = function( sketch ) {
  sketch.setup = function() {
    var canvas = sketch.createCanvas(size,size);
    canvas.position(0,0);
    range = sketch.createVector(0,1);
    sketch.background(51);
  }
  sketch.mousePressed = function(){ //Create point
    if(sketch.mouseX>0&&sketch.mouseX<sketch.width&&sketch.mouseY>0&&sketch.mouseY<sketch.height){
      let c = random(0,360);
      data.push([sketch.createVector(sketch.map(sketch.mouseX, 0, sketch.width, range.x,range.y), sketch.map(sketch.mouseY, 0, sketch.height, range.y,range.x)), sketch.color('hsb('+c+', 100%, 50%)')]);
    }
  }
  sketch.draw = function() {
    sketch.background(51);
    for(let i=0;i<data.length;i++){ //Draw data point
      sketch.fill(data[i][1]);
      sketch.stroke('black');
      sketch.ellipse(sketch.map(data[i][0].x, range.x,range.y, 0, sketch.width), sketch.map(data[i][0].y, range.y,range.x, 0, sketch.height), 8, 8);
    }
    //Draw line
    if(data.length>1){
      sketch.drawLine();
      regression();
    }
  }
  sketch.drawLine=function(){ //Draw the line of y
    sketch.stroke(sketch.color(155,0,255));
    //Range Y has to be < range X
    sketch.line(0, sketch.map(y(range.x), range.x, range.y, sketch.height, 0), sketch.width, sketch.map(y(range.y), range.x, range.y, sketch.height, 0));
  }
};

var s2 = function( sketch ) {
   sketch.setup = function() {
    let canvas2 = sketch.createCanvas(size,size);
    canvas2.position(size+size/8,0);
  }
  sketch.draw = function() {
    sketch.stroke('black');
    sketch.background(51);
    sketch.line(0, sketch.height/2,sketch.width,sketch.height/2);
    if(data.length>1){
      for(let i=0;i<data.length;i++){
        sketch.noStroke();
        sketch.fill(data[i][1]);
        let t =sketch.map(y(data[i][0].x) - data[i][0].y, range.x,range.y, 0, sketch.height);
        sketch.rect(sketch.map(data[i][0].x, range.x,range.y, 0, sketch.width), sketch.height/2,5,t);
      }
    }
  }
};
new p5(s1);
new p5(s2);
