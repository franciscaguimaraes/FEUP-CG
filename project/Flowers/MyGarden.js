import {CGFobject} from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    /**
     * @brief Constructor for the MyGarden class.
     * @param scene Reference to the scene object
     * @param displayRows Number of rows of flowers to display
     * @param displayCols Number of columns of flowers to display
     * @param texturesReceptacle Array of textures for the receptacle
     * @param texturesPetal Array of textures for the petals
     * @param texturesStem Array of textures for the stem
     */
    constructor(scene, displayRows, displayCols, texturesReceptacle, texturesPetal, texturesStem) {
        super(scene);
        this.scene = scene;
        this.texturesReceptacle = texturesReceptacle;
        this.texturesPetal = texturesPetal;
        this.texturesStem = texturesStem;
        this.numRows = 8;
        this.numCols = 8;
        this.displayRows = displayRows; 
        this.displayCols = displayCols;
        this.randomScaling = Math.random() * (0.8 - 0.3) + 0.3; // random between 0.3 and 0.8
        this.garden = [];
        this.garden = this.createGarden(this.numRows, this.numCols);

        this.flowerAndPosition = [];
    }

    /**
     * @brief Creates a garden with a grid of randomly generated flowers.
     * @param numRows Number of rows in the garden grid
     * @param numCols Number of columns in the garden grid
     * @return A 2D array representing the garden with flowers
     */
    createGarden(numRows, numCols) {
        for (let i = 0; i < numRows; i++) {
            let flowerRow = [];
            for (let j = 0; j < numCols; j++) {
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
        return this.garden;
    }

    /**
     * @brief Sets the number of rows and columns of flowers to display.
     * @param rows Number of rows to display
     * @param columns Number of columns to display
     */
    setDisplayDimensions(rows, columns) {
        this.displayRows = rows;
        this.displayCols = columns;
        this.createGarden(this.numRows, this.numCols);
    }

    /**
     * @brief Renders the garden by displaying the flowers in a grid.
     */
    display() {
        
        this.flowerAndPosition = []; 

        for (let i = 0; i < this.displayRows; i++) {
            for (let j = 0; j < this.displayCols; j++) {
                var flower = this.garden[i][j];
                this.scene.pushMatrix();

                const position = { x: j * flower.externRadius * 2.2, y: flower.stemHeight * this.randomScaling , z: i * flower.externRadius * 2.2 };
                this.flowerAndPosition.push({ flower: flower, position: position });
                this.scene.translate(position.x, position.y, position.z);

                this.scene.scale(this.randomScaling, this.randomScaling, this.randomScaling);

                flower.display();
                this.scene.popMatrix();

                if (this.scene.displayPollen) { // display pollen
                    if (flower.hasPollen) {
                        this.scene.pushMatrix();
                        this.scene.translate(position.x, position.y, position.z);
                        this.scene.rotate(flower.flowerAngle, 0, 1, 0);
                        this.scene.scale(0.5, 0.5, 0.5);
                        this.scene.pollen.display();
                        this.scene.popMatrix();
                    }
                }
            }
        }
    }
}