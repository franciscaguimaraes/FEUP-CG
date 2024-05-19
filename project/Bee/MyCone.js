import {CGFobject} from '../../lib/CGF.js';
/**
 * Class MyCone
 * @extends CGFobject
 * @brief Represents a cone geometry for 3D rendering.
*/
export class MyCone extends CGFobject {

    /**
     * @brief Constructs an instance of the MyCone class.
     * Initializes the geometry and stores references to scene and parameters.
     * 
     * @param scene - The CGFscene to which this object belongs.
     * @param slices - Number of slices (divisions around the Y axis).
     * @param stacks - Number of stacks (divisions along the Y axis, not used in current implementation).
     */
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    /**
     * @brief Initializes the buffers for vertex positions, indices, and normals.
     * 
     * This method creates the vertex positions, indices for drawing the triangles,
     * and normals for lighting calculations. It handles the geometry of a cone by
     * defining vertices around a circle and a single apex point at the top.
    */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}