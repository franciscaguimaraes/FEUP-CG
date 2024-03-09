import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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
    
        let ang = 0;
        let alphaAng = 2 * Math.PI / this.slices;
    
        for (let i = 0; i <= this.slices; i++) { 
            let sa = Math.sin(ang);
            let ca = Math.cos(ang);
    
            for (let j = 0; j <= this.stacks; j++) { 
                this.vertices.push(ca, sa, j / this.stacks);
                this.normals.push(ca, sa, 0);
            }
    
            ang += alphaAng;
        }
    
        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                let baseIndex = (this.stacks + 1) * i + j;
    
                this.indices.push(baseIndex, baseIndex + this.stacks + 1, baseIndex + 1);
                this.indices.push(baseIndex + 1, baseIndex + this.stacks + 1, baseIndex + this.stacks + 2);
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
