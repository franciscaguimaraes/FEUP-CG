import { CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

/**
 * @class MyGrassField
 * @brief Represents a field of grass in a 3D scene.
 */
export class MyGrassField extends CGFobject {
    /**
     * @brief Constructor for the MyGrassField class.
     * @param scene Reference to the scene object
     * @param numBlades Number of grass blades
     * @param width Width of the grass field
     * @param height Height of the grass field
     * @param texture Texture to be applied to the grass blades
     */
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
        this.shader.setUniformsValues({waveIntensity: 0.3, waveFrequency: 1.7, timeFactor: 0});

        for (let i = 0; i < numBlades; i++) {
            let blade = new MyGrass(scene);
            let x = Math.random() * width - width / 2;
            let z = Math.random() * height - height / 2;
            let rotation = Math.random() * Math.PI * 2;

            this.blades.push({ blade, x, z, rotation });
        }
    }

    /**
     * @brief Renders the grass field by displaying each grass blade with the applied texture and shader.
     */
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