precision mediump float;
varying vec2       vTextureCoord;
uniform sampler2D  uSampler;
uniform float      time;

vec3 hsv2rgb(vec3 hsv){
    vec3 rgb = vec3(0.0);
    float i, f, p, q, t;
    
    float h = hsv.x;
    float s = hsv.y;
    float v = hsv.z;

    if(s == 0.0){
        rgb = vec3(v);
    } else {
        h = h/60.0;
        i = floor(h);
        f = h - i;
        p = v * (1.0 - s);
        q = v * (1.0 - s * f);
        t = v * (1.0 - s * (1.0 - f));

        if(i == 0.0){
                rgb.x = v;
                rgb.y = t;
                rgb.z = p;
        } else if(i == 1.0){
                rgb.x = q;
                rgb.y = v;
                rgb.z = p;
        } else if(i == 2.0){
                rgb.x = p;
                rgb.y = v;
                rgb.z = t;
        } else if(i == 3.0){
                rgb.x = p;
                rgb.y = q;
                rgb.z = v;
        } else if(i == 4.0){
                rgb.x = t;
                rgb.y = p;
                rgb.z = v;
        } else if(i == 5.0){
                rgb.x = v;
                rgb.y = p;
                rgb.z = q;
        }

    }
    return rgb;
}

vec2 getMinMax(vec3 rgb){
    vec2 minmax = vec2(0.0);
    if(rgb.x > rgb.y){
        minmax.x = rgb.y;
        minmax.y = rgb.x;
    } else {
        minmax.x = rgb.x;
        minmax.y = rgb.y;
    }

    minmax.x = minmax.x < rgb.z ? minmax.x :rgb.z;
    minmax.y = minmax.y > rgb.z ? minmax.y : rgb.z;
    return minmax;
}

void main( void ) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    float timse = 100.0;
    if(time < timse && gl_FragColor.a > 0.0){
        vec2 minmax = getMinMax(vec3(gl_FragColor.r, gl_FragColor.g, gl_FragColor.b));
        float h, s, v;
        h = 0.0;
        s = minmax.y == 0.0 ? 0.0 : (minmax.y-minmax.x)/minmax.y;
        v = minmax.y;
        
        gl_FragColor = vec4(hsv2rgb(vec3(h, s, v)), gl_FragColor.a);
        gl_FragColor.r = 1.0;
    } else if(time < 500.0 && gl_FragColor.a > 0.0){
        if(fract(time/200.0) < 0.4){
            gl_FragColor = vec4(0.0,0.0,0.0,0.0);
        }
    }
}