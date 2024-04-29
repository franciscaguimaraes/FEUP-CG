import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import {MyCone} from "./MyCone.js";
import {MySphere} from "../MySphere.js";
import {MyAntannae} from "./MyAntannae.js";
import {MyLeg} from "./MyLeg.js";
import { MyWings } from "./MyWings.js";

export class MyBee extends CGFobject {

    constructor(scene, x, y, z) {
        super(scene);

        // Elements
        this.head = new MySphere(scene, 1, 15, 15);
        this.eye = new MySphere(scene, 1, 15, 15);
        this.torax = new MySphere(scene, 1, 15, 15);
        this.abdomen = new MySphere(scene, 1, 15, 15);
        this.stringer = new MyCone(scene, 10, 10);
        this.mouth = new MyCone(scene, 10, 10);

        // Elements composed of objects
        this.antennae = new MyAntannae(scene);
        this.leg = new MyLeg(scene);
        this.wing = new MyWings(scene);

        // Movement
        this.elapsedTime = 0;
                
        this.initMaterials();
    }

    initMaterials(){
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.headMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.headMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.headMaterial.setTexture(new CGFtexture(this.scene, "./images/beeFur.jpg"));
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.eyeMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.eyeMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.eyeMaterial.setTexture(new CGFtexture(this.scene, "./images/beeEye.jpg"));
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.toraxMaterial = this.headMaterial;

        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.abdomenMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.abdomenMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.abdomenMaterial.setTexture(new CGFtexture(this.scene, "./images/beeBody.jpg"));
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.3, 0.3, 0.3, 0.3);
        this.wingMaterial.setDiffuse(0.2, 0.2, 0.2, 0.2);
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.setEmission(0, 0, 0, 0.1);
        this.wingMaterial.setTexture(new CGFtexture(this.scene, "./images/beeWing.jpg")); 
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.stingerMaterial = new CGFappearance(this.scene);
        this.stingerMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
        this.stingerMaterial.setDiffuse(0.05, 0.05, 0.05, 0.0);
        this.stingerMaterial.setSpecular(1, 1, 1, 0.0);
        this.stingerMaterial.setShininess(10.0);

        this.mouthMaterial = this.stingerMaterial;
        this.legMaterial = this.stingerMaterial;
        this.antennaeMaterial = this.stingerMaterial;
    }

    // bee has 2 units of width and 1.6 units of height
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.translate(0, Math.sin(this.elapsedTime) * 0.5, 0);
        this.draw();
        this.scene.popMatrix();
    }

    update(t) {
      t /= 1000;
      this.elapsedTime += t;
    }

    draw() {


        // Head
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.scale(1, 1, 1.5);
        this.headMaterial.apply();
        this.head.display();
        this.scene.popMatrix();

        // Eye Left
        this.scene.pushMatrix();
        this.scene.translate(-0.6, 0.2, 0.5);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.8);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.popMatrix();

        // Eye Right
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0.2, 0.5);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.8);
        this.eyeMaterial.apply();
        this.eye.display();
        this.scene.popMatrix();

        // Torax
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -2.3);
        this.scene.scale(1, 1, 1.5);
        this.toraxMaterial.apply();
        this.torax.display();
        this.scene.popMatrix();

        // Abdomen
        this.scene.pushMatrix();
        this.scene.translate(0, -1.3, -4.5);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.scale(1, 1.5, 1);
        this.abdomenMaterial.apply();
        this.abdomen.display();
        this.scene.popMatrix();

        // Wing Left
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(this.elapsedTime * 1.7) * 0.5, 0);
        this.scene.rotate(Math.sin(this.elapsedTime * 1.7) * 0.5, 0, 0, 1)
        this.wingMaterial.apply();
        this.wing.displayLeftWings();
        this.scene.popMatrix();

        // Wing Right
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(this.elapsedTime * 1.7) * 0.5, 0);
        this.scene.rotate(-Math.sin(this.elapsedTime * 1.7) * 0.5, 0, 0, 1)
        this.wingMaterial.apply();
        this.wing.displayRightWings();
        this.scene.popMatrix();

        // Stringer
        this.scene.pushMatrix();
        this.scene.translate(0, -2.2, -5.55);
        this.scene.scale(0.2, 0.4, 0.2);
        this.scene.rotate(-(3*Math.PI / 4), 1, 0, 0);
        this.stingerMaterial.apply();
        this.stringer.display();
        this.scene.popMatrix();

        // Mouth Left
        this.scene.pushMatrix();
        this.scene.translate(-0.1, -0.7, 1.0);
        this.scene.rotate(- (5 * Math.PI / 4), 1, 0, 0);
        this.scene.scale(0.1, 0.6, 0.1);
        this.mouthMaterial.apply();
        this.mouth.display();
        this.scene.popMatrix();

        // Mouth Right
        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.7, 1.0);
        this.scene.rotate(- (5 * Math.PI / 4), 1, 0, 0);
        this.scene.scale(0.1, 0.6, 0.1);
        this.mouthMaterial.apply();
        this.mouth.display();
        this.scene.popMatrix();

        // Leg Left Front
        this.scene.pushMatrix();
        this.scene.translate(1, -0.9, -1.8);
        this.scene.scale(1.5, 1.5, 1.5);
        this.legMaterial.apply();
        this.leg.displayLeg();
        this.scene.popMatrix();

        // Leg Left Middle
        this.scene.pushMatrix();
        this.scene.translate(1, -0.9, -2.4);
        this.scene.scale(1.5, 1.5, 1.5);
        this.legMaterial.apply();
        this.leg.displayLeg();
        this.scene.popMatrix();

        // Leg Left Back
        this.scene.pushMatrix();
        this.scene.translate(1, -0.9, -3);
        this.scene.scale(1.5, 1.5, 1.5);
        this.legMaterial.apply();
        this.leg.displayLeg();
        this.scene.popMatrix();

        // Leg Right Front
        this.scene.pushMatrix();
        this.scene.translate(-1, -0.9, -1.8);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.legMaterial.apply();
        this.leg.displayLeg();
        this.scene.popMatrix();

        // Leg Right Middle
        this.scene.pushMatrix();
        this.scene.translate(-1, -0.9, -2.4);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.legMaterial.apply();
        this.leg.displayLeg();
        this.scene.popMatrix();

        // Leg Right Back
        this.scene.pushMatrix();
        this.scene.translate(-1, -0.9, -3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.legMaterial.apply();
        this.leg.displayLeg();
        this.scene.popMatrix();

        // Antennae Left
        this.scene.pushMatrix();
        this.scene.translate(-0.2, 1, 0.7);
        this.antennaeMaterial.apply();
        this.antennae.displayAntannae();
        this.scene.popMatrix();

        // Antennae Left
        this.scene.pushMatrix();
        this.scene.translate(0.2, 1, 0.7);
        this.antennaeMaterial.apply();
        this.antennae.displayAntannae();
        this.scene.popMatrix();

    }
}