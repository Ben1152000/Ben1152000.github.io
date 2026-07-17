#ifdef GL_ES
  precision highp float;
#endif


struct iterdist {
  float iter;  // smooth iteration count; -1.0 for points in the set
  float dist;
};

#define MAX_ITER 550
#define complexMul(a, b) vec2((a).x * (b).x - (a).y * (b).y, (a).x * (b).y + (a).y * (b).x)

iterdist mandelbrot( vec4 c ) {
  vec4 z = vec4(0);
  vec2 dz = vec2(0);
  iterdist i;
  for (int iter = 0; iter < MAX_ITER; iter++) {
    dz = 2.0 * complexMul(z.xy, dz) + vec2(1.0, 0.0);
    z.zw = complexMul(z.zw, z.zw) + 2.0 * complexMul(z.xy, z.zw);
    z.xy = complexMul(z.xy, z.xy);
    z += c;

    if (dot(z, z) >= (4.0 * 4.0)) {
      float nu = log2(log2(dot(z, z))) - 1.0;  // fractional escape overshoot, for smooth coloring
      i.iter = float(iter) + 1.0 - nu;
      i.dist = 0.5 * sqrt(dot(z, z) / dot(dz, dz)) * log(dot(z, z));
      return i;
    }

    // Hack to allow for deeper zoom: https://www.shadertoy.com/view/3l2Xz3
    if (dot(z.zw, z.zw) > (0.01 * 0.01) * dot(z.xy, z.xy)) { // 0.01 seems about right
      z.xy = z.xy + z.zw;
      z.zw = vec2(0.0);
    }
  }

  i.iter = -1.0;
  i.dist = 0.0;
  return i;
}


#define NUM_COLORS 50.0
#define COLOR_PHASE vec3(2.7, 3.3, 3.7)   // per-channel R/G/B phase (radians)

vec3 color( float iter ) {
  return 0.5 + 0.5 * cos(
    COLOR_PHASE + (mod(iter, NUM_COLORS) / NUM_COLORS) * radians(360.0)
  );
}


#define ZOOM_RATE 1.2

// oscillating zoom magnification between 1.0 and 2^48
float zoom( float time ) {
  float tmax = 48.0 * log(2.0) / log(ZOOM_RATE);
  float zoomTime = tmax - abs(mod(time, 2.0 * tmax) - tmax);
  return pow(ZOOM_RATE, zoomTime);
}


varying vec2 v_coords;
uniform float time;
uniform float width;
uniform float height;

#define ORIGIN vec2(-0.05026782, 0.6721055)
#define ORIGIN_SMALL vec2(1e-16, -1.5e-19)
#define BRIGHTNESS 500.0

// linear-space color for one sub-pixel sample
vec3 shadeAt( vec2 fragCoord, vec2 resolution, float curr_zoom ) {
  vec2 coord = (2.0 * fragCoord - resolution) / (curr_zoom * resolution.y);
  iterdist i = mandelbrot(vec4(ORIGIN, coord + ORIGIN_SMALL));
  float shade = min(i.dist * BRIGHTNESS * curr_zoom, 1.0);
  return color(i.iter) * float(i.iter >= 0.0) * shade;
}

void main()
{
  vec2 resolution = vec2(width, height);
  vec2 fragCoord = v_coords * resolution;
  float curr_zoom = zoom(time);

  // 2-tap diagonal supersample, averaged in linear space then gamma-encoded
  vec3 lin = 0.5 * (
    shadeAt(fragCoord + vec2(-0.25, -0.25), resolution, curr_zoom) +
    shadeAt(fragCoord + vec2( 0.25,  0.25), resolution, curr_zoom)
  );
  gl_FragColor = vec4(sqrt(lin), 1.0);
}
