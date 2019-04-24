var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 300, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 100, 100, 100);
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 300, 100, 100);

// for (var i = 0; i < 5; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var w = Math.random() * window.innerWidth;
//     var h = Math.random() * window.innerHeight;
//     c.fillStyle = getRndColor();
//     c.fillRect(x, y, w, h);
// }


// Line drawing
// c.beginPath();
// c.moveTo(x, y);
// c.lineTo(x, y);
// c.lineTo(x, y);
// c.strokeStyle = "blue";
// c.stroke();

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// c.beginPath();
// c.moveTo(x, y);
// for (var i = 0; i < 10; i++)
// {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.lineTo(x, y);
// }

// c.strokeStyle = getRndColor();
// c.stroke();


// Arc drawing
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = getRndColor();
// c.fillStyle = getRndColor();
// c.fill();
// c.stroke();

// for (var i = 0; i < 30; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = getRndColor();
//     c.fillStyle = getRndColor();
//     c.fill();
//     c.stroke();
// }

function getRndColor() {
    var r = 255 * Math.random() | 0,
        g = 255 * Math.random() | 0,
        b = 255 * Math.random() | 0;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + 0.5 + ')';
}

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = getRndColor();
// c.fillStyle = getRndColor();
// c.fill();
// c.stroke();

var mouse = {
    x: undefined,
    y: undefined
}
 var maxRadius = 40;
var minRadius = 2;
var colourArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour
        c.fill();
        
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius){
                this.radius += 1;
            }
            
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}



// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;
//var circle = new Circle(200, 200, 3, 3, 30);
var circleArray = [];
function init(){
    
    circleArray = [];
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 6 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerWidth - radius * 2) + radius;;
        var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;
        var colour = getRndColor();
        circleArray.push(new Circle(x, y, dx, dy, radius, colour));
    
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    //circle.draw();
    //circle.update();
    // c.beginPath();
    // c.arc(x, y, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = 'blue';
    // c.fillStyle = getRndColor();
    // //c.fill();
    // c.stroke();

    // if(x + radius > innerWidth || x - radius < 0){
    //     dx = -dx;
    // }
    // if(y + radius > innerHeight || y - radius < 0){
    //     dy = -dy;
    // }
    // x += dx;
    // y += dy;
}


init();
animate();