import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

export class MyStem extends CGFobject {
    constructor(scene, radius, height, stacks, nrCylinders, stemTexture) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.stacks = stacks;
        this.slices = 20;
        this.nrCylinders = nrCylinders;
        this.stemTexture = stemTexture;
        this.stemCurvatureValue = Math.random() >= 0.5 ? 1 : -1;
        this.stickAngle = Math.random() * 2 * Math.PI;
        this.triangle = new MyTriangle(this.scene, this.stemTexture);
        this.initBuffers();
    }

    initBuffers() {
        this.cylinders = [];
        var cylinderHeight = this.height / this.nrCylinders;
        for (let i = 0; i < this.nrCylinders; i++) {
            this.cylinders.push(new MyCylinder(this.scene, this.radius, cylinderHeight, this.stacks, this.slices));
        }
    }

    display() {
        var cylinderHeight = this.height / this.nrCylinders;
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);

        for (let i = 0; i < this.nrCylinders; i++) {
            let curveAmount = this.stemCurvatureValue * Math.sin (i / this.nrCylinders * Math.PI) * 0.25;
            
            if(i==0) {
                this.scene.rotate(curveAmount, 0, 1, 0);
            } else if(i%2==0) {
                this.scene.rotate(curveAmount, 0, 1, 0);
                this.drawLeaf(this.stickAngle);
            } else {
                this.scene.rotate(-curveAmount, 0, 1, 0);
                this.drawLeaf(-this.stickAngle);
            }
            this.cylinders[i].display();
            this.scene.translate(0, 0, cylinderHeight);
        }
        this.scene.popMatrix();
    }

    drawLeaf(angle) {
        this.scene.pushMatrix();
        this.drawStick(angle);
        this.scene.popMatrix();
    }

    drawFirstLeaf() {
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.7, 1);
        this.triangle.display();
        this.scene.popMatrix();
    }

    drawSecondLeaf() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0.7, -0.3, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }

    drawStick(angle) {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(angle, 1, 0, 0);
        this.scene.scale(0.3, 0.3, 1);
        this.stick = new MyCylinder(this.scene, this.radius, 2, this.stacks, this.slices);
        this.stick.display();
        this.drawFirstLeaf();
        this.drawSecondLeaf();
        this.scene.popMatrix();
    }
}