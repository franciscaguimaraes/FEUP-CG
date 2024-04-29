import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';


export class MyFlowerTop extends CGFobject {
    constructor(scene, externRadius, nrPetals, petalAngle, receptacleRadius, receptacleSlices, receptacleTexture, petalTexture){
        super(scene);
        this.externRadius = externRadius;
        this.nrPetals = nrPetals;
        this.petalAngle = petalAngle;
        this.receptacleRadius = receptacleRadius;
        this.receptacleSlices = receptacleSlices;
        this.petalTexture = petalTexture;
        this.receptacleTexture = receptacleTexture;

        this.receptacleMaterial = new CGFappearance(scene);
        this.receptacleMaterial.setEmission(1, 1, 1, 1);
        this.receptacleMaterial.setTexture(receptacleTexture);

        this.petalMaterial = new CGFappearance(scene);
        this.petalMaterial.setEmission(1, 1, 1, 1);
        this.petalMaterial.setTexture(petalTexture);

        this.initBuffers();
    }

    initBuffers(){
        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius, this.receptacleSlices);
        this.petal = new MyPetal(this.scene, this.externRadius, this.petalAngle);
    }

    display(){
        this.scene.pushMatrix();
        this.receptacleMaterial.apply();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.receptacle.display();
        this.scene.popMatrix();

        for(let i = 0; i < this.nrPetals; i++){
            this.scene.pushMatrix();
            this.scene.rotate(2 * Math.PI * i / this.nrPetals, 0, 1, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.translate(this.receptacleRadius + 2 - (Math.sin(this.petalAngle)), 0, 0);
            this.petalMaterial.apply();
            this.petal.display();
            this.scene.popMatrix();
        }
    }
}
