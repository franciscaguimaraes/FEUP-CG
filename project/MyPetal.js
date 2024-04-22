import {CGFobject} from '../lib/CGF.js';

export class MyPetal extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
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
