import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyStem } from "./MyStem.js";
import { CGFappearance } from "../lib/CGF.js";

/**
 * MyFlower
 * @constructor
 * @param scene
 */
export class MyFlower {
  
    constructor(scene, petalRadius, numPetals, petalColor, centerRadius, centerColor, stemRadius, stemHeight, stemColor, leafColor, petalCurvatureAngle, petalAttachmentMinAngle, petalAttachmentMaxAngle, petalScale) {
        this.scene = scene;
        this.petal = new MyPetal(scene, petalCurvatureAngle);
        this.center = new MyReceptacle(scene, centerRadius, 50);
        this.stem = new MyStem(scene, stemRadius, stemRadius, stemHeight, 20, 1);
        this.numPetals = numPetals;

        this.petalColor = new CGFappearance(scene);
        this.petalColor.setAmbient(petalColor[0], petalColor[1], petalColor[2], petalColor[3]);
        this.petalColor.setDiffuse(petalColor[0], petalColor[1], petalColor[2], petalColor[3]);

        this.centerColor = new CGFappearance(scene);
        this.centerColor.setAmbient(centerColor[0], centerColor[1], centerColor[2], centerColor[3]);
        this.centerColor.setDiffuse(centerColor[0], centerColor[1], centerColor[2], centerColor[3]);

        this.stemColor = new CGFappearance(scene);
        this.stemColor.setAmbient(stemColor[0], stemColor[1], stemColor[2], stemColor[3]);
        this.stemColor.setDiffuse(stemColor[0], stemColor[1], stemColor[2], stemColor[3]);

        this.leafColor = new CGFappearance(scene);
        this.leafColor.setAmbient(leafColor[0], leafColor[1], leafColor[2], leafColor[3]);
        this.leafColor.setDiffuse(leafColor[0], leafColor[1], leafColor[2], leafColor[3]);

        this.petalRadius = petalRadius;
        this.petalAttachmentMinAngle = petalAttachmentMinAngle;
        this.petalAttachmentMaxAngle = petalAttachmentMaxAngle;
        this.outerRadius = 4.5;
        this.petalDistance = this.outerRadius/3;
        this.petalScale = petalScale || 0.5;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2);
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.center.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();
            let angle = i * 2 * Math.PI / this.numPetals;
            this.scene.rotate(angle, 0, 0, 1);
            this.scene.translate(this.petalDistance, 0, 0);
            this.petalColor.apply();
            this.scene.scale(this.petalScale, this.petalScale, this.petalScale);
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}