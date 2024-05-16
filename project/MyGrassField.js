import { CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

export class MyGrassField extends CGFobject {
    constructor(scene, numBlades, width, height, texture) {
        super(scene);
        this.scene = scene;
        this.numBlades = numBlades;
        this.width = width;
        this.height = height;
        this.blades = [];

        this.texture = new CGFappearance(scene);
        this.texture.setEmission(0.5, 0.5, 0.5, 1);
        this.texture.setTexture(texture);

        this.shader = new CGFshader(scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        this.shader.setUniformsValues({waveIntensity: 1, waveFrequency: 2.0, timeFactor: 0});

        for (let i = 0; i < numBlades; i++) {
            let blade = new MyGrass(scene);
            let x = Math.random() * width - width / 2;
            let z = Math.random() * height - height / 2;
            let rotation = Math.random() * Math.PI * 2;

            this.blades.push({ blade, x, z, rotation });
        }
    }

    display() {
        this.texture.apply();

        this.scene.setActiveShader(this.shader);

        for (let { blade, x, z, rotation } of this.blades) {
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.scene.rotate(rotation, 0, 1, 0);
            blade.display();
            this.scene.popMatrix();
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}