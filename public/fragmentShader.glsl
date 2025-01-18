
#define PI 3.14159265359

uniform vec2 iResolution;
uniform float iTime;

varying vec2 vUv;

void main() {
    vec2 fragCoord = vUv * iResolution;
    float a = sin(iTime * 2.);
    gl_FragColor = vec4(1.0, a, 0.0, 1.0);
}