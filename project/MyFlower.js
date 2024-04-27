import {CGFobject} from '../lib/CGF.js';
import {CGFappearance} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';

export class MyFlower extends CGFobject {
    constructor(scene, externRadius, nrPetals, petalAngle, receptacleRadius, stemRadius, stemHeight, steamNrPlanes, nrStems, receptacleTexture, petalTexture, stemTexture){
        super(scene);
        this.externRadius = externRadius;
        this.nrPetals = nrPetals;
        this.petalAngle = petalAngle;
        this.receptacleRadius = receptacleRadius;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.steamNrPlanes = steamNrPlanes;
        this.nrStems = nrStems;
        this.receptacleTexture = receptacleTexture;
        this.petalTexture = petalTexture;
        this.stemTexture = stemTexture;

        this.receptacleMaterial = new CGFappearance(scene);
        this.receptacleMaterial.setEmission(1, 1, 1, 1);
        this.petalMaterial = new CGFappearance(scene);
        this.petalMaterial.setEmission(1, 1, 1, 1);
        this.stemMaterial = new CGFappearance(scene);
        this.stemMaterial.setEmission(1, 1, 1, 1);

        this.initBuffers();
    }

    initBuffers(){
        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius, this.receptacleColor);
        this.petal = new MyPetal(this.scene, this.petalColor, this.petalMinAngle, this.petalMaxAngle);
        this.stem = new MyStem(this.scene, this.stemRadius, this.stemHeight, this.steamNrPlanes, this.nrStems);

    }

    display(){
        for(var i = 0; i < this.nrPetals; i++){
            this.scene.pushMatrix();
            this.scene.rotate(2 * Math.PI * i / this.nrPetals, 0, 1, 0);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.translate(this.receptacleRadius + 2 - (Math.sin(this.petalAngle)), 0, -Math.sin(this.petalAngle));
            this.petalMaterial.apply();
            this.scene.rotate(this.petalAngle,0,1,0);
            this.petal.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.receptacleMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
    }

    setColor(material, color) {
        material.setDiffuse(color[0], color[1], color[2], color[3]);
        material.setAmbient(color[0], color[1], color[2], color[3]);
    }

}