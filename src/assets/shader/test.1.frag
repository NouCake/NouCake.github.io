precision mediump float;
varying vec2       vTextureCoord;
varying vec4       vColor;
uniform sampler2D  uSampler;
uniform float      gray;

void main( void ) {
    float max, min;
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    if(gl_FragColor.r > gl_FragColor.g){
        min = gl_FragColor.g;
        max = gl_FragColor.r;
    } else {
        min = gl_FragColor.r;
        max = gl_FragColor.g;
    }

    min = min < gl_FragColor.b ? min : gl_FragColor.b;
    max = max > gl_FragColor.b ? max : gl_FragColor.b;
    float h, s, v;
    if(min == max){
        h = 0.0;
    } else if(max == gl_FragColor.r){
        h = 60.0 * (gl_FragColor.g - gl_FragColor.b) / (max-min);
    } else if(max == gl_FragColor.g){
        h = 60.0 * (2.0 + (gl_FragColor.b - gl_FragColor.r) / (max - min));
    } else if(max == gl_FragColor.b){
        h = 60.0 * (4.0 + (gl_FragColor.r - gl_FragColor.g) / (max - min));
    }
    h = h < 0.0 ? h+360.0 : h;

    if(max == 0.0){
        s = 0.0;
    } else {
        s = (max-min)/max;
    }  
    v = max;

    //v = 0.21 * gl_FragColor.r + 0.72 * gl_FragColor.g + 0.07 * gl_FragColor.b;

    h = 0.0;
    //s = 1.0;

    float nr, ng, nb;
    float i, f, p, q, t;

    if(s == 0.0){
        nr = ng = nb = v;
    } else {
        h = h/60.0;
        i = floor(h);
        f = h - i;
        p = v * (1.0 - s);
        q = v * (1.0 - s * f);
        t = v * (1.0 - s * (1.0 - f));

        if(i == 0.0){
                nr = v;
                ng = t;
                nb = p;
        } else if(i == 1.0){
                nr = q;
                ng = v;
                nb = p;
        } else if(i == 2.0){
                nr = p;
                ng = v;
                nb = t;
        } else if(i == 3.0){
                nr = p;
                ng = q;
                nb = v;
        } else if(i == 4.0){
                nr = t;
                ng = p;
                nb = v;
        } else if(i == 5.0){
                nr = v;
                ng = p;
                nb = q;
        }

    }

    gl_FragColor.r = nr;
    gl_FragColor.g = ng;
    gl_FragColor.b = nb;

    
}