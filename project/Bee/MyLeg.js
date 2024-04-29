import {CGFobject} from "../../lib/CGF.js";
import {MySphere} from "../MySphere.js";

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1, 15, 15);
    }

    displayLeg() { // 3 part leg

        // 1st part
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0);
        this.scene.rotate(-(3*Math.PI/4), 0, 1, 0);
        this.scene.scale(0.07, 0.07, 0.4);
        this.sphere.display();
        this.scene.popMatrix();

        // 2nd part 
        this.scene.pushMatrix();
        this.scene.translate(0.25, -0.7, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.07, 0.07, 0.5);
        this.sphere.display();
        this.scene.popMatrix();

        // 3rd part
        /*this.scene.pushMatrix();
        this.scene.translate(0.45, -1.15, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0);
        this.scene.rotate(-(Math.PI/2), 0, 1, 0);
        this.scene.scale(0.07, 0.07, 0.2);
        this.sphere.display();
        this.scene.popMatrix();*/
    }
}