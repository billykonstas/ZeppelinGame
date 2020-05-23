const SupplyStates = {
		INACTIVE: 0,
		FALLING: 1,
		LANDED: 2
		};
		
class MySupply extends CGFobject {

	constructor(scene) {
		super(scene);
		this.state = SupplyStates.INACTIVE;
		this.sposition = [0,10,0];
		this.testTimer=0.0;
		this.timerOn=false;
		this.lastUpdate=0;
	}

	update(t)
	{
	
		this.drop(t);
		this.state = SupplyStates.FALLING;
		this.land(t);
	}

	drop(t)
	{
		
		if (this.timerOn==false)
		{
			console.log('Supply dropped!'); //Notification that supply dropped
			this.testTimer=t;				//and initialize counter to check for 3 seconds
			this.timerOn=true;	
		}
		
		if (this.lastUpdate == 0.0)
            this.lastUpdate=t;

        var elapsedTime = t - this.lastUpdate; 
        this.lastUpdate=t;
        //console.log('Elapsed Time: '+ elapsedTime);

		if (this.state==1)
		{
																		 //If the supply is falling
			this.sposition[1] = this.sposition[1]-8.5*(elapsedTime/3000);//decrease it's Z coordinate
		}
		else
		{
			this.sposition[0] = this.scene.vehicle.position[0]; //This is for the first appearance of the supply
			this.sposition[1] = this.sposition[1]-1;			//when the L key is pressed
			this.sposition[2] = this.scene.vehicle.position[2]; //it appears one unit below the blimp
		}
	}

	land(t)
	{
		
		if(this.sposition[1]<=1) //Checking if it reached the ground 
		{
			this.state = SupplyStates.LANDED; //changing status
			this.scene.LPressed=false; //Making the key available to launch new supply
			this.scene.nSuppliesDelivered++; //Counter for how many supplies have dropped
			var completeTime=t-this.testTimer;
			console.log('Supply Landed at: ' + completeTime + ' ms'); //Counter for time until supply landed
		}
	}

	reset() //Reseting the supplies properties
	{
		this.sposition=[0,10,0];
        this.state = SupplyStates.INACTIVE;
        this.timerOn=false;
	}

	display() //Displaying the supply during the fall
	{
		this.scene.quad = new MyQuad(this.scene);

		//Front
		this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.scene.supplyMat.apply();
		this.scene.quad.display();
		this.scene.popMatrix();

		//Back
		this.scene.pushMatrix();
		this.scene.translate(0,0,-1);
		this.scene.rotate(180*(Math.PI/180),0,1,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Right
		this.scene.pushMatrix();
		this.scene.translate(1,0,0);
		this.scene.rotate(90*(Math.PI/180),0,1,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Left
		this.scene.pushMatrix();
		this.scene.translate(-1,0,0);
		this.scene.rotate(270*(Math.PI/180),0,1,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Top
		this.scene.pushMatrix();
		this.scene.translate(0,1,0);
		this.scene.rotate(270*(Math.PI/180),1,0,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Bottom
		this.scene.pushMatrix();
		this.scene.translate(0,-1,0);
		this.scene.rotate(90*(Math.PI/180),1,0,0);
		this.scene.quad.display();
		this.scene.popMatrix();
	}

	display_landed() //Displaying the supply when it hits the ground
	{
		this.scene.quad = new MyQuad(this.scene);

		//Front
		this.scene.pushMatrix();
		this.scene.translate(0,0,2);
		this.scene.rotate(270*(Math.PI/180),1,0,0);
		this.scene.supplyMat.apply();
		this.scene.quad.display();
		this.scene.popMatrix();

		//Back
		this.scene.pushMatrix();
		this.scene.translate(0,0,-2);
		this.scene.rotate(270*(Math.PI/180),1,0,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Right
		this.scene.pushMatrix();
		this.scene.translate(2,0,0);
		this.scene.rotate(270*(Math.PI/180),1,0,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Left
		this.scene.pushMatrix();
		this.scene.translate(-2,0,0);
		this.scene.rotate(270*(Math.PI/180),1,0,0);
		this.scene.quad.display();
		this.scene.popMatrix();

		//Bottom
		this.scene.pushMatrix();
		this.scene.translate(0,0,0);
		this.scene.rotate(270*(Math.PI/180),1,0,0);
		this.scene.quad.display();
		this.scene.popMatrix();
	}
}