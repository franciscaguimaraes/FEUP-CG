import { CGFobject } from "../../lib/CGF.js";

export class MyReceptacle extends CGFobject {
    /**
     * @brief Constructor for the MyReceptacle class.
     * @param scene Reference to the scene object
     * @param radius Radius of the receptacle
     * @param slices Number of slices (segments) around the circle
     */
    constructor(scene, radius, slices) {
        super(scene);
        this.radius = radius;
        this.slices = slices;
        this.initBuffers();
    }

    /**
     * @brief Initializes the buffers for the receptacle's vertices, indices, normals, and texture coordinates.
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.addCircleVertices(1); 
        this.addCircleVertices(-1); 

        // Add vertices for the top and bottom circles of the receptacle
        for (let slice = 1; slice <= this.slices; slice++) {
            this.indices.push(0, slice, slice + 1);
            let base = this.slices + 2;
            this.indices.push(base, base + slice + 1, base + slice);
        }
        
        // Close the circle by connecting the last and first vertices
        this.indices.push(0, this.slices, 1);
        let base = this.slices + 2;
        this.indices.push(base, base + 1, base + this.slices);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @brief Adds the vertices for a circle (top or bottom) of the receptacle.
     * @param normalDirection Direction of the normals (1 for top, -1 for bottom)
     * @param startIndex Index to start adding vertices from (used for indices)
     */
    addCircleVertices(normalDirection, startIndex) {
        let centerIndex = startIndex;
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, normalDirection);
        this.texCoords.push(0.5, 0.5);

        // Calculate the vertices for the circle
        for (let slice = 0; slice <= this.slices; slice++) {
            const theta = (slice * 2 * Math.PI) / this.slices;
            const x = this.radius * Math.cos(theta);
            const y = this.radius * Math.sin(theta);
            this.vertices.push(x, y, 0);
            this.normals.push(0, 0, normalDirection);
            this.texCoords.push((x / this.radius) * 0.5 + 0.5, (y / this.radius) * 0.5 + 0.5);
        }

        // Create indices to connect the center vertex to the perimeter vertices
        for (let slice = 1; slice <= this.slices; slice++) {
            this.indices.push(centerIndex, startIndex + slice, startIndex + slice + 1);
        }
        this.indices.push(centerIndex, startIndex + this.slices, startIndex + 1);
    }
}
