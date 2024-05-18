import { CGFobject } from '../lib/CGF.js';

/**
 * @class MyGrass
 * @brief Represents a blade of grass in a 3D scene.
 * 
 */
export class MyGrass extends CGFobject {

    /**
     * @brief Constructor for the MyGrass class.
     * @param scene Reference to the scene object
     */
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    /**
     * @brief Initializes the buffers for the grass blade's vertices, indices, normals, and texture coordinates.
     */
    initBuffers() {
        const bladeHeight = 1.0;
        const bladeWidth = 0.1;
        const subdivisions = 3;
        const vertices = [];
        const normals = [];
        const indices = [];
        const texCoords = [];

        // Generate vertices and normals
        for (let i = 0; i <= subdivisions; i++) {
            const y = (i / subdivisions) * bladeHeight;
            const width = bladeWidth * (1 - i / subdivisions);
            const xLeft = -width / 2;
            const xRight = width / 2;

            vertices.push(xLeft, y, 0);
            vertices.push(xRight, y, 0);

            normals.push(0, 0, 1);
            normals.push(0, 0, 1);

            texCoords.push(0, y / bladeHeight);
            texCoords.push(1, y / bladeHeight);
        }

        // Generate indices
        for (let i = 0; i < subdivisions; i++) {
            const offset = i * 2;
            indices.push(offset, offset + 1, offset + 2);
            indices.push(offset + 1, offset + 3, offset + 2);
        }

        this.vertices = vertices;
        this.normals = normals;
        this.indices = indices;
        this.texCoords = texCoords;

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}