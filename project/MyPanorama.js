import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * Class MyPanorama
 * @extends CGFobject
 * @brief Represents a panoramic background for a 3D scene.
 */
export class MyPanorama extends CGFobject {

    /**
     * Constructs a MyPanorama instance.
     * Initializes the spherical geometry and sets up the texture appearance, including lighting adjustments.
     *
     * @param scene - The CGFscene to which this object belongs.
     * @param texture - The texture image to be applied to the panorama sphere.
    */
    constructor(scene, texture) {
        super(scene)
        this.sphere = new MySphere(this.scene, 200, 20, 20, true)
        this.texture = new CGFappearance(this.scene)
        this.texture.setEmission(1, 1, 1, 1) // white light
        this.texture.setTexture(texture)
    }

    /**
     * @brief Displays the panoramic sphere in the scene.
     * Positions the sphere at the camera's current location to ensure the panorama surrounds the viewer.
    */
    display() {
        this.scene.pushMatrix()
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.texture.apply()
        //this.rotate(3*Math.PI/4,0,1,0); // like in the instructions
        this.sphere.display();
        this.scene.popMatrix();
    }
}