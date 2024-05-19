import {CGFobject} from '../lib/CGF.js';

/**
 * Class MyPlane
 * @extends CGFobject
 * @brief Represents a plane divided into multiple segments, useful for creating surfaces like terrain or simple geometric planes.
 */
export class MyPlane extends CGFobject {
	/**
	* This class is responsible for generating a grid-like plane with customizable texture mapping, using a grid of vertices and connecting them with triangle strips for efficient rendering.
	* @param scene - Reference to MyScene object for drawing.
	* @param nrDivs - Number of divisions in both the x and y directions, defining the grid's resolution.
	* @param minS - Minimum s-coordinate for the texture mapping.
	* @param maxS - Maximum s-coordinate for the texture mapping.
	* @param minT - Minimum t-coordinate for the texture mapping.
	* @param maxT - Maximum t-coordinate for the texture mapping.
	*/
	constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;
		this.initBuffers();
	}

	/**
	 * Initializes the vertex, normal, texture coordinate, and index buffers for the plane.
	 * Configures geometry for rendering as a triangle strip, which is efficient for planar structures.
	*/
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var yCoord = 0.5;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		// Generating indices
		this.indices = [];

		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	/**
	 * Sets the drawing mode of the plane to fill mode, using triangles.
	*/
	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	/**
	 * Sets the drawing mode of the plane to line mode, using lines.
	 */
	setLineMode() { 
		this.primitiveType=this.scene.gl.LINES;
	};
}