import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';

export class MyGrass extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.05, 0, 0,
            0.05, 0, 0,
            0, 1, 0
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.indices = [
            0, 1, 2
        ];

        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
