import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
        super(scene)
        this.sphere = new MySphere(this.scene, 200, 20, 20, true)
        this.texture = new CGFappearance(this.scene)
        this.texture.setEmission(1, 1, 1, 1) // white light
        this.texture.setTexture(texture)
    }

    display() {
        this.scene.pushMatrix()
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.texture.apply()
        //this.rotate(3*Math.PI/4,0,1,0); // like in the instructions
        this.sphere.display();
        this.scene.popMatrix();
    }
}