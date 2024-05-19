import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js'; 

/**
 * Class MyRockSet
 * @extends CGFobject
 * @brief Represents a set of rocks, both randomly placed and organized in piles.
 */
export class MyRockSet extends CGFobject {
    /**
     * @brief Constructs a MyRockSet instance.
     * 
     * Initializes the set of rocks, managing both random placement and structured piles.
     * Handles the initialization of rock properties and sets up initial positions.
     *
     * @param scene - The scene where the rocks will be displayed.
     * @param numRocksRandom - The total number of rocks to be placed randomly.
     * @param texture - The texture to be applied to each rock.
     * @param numRocksPile - The number of rocks in each pile.
     * @param numOfPiles - The number of piles to be created.
     * @param radiusRange - Array [minRadius, maxRadius] for the size of the rocks.
     * @param scaleRange - Array [minScale, maxScale] for scaling each rock.
    */
    constructor(scene, numRocksRandom, texture, numRocksPile, numOfPiles, radiusRange, scaleRange) {
        super(scene);
        this.numRocksRandom = numRocksRandom;
        this.rocks = []; // Array of rocks
        this.texture = texture;
        this.numRocksPile = numRocksPile;
        this.numOfPiles = numOfPiles;
        this.radiusRange = radiusRange; // [minRadius, maxRadius]
        this.scaleRange = scaleRange; // [minScale, maxScale]
        this.pileXpos = 0;
        this.pileYpos = 0;
        this.pileZpos = 0;

        this.initBuffers();
    }

    /**
     * @brief Initializes the rock set.
     * 
     * Initializes the rock set by creating the specified number of rock piles and random rocks.
     */
    initBuffers() {

        let usedPositions = []; // Stores positions to ensure no overlapping of rock piles

        // Constructing rock piles with unique positions
        for (let i = 0; i < this.numOfPiles; i++) {

            let baseX, baseZ;
            let positionIsUnique = false;

            // Ensure each pile has a unique position
            while (!positionIsUnique) {
                baseX = Math.random() * 80 - 30;  // x between -30 and 50
                baseZ = Math.random() * 10 - 30;  // z between -30 and -20

                positionIsUnique = true; 

                for (let position of usedPositions) {
                    if (position.x === baseX && position.z === baseZ) {
                        positionIsUnique = false; 
                        break;
                    }
                }
            }

            usedPositions.push({x: baseX, z: baseZ});

            let baseY = 3; // Base height of the pile
        
            let currentLayer = 0;
            let rocksInCurrentLayer = 1;
            let rockCount = 0;
        
            for (let i = 0; i <= this.numRocksPile; i++) {

                var radius = 0;
                if(i == 0){
                    radius = 1.1;
                } else {
                    radius = this.radiusRange[0] + Math.random() * (this.radiusRange[1] - this.radiusRange[0]);
                }

                const slices = Math.floor(10 + Math.random() * 16); 
                const stacks = Math.floor(10 + Math.random() * 16); 
                
                const rock = new MyRock(this.scene, radius, slices, stacks, this.texture);

                const angle = 2 * Math.PI * (rockCount / rocksInCurrentLayer);
                const layerRadius = 1.5 * currentLayer; 
                rock.position = [
                    baseX - layerRadius * Math.cos(angle), 
                    baseY - 0.8 * radius * currentLayer,   
                    baseZ - layerRadius * Math.sin(angle)  
                ];

                if(i==0) {
                    this.pileXpos = rock.position[0];
                    this.pileYpos = rock.position[1];
                    this.pileZpos = rock.position[2];

                    rock.scaleX = 1;
                    rock.scaleY = 1;
                    rock.scaleZ = 1;

                    rock.rotation = [0, 0, 0];
                    
                } else {
                    rock.scaleX = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
                    rock.scaleY = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
                    rock.scaleZ = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
            
                    rock.rotation = [
                        Math.random() * Math.PI, 
                        Math.random() * Math.PI, 
                        Math.random() * Math.PI 
                    ];
                }
                
                this.rocks.push(rock);
                rockCount++;

                if (rockCount === rocksInCurrentLayer) {
                    currentLayer++;
                    rocksInCurrentLayer += 5; 
                    rockCount = 0;
                }
            }
        }

        // Spread the remaining rocks randomly
        while (this.numRocksRandom > 0) {

            const radius = this.radiusRange[0] + Math.random() * (this.radiusRange[1] - this.radiusRange[0]);
            const slices = Math.floor(10 + Math.random() * 16); 
            const stacks = Math.floor(10 + Math.random() * 16); 
            
            const rock = new MyRock(this.scene, radius, slices, stacks, this.texture);
            rock.scaleX = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
            rock.scaleY = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
            rock.scaleZ = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
    
            rock.position = [
                Math.random() * 100 - 50,  // x between -50 and 50
                1,                         // y is fixed at 1
                Math.random() * 100 - 50   // z between -50 and 50
            ];            

            rock.rotation = [
                Math.random() * Math.PI, 
                Math.random() * Math.PI, 
                Math.random() * Math.PI 
            ];
            
            this.rocks.push(rock);

            this.numRocksRandom--;
        }
    }

    /**
     * @brief Displays the rock set.
     * 
     * Displays each rock in the set, including the rocks in the piles. 
     * Also displays the hive if the displayHive flag is set.
    */
    display() {
        this.rocks.forEach(rock => {
            this.scene.pushMatrix();

            this.scene.translate(...rock.position);
            this.scene.rotate(rock.rotation[0], 1, 0, 0);
            this.scene.rotate(rock.rotation[1], 0, 1, 0);
            this.scene.rotate(rock.rotation[2], 0, 0, 1);
            this.scene.scale(rock.scaleX, rock.scaleY, rock.scaleZ);

            rock.display();

            this.scene.popMatrix();
        });

        if(this.scene.displayHive) {
            this.scene.pushMatrix();
            this.scene.hive.setPosition(this.pileXpos, this.pileYpos + 0.7, this.pileZpos);
            this.scene.hive.display();
            this.scene.popMatrix();
        }
    }
}
