import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.greenDiamond = new MyDiamond(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);    
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.pinkTriangle = new MyTriangleBig(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.yellowParallelogram = new MyParallelogram(this.scene);
	}
	

    display(){

        // greenDiamond
        this.scene.pushMatrix();

        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 2, 0, 1
            
        ]

        this.scene.multMatrix(translate);
        this.greenDiamond.display();
        this.scene.popMatrix();
          
        // yellowParallelogram
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI , 1, 0, 0);
        this.scene.rotate(-(2.8*Math.PI)/2 , 0, 0, 1);
        this.scene.translate(1.4,2.5,0);
        this.yellowParallelogram.display();
        this.scene.popMatrix();
        
        // purpleTriangle
        this.scene.pushMatrix();
        this.scene.rotate(-(Math.PI) , 0, 0, 1);
        this.scene.translate(-2, -3, 0);
        this.purpleTriangle.display();
        this.scene.popMatrix();
          
        // redTriangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2 , 0, 0, 1);
        this.scene.translate(-2.85, 1.85, 0);
        this.redTriangle.display();
        this.scene.popMatrix();
        
        // blueTriangle
        this.scene.pushMatrix();
        this.scene.rotate(-(3*Math.PI)/4 , 0, 0, 1);
        this.blueTriangle.display();
        this.scene.popMatrix();
          
        // orangeTriangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4 , 0, 0, 1);
        this.scene.translate(-2, 0, 0);
        this.orangeTriangle.display();
        this.scene.popMatrix();
            
        // pinkTriangle
        this.scene.pushMatrix();
        this.scene.translate(0.36,-2.47,0);
        this.scene.rotate(-(Math.PI)/4, 0,0,1);
        this.scene.scale(0.75,0.75,0.75);
        this.pinkTriangle.display();
        this.scene.popMatrix();
          
    }
}

