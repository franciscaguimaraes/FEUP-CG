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

        this.addCircleVertices(1);  // Top circle
        // Normally, if you want a bottom circle, you should add it with a different Z and correct normals

        for (let slice = 1; slice < this.slices; slice++) {
            this.indices.push(0, slice, slice + 1);  // Top circle indices
        }
        this.indices.push(0, this.slices, 1);  // Close the top circle

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    addCircleVertices(normalDirection) {
        this.vertices.push(0, 0, 0); // Center point
        this.normals.push(0, 0, normalDirection);
        this.texCoords.push(0.5, 0.5); // Texture coordinate for the center

        for (let slice = 0; slice <= this.slices; slice++) {
            const theta = (slice * 2 * Math.PI) / this.slices;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);

            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, normalDirection);
            this.texCoords.push((x / this.radius) * 0.5 + 0.5, (y / this.radius) * 0.5 + 0.5);
        }
    }
}
