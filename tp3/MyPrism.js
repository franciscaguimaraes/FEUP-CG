import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
        
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
	
		for (let j = 0; j < this.stacks; j++) {
			let ang = 0;
			let alphaAng = 2 * Math.PI / this.slices;
	
			for (let i = 0; i < this.slices; i++) {
				let sa = Math.sin(ang);
				let saa = Math.sin(ang + alphaAng);
				let ca = Math.cos(ang);
				let caa = Math.cos(ang + alphaAng);
	
				this.vertices.push(ca, sa, j / this.stacks, caa, saa, j / this.stacks, ca, sa, (j + 1) / this.stacks, caa, saa, (j + 1) / this.stacks);
	
				let baseIndex = 4 * i + (this.slices * j * 4);
				this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex + 3, baseIndex + 2, baseIndex + 1);
	
				let normal = [Math.cos(ang + alphaAng / 2), Math.sin(ang + alphaAng / 2), 0];
				for (let k = 0; k < 4; k++) {
					this.normals.push(...normal);
				}
				ang += alphaAng;
			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers() {
        this.initBuffers();
    	this.initNormalVizBuffers();
    }

	display() {
        this.scene.popMatrix();
        this.scene.pushMatrix();    
        this.scene.rotate(-Math.PI/2,1,0,0);
        super.display();
    }
}
