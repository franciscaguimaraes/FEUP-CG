import { CGFobject } from '../lib/CGF.js';

/**
 * MyCylinder
 * Represents a cylinder in a 3D scene.
 * @constructor
 * @param scene - Reference to the scene object
 * @param radius - Radius of the cylinder
 * @param height - Height of the cylinder
 * @param stacks - Number of subdivisions along the height
 * @param slices - Number of subdivisions around the circle (segments)
 */
export class MyCylinder extends CGFobject {
    constructor(scene, radius, height, stacks, slices) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.stacks = stacks;
        this.slices = slices;

        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const angleStep = 2 * Math.PI / this.slices;
        const heightStep = this.height / this.stacks;

        // Create outer surface vertices, normals, and texture coordinates
        this.createSurfaceVertices(angleStep, heightStep, 1);

        // Create inner surface vertices, normals, and texture coordinates
        this.createSurfaceVertices(angleStep, heightStep, -1);

        // Create indices for triangle meshes
        this.createMeshIndices();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    createSurfaceVertices(angleStep, heightStep, normalDirection) {
        for (let stackIndex = 0; stackIndex <= this.stacks; stackIndex++) {
            let z = stackIndex * heightStep;
            for (let sliceIndex = 0; sliceIndex <= this.slices; sliceIndex++) {
                let angle = sliceIndex * angleStep;
                let x = this.radius * Math.cos(angle);
                let y = this.radius * Math.sin(angle);
                this.vertices.push(x, y, z);
                this.normals.push(normalDirection * x / this.radius, normalDirection * y / this.radius, 0);
                this.texCoords.push(sliceIndex / this.slices, stackIndex / this.stacks);
            }
        }
    }

    createMeshIndices() {
        let verticesPerLayer = this.slices + 1;

        // Indices for outer surface
        this.createSurfaceIndices(0, verticesPerLayer);

        // Indices for inner surface
        const innerOffset = (this.stacks + 1) * verticesPerLayer;
        this.createSurfaceIndices(innerOffset, true, verticesPerLayer);
    }

    createSurfaceIndices(offset, reverse = false, verticesPerLayer) {
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                let first = i * verticesPerLayer + j + offset;
                let second = first + verticesPerLayer;
                let indices = reverse ? [first, second + 1, first + 1, first, second, second + 1]
                                      : [first, first + 1, second + 1, first, second + 1, second];
                this.indices.push(...indices);
            }
        }
    }
}
