import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./Flowers/MyGarden.js";
import { MyRockSet } from "./Rocks/MyRockSet.js";
import { MyBee } from "./Bee/MyBee.js";
import { MyPollen } from "./Hive/MyPollen.js";
import { MyHive } from "./Hive/MyHive.js";
import { MyGrassField } from "./MyGrassField.js";

export class MyScene extends CGFscene {
  constructor() {
    super();
    this.time = 0;
  }
  
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    // Background color and depth settings
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Transparency
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);    

    // Initialize textures
    this.enableTextures(true);
    this.loadTextures();

    // Scene elements
    this.displayAxis = true;
    this.displayPlane = true;
    this.scaleFactor = 1;
    this.speedFactor = 0.2;
    this.displayPanorama = true;
    this.displayGarden = false;
    this.gardenNumRows = 4;
    this.gardenNumColumns = 4;
    this.displayRockSet = false;
    this.displayBee = false;
    this.displayPollen = false;
    this.displayHive = false;
    this.displayGrassField = true;

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.panorama = new MyPanorama(this, this.textures.panorama);
    this.garden = new MyGarden(this, this.gardenNumRows, this.gardenNumColumns, this.textures.receptacles, this.textures.petals, this.textures.stems); 
    this.hive = new MyHive(this, this.textures.boxPlane);
    this.rockSet = new MyRockSet(this, 20, this.textures.rock, 16, 3, [1,1.1], [0.8,1.7]);
    this.bee = new MyBee(this, 0, 10, 0);
    this.pollen = new MyPollen(this, 1, 15, 15, this.textures.pollen); 
    this.grassField = new MyGrassField(this, 5000, 50, 50, this.textures.grass);

    this.lastUpdateTime = null;
  }

  loadTextures() {
    const texturePaths = {
      panorama: "images/panorama_flowers.jpg",
      receptacles: ["images/receptacle_texture.jpg", "images/receptacle_texture2.jpg", "images/receptacle_texture3.jpg", "images/receptacle_texture4.jpg"],
      petals: ["images/petal_texture.png", "images/petal_texture2.jpg", "images/petal_texture3.jpeg", "images/petal_texture4.jpg"],
      stems: ["images/stem_texture.jpg", "images/stem_texture2.jpg", "images/stem_texture3.jpg", "images/stem_texture4.jpg"],
      rock: "images/rock.jpg",
      pollen: "images/pollen.jpg",
      boxPlane: "images/wood.jpg",
      grass: "images/grass.jpg"
    };

    this.textures = {
      panorama: new CGFtexture(this, texturePaths.panorama),
      receptacles: texturePaths.receptacles.map(path => new CGFtexture(this, path)),
      petals: texturePaths.petals.map(path => new CGFtexture(this, path)),
      stems: texturePaths.stems.map(path => new CGFtexture(this, path)),
      rock: new CGFtexture(this, texturePaths.rock),
      pollen: new CGFtexture(this, texturePaths.pollen),
      boxPlane: new CGFtexture(this, texturePaths.boxPlane),
      grass: new CGFtexture(this, texturePaths.grass)
    };

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
   }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.9, 0.5, 1000,
      vec3.fromValues(20, 30, 30),
      vec3.fromValues(0, 0, 0)
    );
  }

  updateGardenDimensions(){
    this.garden.setDisplayDimensions(this.gardenNumRows, this.gardenNumColumns);
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    const now = Date.now();
    const deltaTime = (this.lastUpdateTime ? (now - this.lastUpdateTime) : 0) / 1000;
    this.lastUpdateTime = now;

    this.updateTimeFactor(deltaTime);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.applyViewMatrix();

    if(this.displayAxis) this.axis.display();

    if(this.displayPlane){
      this.pushMatrix();
      this.appearance.apply();
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }
    
    if (this.displayPanorama) this.panorama.display();

    if (this.displayGarden){
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }

    if(this.displayRockSet){
      this.pushMatrix();
      this.rockSet.display();
      this.popMatrix();
    }

    if(this.displayBee){
      this.pushMatrix();
      this.bee.update(100, this.scaleFactor, this.speedFactor);
      this.bee.display();
      this.popMatrix();
    }

    if(this.displayGrassField){
      this.pushMatrix();
      this.grassField.display();
      this.popMatrix();
    }
  }

  updateTimeFactor(deltaTime) {
    this.time += deltaTime;
    this.grassField.shader.setUniformsValues({ timeFactor: this.time });
  }
}