class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() 
	{

		this.vertices = [
			-0.5, 0.5, 0.5,	//0 front 0
			 0.5, 0.5, 0.5,	//1 front 1
		   -0.5, -0.5, 0.5,	//2 front 2
			0.5, -0.5, 0.5,	//3 front 3
		   -0.5, -0.5,-0.5,	//4 back 4
			0.5, -0.5,-0.5,	//5 back 5
			-0.5, 0.5,-0.5,	//6 back 6
			0.5, 0.5, -0.5,	//7 back 7
			-0.5, 0.5, 0.5,	//0 top 8
			0.5, 0.5, 0.5,	//1 top 9
			-0.5, 0.5,-0.5,	//6 top 10 
			0.5, 0.5, -0.5,	//7 top 11
			-0.5, 0.5, 0.5,	//0 left 12
			-0.5, -0.5, 0.5,//2 left 13
			-0.5, -0.5,-0.5,//4 left 14
			-0.5, 0.5,-0.5,	//6 left 15
			0.5, 0.5, 0.5,	//1 right 16
			0.5, -0.5, 0.5,	//3 right 17
			0.5, -0.5,-0.5,	//5 right 18
			0.5, 0.5, -0.5,	//7 right 19
			-0.5, -0.5, 0.5,//2 bottom 20
			0.5, -0.5, 0.5,	//3 bottom 21
			-0.5, -0.5,-0.5,//4 bottom 22
			0.5, -0.5,-0.5,	//5 bottom 23
			
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			1,2,0, //front
			2,1,3, //front
			6,4,7, //back
			4,5,7, //back
			8,10,9, //up
			9,10,11,  //up
			12,13,14, //left
			14,15,12, //left
			19,18,17, //right
			17,16,19, //right
			22,20,23, //down
			21,23,20, //down
		];

		//Reverse back and front 

		this.texCoords = [
			0.99,0.35,    //0 back 
			0.75,0.35, //1 back
			0.99,0.66,    //2 back
			0.75,0.66, //3 back
			0.25,0.66, //4 front
			0.5,0.66,  //5 front
			0.26,0.35, //6 front
			0.5,0.35,  //7 front
			0.25,0.1,		//0 top
			0.49,0.1,		//1 top
			0.26,0.35,	//6 top
			0.5,0.35,	//7 top
			0.01,0.35,		//0 left
			0.01,0.66,		//2 left
			0.25,0.66,	//4 left
			0.25,0.35,	//6 left
			0.75,0.35,	//1 right
			0.75,0.66,	//3 right
			0.5,0.66,	//5 right
			0.5,0.35,	//7 right
			0.25,0.99,		//2 bottom
			0.5,0.99,		//3 bottom
			0.25,0.66,	//4 bottom
			0.5,0.66,	//5 bottom

		];

		



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

