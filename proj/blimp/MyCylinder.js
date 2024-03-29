class MyCylinder extends CGFobject {

	constructor(scene,slices) {
    super(scene);
    //this.slices = 6;
    this.slices = slices;
    
    this.initBuffers();
  	}

  	initBuffers() {

  		var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

  		this.vertices = [
  			1,0,1, //0
  			1,0,-1,  //1
  			0.5,0.86,1, //2
  			0.5,0.86,-1, //3
  			-0.5,0.86,1, //4
  			-0.5,0.86,-1, //5
  			-1,0,1, //6
  			-1,0,-1, //7
  			-0.5,-0.86,1, //8
  			-0.5,-0.86,-1, //9
  			0.5,-0.86,1, //10
  			0.5,-0.86,-1, //11
  		];

      this.texCoords = [
        
        0.01,0/6, //4
        0.99,0/6, //5
        0.01,6/6, //0
        0.99,6/6, //1
        0.01,5/6, //2
        0.99,5/6, //3
        0.01,4/6, //4
        0.99,4/6, //5
        0.01,3/6, //6
        0.99,3/6, //7
        0.01,2/6, //8
        0.99,2/6, //9
        0.01,1/6, //10
        0.99,1/6, //11

      ];

      this.indices = [
          0,1,2,
          2,1,3,
          2,3,4,
          4,3,5,
          4,5,6,
          6,5,7,
          6,7,8,
          8,7,9,
          8,9,10,
          10,9,11,
          11,1,0,
          0,10,11
        ];
    	
    	this.normals = [
    		0.5,0,0,
    		0.5,0,0,
    		0.5,0.5,0,
    		0.5,0.5,0,
    		-0.5,0.5,0,
    		-0.5,0.5,0,
    		-0.5,0,0,
    		-0.5,0,0,
    		-0.5,-0.5,0,
    		-0.5,-0.5,0,
    		0.5,-0.5,0,
    		0.5,-0.5,0,

    	];
    	  
        this.indices = [
        	0,1,2,
        	2,1,3,
        	2,3,4,
        	4,3,5,
        	4,5,6,
        	6,5,7,
        	6,7,8,
        	8,7,9,
        	8,9,10,
        	10,9,11,
        	11,1,0,
        	0,10,11
        ];

        


        //alert(this.vertices.length);
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

  	}

  	

}





