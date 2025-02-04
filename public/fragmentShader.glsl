
#define PI 3.14159265359
#define res 50.
#define original 1.
#define bord 1.
#define bordcol vec4(0, 0.192, 0.094,1.0) // #00311e

uniform vec2 iResolution;
uniform float iTime;
varying vec2 vUv;
uniform sampler2D iChannel0;
uniform float resx;
uniform float resy;
uniform float renderingType;
uniform float borders;
uniform vec4 borderColors;

vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float sdBox(in vec2 p, in vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
    vec2 uv = vUv;
    //vec2 cpos = uv * res;
    vec2 cpos = vec2(uv.x * resx, uv.y * resy);
    vec2 textCoord = floor(cpos);
    textCoord = textCoord / vec2(resx, resy);
    float a = sin(iTime * 2.);

    vec2 m_neigh, m_diff;
    vec2 uvS = vec2(uv.x * resx, uv.y * resy);
    vec2 iPos = floor(uvS);
    vec2 iPos2 = vec2(iPos.x / resx, iPos.y / resy);
    vec2 fPos = fract(uvS);
    vec2 fPos2 = vec2(fPos.x / resx, fPos.y / resy);

    float m_dist = 8.0;
    vec4 point_color;
    vec4 m_point;        // minimum point   

    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = vec2(.5);
            point = random2(iPos + neighbor);
            point_color = texture(iChannel0, iPos2 + vec2(neighbor.x / resx, neighbor.y / resy));
            //point = 0.5 + 0.5 * sin(iTime + 6.2831 * point);
            vec2 diff = neighbor + point - fPos;
            float dist = dot(diff, diff);
            if(dist < m_dist) {
                m_dist = dist;
                m_neigh = neighbor;
                m_diff = diff;
                m_point = point_color;
            }
        }
    }
    m_dist = 8.0;

    for(int y = -2; y <= 2; y++) {
        for(int x = -2; x <= 2; x++) {
            vec2 neighbor = m_neigh + vec2(float(x), float(y));
            vec2 point = vec2(.5);
            point = random2(iPos + neighbor);
            //point = 0.5 + 0.5 * sin(iTime + 6.2831 * point);
            vec2 diff = neighbor + point - fPos;

            if(dot(m_diff - diff, m_diff - diff) > 0.00001)
                m_dist = min(m_dist, dot(0.5 * (m_diff + diff), normalize(diff - m_diff)));

        }
    }

    vec4 colt = vec4(0.0, 0.0, 0.0, 1.0);
    colt = texture(iChannel0, uv);
    if(renderingType > 0.5) {
        colt = texture(iChannel0, textCoord);
        if(borders > 0.5) {
            float b = sdBox(fPos, vec2(0.92));
            /* colt += step(0.0, b); */
            colt = mix(borderColors, colt, 1. - smoothstep(.004, 0.05, b));
        }
    }
    if(renderingType > 1.5) {
        colt = vec4(m_point.rgb, 1.0);
        if(borders > 0.5) {
            /* colt += 1. - smoothstep(.004, 0.05, m_dist); */
            colt = mix(borderColors, colt, smoothstep(.004, 0.05, m_dist));
        }
    }
    gl_FragColor = vec4(colt);
}