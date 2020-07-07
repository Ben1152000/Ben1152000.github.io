// this file is an attempt to get this working:
// https://stackoverflow.com/questions/38181231/how-to-save-a-value-inside-a-fragment-shader-to-use-it-later
// http://glslsandbox.com/e#65940.0

var vs = `
attribute vec4 position;
void main() {
  gl_Position = position;
}
`;
var fs = `
precision mediump float;
uniform sampler2D u_texture;
void main() {
  // just grab the middle pixel(s) from the texture
  // but swizzle the colors g->r, b->g, r->b
  gl_FragColor = texture2D(u_texture, vec2(.5)).gbra;
}`;

var canvas = document.getElementById("glcanvas");
var gl = canvas.getContext("webgl");
var program = twgl.createProgramFromSources(gl, [vs, fs]);

var positionLocation = gl.getAttribLocation(program, "position");
// we don't need to look up the texture's uniform location because
// we're only using 1 texture. Since the uniforms default to 0
// it will use texture 0.

// put in a clipspace quad
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
  -1,  1,
   1, -1,
   1,  1,
]), gl.STATIC_DRAW);
  

gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// make 2 1x1 pixel textures and put a red pixel the first one
var tex1 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex1);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
              gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
var tex2 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex2);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
              gl.UNSIGNED_BYTE, null);

// make a framebuffer for tex1
var fb1 = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb1);
// attach tex1
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, 
                        gl.TEXTURE_2D, tex1, 0);
// check this will actually work
if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !==
    gl.FRAMEBUFFER_COMPLETE) {
  alert("this combination of attachments not supported");
}

// make a framebuffer for tex2
var fb2 = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, fb2);
// attach tex2
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, 
                        gl.TEXTURE_2D, tex2, 0);
// check this will actually work
if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !==
    gl.FRAMEBUFFER_COMPLETE) {
  alert("this combination of attachments not supported");
}

function render() {
  gl.useProgram(program);
  // render tex1 to the tex2
  
  // input to fragment shader
  gl.bindTexture(gl.TEXTURE_2D, tex1);  
  
  // output from fragment shader
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb2);  
  gl.viewport(0, 0, 1, 1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  
  // render to canvas so we can see it
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // input to fragment shader, the texture we just rendered to
  gl.bindTexture(gl.TEXTURE_2D, tex2);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  
  // swap which texture we are rendering from and to
  var t = tex1;
  tex1 = tex2;
  tex2 = t;
  
  var f = fb1;
  fb1 = fb2;
  fb2 = f;
  
  requestAnimationFrame(render);
}
requestAnimationFrame(render);