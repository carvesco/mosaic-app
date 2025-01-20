
#define PI 3.14159265359
#define res 50.
#define original 1.

uniform vec2 iResolution;
uniform float iTime;
varying vec2 vUv;
uniform sampler2D iChannel0;
uniform float resx;
uniform float resy;
uniform float renderingType;

void main() {
    vec2 uv = vUv;
    //vec2 cpos = uv * res;
    vec2 cpos = vec2(uv.x * resx, uv.y * resy);
    vec2 textCoord = floor(cpos);
    textCoord = textCoord / vec2(resx, resy);
    float a = sin(iTime * 2.);
    vec4 colt = vec4(0.0, 0.0, 0.0, 1.0);
    colt = texture(iChannel0, uv);
    //gl_FragColor = vec4(uv.y, uv.x, 1.0, 1.0);
    if(renderingType > 0.5) {

        colt = texture(iChannel0, textCoord);
    }
    gl_FragColor = vec4(colt);
}