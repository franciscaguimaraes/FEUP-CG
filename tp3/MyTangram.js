import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyPrism } from './MyPrism.js';

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
        this.initMaterials();
	}
	
    initMaterials() {
        this.greenDiamondMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.purpleTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.yellowParallelogramMaterial = new CGFappearance(this.scene);
        
        this.updateMaterial(this.greenDiamondMaterial,"#00FF00");
        this.updateMaterial(this.orangeTriangleMaterial,"#FF9B00");
        this.updateMaterial(this.blueTriangleMaterial,"#009BFF");
        this.updateMaterial(this.purpleTriangleMaterial,"#9650BE");
        this.updateMaterial(this.pinkTriangleMaterial,"#FF9BCF");
        this.updateMaterial(this.redTriangleMaterial,"#FF1B1B");
        this.updateMaterial(this.yellowParallelogramMaterial,"#FFFF00");
    }
	
    updateMaterial(material, hex) {
        material.setAmbient(...this.scene.hexToRgbA(hex));
        material.setDiffuse(...this.scene.hexToRgbA(hex));
        material.setSpecular(1.0,1.0,1.0,1.0);
    }

    display() {
        // greenDiamond
        this.scene.pushMatrix();

        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 2, 0, 1,
        ]

        this.scene.multMatrix(translate);
        this.greenDiamondMaterial.apply();
        this.greenDiamond.display();
        this.scene.popMatrix();
          
        // yellowParallelogram
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI , 1, 0, 0);
        this.scene.rotate(-(2.8*Math.PI)/2 , 0, 0, 1);
        this.scene.translate(1.4,2.5,0);
        this.yellowParallelogramMaterial.apply();
        this.yellowParallelogram.display();
        this.scene.popMatrix();
        
        // purpleTriangle
        this.scene.pushMatrix();
        this.scene.rotate(-(Math.PI) , 0, 0, 1);
        this.scene.translate(-2, -3, 0);
        this.purpleTriangleMaterial.apply();
        this.purpleTriangle.display();
        this.scene.popMatrix();
          
        // redTriangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2 , 0, 0, 1);
        this.scene.translate(-2.85, 1.85, 0);
        this.redTriangleMaterial.apply();
        this.redTriangle.display();
        this.scene.popMatrix();
        
        // blueTriangle
        this.scene.pushMatrix();
        this.scene.rotate(-(3*Math.PI)/4 , 0, 0, 1);
        this.blueTriangleMaterial.apply();
        this.blueTriangle.display();
        this.scene.popMatrix();
          
        // orangeTriangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4 , 0, 0, 1);
        this.scene.translate(-2, 0, 0);
        this.orangeTriangleMaterial.apply();
        this.orangeTriangle.display();
        this.scene.popMatrix();
            
        // pinkTriangle
        this.scene.pushMatrix();
        this.scene.translate(0.36,-2.47,0);
        this.scene.rotate(-(Math.PI)/4, 0,0,1);
        this.scene.scale(0.75,0.75,0.75);
        this.pinkTriangleMaterial.apply();
        this.pinkTriangle.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.greenDiamond.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.yellowParallelogram.enableNormalViz();
        this.redTriangle.enableNormalViz();
    }

    disableNormalViz() {
        this.greenDiamond.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.blueTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.yellowParallelogram.disableNormalViz();
        this.redTriangle.disableNormalViz();
    }
}
