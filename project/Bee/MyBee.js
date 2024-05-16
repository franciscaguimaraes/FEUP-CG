import {CGFappearance, CGFobject, CGFtexture} from "../../lib/CGF.js";
import {MyCone} from "./MyCone.js";
import {MySphere} from "../MySphere.js";
import {MyAntannae} from "./MyAntannae.js";
import {MyLeg} from "./MyLeg.js";
import { MyWings } from "./MyWings.js";

// TODO: XZ PLANE SPEED

export class MyBee extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);

        // Elements
        this.head = new MySphere(scene, 1, 15, 15);
        this.eye = new MySphere(scene, 1, 15, 15);
        this.torax = new MySphere(scene, 1, 15, 15);
        this.abdomen = new MySphere(scene, 1, 15, 15);
        this.stringer = new MyCone(scene, 10, 10);
        this.mouth = new MyCone(scene, 10, 10);

        // Elements composed of objects
        this.antennae = new MyAntannae(scene);
        this.leg = new MyLeg(scene);
        this.wing = new MyWings(scene);

        // Movement
        this.elapsedTime = 0;
        this.position = {x: x, y: y, z: z}; // Position
        this.defaultPos = {x: x, y: y, z: z};
        this.orientation = 0; // Orientation
        this.scale = 1;
        this.speed = 0;

        // pollen
        this.carryingPollen = false;

        // Movement for Pollen/Hive
        this.moveToHiveFlag = false;
        this.moveToFlowerFlag = false;
        this.moveToInitialHeightFlag = false;
        
        // Flower
        this.targetFlowerPos = null;
        this.targetFlower = null;

        // Parabolic trajectory parameters
        this.extra = true;
        this.parabolaStart = null;
        this.parabolaEnd = null;
        this.parabolaPeak = null;
        this.parabolaT = 0; // Parameter to control the position along the parabola
        this.parabolaDuration = 100; // Duration of the parabolic movement
        
        this.initMaterials();
    }

    initMaterials(){
        this.headMaterial = new CGFappearance(this.scene);
        this.headMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.headMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.headMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.headMaterial.setTexture(new CGFtexture(this.scene, "./images/beeFur.jpg"));
        this.headMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.eyeMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.eyeMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.eyeMaterial.setTexture(new CGFtexture(this.scene, "./images/beeEye.jpg"));
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.toraxMaterial = this.headMaterial;

        this.abdomenMaterial = new CGFappearance(this.scene);
        this.abdomenMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
        this.abdomenMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
        this.abdomenMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
        this.abdomenMaterial.setTexture(new CGFtexture(this.scene, "./images/beeBody.jpg"));
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setAmbient(0.3, 0.3, 0.3, 0.3);
        this.wingMaterial.setDiffuse(0.2, 0.2, 0.2, 0.2);
        this.wingMaterial.setSpecular(0.1, 0.1, 0.1, 0.1);
        this.wingMaterial.setEmission(0, 0, 0, 0.1);
        this.wingMaterial.setTexture(new CGFtexture(this.scene, "./images/beeWing.jpg")); 
        this.wingMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.stingerMaterial = new CGFappearance(this.scene);
        this.stingerMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
        this.stingerMaterial.setDiffuse(0.05, 0.05, 0.05, 0.0);
        this.stingerMaterial.setSpecular(1, 1, 1, 0.0);
        this.stingerMaterial.setShininess(10.0);

        this.mouthMaterial = this.stingerMaterial;
        this.legMaterial = this.stingerMaterial;
        this.antennaeMaterial = this.stingerMaterial;
    }

    // bee has 2 units of width and 1.6 units of height
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sin(this.elapsedTime) * 0.5, 0); // oscilation
        this.draw();
        this.scene.popMatrix();
    }

    update(delta_t, scaleFactor, speedFactor) {
      this.scale = scaleFactor;
      this.checkKeys(speedFactor/5);
      
      this.elapsedTime += delta_t / 1000;

      // Update position
      if (!this.moveToHiveFlag && !this.moveToFlowerFlag && !this.moveToInitialHeightFlag) {
        this.position.x += this.speed * Math.sin(this.orientation);
        this.position.z += this.speed * Math.cos(this.orientation);

      } else if (this.moveToHiveFlag) {
        this.moveToHive();

      } else if (this.moveToFlowerFlag){
        this.moveToFlower();

      } else if (this.moveToInitialHeightFlag) {
        this.moveToInitialHeight();
      }
    }

    turn(v) {
      this.orientation += v
    }

    accelerate(v) {
      this.speed = Math.max(this.speed + v, 0)
    }

    reset() {
      this.speed = 0
      this.orientation = 0
      this.position = {x: this.defaultPos.x, y: this.defaultPos.y, z: this.defaultPos.z}

      this.moveToHiveFlag = false;
      this.moveToFlowerFlag = false;
      this.moveToInitialHeightFlag = false;
      this.targetFlowerPos = null;
      this.targetFlower = null;
    }

    draw() {

      this.scene.translate(this.position.x, this.position.y, this.position.z);
      this.scene.rotate(this.orientation, 0, 1, 0);
      this.scene.scale(0.4, 0.4, 0.4);
      this.scene.scale(this.scale, this.scale, this.scale);

      //Polen
      if(this.carryingPollen){
        this.scene.pushMatrix();
        this.scene.translate(1.4, -2.6, -1.8);
        this.scene.pollen.display();
        this.scene.popMatrix();
      }

      // Head
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.scale(1, 1, 1.5);
      this.headMaterial.apply();
      this.head.display();
      this.scene.popMatrix();

      // Eye Left
      this.scene.pushMatrix();
      this.scene.translate(-0.6, 0.2, 0.5);
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.scale(0.5, 0.5, 0.8);
      this.eyeMaterial.apply();
      this.eye.display();
      this.scene.popMatrix();

      // Eye Right
      this.scene.pushMatrix();
      this.scene.translate(0.6, 0.2, 0.5);
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.scene.scale(0.5, 0.5, 0.8);
      this.eyeMaterial.apply();
      this.eye.display();
      this.scene.popMatrix();

      // Torax
      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, -2.3);
      this.scene.scale(1, 1, 1.5);
      this.toraxMaterial.apply();
      this.torax.display();
      this.scene.popMatrix();

      // Abdomen
      this.scene.pushMatrix();
      this.scene.translate(0, -1.3, -4.5);
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.scale(1, 1.5, 1);
      this.abdomenMaterial.apply();
      this.abdomen.display();
      this.scene.popMatrix();

      // Wing Left
      this.scene.pushMatrix();
      this.scene.translate(0, Math.sin(this.elapsedTime * 5) * 0.7, 0); // wing movement 
      this.scene.rotate(Math.sin(this.elapsedTime * 5) * 0.7, 0, 0, 1); // wing movement
      this.wingMaterial.apply();
      this.wing.displayLeftWings();
      this.scene.popMatrix();

      // Wing Right
      this.scene.pushMatrix();
      this.scene.translate(0, Math.sin(this.elapsedTime * 5) * 0.7, 0); // wing movement
      this.scene.rotate(-Math.sin(this.elapsedTime * 5) * 0.7, 0, 0, 1) // wing movement
      this.wingMaterial.apply();
      this.wing.displayRightWings();
      this.scene.popMatrix();

      // Stringer
      this.scene.pushMatrix();
      this.scene.translate(0, -2.2, -5.55);
      this.scene.scale(0.2, 0.4, 0.2);
      this.scene.rotate(-(3*Math.PI / 4), 1, 0, 0);
      this.stingerMaterial.apply();
      this.stringer.display();
      this.scene.popMatrix();

      // Mouth Left
      this.scene.pushMatrix();
      this.scene.translate(-0.1, -0.7, 1.0);
      this.scene.rotate(- (5 * Math.PI / 4), 1, 0, 0);
      this.scene.scale(0.1, 0.6, 0.1);
      this.mouthMaterial.apply();
      this.mouth.display();
      this.scene.popMatrix();

      // Mouth Right
      this.scene.pushMatrix();
      this.scene.translate(0.1, -0.7, 1.0);
      this.scene.rotate(- (5 * Math.PI / 4), 1, 0, 0);
      this.scene.scale(0.1, 0.6, 0.1);
      this.mouthMaterial.apply();
      this.mouth.display();
      this.scene.popMatrix();

      // Leg Left Front
      this.scene.pushMatrix();
      this.scene.translate(1, -0.9, -1.8);
      this.scene.scale(1.5, 1.5, 1.5);
      this.legMaterial.apply();
      this.leg.displayLeg();
      this.scene.popMatrix();

      // Leg Left Middle
      this.scene.pushMatrix();
      this.scene.translate(1, -0.9, -2.4);
      this.scene.scale(1.5, 1.5, 1.5);
      this.legMaterial.apply();
      this.leg.displayLeg();
      this.scene.popMatrix();

      // Leg Left Back
      this.scene.pushMatrix();
      this.scene.translate(1, -0.9, -3);
      this.scene.scale(1.5, 1.5, 1.5);
      this.legMaterial.apply();
      this.leg.displayLeg();
      this.scene.popMatrix();

      // Leg Right Front
      this.scene.pushMatrix();
      this.scene.translate(-1, -0.9, -1.8);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.scene.scale(1.5, 1.5, 1.5);
      this.legMaterial.apply();
      this.leg.displayLeg();
      this.scene.popMatrix();

      // Leg Right Middle
      this.scene.pushMatrix();
      this.scene.translate(-1, -0.9, -2.4);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.scene.scale(1.5, 1.5, 1.5);
      this.legMaterial.apply();
      this.leg.displayLeg();
      this.scene.popMatrix();

      // Leg Right Back
      this.scene.pushMatrix();
      this.scene.translate(-1, -0.9, -3);
      this.scene.rotate(Math.PI, 0, 1, 0);
      this.scene.scale(1.5, 1.5, 1.5);
      this.legMaterial.apply();
      this.leg.displayLeg();
      this.scene.popMatrix();

      // Antennae Left
      this.scene.pushMatrix();
      this.scene.translate(-0.2, 1, 0.7);
      this.antennaeMaterial.apply();
      this.antennae.displayAntannae();
      this.scene.popMatrix();

      // Antennae Left
      this.scene.pushMatrix();
      this.scene.translate(0.2, 1, 0.7);
      this.antennaeMaterial.apply();
      this.antennae.displayAntannae();
      this.scene.popMatrix();

    }

    checkKeys(factor) {

      var text = "Keys pressed: ";
      var keysPressed = false;

      // Check for key codes e.g. in https://keycode.info/
      if (this.scene.gui.isKeyPressed("KeyW")) {
        this.accelerate(factor)

        text += " W ";
        keysPressed = true;
      }
      if (this.scene.gui.isKeyPressed("KeyS")) {
        this.accelerate(-factor)

        text += " S ";
        keysPressed = true;
      }
      if (this.scene.gui.isKeyPressed("KeyA")) {
        this.turn(factor)

        text += " A ";
        keysPressed = true;
      }
      if (this.scene.gui.isKeyPressed("KeyD")) {
        this.turn(-factor)

        text += " D ";
        keysPressed = true;
      }
      if (this.scene.gui.isKeyPressed("KeyR")) {
        this.reset()
      }
      if (this.scene.gui.isKeyPressed("KeyF")) {
        this.descendToFlower();

        text += " F ";
        keysPressed = true;
      }
      if (this.scene.gui.isKeyPressed("KeyP")) {
          this.ascendWithPollen();

          text += " P ";
          keysPressed = true;
      }
      if (this.scene.gui.isKeyPressed("KeyO")) {
          this.startMovingToHive();

          text += " O ";
          keysPressed = true;
      }
      if (keysPressed) console.log(text);
    }

    descendToFlower() {
      if (!this.moveToFlowerFlag && !this.carryingPollen) {
          const flowerWithPollen = this.scene.garden.flowerAndPosition.filter(fp => fp.flower.hasPollen);

          if (flowerWithPollen.length > 0) {

            const randomIndex = Math.floor(Math.random() * flowerWithPollen.length);
            
            this.targetFlowerPos = flowerWithPollen[randomIndex].position;
            this.targetFlower = flowerWithPollen[randomIndex].flower;

            this.moveToFlowerFlag = true;
            this.moveToInitialHeightFlag = false;

            if(this.extra){

              this.parabolaStart = { ...this.position };
              this.parabolaEnd = { x: this.targetFlowerPos.x, y: this.targetFlowerPos.y + 2, z: this.targetFlowerPos.z };
              this.parabolaPeak = {
                x: (this.parabolaStart.x + this.parabolaEnd.x) / 2,
                y: Math.max(this.parabolaStart.y, this.parabolaEnd.y) + 5,
                z: (this.parabolaStart.z + this.parabolaEnd.z) / 2
              };
              this.parabolaT = 0; 
            }
          }
      }
    }

    moveToFlower() {
      if (!this.targetFlowerPos) return;

      if (this.extra) {
        const t = this.parabolaT / this.parabolaDuration;
        if (t >= 1) {
            this.position = { ...this.targetFlowerPos, y: this.targetFlowerPos.y + 2 };
            this.moveToFlowerFlag = false;
            this.targetFlowerPos = null;
            this.parabolaT = 0; // Reset parabola parameter
            return;
        }

        // Parabolic interpolation
        const prevX = this.position.x;
        const prevY = this.position.y;
        const prevZ = this.position.z;

        // Parabolic interpolation
        this.position.x = (1 - t) * (1 - t) * this.parabolaStart.x + 2 * (1 - t) * t * this.parabolaPeak.x + t * t * this.parabolaEnd.x;
        this.position.y = (1 - t) * (1 - t) * this.parabolaStart.y + 2 * (1 - t) * t * this.parabolaPeak.y + t * t * this.parabolaEnd.y;
        this.position.z = (1 - t) * (1 - t) * this.parabolaStart.z + 2 * (1 - t) * t * this.parabolaPeak.z + t * t * this.parabolaEnd.z;

        const dx = this.position.x - prevX;
        const dz = this.position.z - prevZ;

        if (dx !== 0 || dz !== 0) { // Prevent division by zero
          this.orientation = Math.atan2(dx, dz);
        }

        // Increment the parameter
        this.parabolaT += 1; 

      } else {

        const hoverOffset = 2;

        const dx = this.targetFlowerPos.x - this.position.x;
        const dy = (this.targetFlowerPos.y + hoverOffset) - this.position.y;
        const dz = this.targetFlowerPos.z - this.position.z;

        const distance = Math.sqrt(dx * dx + dz * dz + dy * dy);

        const fastThreshold = 2.0; // Distance threshold to switch to precise movement
        const stopThreshold = 0.2; // Final stopping threshold

        if (distance > fastThreshold) {
            this.position.x += (dx / distance) * 0.5; 
            this.position.y += (dy / distance) * 0.5;
            this.position.z += (dz / distance) * 0.5;
        } else if (distance > stopThreshold) {
            this.position.x += (dx / distance) * (0.5 / 5); // Reduce speed for precision
            this.position.y += (dy / distance) * (0.5 / 5);
            this.position.z += (dz / distance) * (0.5 / 5);
        } else {
            this.moveToFlowerFlag = false;
            this.targetFlowerPos = null;
        }

        // Calculate orientation based on movement direction
        if (dx !== 0 || dz !== 0) { // Prevent division by zero
          this.orientation = Math.atan2(dx, dz);
        }
      }  
    }

    ascendWithPollen() {
      if (this.targetFlower && this.targetFlower.hasPollen) {
          this.carryingPollen = true;
          this.targetFlower.hasPollen = false;

          this.moveToFlowerFlag = false;
          this.moveToInitialHeightFlag = true;

          if(this.extra){
            this.parabolaStart = { ...this.position };
            this.parabolaEnd = { ...this.defaultPos, y: this.defaultPos.y };
            this.parabolaPeak = {
                x: (this.parabolaStart.x + this.parabolaEnd.x) / 2,
                y: Math.max(this.parabolaStart.y, this.parabolaEnd.y) + 5,
                z: (this.parabolaStart.z + this.parabolaEnd.z) / 2
            };
            this.parabolaT = 0; 
          }
      }
    }

    moveToInitialHeight() {
        
      if (this.extra) {
        const t = this.parabolaT / this.parabolaDuration;
        if (t >= 1) {
            this.position = { ...this.defaultPos, y: this.defaultPos.y };
            this.moveToInitialHeightFlag = false;
            this.parabolaT = 0; // Reset parabola parameter
            return;
        }
    
        // Parabolic interpolation
        const prevX = this.position.x;
        const prevY = this.position.y;
        const prevZ = this.position.z;

        // Parabolic interpolation
        this.position.x = (1 - t) * (1 - t) * this.parabolaStart.x + 2 * (1 - t) * t * this.parabolaPeak.x + t * t * this.parabolaEnd.x;
        this.position.y = (1 - t) * (1 - t) * this.parabolaStart.y + 2 * (1 - t) * t * this.parabolaPeak.y + t * t * this.parabolaEnd.y;
        this.position.z = (1 - t) * (1 - t) * this.parabolaStart.z + 2 * (1 - t) * t * this.parabolaPeak.z + t * t * this.parabolaEnd.z;
    
        const dx = this.position.x - prevX;
        const dz = this.position.z - prevZ;

        if (dx !== 0 || dz !== 0) { // Prevent division by zero
            this.orientation = Math.atan2(dx, dz);
        }

        // Increment the parameter
        this.parabolaT += 1; 

      } else {
        const dx = this.defaultPos.x - this.position.x;
        const dy = this.defaultPos.y - this.position.y;
        const dz = this.defaultPos.z - this.position.z;

        const distance = Math.sqrt(dx * dx + dz * dz + dy * dy);

        const fastThreshold = 2.0; // Distance threshold to switch to precise movement
        const stopThreshold = 0.2; // Final stopping threshold

        if (distance > fastThreshold) {
            this.position.x += (dx / distance) * 0.5; 
            this.position.y += (dy / distance) * 0.5;
            this.position.z += (dz / distance) * 0.5;
        } else if (distance > stopThreshold) {
            this.position.x += (dx / distance) * (0.5 / 5); // Reduce speed for precision
            this.position.y += (dy / distance) * (0.5 / 5);
            this.position.z += (dz / distance) * (0.5 / 5);
        } else {
              this.moveToInitialHeightFlag = false;
          }

          // Calculate orientation based on movement direction
        if (dx !== 0 || dz !== 0) { // Prevent division by zero
          this.orientation = Math.atan2(dx, dz);
        }
      }
    }

    startMovingToHive() {
      if (this.carryingPollen) {
        this.moveToHiveFlag = true;

        if(this.extra){
          this.parabolaStart = { ...this.position };
          const hivePosition = this.scene.hive.position;

          this.parabolaEnd = { x: hivePosition.x, y: hivePosition.y + 3, z: hivePosition.z };
          this.parabolaPeak = {
              x: (this.parabolaStart.x + this.parabolaEnd.x) / 2,
              y: Math.max(this.parabolaStart.y, this.parabolaEnd.y) + 5,
              z: (this.parabolaStart.z + this.parabolaEnd.z) / 2
          };

          this.parabolaT = 0; 
        }
      }
    }

    moveToHive() {

      if (this.extra) {
        const t = this.parabolaT / this.parabolaDuration;
        if (t >= 1) {
            this.position = { ...this.parabolaEnd, y: this.parabolaEnd.y };
            this.dropPollen();
            this.moveToHiveFlag = false;
            this.parabolaT = 0; // Reset parabola parameter
            return;
        }

        // Parabolic interpolation
        const prevX = this.position.x;
        const prevY = this.position.y;
        const prevZ = this.position.z;
    
        this.position.x = (1 - t) * (1 - t) * this.parabolaStart.x + 2 * (1 - t) * t * this.parabolaPeak.x + t * t * this.parabolaEnd.x;
        this.position.y = (1 - t) * (1 - t) * this.parabolaStart.y + 2 * (1 - t) * t * this.parabolaPeak.y + t * t * this.parabolaEnd.y;
        this.position.z = (1 - t) * (1 - t) * this.parabolaStart.z + 2 * (1 - t) * t * this.parabolaPeak.z + t * t * this.parabolaEnd.z;

        const dx = this.position.x - prevX;
        const dz = this.position.z - prevZ;

        if (dx !== 0 || dz !== 0) { // Prevent division by zero
            this.orientation = Math.atan2(dx, dz);
        }

        // Increment the parameter
        this.parabolaT += 1;

      } else {
        const hivePosition = this.scene.hive.position;

        const hiveOffset = 3;
        
        const dx = hivePosition.x - this.position.x;
        const dy = (hivePosition.y + hiveOffset) - this.position.y;
        const dz = hivePosition.z - this.position.z;

        const distance = Math.sqrt(dx * dx + dz * dz + dy * dy);

        const fastThreshold = 2.0; // Distance threshold to switch to precise movement
        const stopThreshold = 0.2; // Final stopping threshold

        if (distance > fastThreshold) {
            this.position.x += (dx / distance) * 0.5; 
            this.position.y += (dy / distance) * 0.5;
            this.position.z += (dz / distance) * 0.5;
        } else if (distance > stopThreshold) {
            this.position.x += (dx / distance) * (0.5 / 5); // Reduce speed for precision
            this.position.y += (dy / distance) * (0.5 / 5);
            this.position.z += (dz / distance) * (0.5 / 5);
        } else {
            this.dropPollen();
            this.moveToHiveFlag = false;
        }

        // Calculate orientation based on movement direction
        if (dx !== 0 || dz !== 0) { // Prevent division by zero
          this.orientation = Math.atan2(dx, dz);
        }
      }
    }

    dropPollen() {
      if (this.carryingPollen) {
          this.scene.hive.addPollen(this.scene.pollen); // Add pollen to hive
          this.carryingPollen = false;
      }
    }
}