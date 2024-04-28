import {CGFobject} from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numCols, texturesReceptacle, texturesPetal, texturesStem) {
        super(scene);
        this.scene = scene;
        this.numRows = numRows;
        this.numCols = numCols;
        this.texturesReceptacle = texturesReceptacle;
        this.texturesPetal = texturesPetal;
        this.texturesStem = texturesStem;
        this.garden = [];

        for (let i = 0; i < this.numRows; i++) {
            let flowerRow = [];
            for (let j = 0; j < this.numCols; j++) {
                const minReceptacleRadius = 0.6, maxReceptacleRadius = 1.2;
                const minReceptacleSlices = 10, maxReceptacleSlices = 12;
                const minStemPlanes = 10, maxStemPlanes = 24;
                const minStemCount = 3, maxStemCount = 6;
                const minHeightStem = 6, maxHeightStem = 10;
                const minRadiusStem = 0.15, maxRadiusStem = 0.3;
                const minPetalCount = 6, maxPetalCount = 12;
                const minAnglePetal = 20, maxAnglePetal = 40;
                const minExternRadius = 5, maxExternRadius = 7;
                const minFlowerAngle = 20, maxFlowerAngle = 80;

                const radiusReceptacle = Math.random() * (maxReceptacleRadius - minReceptacleRadius) + minReceptacleRadius;
                const receptacleSlices = Math.floor(Math.random() * (maxReceptacleSlices - minReceptacleSlices) + minReceptacleSlices);
                const numStemPlanes = Math.floor(Math.random() * (maxStemPlanes - minStemPlanes) + minStemPlanes);
                const countStems = Math.floor(Math.random() * (maxStemCount - minStemCount) + minStemCount);
                const heightStem = Math.random() * (maxHeightStem - minHeightStem) + minHeightStem;
                const radiusStem = Math.random() * (maxRadiusStem - minRadiusStem) + minRadiusStem;
                const countPetals = Math.floor(Math.random() * (maxPetalCount - minPetalCount) + minPetalCount);
                const anglePetal = Math.PI / (Math.floor(Math.random() * (maxAnglePetal - minAnglePetal) + minAnglePetal));
                const indexTextureReceptacle = Math.floor(Math.random() * this.texturesReceptacle.length);
                const indexTexturePetal = Math.floor(Math.random() * this.texturesPetal.length);
                const indexTextureStem = Math.floor(Math.random() * this.texturesStem.length);
                const externRadius = Math.random() * (maxExternRadius - minExternRadius) + minExternRadius;
                const flowerAngle = Math.random() * (maxFlowerAngle - minFlowerAngle) + minFlowerAngle;

                const flower = new MyFlower(this.scene, externRadius, countPetals, anglePetal, radiusReceptacle, receptacleSlices, radiusStem, heightStem, numStemPlanes, countStems, this.texturesReceptacle[indexTextureReceptacle], this.texturesPetal[indexTexturePetal], this.texturesStem[indexTextureStem], flowerAngle);
                flowerRow.push(flower);
            }
            this.garden.push(flowerRow);
        }
    }

    display() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                const flower = this.garden[i][j];
                this.scene.pushMatrix();
                this.scene.translate(j * flower.externRadius * 2.2, 0, i * flower.externRadius * 2.2); // Slightly increased spacing
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}
