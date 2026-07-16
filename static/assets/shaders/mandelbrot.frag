#ifdef GL_ES
  precision highp float;
#endif

#define TAU 6.28318
#define NUM_COLOR 50.0
#define MAX_ITER 500
#define ZOOM_RATE 1.25
#define ORIGIN vec2(-0.05026782, 0.6721055)
#define ORIGIN_SMALL vec2(1e-16, -1.5e-19)
#define SHADE 20.0

struct iterdist {
  int iter;
  float dist;
};

iterdist mandelbrot( vec4 c ) {
  vec4 z = vec4(0);
  vec2 dz = vec2(0);
  iterdist i;
  for (int iter = 0; iter < MAX_ITER; iter++) {
    dz = 2.0*vec2(z.x*dz.x-z.y*dz.y, z.x*dz.y + z.y*dz.x) + vec2(1.0,0.0);
    z.zw = vec2(z.z*z.z - z.w*z.w, z.z*z.w*2.0)
        + 2.0 * vec2(z.x*z.z - z.y*z.w, z.x*z.w + z.y*z.z);
    z.xy = vec2(z.x*z.x - z.y*z.y, z.x*z.y*2.0);
    z += c;
    if (length(z) >= 4.0) {
      i.iter = iter;
      i.dist = 0.5*sqrt(dot(z,z)/dot(dz,dz))*log(dot(z,z));
      return i;
    }
    // Hack to allow for deeper zoom: https://www.shadertoy.com/view/3l2Xz3
    if (length(z.zw) / length(z.xy) > 0.01) { // 0.01 seems about right
      z.xy = z.xy + z.zw;
      z.zw = vec2(0.0);
    }
  }
  i.iter = -1;
  i.dist = 0.0;
  return i;
}

vec3 color( int i ) {
  return 0.5 + 0.5*cos(2.7+(mod(float(i), NUM_COLOR) / NUM_COLOR)*TAU + vec3(0.0,.6,1.0));
}

varying vec2 v_coords;
uniform float time;
uniform float width;
uniform float height;

void main()
{
  vec2 resolution = vec2(width, height);
  vec2 fragCoord = v_coords * resolution;
  vec2 coord = (2.0*fragCoord - resolution) * pow(ZOOM_RATE, -time) / resolution.y;
  iterdist i = mandelbrot(vec4(ORIGIN, coord + ORIGIN_SMALL));
  float shade = min(i.dist / pow(ZOOM_RATE, -(SHADE + time)), 1.0);
  gl_FragColor = vec4(sqrt(color(i.iter) * float(i.iter >= 0) * shade), 1.0);
}
