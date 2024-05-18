import {CGFappearance, CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	/**
     * @brief Constructor for the MyTriangle class.
     * @param scene Reference to the scene object
     * @param texture Texture to be applied to the triangle
     */
	constructor(scene, texture) {
		super(scene);
		this.texture = texture;
		this.stemMaterial = new CGFappearance(scene);
        this.stemMaterial.setEmission(1, 1, 1, 1);
        this.stemMaterial.setTexture(this.texture);

		this.initBuffers();
	}
	
	 /**
     * @brief Initializes the buffers for the triangle's vertices, indices, and texture coordinates.
     */
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

	/**
     * @brief Renders the triangle with the applied texture.
     */
	display() {
		this.stemMaterial.apply();
		super.display();
	}
}