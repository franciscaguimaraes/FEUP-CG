// MyHive.js
import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyBoxPlane } from './MyBoxPlane.js';

export class MyHive extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.scene = scene;

        this.bottomPlane = new MyBoxPlane(this.scene, 3, 4, 0.5, texture);
        this.bottomTopPlane = new MyBoxPlane(this.scene, 3, 4, 0.1, texture);
        this.topPlane = new MyBoxPlane(this.scene, 3, 4, 0.1, texture);
        this.leftPlane = new MyBoxPlane(this.scene, 3, 1.5, 0.1, texture);
        this.rightPlane = new MyBoxPlane(this.scene, 3, 1.5, 0.1, texture);
        this.frontPlane = new MyBoxPlane(this.scene, 1.5, 4, 0.1, texture);
        this.backPlane = new MyBoxPlane(this.scene, 1.5, 4, 0.1, texture);

        // Hive position
        this.position = {x: 0, y: 0, z: 0};

        // Pollen in the hive
        this.pollenInHive = [];
    }

    setPosition(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    addPollen(pollen) {
        const width = 2;  // Approximate width of the hive
        const height = 3;  // Approximate height where pollen can be placed
    
        const pollenPosition = {
            x: (Math.random() * width) - (width / 2),  // Random position within width
            y: 0.5,  // Fixed height for all pollen
            z: (Math.random() * height) - (height / 2)  // Random position within height
        };
    
        this.pollenInHive.push({ pollen: pollen, position: pollenPosition });
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);

        // Display the hive

        // Bottom
        this.scene.pushMatrix();
        this.scene.translate(0, 0.25, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.bottomPlane.display();
        this.scene.popMatrix();

        // Display pollen in the hive
        this.pollenInHive.forEach(item => {
            this.scene.pushMatrix();
            this.scene.translate(item.position.x, item.position.y, item.position.z);
            this.scene.scale(0.5, 0.5, 0.5);
            item.pollen.display();
            this.scene.popMatrix();
        });

        // Other parts of the hive
        this.displayHiveSides();
        this.scene.popMatrix();
    }

    displayHiveSides() {
        // Front
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0.75, 0, 1.5);
        this.frontPlane.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0.75, 0, -1.5);
        this.backPlane.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix();
        this.scene.translate(0, 0.75, 2);
        this.leftPlane.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        this.scene.translate(0, 0.75, -2);
        this.rightPlane.display();
        this.scene.popMatrix();

        // Top
        this.scene.pushMatrix();
        this.scene.translate(2.8, 0.75, 0);
        this.scene.rotate(-Math.PI / 6, 0, 0, 1);
        this.drawTopBox();
        this.scene.popMatrix();
    }

    drawTopBox() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.bottomTopPlane.display();
        this.scene.popMatrix();

        // Front
        this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0.75, 0, 1.5);
        this.frontPlane.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0.75, 0, -1.5);
        this.backPlane.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 1);
        this.scene.translate(0, 0.75, 2);
        this.leftPlane.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 1);
        this.scene.translate(0, 0.75, -2);
        this.rightPlane.display();
        this.scene.popMatrix();
    }
}
