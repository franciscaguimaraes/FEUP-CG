import {CGFobject} from "../../lib/CGF.js";
import {MySphere} from "../MySphere.js";

export class MyWings extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1, 15, 15);

        this.wingAngle = Math.PI / 8;
    }

    displayLeftWings() {
        // Wing Left
        this.scene.pushMatrix();
        this.scene.translate(-1.4, 0.3, -2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(this.wingAngle, 1, 0, 0);
        this.scene.scale(0.7, 0.1, 1.5);
        this.sphere.display();
        this.scene.popMatrix();

        // Small Wing Left
        this.scene.pushMatrix();
        this.scene.translate(-1.4, 0.1, -2.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(this.wingAngle, 1, 0, 0);
        this.scene.scale(0.7, 0.1, 1);
        this.sphere.display();
        this.scene.popMatrix();
    }

    displayRightWings() {

        // Wing Right
        this.scene.pushMatrix();
        this.scene.translate(1.4, 0.3, -2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-this.wingAngle, 1, 0, 0);
        this.scene.scale(0.7, 0.1, 1.5);
        this.sphere.display();
        this.scene.popMatrix();

        // Small Wing Right
        this.scene.pushMatrix();
        this.scene.translate(1.4, 0.1, -2.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(-this.wingAngle, 1, 0, 0);
        this.scene.scale(0.7, 0.1, 1);
        this.sphere.display();
        this.scene.popMatrix();
    }
}