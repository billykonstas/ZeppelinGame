class MyWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.turnCoords=[0,0,0]; //The coordinates to translate the wings when they need to turn
        this.turnAng=0; //The angle used for the wings to turn
        this.turnType=""; //Left or Right Turn for the wings
	}

	update(val)
	{
		if(val<0) //Used to change the values of the wings when R or L is pressed to be animated later
    	{         //at an angle
    		this.turnType="R";
    		this.turnCoords=[0.1,-0.6,0.2];
    		this.turnAng=35;
    	}
 		else
 		{	
 			this.turnType="L";
 			this.turnCoords=[0.1,0.6,0.2];
    		this.turnAng=-35;
    	}
	}

	display()
	{
		//Square
		this.scene.pushMatrix();
        this.scene.scale(0.15,0.20,0.15);
        this.scene.translate(-2,0,-7);
        this.scene.square.display();
        this.scene.popMatrix();

        //Triangle
        this.scene.pushMatrix();
        this.scene.scale(0.15,0.20,0.15);
        this.scene.translate(-1,0,-6);
        this.scene.triangle.display();
        this.scene.popMatrix();
	}
}