import {CGFobject} from "../../lib/CGF.js";
import {MySphere} from "../MySphere.js";

export class MyAntannae extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1, 15, 15);
    }

    displayAntannae() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(0.05, 0.4, 0.05);
        this.sphere.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0, 0.27, 0.65);
        this.scene.scale(0.05, 0.05, 0.4);
        this.sphere.display();
        this.scene.popMatrix();
    }
}