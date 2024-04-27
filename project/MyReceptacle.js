import { CGFobject } from "../lib/CGF.js";

export class MyReceptacle extends CGFobject {
    constructor(scene, radius, slices) {
        super(scene);
        this.radius = radius;
        this.slices = slices;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.addCircleVertices(1); 
        this.addCircleVertices(-1);

        for (let slice = 1; slice <= this.slices; slice++) {
            this.indices.push(0, slice, slice + 1);
            let base = this.slices + 2;
            this.indices.push(base, base + slice + 1, base + slice);
        }
        
        this.indices.push(0, this.slices, 1);
        let base = this.slices + 2;
        this.indices.push(base, base + 1, base + this.slices);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    addCircleVertices(normalDirection) {
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, normalDirection);

        for (let slice = 0; slice <= this.slices; slice++) {
            const theta = (slice * 2 * Math.PI) / this.slices;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, normalDirection);
        }
    }
}
