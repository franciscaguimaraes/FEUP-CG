import { CGFobject } from "../lib/CGF.js";

/**
 * Class MySphere
 * @extends CGFobject
 * @brief Represents a sphere that can be used both for normal and panoramic views.
 */
export class MySphere extends CGFobject {
    /**
    * @param scene - Reference to MyScene object where the sphere will be displayed.
    * @param radius - Radius of the sphere.
    * @param slices - Number of horizontal slices (divisions around the sphere).
    * @param stacks - Number of vertical stacks (divisions from top to bottom of the sphere).
    * @param panorama - Boolean to indicate if the sphere should be inverted for panoramic rendering.
    */
    constructor(scene, radius, slices, stacks, panorama = false) {
        super(scene);
        this.radius = radius;
        this.slices = slices; // horizontal divisions
        this.stacks = stacks; // vertical divisions
        this.panorama = panorama;

        this.initBuffers();
    }

    /**
     * Initializes the buffers for vertices, indices, normals, and texture coordinates.
     * Depending on the panorama flag, normals are inverted to render the sphere from inside.
    */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];


        for (let stack = 0; stack <= this.stacks; stack++) { // loop over stacks
            const phi = (stack * Math.PI) / this.stacks; // angle of stack phi
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            for (let slice = 0; slice <= this.slices; slice++) { // loop over slices
                const theta = (slice * 2 * Math.PI) / this.slices; // angle of slice theta
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);

                // vertex coordinates
                const x = this.radius * cosTheta * sinPhi;
                const y = this.radius * cosPhi;
                const z = this.radius * sinTheta * sinPhi;

                if (this.panorama){
                    this.vertices.push(x, y, z); // add vertex
                    this.normals.push(-x, -y, -z); // different from vertex for panorama because of the inversion
                } else {
                    this.vertices.push(x, y, z); // add vertex
                    this.normals.push(x, y, z); // add normal same as vertex for unit sphere
                }
                
                // texture coordinates
                const u = 1 - slice / this.slices; // inverted
                const v = stack / this.stacks;

                this.texCoords.push(u, v); // add texture coordinates
            }
        }

        // calculate indices
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;

                if (this.panorama){
                    this.indices.push(second, first + 1, first); // inverted
                    this.indices.push(second + 1, first + 1, second); // inverted
                } else {
                    // two triangles per slice
                    this.indices.push(first, second + 1, second);
                    this.indices.push(first, first + 1, second + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
