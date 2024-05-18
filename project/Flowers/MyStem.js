import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

export class MyStem extends CGFobject {
    /**
     * @brief Constructor for the MyStem class.
     * @param scene Reference to the scene object
     * @param radius Radius of the stem
     * @param height Height of the stem
     * @param stacks Number of stacks (subdivisions along the height of each cylinder)
     * @param nrCylinders Number of cylinders making up the stem
     * @param stemTexture Texture for the stem
     */
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

    /**
     * @brief Initializes the buffers for the stem by creating cylinders.
     */
    initBuffers() {
        this.cylinders = [];
        var cylinderHeight = this.height / this.nrCylinders;
        for (let i = 0; i < this.nrCylinders; i++) {
            this.cylinders.push(new MyCylinder(this.scene, this.radius, cylinderHeight, this.stacks, this.slices));
        }
    }

    /**
     * @brief Renders the stem by displaying the cylinders and attaching leaves at intervals.
     */
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

    /**
     * @brief Draws a leaf attached to the stem.
     * @param angle Angle at which the leaf is attached.
     */
    drawLeaf(angle) {
        this.scene.pushMatrix();
        this.drawStick(angle);
        this.scene.popMatrix();
    }

    /**
     * @brief Draws the first leaf of a pair of leaves.
     */
    drawFirstLeaf() {
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.7, 1);
        this.triangle.display();
        this.scene.popMatrix();
    }

    /**
     * @brief Draws the second leaf of a pair of leaves.
     */
    drawSecondLeaf() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(0.7, -0.3, 0);
        this.triangle.display();
        this.scene.popMatrix();
    }

    
    /**
     * @brief Draws the stick (stem segment) with leaves attached.
     * @param angle Angle at which the stick is oriented.
     */
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