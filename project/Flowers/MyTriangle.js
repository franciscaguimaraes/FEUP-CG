import {CGFappearance, CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene, texture) {
		super(scene);
		this.texture = texture;
		this.stemMaterial = new CGFappearance(scene);
        this.stemMaterial.setEmission(1, 1, 1, 1);
        this.stemMaterial.setTexture(this.texture);

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,
			-1, -1, 0,
            1, -1, 0,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 1
		];

		this.texCoords = [
			0, 1,
			0, 0,
			1, 0
		];

		this.updateTexCoordsGLBuffers();
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display() {
		this.stemMaterial.apply();
		super.display();
	}
}