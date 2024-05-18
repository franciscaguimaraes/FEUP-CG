import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyPollen extends CGFobject {
    /**
     * @brief Constructor for the MyPollen class.
     * @param scene Reference to the scene object
     * @param radius Radius of the pollen particle
     * @param slices Number of horizontal divisions (slices)
     * @param stacks Number of vertical divisions (stacks)
     * @param texture Texture to be applied to the pollen
     */
    constructor(scene, radius, slices, stacks, texture) {
        super(scene);
        this.radius = radius;
        this.slices = slices; // horizontal divisions
        this.stacks = stacks; // vertical divisions

        this.scaleTop = 1.7;
        this.scaleBottom = 1;
        this.pollenRotation = Math.random() * Math.PI;

        this.texture = new CGFappearance(this.scene)
        this.texture.setEmission(0.5,0.5,0.5,1)
        this.texture.setTexture(texture)
        
        this.initBuffers();
    }

    /**
     * @brief Initializes the buffers for the pollen's vertices, indices, normals, and texture coordinates.
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
                let x = this.radius * cosTheta * sinPhi;
                let y = this.radius * cosPhi;
                let z = this.radius * sinTheta * sinPhi;
                
                if (stack <= this.stacks / 2) {
                    y *= this.scaleTop;
                } else {
                    y *= this.scaleBottom;
                }
               
                this.vertices.push(x, y, z); // add vertex
                this.normals.push(x, y, z); // add normal same as vertex for unit sphere
                
                
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
                
                    // two triangles per slice
                    this.indices.push(first, second + 1, second);
                    this.indices.push(first, first + 1, second + 1);
                
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    /**
     * @brief Renders the pollen particle with the applied texture.
     */
    display() {
        this.texture.apply();
        this.scene.scale(0.3,0.3,0.3);
        this.scene.rotate(this.pollenRotation, 0, 0, 1);
        super.display();
    }
}
