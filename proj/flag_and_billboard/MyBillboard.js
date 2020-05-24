class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);
	}

	update() //Passes the nSuppliesDelivered of the scene the the billboard shader
	{	
		this.scene.shader3.setUniformsValues({ nSuppliesDelivered: this.scene.nSuppliesDelivered});	
	}

	display()
	{
		
		//Main Billboard
		this.scene.plane = new MyPlane(this.scene);
		this.scene.pushMatrix();
		this.scene.translate(0,1.5,0);
		this.scene.scale(2,1,1);
		this.scene.billMat.apply();
		this.scene.plane.display();
		this.scene.popMatrix();
		
		//Counter
		this.scene.pushMatrix();
		this.scene.translate(0,1.4,0.1);
		this.scene.scale(1.7,0.5,0.5);
		this.scene.setActiveShader(this.scene.shader3); // activate selected shader
		this.scene.planeCounter.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader); //Set the default shader

		//Beam Left
		this.scene.pushMatrix();
		this.scene.translate(-1,0.5,0);
		this.scene.scale(1,0.5,0.5);
        this.scene.scale(0.05,1,1);
        this.scene.rotate(90*(Math.PI/180),1,0,0);
        this.scene.translate(1,0,0);
        this.scene.billLegMat.apply();
        this.scene.square.display();
        this.scene.popMatrix();

		//Beam Right
		this.scene.pushMatrix();
		this.scene.translate(1,0.5,0);
		this.scene.scale(1,0.5,0.5);
        this.scene.scale(0.05,-1,1);
        this.scene.rotate(90*(Math.PI/180),1,0,0);
        this.scene.translate(-1,0,0);
        this.scene.square.display();
        this.scene.popMatrix();        
		        
	}
}