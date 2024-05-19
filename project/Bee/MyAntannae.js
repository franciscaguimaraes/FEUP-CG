import {CGFobject} from "../../lib/CGF.js";
import {MySphere} from "../MySphere.js";

/**
 * @class MyAntennae
 * @extends CGFobject
 * @brief Represents antennae for a bee model.
 */
export class MyAntannae extends CGFobject {

    /**
     * @brief Constructs an instance of the MyAntennae class.
     * Initializes the sphere geometry used to construct the antennae.
     * 
     * @param scene The CGFscene to which this object belongs, provided by the caller.
     */
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 1, 15, 15);
    }

    /**
     * @brief Displays the antennae in the scene.
     * 
     * This function handles the transformations necessary to position and
     * scale the sphere geometries to form the antennae of the bee.
     * The first part creates the vertical stem of the antenna, and the second part
     * creates the end tip of the antenna, positioned to protrude forward.
     */
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