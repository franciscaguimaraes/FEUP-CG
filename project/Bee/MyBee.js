import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MySphere } from "../MySphere.js";
import { MyAntannae } from "./MyAntannae.js";
import { MyLeg } from "./MyLeg.js";
import { MyWings } from "./MyWings.js";

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
    this.oscilation = 0;
    this.position = { x: x, y: y, z: z }; // Position
    this.defaultPos = { x: x, y: y, z: z };
    this.orientation = 0; // Orientation
    this.scale = 1;
    this.speed = 0;

    // pollen
    this.carryingPollen = false;

    // Movement for Pollen/Hive
    this.moveToHiveFlag = false;
    this.moveToFlowerFlag = false;
    this.moveToInitialHeightFlag = false;

    this.positionBeforeF = { x: 0, y: 0, z: 0 };

    this.normal = true;
    this.enhanced = false;
    this.extra = false;

    // Flower
    this.targetFlowerPos = null;
    this.targetFlower = null;

    // Parabolic trajectory parameters
    this.parabolaStart = null;
    this.parabolaEnd = null;
    this.parabolaPeak = null;
    this.parabolaT = 0; // Parameter to control the position along the parabola
    this.parabolaDuration = 50; // Duration of the parabolic movement


    // common move
    this.moveToFloorFlag = false;
    this.moveToInitialHeightAltFlag = false;
    this.floorHeight = 0;
    this.ySpeed = 0;
    this.yAcceleration = -0.01; // downwards acceleration

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
    this.scene.translate(0, this.oscilation, 0);
    this.draw();
    this.scene.popMatrix();
  }

  update(delta_t, scaleFactor, speedFactor) {
    this.elapsedTime += delta_t;
    this.oscilation = Math.sin(this.elapsedTime / 200) * 0.5; // oscilation

    this.scale = scaleFactor;
    this.checkKeys(speedFactor / 5);

    this.elapsedTime += delta_t / 1000;

    if(this.moveToFloorFlag || this.moveToInitialHeightAltFlag){
      this.moveToFlowerNormal();
    }


    // Update position
    if (!this.moveToHiveFlag && !this.moveToFlowerFlag && !this.moveToInitialHeightFlag) {
        this.position.x += this.speed * Math.sin(this.orientation);
        this.position.z += this.speed * Math.cos(this.orientation);
    } else if (this.moveToHiveFlag) {
        this.moveToHive();
    } else if (this.moveToFlowerFlag) {
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
    this.carryingPollen = false;
    this.moveToFloorFlag = false;
    this.moveToInitialHeightAltFlag = false;
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
    this.scene.translate(0, Math.sin(this.elapsedTime / 50) * 0.5, 0); // wing movement 
    this.scene.rotate(Math.sin(this.elapsedTime / 50 ) * 0.5, 0, 0, 1); // wing movement
    this.wingMaterial.apply();
    this.wing.displayLeftWings();
    this.scene.popMatrix();

    // Wing Right
    this.scene.pushMatrix();
    this.scene.translate(0, Math.sin(this.elapsedTime / 50) * 0.5, 0); // wing movement
    this.scene.rotate(-Math.sin(this.elapsedTime / 50) * 0.5, 0, 0, 1) // wing movement
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
      this.positionBeforeF = { x: this.position.x, y: this.defaultPos.y, z: this.position.z};

      if (this.normal){
        this.descendToFlowerNormal();
      } else if(this.enhanced){
        this.descendToFlowerEnhanced();
      }

      text += " F ";
      keysPressed = true;
    }
    if (this.scene.gui.isKeyPressed("KeyP")) {
      
      if(this.normal){
        this.ascendWithPollenNormal();
      } else if(this.enhanced){
        this.ascendWithPollenEnhanced();
      }

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

  descendToFlowerNormal() {
    if (!this.moveToFloorFlag && !this.carryingPollen) {
      this.moveToFloorFlag = true;
      this.floorHeight = 0;
      this.ySpeed = 0; // Reset Y speed
    }
  }

  moveToFlowerNormal() {
    const flowersWithPollen = this.scene.garden.flowerAndPosition.filter(fp => fp.flower.hasPollen);
    let minDistance = Infinity;
    let closestFlower = null;

    // Check the distance to each flower
    for (let i = 0; i < flowersWithPollen.length; i++) {
        const flower = flowersWithPollen[i];
        const distance = Math.sqrt(
            (this.position.x - flower.position.x) ** 2 +
            (this.position.z - flower.position.z) ** 2
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestFlower = flower;
        }
    }

    this.targetFlower = closestFlower;
    const stopAboveFlower = this.targetFlower && minDistance < 1.0; // Define a threshold for being 'close'

    const onFlowerDetected = () => {
        this.position.x = this.targetFlower.position.x;
        this.position.z = this.targetFlower.position.z;
        this.position.y = this.targetFlower.position.y + 2;

        this.moveToFloorFlag = false;
        this.moveToInitialHeightAltFlag = false;
        this.ySpeed = 0; // Stop Y speed
        this.speed = 0; // Stop XZ speed
        this.parabolaStart = null; // Reset parabolic path
        this.stopParabola = true; // Stop the parabolic movement
    };

    if (this.moveToFloorFlag) {
        if (this.extra) {
            // Ensure no conflicting movements
            if (!this.parabolaStart) {
                this.originalSpeed = this.speed;
                this.speed = 0; // Stop XZ movement when starting parabolic path

                // Calculate the target XZ position based on the original speed and orientation
                const targetXZPosition = {
                    x: this.position.x + this.originalSpeed * Math.sin(this.orientation) * this.parabolaDuration,
                    z: this.position.z + this.originalSpeed * Math.cos(this.orientation) * this.parabolaDuration
                };

                // Prepare parabolic path to the target XZ position at floor height
                const targetPosition = this.originalSpeed > 0 ? targetXZPosition : { x: this.position.x, y: this.floorHeight, z: this.position.z };

                this.prepareParabolicPath({ x: targetPosition.x, y: this.floorHeight, z: targetPosition.z }, 0);
                this.stopParabola = false; // Initialize the flag
            }

            this.followParabolicPath(() => {
                if (!this.stopParabola && stopAboveFlower && this.position.y <= this.targetFlower.position.y + 2) {
                    onFlowerDetected();
                } else if (!this.stopParabola && !stopAboveFlower && this.position.y <= this.floorHeight + 1) {
                    this.position.y = this.floorHeight + 1;
                    this.moveToFloorFlag = false;
                    this.moveToInitialHeightAltFlag = true;
                    this.ySpeed = -this.ySpeed; // Reverse speed for upward movement
                    this.speed = this.originalSpeed; // Resume XZ speed
                    this.parabolaStart = null; // Reset parabolic path
                }
            }, onFlowerDetected);
        } else {
            this.ySpeed += this.yAcceleration; // Acceleration in the downward direction

            if (this.originalSpeed > 0) { // keep same XZ speed
                this.position.x += this.originalSpeed * Math.sin(this.orientation);
                this.position.z += this.originalSpeed * Math.cos(this.orientation);
            }

            this.position.y += this.ySpeed;

            if (stopAboveFlower && this.position.y <= this.targetFlower.position.y + 2) {
                onFlowerDetected();
            } else if (!stopAboveFlower && this.position.y <= this.floorHeight + 2) {
                this.position.y = this.floorHeight + 2;
                this.moveToFloorFlag = false;
                this.moveToInitialHeightAltFlag = true;
                this.ySpeed = -this.ySpeed; // Reverse speed for upward movement
            }
        }
    } else if (this.moveToInitialHeightAltFlag) {
        if (this.extra) {
            // Ensure no conflicting movements
            if (!this.parabolaStart) {
                this.originalSpeed = this.speed;
                this.speed = 0; // Stop XZ movement when starting parabolic path

                // Calculate the target XZ position based on the original speed and orientation
                const targetXZPosition = {
                    x: this.position.x + this.originalSpeed * Math.sin(this.orientation) * this.parabolaDuration,
                    z: this.position.z + this.originalSpeed * Math.cos(this.orientation) * this.parabolaDuration
                };

                // Prepare parabolic path to the target XZ position at initial height
                const targetPosition = this.originalSpeed > 0 ? targetXZPosition : { x: this.position.x, y: this.positionBeforeF.y, z: this.position.z };

                this.prepareParabolicPath({ x: targetPosition.x, y: this.positionBeforeF.y, z: targetPosition.z }, 0);
                this.stopParabola = false; // Initialize the flag
            }

            this.followParabolicPath(() => {
                if (!this.stopParabola && stopAboveFlower) {
                    onFlowerDetected();
                } else {
                    this.position.y = this.positionBeforeF.y;

                    this.moveToInitialHeightAltFlag = false;
                    this.ySpeed = 0; // Stop Y speed
                    this.speed = this.originalSpeed; // Resume XZ speed
                    this.parabolaStart = null; // Reset parabolic path
                }
            }, onFlowerDetected);
        } else {
            this.ySpeed += -this.yAcceleration; // Acceleration in the opposite direction

            if (this.originalSpeed > 0) {
                this.position.x += this.originalSpeed * Math.sin(this.orientation);
                this.position.z += this.originalSpeed * Math.cos(this.orientation);
            }
            this.position.y += this.ySpeed;

            if (this.position.y >= this.positionBeforeF.y) {
                this.position.y = this.positionBeforeF.y;
                this.moveToInitialHeightAltFlag = false;
                this.ySpeed = 0; // Stop upward movement
            }
        }
    }
}
  ascendWithPollenNormal() {
    if (this.targetFlower && this.targetFlower.flower.hasPollen && !this.carryingPollen) { 
      console.log(this.targetFlower.position);
      this.carryingPollen = true;
      this.targetFlower.flower.hasPollen = false;

      this.moveToFloorFlag = false;
      this.moveToInitialHeightAltFlag = true;
      this.ySpeed = 0; // Reset ySpeed for upward movement

      if (this.extra) {
        this.prepareParabolicPath({ x: this.position.x, y: this.positionBeforeF.y, z: this.position.z }, 0);
    }
    }
  }

  descendToFlowerEnhanced() {
    if (!this.moveToFlowerFlag && !this.carryingPollen) {
      const flowersWithPollen = this.scene.garden.flowerAndPosition.filter(fp => fp.flower.hasPollen);

      if (flowersWithPollen.length > 0) {
        let minDistance = 1000;
        let randomIndex = 0;

        // find closest flower distance 
        for (let i = 0; i < flowersWithPollen.length; i++) {
          const flower = flowersWithPollen[i];
          const distance = Math.sqrt((this.position.x - flower.position.x) ** 2 + (this.position.z - flower.position.z) ** 2);
          if (distance < minDistance) {
              minDistance = distance;
              randomIndex = i;
          }
        }

        this.targetFlowerPos = flowersWithPollen[randomIndex].position;
        this.targetFlower = flowersWithPollen[randomIndex].flower;

        this.moveToFlowerFlag = true;
        this.moveToInitialHeightFlag = false;

        if (this.extra) {
          this.prepareParabolicPath(this.targetFlowerPos, 2);
        }
      }
    }
  }

  moveToFlower() {
      if (!this.targetFlowerPos) return; // No target flower

      if (this.extra) {
          this.followParabolicPath(() => {
              this.position = { ...this.targetFlowerPos, y: this.targetFlowerPos.y + 2 };
              this.moveToFlowerFlag = false;
              this.targetFlowerPos = null;
              this.parabolaT = 0; 
              this.speed = 0; // Stop the bee
          });
          
      } else {
          this.followLinearPath(this.targetFlowerPos, 2);
      }
  }

  ascendWithPollenEnhanced() {
    if (this.targetFlower && this.targetFlower.hasPollen) {
      this.carryingPollen = true;
      this.targetFlower.hasPollen = false;

      this.moveToFlowerFlag = false;
      this.moveToInitialHeightFlag = true;

      if (this.extra) {
        this.prepareParabolicPath(this.positionBeforeF, 0);
      }
    }
  }

  moveToInitialHeight() {
      if (this.extra) {
          this.followParabolicPath(() => {
              this.position = { ...this.positionBeforeF, y: this.positionBeforeF.y };
              this.moveToInitialHeightFlag = false;
              this.parabolaT = 0; 
          });

      } else {
          this.followLinearPath(this.positionBeforeF, 0);
      }
  }

  startMovingToHive() {
    if (this.carryingPollen) {
      this.moveToHiveFlag = true;

      if (this.extra) {
        const hivePosition = this.scene.hive.position;
        this.prepareParabolicPath(hivePosition, 3);
      }
    }
  }

moveToHive() {
    if (this.extra) {
        this.followParabolicPath(() => {
            this.dropPollen();
            this.moveToHiveFlag = false;
            this.parabolaT = 0; // Reset parabola parameter
        });

    } else {
        const hivePosition = this.scene.hive.position;
        this.followLinearPath(hivePosition, 3, () => {
            this.dropPollen();
            this.moveToHiveFlag = false;
        });
    }
}

dropPollen() {
    if (this.carryingPollen) {
        this.scene.hive.addPollen(this.scene.pollen); // Add pollen to hive
        this.carryingPollen = false;
    }
}

prepareParabolicPath(targetPosition, heightOffset) {
    this.parabolaStart = { ...this.position };
    this.parabolaEnd = { ...targetPosition, y: targetPosition.y + heightOffset };
    this.parabolaPeak = {
        x: (this.parabolaStart.x + this.parabolaEnd.x) / 2,
        y: Math.max(this.parabolaStart.y, this.parabolaEnd.y) + 5,
        z: (this.parabolaStart.z + this.parabolaEnd.z) / 2
    };
    this.parabolaT = 0;
}

followParabolicPath(onComplete, onFlowerDetected = () => {}) {
  const t = this.parabolaT / this.parabolaDuration;
  if (t >= 1) {
      onComplete();
      return;
  }

  // Calculate the current position along the parabolic path
  const newPosition = {
      x: (1 - t) * (1 - t) * this.parabolaStart.x + 2 * (1 - t) * t * this.parabolaPeak.x + t * t * this.parabolaEnd.x,
      y: (1 - t) * (1 - t) * this.parabolaStart.y + 2 * (1 - t) * t * this.parabolaPeak.y + t * t * this.parabolaEnd.y,
      z: (1 - t) * (1 - t) * this.parabolaStart.z + 2 * (1 - t) * t * this.parabolaPeak.z + t * t * this.parabolaEnd.z
  };

  const prevX = this.position.x;
    const prevZ = this.position.z;

  // Update position
  this.position.x = newPosition.x;
  this.position.y = newPosition.y;
  this.position.z = newPosition.z;

  if(this.enhanced){
    const dx = this.position.x - prevX;
    const dz = this.position.z - prevZ;

    if (dx !== 0 || dz !== 0) {
        this.orientation = Math.atan2(dx, dz);
    }
  }

  // Check for flower proximity during the parabolic path

  if(this.normal){

  
  if (this.targetFlower) {
      const flowerDistance = Math.sqrt(
          (this.position.x - this.targetFlower.position.x) ** 2 +
          (this.position.z - this.targetFlower.position.z) ** 2
      );
      const stopAboveFlower = flowerDistance < 2.0 && this.position.y <= this.targetFlower.position.y + 2;

      if (stopAboveFlower) {
          onFlowerDetected();
          this.stopParabola = true;
          return;
      }
  }
}

  // Check if the current step completes the parabolic path
  if (t >= 1) {
      onComplete();
  } else {
      this.parabolaT += 1;
  }
}





followLinearPath(targetPosition, heightOffset, onComplete) {
    const hoverOffset = heightOffset;

    const dx = targetPosition.x - this.position.x;
    const dy = (targetPosition.y + hoverOffset) - this.position.y;
    const dz = targetPosition.z - this.position.z;

    const distance = Math.sqrt(dx * dx + dz * dz + dy * dy);

    const fastThreshold = 2.0; // if more than 2 units away, move fast
    const stopThreshold = 0.2; // if less than 0.2 units away, start slowing down

    let speed = 0.5; // default speed

    if (this.speed > 0) {
      speed = this.speed;
    }

    if (distance > fastThreshold) {
        this.position.x += (dx / distance) * speed;
        this.position.y += (dy / distance) * speed;
        this.position.z += (dz / distance) * speed;
    } else if (distance > stopThreshold) {
        this.position.x += (dx / distance) * (speed / 5); // Reduce speed 
        this.position.y += (dy / distance) * (speed / 5);
        this.position.z += (dz / distance) * (speed / 5);
    } else {
        if (onComplete) onComplete();
    }

    if (dx !== 0 || dz !== 0) {
        this.orientation = Math.atan2(dx, dz);
    }
  }
}