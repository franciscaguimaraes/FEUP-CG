import {CGFobject} from "../../lib/CGF.js";
import {MySphere} from "../MySphere.js";

/**
 * Class MyLeg
 * @extends CGFobject
 * @brief Represents a leg of a character or creature in a 3D scene.
 */
export class MyLeg extends CGFobject {

    /**
     * Constructs a MyLeg instance.
     * Initializes the sphere geometry that will be used to represent leg segments.
     * 
     * @param scene - The CGFscene to which this object belongs.
    */
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1, 15, 15);
    }

    /**
     * @brief Displays the leg in the scene with three distinct parts.
     * Each part of the leg is modeled as a scaled and positioned sphere to simulate joints and limbs.
     */
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
    }
}