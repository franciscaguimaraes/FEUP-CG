import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, radius, slices, stacks, texture) {
        super(scene);

        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        
        this.texture = new CGFappearance(this.scene)
        this.texture.setEmission(0.5,0.5,0.5,1)
        this.texture.setTexture(texture)
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Store the first perturb and normal for each stack to wrap around to the last slice
        let perturbFirstStack = new Array(this.stacks + 1);
        let normalsFirstStack = new Array(this.stacks + 1);

        for (let stack = 0; stack <= this.stacks; stack++) {
            const phi = (stack * Math.PI) / this.stacks;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
            
            let perturbFirst = 1 + (Math.random() - 0.5) * 0.15; // +-15% random factor for the first slice
            perturbFirstStack[stack] = perturbFirst;

            let nxFirst = 0;
            let nyFirst = 0;
            let nzFirst = 0;
            
            for (let slice = 0; slice <= this.slices; slice++) {
                const theta = (slice * 2 * Math.PI) / this.slices;
                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);

                // Changes start here

                let perturb = perturbFirst;
                if (slice > 0) {
                    perturb = 1 + (Math.random() - 0.5) * 0.15; // +-15% random factor for other slices
                }

                const x = this.radius * perturb * cosTheta * sinPhi;
                const y = this.radius * perturb * cosPhi;
                const z = this.radius * perturb * sinTheta * sinPhi;

                this.vertices.push(x, y, z);

                let nx = x + (Math.random() - 0.5) * 0.2;
                let ny = y + (Math.random() - 0.5) * 0.2;
                let nz = z + (Math.random() - 0.5) * 0.2;
                
                if (slice === 0) { // Save the first normal for each stack
                    nxFirst = nx;
                    nyFirst = ny;
                    nzFirst = nz;
                    normalsFirstStack[stack] = [nxFirst, nyFirst, nzFirst];
                } else if (slice === this.slices) { // Wrap around to the first slice
                    nx = normalsFirstStack[stack][0];
                    ny = normalsFirstStack[stack][1];
                    nz = normalsFirstStack[stack][2];
                }
                
                // Calculate the length of the perturbed normal
                let len = Math.sqrt(nx * nx + ny * ny + nz * nz);

                // Normalize the perturbed normal
                if (len !== 0) { // to avoid division by 0
                    nx /= len;
                    ny /= len;
                    nz /= len;
                }

                // Changes end here

                this.normals.push(nx, ny, nz);

                const u = 1 - (slice / this.slices);
                const v = stack / this.stacks;

                this.texCoords.push(u, v);
            }
        }

        // Generate indices
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);

                // When reached the last slice, need to wrap
                if (slice === this.slices - 1) {
                    let wrapSecond = stack * (this.slices + 1); // first vertex of the stack
                    let wrapFirst = wrapSecond + this.slices + 1; // vertex right under the first vertex of the stack

                    // Correct wrapping of the last slice to the first slice
                    this.indices.push(first, wrapFirst, second);
                    this.indices.push(first, wrapSecond, wrapFirst);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.texture.apply()
        super.display();
    }
}
