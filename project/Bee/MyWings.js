import {CGFobject} from "../../lib/CGF.js";
import {MySphere} from "../MySphere.js";

/**
 * Class MyWings
 * @extends CGFobject
 * @brief Represents the wings of a character or creature in a 3D scene.
 */
export class MyWings extends CGFobject {
    /**
     * Constructs a MyWings instance.
     * Initializes the sphere geometry that will be used to represent the wings and sets the initial wing angle.
     * 
     * @param scene - The CGFscene to which this object belongs.
    */
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1, 15, 15);

        this.wingAngle = Math.PI / 8;
    }

    /**
     * @brief Displays the left wings in the scene.
     * This method handles the transformations necessary to position and scale the sphere geometries to
     * form the left wings of the bee.
    */
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

    /**
     * @brief Displays the right wings in the scene.
     * This method handles the transformations necessary to position and scale the sphere geometries to
     * form the right wings of the bee.
    */
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