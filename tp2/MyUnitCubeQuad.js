import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.quad = new MyQuad(this.scene);
	}
	
	display(){
        // front face
        this.scene.pushMatrix();
        this.quad.display();
        this.scene.popMatrix();

        // back face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.quad.display();
        this.scene.popMatrix();

        // right face
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // left face
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
       
        // top face
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // bottom face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();     
    }
}

