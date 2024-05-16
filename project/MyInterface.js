import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');
        this.gui.add(this.scene, 'displayBee').name('Display Bee');
        this.gui.add(this.scene, 'displayPollen').name('Display Pollen');
        this.gui.add(this.scene, 'displayHive').name('Display Hive');
        this.gui.add(this.scene, 'displayGrassField').name('Display Grass Field');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        //Folder for garden settings
        const gardenFolder = this.gui.addFolder('Garden Settings');
        gardenFolder.add(this.scene, 'displayGarden').name('Display Garden');
        gardenFolder.add(this.scene, 'gardenNumRows', 1, 8).step(1).name('Rows').onChange(this.scene.updateGardenDimensions.bind(this.scene));
        gardenFolder.add(this.scene, 'gardenNumColumns', 1, 8).step(1).name('Columns').onChange(this.scene.updateGardenDimensions.bind(this.scene));

        this.initKeys();
        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keycode) {
        return this.activeKeys[keycode] || false;
    }
}