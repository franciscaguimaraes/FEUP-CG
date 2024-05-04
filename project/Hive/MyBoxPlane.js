import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyBoxPlane extends CGFobject {
	constructor(scene, width, height, depth, texture) {
		super(scene);
		this.width = width || 1;
		this.height = height || 1;
		this.depth = depth || 1;

        this.texture = new CGFappearance(this.scene)
        this.texture.setEmission(0.5,0.5,0.5,1)
        this.texture.setTexture(texture)

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			// Front face
			-0.5 * this.width, -0.5 * this.height, 0.5 * this.depth, // 0
			0.5 * this.width, -0.5 * this.height, 0.5 * this.depth, // 1
			0.5 * this.width, 0.5 * this.height, 0.5 * this.depth, // 2
			-0.5 * this.width, 0.5 * this.height, 0.5 * this.depth, // 3
			// Back face
			-0.5 * this.width, -0.5 * this.height, -0.5 * this.depth, // 4
			0.5 * this.width, -0.5 * this.height, -0.5 * this.depth, // 5
			0.5 * this.width, 0.5 * this.height, -0.5 * this.depth, // 6
			-0.5 * this.width, 0.5 * this.height, -0.5 * this.depth, // 7
		];

		this.indices = [
			// Front face
			0, 1, 2,
			0, 2, 3,
			// Back face
			4, 6, 5,
			4, 7, 6,
			// Top face
			3, 2, 6,
			3, 6, 7,
			// Bottom face
			0, 4, 1,
			1, 4, 5,
			// Right face
			1, 5, 2,
			2, 5, 6,
			// Left face
			0, 3, 7,
			0, 7, 4,
		];

		this.normals = [
			// Front face
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			// Back face
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			// Top face
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			// Bottom face
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			// Right face
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			// Left face
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
		];

		this.texCoords = [
			// Front face
			0, 1,
			1, 1,
			1, 0,
			0, 0,
			// Back face
			0, 1,
			1, 1,
			1, 0,
			0, 0,
			// Top face
			0, 0,
			1, 0,
			1, 1,
			0, 1,
			// Bottom face
			1, 1,
			0, 1,
			0, 0,
			1, 0,
			// Right face
			1, 0,
			0, 0,
			0, 1,
			1, 1,
			// Left face
			0, 0,
			1, 0,
			1, 1,
			0, 1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    display() {
        this.texture.apply();
        super.display();
    }
}
