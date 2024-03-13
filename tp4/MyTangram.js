import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
        this.orangeTriangle = new MyTriangleBig(this.scene, 'orange');    
        this.blueTriangle = new MyTriangleBig(this.scene, 'blue');
        this.purpleTriangle = new MyTriangleSmall(this.scene, 'purple');
        this.pinkTriangle = new MyTriangleBig(this.scene, 'pink');
        this.redTriangle = new MyTriangleSmall(this.scene, 'red');
        this.yellowParallelogram = new MyParallelogram(this.scene);
        
        this.initMaterials();
	}
	
    initMaterials() {

        this.greenDiamondMaterial = new CGFappearance(this.scene);
        this.greenDiamondMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.greenDiamondMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.greenDiamondMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.greenDiamondMaterial.setShininess(10.0);
        this.greenDiamondMaterial.loadTexture('images/tangram.png'); 

        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.orangeTriangleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.orangeTriangleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.orangeTriangleMaterial.setShininess(10.0);
        this.orangeTriangleMaterial.loadTexture('images/tangram.png'); 

        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.blueTriangleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.blueTriangleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.blueTriangleMaterial.setShininess(10.0);
        this.blueTriangleMaterial.loadTexture('images/tangram.png'); 

        this.purpleTriangleMaterial = new CGFappearance(this.scene);
        this.purpleTriangleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.purpleTriangleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.purpleTriangleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.purpleTriangleMaterial.setShininess(10.0);
        this.purpleTriangleMaterial.loadTexture('images/tangram.png'); 

        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.pinkTriangleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pinkTriangleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.pinkTriangleMaterial.setShininess(10.0);
        this.pinkTriangleMaterial.loadTexture('images/tangram.png'); 

        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.redTriangleMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.redTriangleMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.redTriangleMaterial.setShininess(10.0);
        this.redTriangleMaterial.loadTexture('images/tangram.png'); 

        this.yellowParallelogramMaterial = new CGFappearance(this.scene);
        this.yellowParallelogramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.yellowParallelogramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.yellowParallelogramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.yellowParallelogramMaterial.setShininess(10.0);
        this.yellowParallelogramMaterial.loadTexture('images/tangram.png'); 
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
