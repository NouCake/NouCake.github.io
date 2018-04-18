precision lowp float;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureIndex;
uniform sampler2D uSampler;
uniform sampler2D uSamplerArray[2];

void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord) ;//* vColor ;
    if(vTextureIndex == 1.0){
        gl_FragColor = texture2D(uSamplerArray[1], vTextureCoord);
    }
}