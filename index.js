const gui = new dat.GUI();
let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "rgba(0,0,0,1)";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

// --------------------- UTILITY FUNCTIONS --------------------------------------------------

function randomInt(min,max){
    return Math.floor((Math.random() * (max-min+1)) + min); 
}
const colorArray = ["#363432","#196774","#90A19D","#F0941F","#EF6024"];
function randomColor(colorArray){
    var x = Math.floor(Math.random()*colorArray.length);
    return colorArray[x];
};
window.addEventListener('resize',function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
})
function getDistance(x1,y1,x2,y2){
    var xDistance = x2-x1;
    var yDistance = y2-y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}
var mouse = {
    x:innerWidth/2,
    y:innerHeight/2
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

// ---------------------------------------------------------------------------------------------
function particle(x,y,radius,amplitude,angularVelocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radian = Math.random() * Math.PI * 2;
    this.amplitude = randomInt(50,amplitude);
    this.angVelocity = angularVelocity;
    this.color = colorArray[Math.floor(Math.random()*5)];
    this.lastMouse = {
        x : x,
        y : y
    }
    
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function(){
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.02;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.02;
        this.radian += this.angVelocity;
        this.x = this.lastMouse.x + Math.cos(this.radian) * this.amplitude;
        this.y = this.lastMouse.y + Math.sin(this.radian) * this.amplitude;
        this.draw();
    }
}

var attributes = {
    no_of_particles : 150,
    amplitude : randomInt(100,250),
    angVelocity : 0.015
}
gui.add(attributes,'no_of_particles',0,500);
gui.add(attributes,'amplitude',0,350);
gui.add(attributes,'angVelocity',0,0.1);
var particles;
function init(){
    particles = [];
    for(var i=0;i<attributes.no_of_particles;i++){
        var radii = randomInt(2,3);
        particles.push(new particle(innerWidth/2,innerHeight/2,radii,attributes.amplitude,attributes.angVelocity));
    }
}
init();
function animate(){
    c.fillStyle="rgba(0,0,0,0.05)";
    c.fillRect(0,0,innerWidth,innerHeight);
    particles.forEach(particle => {
        particle.update();
    });
    requestAnimationFrame(animate);
}
console.log("hello");
animate();
window.addEventListener("click",function(){
    init();
    for(var i=0;i<attributes.no_of_particles;i++){
        particles[i].update();
    }
});
