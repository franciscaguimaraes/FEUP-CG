import { CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyFlowerTop } from './MyFlowerTop.js';
export class MyFlower extends CGFobject {
    constructor(scene, externRadius, nrPetals, petalAngle, receptacleRadius, receptacleSlices, stemRadius, stemHeight, steamNrPlanes, nrStems, receptacleTexture, petalTexture, stemTexture, flowerAngle){
        super(scene);
        this.externRadius = externRadius;
        this.nrPetals = nrPetals;
        this.petalAngle = petalAngle;
        this.receptacleRadius = receptacleRadius;
        this.receptacleSlices = receptacleSlices;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.steamNrPlanes = steamNrPlanes;
        this.nrStems = nrStems;
        this.receptacleTexture = receptacleTexture;
        this.petalTexture = petalTexture;
        this.stemTexture = stemTexture;
        this.flowerAngle = flowerAngle;

        this.stemMaterial = new CGFappearance(scene);
        this.stemMaterial.setEmission(1, 1, 1, 1);
        this.stemMaterial.setTexture(this.stemTexture);

        this.initBuffers();
    }

    initBuffers(){
        this.flowerTop = new MyFlowerTop(this.scene, this.externRadius, this.nrPetals, this.petalAngle, this.receptacleRadius, this.receptacleSlices, this.receptacleTexture, this.petalTexture);
        this.stem = new MyStem(this.scene, this.stemRadius, this.stemHeight, this.steamNrPlanes, this.nrStems, this.stemTexture);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(this.flowerAngle, 1, 0, 0);
        this.flowerTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
    }
}

