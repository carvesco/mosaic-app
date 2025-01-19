
#define PI 3.14159265359

uniform vec2 iResolution;
uniform float iTime;
varying vec2 vUv;
uniform sampler2D iChannel0;

void main() {
    vec2 uv = vUv;
    vec2 cpos = uv * 50.;
    vec2 textCoord = floor(cpos);
    float a = sin(iTime * 2.);
    vec4 colt = texture(iChannel0, uv);
    gl_FragColor = vec4(uv.y, uv.x, 1.0, 1.0);
    gl_FragColor = vec4(colt);
}