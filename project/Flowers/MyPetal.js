import {CGFobject} from '../../lib/CGF.js';

/**
 * @class MyPetal
 * @brief Represents a petal in a 3D scene.
 * 
 * This class extends the CGFobject class to create a petal with specified 
 * vertices, texture coordinates, indices, and normals. It initializes the 
 * buffers required for rendering the petal in a WebGL context.
 */
export class MyPetal extends CGFobject {
	/**
     * @brief Constructor for the MyPetal class.
     * @param scene Reference to the scene object
     */
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	/**
     * @brief Initializes the buffers for the petal's vertices, indices, normals, and texture coordinates.
     */
	initBuffers() {
		this.vertices = [
			-2, 0, 0,
			0, -1, -0.5,
			0, 1, -0.5,
			2, 0, 0,	
			-2, 0, 0,
			0, -1, -0.5,
			0, 1, -0.5,
			2, 0, 0
		];

		this.texCoords = [
            0, 0,   // 0
            0.5, 0, // 1
            0.5, 1, // 2
            1, 0.5, // 3
            0, 0,   // 4
            0.5, 0, // 5
            0.5, 1, // 6
            1, 0.5  // 7
        ];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 1, 2,
			6, 5, 4,
			6, 5, 7,
		];
		
		this.normals = [
			// Normals for the front vertices
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			// Normals for the back vertices
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
