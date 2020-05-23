class MyPropeller extends CGFobject {
	constructor(scene) {
		super(scene);
		this.propellerAng=0; //The angle that the propellers are displayed
        this.propellerSpeed=15; //How much we add to the propeller angle
	}

	update()
	{
		this.propellerAng+=this.propellerSpeed; //Increasing the angle at the propellers to be animated
	}

	display()
	{
		//Square
		this.scene.pushMatrix();
        this.scene.scale(0.10,1,1);
        this.scene.rotate(90*(Math.PI/180),1,0,0);
        this.scene.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(90*(Math.PI/180),1,0,0);
        this.scene.rotate(90*(Math.PI/180),0,1,0);
        this.scene.scale(0.10,1,1);
        this.scene.square.display();
        this.scene.popMatrix();
        
	}
}