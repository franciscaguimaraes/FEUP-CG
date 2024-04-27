import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
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

    // Initialize textures
    this.enableTextures(true);
    this.loadTextures();

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.panorama = new MyPanorama(this, this.textures.panorama);
    this.garden = new MyGarden(this, 5, 5, this.textures.receptacles, this.textures.petals, this.textures.stems); 

    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayPanorama = true;
    this.displayGarden = true;
  }

  loadTextures() {
    const texturePaths = {
      panorama: "images/panorama4.jpg",
      receptacles: ["images/receptacle_1.jpg", "images/receptacle_2.jpg", "images/receptacle_3.jpg", "images/receptacle_4.jpg"],
      petals: ["images/petal_1.jpg", "images/petal_2.jpg", "images/petal_3.jpg", "images/petal_4.jpg"],
      stems: ["images/stem_1.jpg", "images/stem_2.jpg", "images/stem_3.jpg", "images/stem_4.jpg"]
    };

    this.textures = {
      panorama: new CGFtexture(this, texturePaths.panorama),
      receptacles: texturePaths.receptacles.map(path => new CGFtexture(this, path)),
      petals: texturePaths.petals.map(path => new CGFtexture(this, path)),
      stems: texturePaths.stems.map(path => new CGFtexture(this, path))
    };

    this.appearance = new CGFappearance(this);
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
      1.5, 0.1, 1000,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.applyViewMatrix();

    if (this.displayAxis) this.axis.display();

    if (this.displayPanorama) this.panorama.display();
    if (this.displayGarden) this.garden.display();
  }
}
