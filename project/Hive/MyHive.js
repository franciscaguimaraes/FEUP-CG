import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyBoxPlane } from './MyBoxPlane.js';

export class MyHive extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.scene = scene;

        this.bottomPlane = new MyBoxPlane(this.scene, 3, 4, 0.5, texture);
        this.bottomTopPlane = new MyBoxPlane(this.scene, 3, 4, 0.1, texture);
        this.topPlane = new MyBoxPlane(this.scene, 3, 4, 0.1, texture);
        this.leftPlane = new MyBoxPlane(this.scene, 3, 1.5, 0.1, texture);
        this.rightPlane = new MyBoxPlane(this.scene, 3, 1.5, 0.1, texture);
        this.frontPlane = new MyBoxPlane(this.scene, 1.5, 4, 0.1, texture);
        this.backPlane = new MyBoxPlane(this.scene, 1.5, 4, 0.1, texture);
    }

    display() {
        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0, 0.25, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.bottomPlane.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.75, 0, 1.5);
        this.frontPlane.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.75, 0, -1.5);
        this.backPlane.display();
        this.scene.popMatrix();

        //left
        this.scene.pushMatrix();
        this.scene.translate(0, 0.75, 2);
        this.leftPlane.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.translate(0, 0.75, -2);
        this.rightPlane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.8, 0.75, 0);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.drawTopBox();
        this.scene.popMatrix();
    }

    drawTopBox() {
        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.bottomTopPlane.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.scale(1,0.2,1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.75, 0, 1.5);
        this.frontPlane.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.scale(1,0.2,1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0.75, 0, -1.5);
        this.backPlane.display();
        this.scene.popMatrix();

        //left
        this.scene.pushMatrix();
        this.scene.scale(1,0.2,1);
        this.scene.translate(0, 0.75, 2);
        this.leftPlane.display();
        this.scene.popMatrix();

        //right
        this.scene.pushMatrix();
        this.scene.scale(1,0.2,1);
        this.scene.translate(0, 0.75, -2);
        this.rightPlane.display();
        this.scene.popMatrix();
    }
}