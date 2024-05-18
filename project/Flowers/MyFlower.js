import { CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyStem } from './MyStem.js';
import { MyFlowerTop } from './MyFlowerTop.js';
export class MyFlower extends CGFobject {
    /**
     * @brief Constructor for the MyFlower class.
     * @param scene Reference to the scene object
     * @param externRadius External radius of the flower top
     * @param nrPetals Number of petals
     * @param petalAngle Angle of each petal
     * @param receptacleRadius Radius of the receptacle (center of the flower top)
     * @param receptacleSlices Number of slices for the receptacle
     * @param stemRadius Radius of the stem
     * @param stemHeight Height of the stem
     * @param steamNrPlanes Number of planes for the stem
     * @param nrStems Number of stems
     * @param receptacleTexture Texture for the receptacle
     * @param petalTexture Texture for the petals
     * @param stemTexture Texture for the stem
     * @param flowerAngle Angle of the flower
     */
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
        this.hasPollen = true;

        this.stemMaterial = new CGFappearance(scene);
        this.stemMaterial.setEmission(1, 1, 1, 1);
        this.stemMaterial.setTexture(this.stemTexture);

        this.initBuffers();
    }

    /**
     * @brief Initializes the buffers for the flower's top and stem.
     */
    initBuffers(){
        this.flowerTop = new MyFlowerTop(this.scene, this.externRadius, this.nrPetals, this.petalAngle, this.receptacleRadius, this.receptacleSlices, this.receptacleTexture, this.petalTexture);
        this.stem = new MyStem(this.scene, this.stemRadius, this.stemHeight, this.steamNrPlanes, this.nrStems, this.stemTexture);
    }

    /**
     * @brief Renders the flower by displaying the flower top and stem.
     */
    display(){
        this.scene.pushMatrix();
        this.scene.rotate(this.flowerAngle, 1, 0, 0);
        this.flowerTop.pollen = this.hasPollen;
        this.flowerTop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
    }
}

