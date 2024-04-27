import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyTriangle } from './MyTriangle.js';

export class MyStem extends CGFobject {
    constructor(scene, radius, height, stacks, nrCylinders) {
        super(scene);
        this.radius = radius;
        this.height = height;
        this.stacks = stacks;
        this.slices = 20;
        this.nrCylinders = nrCylinders;
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
        for(let i = 0; i < this.nrCylinders; i++){

            this.scene.pushMatrix();
            this.scene.rotate( Math.PI / 2,1, 0, 0);
            if(i == 0){
                this.scene.rotate(Math.PI / 8, 0, 1, 0);
            }else{
                if(i % 3 == 0){
                    this.scene.translate(0, 0, (Math.cos(Math.PI / 8) *cylinderHeight *  (i/2) + (cylinderHeight * (i/2))) - ((Math.tan(Math.PI/8) * this.radius * 2 ) * (i-1)));
                    this.scene.rotate(Math.PI / 8, 0, 1, 0);
                    this.buildLeaf(i);
                } else {
                if(i % 3 == 1){
                    this.scene.translate( Math.sin(Math.PI / 8) * cylinderHeight * i, 0,- (this.radius / 2 )+  (cylinderHeight * i * Math.cos(Math.PI / 8)));
                    this.buildLeaf(i);
                } else {
                    this.scene.translate((Math.sin(Math.PI / 8) *cylinderHeight* (i/2)), 0, (Math.cos(Math.PI / 8) *cylinderHeight *  (i/2) + (cylinderHeight * (i/2))) - (Math.tan(Math.PI/8) * this.radius * 2));
                    this.scene.rotate(-Math.PI / 8, 0, 1, 0);
                    this.buildLeaf(i);
                }}
            }
            this.cylinders[i].display();
            this.scene.popMatrix();
        }
    }

    buildLeaf(i) {
        this.scene.pushMatrix();
        // Create the thin cylinder
        var leafCylinder = new MyCylinder(this.scene, 0.05, 3, 10, 20);
        this.scene.rotate((2*Math.PI/3)*i,0,0,1);
        this.scene.rotate(Math.PI/2, 1,0,0);
        leafCylinder.display();
        this.scene.popMatrix();

        //First triangle
        var height = 3
        this.scene.pushMatrix();
        var leafTri = new MyTriangle(this.scene);
        this.scene.rotate((2*Math.PI/3)*i,0,0,1);
        this.scene.rotate(Math.PI/2, 1,0,0)
        this.scene.rotate(19*Math.PI/20,0,1,0);
        this.scene.scale(0.5,1,height)
        leafTri.display();
        this.scene.popMatrix();

        //Second triangle
        this.scene.pushMatrix();
        var leafTri = new MyTriangle(this.scene);
        this.scene.rotate((2*Math.PI/3)*i,0,0,1);
        this.scene.rotate(Math.PI/2, 1,0,0)
        this.scene.rotate(-19*Math.PI/20,0,1,0);
        this.scene.scale(0.5,1,height)

        leafTri.display();
        this.scene.popMatrix();
    }
}