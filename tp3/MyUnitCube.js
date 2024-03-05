import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [ //8 vertices x 3 = 24
			0, 0, 1,	//0-0
            0, 0, 1,	//0-1
			0, 0, 1,	//0-2

			1, 0, 1,	//1-3
            1, 0, 1,	//1-4
			1, 0, 1,	//1-5

			0, 1, 1,	//2-6
            0, 1, 1,	//2-7
			0, 1, 1,	//2-8

			1, 1, 1,    //3-9
            1, 1, 1,    //3-10
            1, 1, 1,    //3-11
            
            0, 0, 0,	//4-12
            0, 0, 0,	//4-13
            0, 0, 0,	//4-14

			1, 0, 0,	//5-15
            1, 0, 0,	//5-16
			1, 0, 0,	//5-17

			0, 1, 0,	//6-18
            0, 1, 0,	//6-19
			0, 1, 0,	//6-20

			1, 1, 0,    //7-21
            1, 1, 0,    //7-22
			1, 1, 0,    //7-23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 6,
			9, 6, 3,
            3, 15, 9,
            21, 9, 15,
            15, 12, 21,
            18, 21, 12,
            6, 12, 0,
            12, 6, 18,
            6, 9, 18,
            21, 18, 9,
            15, 3, 12,
            12, 3, 0
		];

        this.normals = [
            0, 0, 1,  //0
            -1, 0, 0, //0
            0, -1, 0, //0

            0, -1, 0, //1
            1, 0, 0,  //1
            0, 0, 1,  //1

            -1, 0, 0, //2
            0, 1, 0,  //2
            0, 0, 1,  //2

            1, 0, 0,  //3
            0, 1, 0,  //3
            0, 0, 1,  //3

            -1, 0, 0, //4
            0, -1, 0, //4
            0, 0, -1, //4

            0, 0, -1, //5
            1, 0, 0,  //5
            0, -1, 0, //5

            0, 0, -1, //6
            -1, 0, 0, //6
            0, 1, 0,  //6

            1, 0, 0,  //7
            0, 1, 0,  //7
            0, 0, -1  //7
        ]


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
