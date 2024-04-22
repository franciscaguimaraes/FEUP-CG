import {CGFobject} from '../lib/CGF.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param baseRadius - Radius of the base circle
 * @param topRadius - Radius of the top circle (for a cone or a tapered cylinder)
 * @param height - Height of the cylinder
 * @param slices - Number of segments around the circumference
 * @param stacks - Number of segments along the height
 */
export class MyStem extends CGFobject {
    constructor(scene, baseRadius, topRadius, height, slices, stacks) {
        super(scene);
        this.baseRadius = baseRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let stackHeight = this.height / this.stacks;
        let radiusStep = (this.topRadius - this.baseRadius) / this.stacks;

        // Generate vertices, normals, and indices
        for (let stack = 0; stack <= this.stacks; stack++) {
            let z = stackHeight * stack;
            let currentRadius = this.baseRadius + radiusStep * stack;

            for (let slice = 0; slice <= this.slices; slice++) {
                let theta = slice * 2 * Math.PI / this.slices;
                let x = currentRadius * Math.cos(theta);
                let y = currentRadius * Math.sin(theta);
                let nx = Math.cos(theta);
                let ny = Math.sin(theta);

                this.vertices.push(x, y, z);
                this.normals.push(nx, ny, 0);

                if (stack < this.stacks && slice < this.slices) {
                    let current = stack * (this.slices + 1) + slice;
                    let next = current + this.slices + 1;

                    this.indices.push(current, next, current + 1);
                    this.indices.push(current + 1, next, next + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
