/*
  Fractal background(s). A copy of graphics.js (the home-page WebGL animation), adapted to:
    - drive EVERY `canvas.js-fractal` on the page (e.g. the sidebar + footer banners), each
      sized to its own element, so the two stay in sync;
    - always run the deep-fractal shader (shared <script> sources, compiled per canvas).
  Self-contained (IIFE) so it doesn't collide with graphics.js globals.
*/
(function () {
  "use strict";

  const fps = 30, fpsInterval = 1000 / fps;
  let instances = [];
  let then;

  window.addEventListener("load", function () {
    instances = Array.from(document.querySelectorAll("canvas.js-fractal"))
      .map(setup)
      .filter(Boolean);
    if (!instances.length) return;
    then = window.performance.now();
    requestAnimationFrame(render);
  });

  function setup(canvas) {
    const gl = canvas.getContext("webgl");
    if (gl === null) return null; // WebGL unavailable — leave the fallback background

    const program = buildShaderProgram(gl, [
      { type: gl.VERTEX_SHADER, id: "vertex-shader" },
      { type: gl.FRAGMENT_SHADER, id: "fragment-shader-mandelbrot" }
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1
    ]), gl.STATIC_DRAW);

    return {
      canvas: canvas, gl: gl, program: program, buffer: buffer,
      pos: gl.getAttribLocation(program, "a_position"),
      time: gl.getUniformLocation(program, "time"),
      width: gl.getUniformLocation(program, "width"),
      height: gl.getUniformLocation(program, "height")
    };
  }

  function render(time) {
    requestAnimationFrame(render);
    const now = window.performance.now();
    if (now - then <= fpsInterval) return;
    then = now - ((now - then) % fpsInterval);
    for (const inst of instances) draw(inst, time);
  }

  function draw(inst, time) {
    const gl = inst.gl, canvas = inst.canvas;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === 0 || h === 0) return; // hidden (e.g. the footer banner at wide widths)
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }

    gl.viewport(0, 0, w, h);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(inst.program);
    gl.enableVertexAttribArray(inst.pos);
    gl.bindBuffer(gl.ARRAY_BUFFER, inst.buffer);
    gl.vertexAttribPointer(inst.pos, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1f(inst.time, time * 0.001);
    gl.uniform1f(inst.width, w);
    gl.uniform1f(inst.height, h);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function buildShaderProgram(gl, shaderInfo) {
    const prog = gl.createProgram();
    shaderInfo.forEach(function (desc) {
      const shader = compileShader(gl, desc.id, desc.type);
      if (shader) gl.attachShader(prog, shader);
    });
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.log("Error linking shader program:", gl.getProgramInfoLog(prog));
    }
    return prog;
  }

  function compileShader(gl, id, type) {
    const code = document.getElementById(id).firstChild.nodeValue;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Error compiling shader:", gl.getShaderInfoLog(shader));
    }
    return shader;
  }
})();
