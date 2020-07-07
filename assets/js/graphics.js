/*
  Getting the overall shadertoy framework in place:
    https://stackoverflow.com/questions/48384564/webgl-glsl-time-variable-similar-to-shadertoy
  Timer and fps clock:
    https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  
*/

let gl = null;
let glCanvas = null;
let program = null;

let positionAttributeLocation;
let positionBuffer;
let timeLocation;
let widthLocation;
let heightLocation;

// timer variables
const fps = 30;
const fpsInterval = 1000 / fps;
var startTime, now, then, elapsed;

// mouse position
var mousePosX = 0;
var mousePosY = 0;
var mouseActive = 0;

window.addEventListener("load", startup, false);

function resizeCanvas() {
  glCanvas.width = window.innerWidth;
  glCanvas.height = window.innerHeight;
}

function startup() {

  glCanvas = document.getElementById("glcanvas")
  gl = glCanvas.getContext('webgl');

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const shaderSet = [
    {
        type: gl.VERTEX_SHADER,
        id: "vertex-shader"
    },
    {
        type: gl.FRAGMENT_SHADER,
        id: "fragment-shader-raytracer"
    }
  ];

  program = buildShaderProgram(shaderSet);

  timeLocation = gl.getUniformLocation(program, "time");
  widthLocation = gl.getUniformLocation(program, "width");
  heightLocation = gl.getUniformLocation(program, "height");
  mouseLocation = gl.getUniformLocation(program, "active");
  mouseXLocation = gl.getUniformLocation(program, "mouseX");
  mouseYLocation = gl.getUniformLocation(program, "mouseY");

  positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  var positions = [ 
      -1, -1, 
      -1, 1, 
      1, 1, 
      1, 1, 
      1, -1, 
      -1, -1, 
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // initialize the timer variables
  then = window.performance.now();
  startTime = then;
  
  requestAnimationFrame(render);
}

function render(time) {
  
  requestAnimationFrame(render);

  // calculate elapsed time since last loop
  now = window.performance.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
    
    resizeCanvas(glCanvas); // canvas as the parameter instead of gl
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset)

    gl.uniform1f(timeLocation, time * 0.001);
    //console.log(gl.canvas.width, gl.canvas.height);
    gl.uniform1f(widthLocation, gl.canvas.width);
    gl.uniform1f(heightLocation, gl.canvas.height);
    gl.uniform1f(mouseLocation, mouseActive);
    gl.uniform1f(mouseXLocation, mousePosX);
    gl.uniform1f(mouseYLocation, mousePosY);

    // draw  
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }

}

function buildShaderProgram(shaderInfo) {
  let program = gl.createProgram();

  shaderInfo.forEach(function(desc) {
    let shader = compileShader(desc.id, desc.type);

    if (shader) {
        gl.attachShader(program, shader);
    }
  });

  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("Error linking shader program:");
    console.log(gl.getProgramInfoLog(program));
  }

  return program;
}

function compileShader(id, type) {
  let code = document.getElementById(id).firstChild.nodeValue;
  let shader = gl.createShader(type);

  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(`Error compiling ${type === gl.VERTEX_SHADER ? "vertex" : "fragment"} shader:`);
    console.log(gl.getShaderInfoLog(shader));
  }
  return shader;
}


function getMouseCoords(mouseEvent)
{
  if (mouseEvent) { //FireFox
    mousePosX = mouseEvent.pageX;
    mousePosY = mouseEvent.pageY;
  }
  else { //IE
    mousePosX = window.event.pageX;
    mousePosY = window.event.pageY;
  }
  //console.log(mousePosX, mousePosY);
}

document.onmousemove = getMouseCoords;

document.onmousedown = function(mouseEvent) {
  mouseActive = 1
}

document.onmouseup = function(mouseEvent) {
  mouseActive = 0
}