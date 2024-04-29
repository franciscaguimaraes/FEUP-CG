import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js'; 

export class MyRockSet extends CGFobject {
    constructor(scene, numRocksRandom, texture, numRocksPile, numOfPiles, radiusRange, scaleRange) {
        super(scene);
        this.numRocksRandom = numRocksRandom;
        this.rocks = []; // Array of rocks
        this.texture = texture;
        this.numRocksPile = numRocksPile;
        this.numOfPiles = numOfPiles;
        this.radiusRange = radiusRange; // [minRadius, maxRadius]
        this.scaleRange = scaleRange; // [minScale, maxScale]

        this.initBuffers();
    }

    initBuffers() {

        let usedPositions = [];

        for (let i = 0; i < this.numOfPiles; i++) {

            let baseX, baseZ;
            let positionIsUnique = false;

            while (!positionIsUnique) {
                baseX = Math.random() * 30 - 15; 
                baseZ = Math.random() * 30 - 15;

                positionIsUnique = true; 

                for (let position of usedPositions) {
                    if (position.x === baseX && position.z === baseZ) {
                        positionIsUnique = false; 
                        break;
                    }
                }
            }

            usedPositions.push({x: baseX, z: baseZ});

            let baseY = -1; // Base height of the pile
        
            let currentLayer = 0;
            let rocksInCurrentLayer = 1;
            let rockCount = 0;
        
            for (let i = 0; i <= this.numRocksPile; i++) {
                const radius = this.radiusRange[0] + Math.random() * (this.radiusRange[1] - this.radiusRange[0]);
                const slices = Math.floor(10 + Math.random() * 16); 
                const stacks = Math.floor(10 + Math.random() * 16); 
                
                const rock = new MyRock(this.scene, radius, slices, stacks, this.texture);

                rock.scaleX = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
                rock.scaleY = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
                rock.scaleZ = this.scaleRange[0] + Math.random() * (this.scaleRange[1] - this.scaleRange[0]);
        
                const angle = 2 * Math.PI * (rockCount / rocksInCurrentLayer);
                const layerRadius = 1.5 * currentLayer; 
                rock.position = [
                    baseX - layerRadius * Math.cos(angle), 
                    baseY - 0.8 * radius * currentLayer,   
                    baseZ - layerRadius * Math.sin(angle)  
                ];

                rock.rotation = [
                    Math.random() * Math.PI, 
                    Math.random() * Math.PI, 
                    Math.random() * Math.PI 
                ];
                
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
                Math.random() * 50 - 30,
                -3, 
                Math.random() * 50 - 30  
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
    }
}
