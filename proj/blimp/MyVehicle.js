class MyVehicle extends CGFobject {
	constructor(scene) {
        super(scene);
        this.angleΥY=0; //Angle to turn the vehicle
        this.speed=0; //Current speed of the vehicle
        this.position=[0,0,0]; //Current position of the vehicle
        this.autopilotCenter=[0,0,0]; //The center of the autopilot circle
        this.angleXX=0; //Used at the autopilot, the angle from the XX axis
        this.startingAngleXX=0; //Starting angle
        this.autopilotMode=false; //Flag if autopilot is enabled
        this.timer=0; //Timer for one circle at autopilot
        this.timerOn=false; //Timer flag 
        this.angleAdder=72; //Adds degrees to the initial angle, used at autopilot
        this.lastUpdate=0; //Last time visited the update function
        this.lastAuto=0; //Last time visited the autopilot function
        this.fullCircle=false; //Flag for printing the time of a circle in autopilot
        
    }
    
    update(t)
    {
        if (this.lastUpdate == 0)
            this.lastUpdate=t;

        var elapsedTime = t - this.lastUpdate;
        this.lastUpdate=t;

        if (this.speed>0) //Moving the vehicle and updating the propeller.update func 
    	{
            this.position[2]+=0.1*Math.cos(this.angleΥY*(Math.PI/180))*this.speed*(elapsedTime/50);
            this.position[0]+=0.1*Math.sin(this.angleΥY*(Math.PI/180))*this.speed*(elapsedTime/50);
            this.scene.propeller.update();
        }
    	if(this.scene.lastKey=="P") //If autopilot mode is activated use the autopilot func
    	{
    		this.autopilot(t);
            this.scene.propeller.update();
    	}
    	
    }

    turn(val)
    {
    	this.angleΥY+=val; //Adding the angle to the initial angle
    	this.scene.wing.update(val); //Updating vertical wings positioning 
    }

    accelerate(val)
    {	
    	this.speed+=val; //Increasing the speed
        this.speed=this.speed*this.scene.speedFactor; //Multipling it with the speed factor for the interface
        this.scene.wing.turnCoords=[0,0,0]; //Making vertical wing become straight 
        this.scene.wing.turnAng=0;
    	if (this.speed<0) //Stoping the vehicle when speed is 0
        {
    		this.speed=0; 
            this.scene.lastKey="S"; //This flag is to make sure the vehicle wont move
        }                           //when lastKey=="W" then it moves
    }

    reset() //Reseting all the vehicle attributes
    {
    	this.angleΥY=0;
        this.speed=0;
        this.position=[0,0,0];
        this.scene.propeller.propellerAng=0;
        this.scene.propeller.propellerSpeed=15;
        this.scene.wing.turnCoords=[0,0,0];
        this.scene.wing.turnAng=0;
        this.lastUpdate=0;
        this.lastAuto=0; //Last time visited the autopilot function
        this.fullCircle=false; //Flag for printing the time of a circle in autopilot
    }

    autopilot(t)
    {
        if(this.autopilotMode==false) //When autopilot is firstly called
        {
            this.autopilotMode=true; 
            console.log('Autopilot Mode Initialised!');
            if (this.timerOn==false)
            {
                this.timerOn=true; 
                this.timer=t; //Start of the timer for the circle
            }

            this.autopilotCenter[0]=5*Math.cos(this.angleΥY+90*(Math.PI/180))+this.position[0]; //Center of the circle
            this.autopilotCenter[2]=5*Math.sin(this.angleΥY+90*(Math.PI/180))+this.position[2]; //Center of the circle
            console.log('Circle Center X: ' + this.autopilotCenter[0]); 
            console.log('Circle Center Z: ' + this.autopilotCenter[2]);
            this.startingAngleXX = Math.atan2(this.position[2] - 0, -this.position[0] - 0) * 180 / Math.PI; //Angle from the XX axis
            if (this.startingAngleXX<0)
                this.startingAngleXX=270-this.startingAngleXX; //For example Angle -90 becomes 270
            this.angleXX=this.startingAngleXX; //The initial angle
            
            this.angleΥY+=(270-this.angleΥY); //Make the blimp tangent to the circle
        }
    	else //Autopilot already operating
        {
            if (this.lastAuto == 0)
                this.lastAuto=t;

            var elapsedTime2 = t - this.lastAuto;
            this.lastAuto=t;

            if (this.angleXX >= (360+this.startingAngleXX)&&this.fullCircle==false)
            {
                this.fullCircle=true;
                var elapsedTime=t-this.timer; //Counter for the complete circle
                console.log('Circle completed at: '+elapsedTime+' ms');
            }
            
            this.angleXX+=this.angleAdder*(elapsedTime2/1000); //Increases the angle to turn
            this.position[0]= this.autopilotCenter[0] + 5 * Math.sin((this.angleXX+(180-this.startingAngleXX)) * (Math.PI/180)); //Moving in a circular motion
            this.position[2]= this.autopilotCenter[2] + 5 * Math.cos((this.angleXX+(180-this.startingAngleXX)) * (Math.PI/180)); //Moving in a circular motion
            this.turn(this.angleAdder*(elapsedTime2/1000)); //Turns the blimp to keep it tangent to the circle
        }    
    }

    autopilot_reset()
    {
        this.autopilotCenter=[0,0,0]; //The center of the autopilot circle
        this.angleXX=0; //Used at the autopilot, the angle from the XX axis
        this.autopilotMode=false; //Flag if autopilot is enabled
        this.startingAngleXX=0; //Starting angle
        this.timer=0; //Timer for one circle at autopilot
        this.timerOn=false; //Timer flag
        this.lastAuto=0; //Last time visited the autopilot function
        this.fullCircle=false; //Flag for printing the time of a circle in autopilot
    }

    display()
    {
    	//Zeppelin Construction
        
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
    	this.scene.rotate(this.angleΥY*(Math.PI/180),0,1,0);
        
    	//--Main Body--//
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(90*(Math.PI/180),1,0,0);
        this.scene.translate(0,1,0);
        this.scene.zeppelinMat.apply();
        this.scene.halfSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(270*(Math.PI/180),1,0,0);
        this.scene.translate(0,1,0);
        this.scene.zeppelinMat2.apply();
        this.scene.halfSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.zeppelinMat3.apply();
        this.scene.cylinder.display();
        this.scene.popMatrix();
        //--Main Body End--//

        //--Gondola--//
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.scale(0.25,0.25,0.25);
        this.scene.rotate(90*(Math.PI/180),1,0,0);
        this.scene.translate(0,1,4);
        this.scene.zeppelinMat.apply();
        this.scene.halfSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.scale(0.25,0.25,0.25);
        this.scene.rotate(270*(Math.PI/180),1,0,0);
        this.scene.translate(0,1,-4);
        this.scene.halfSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(0,-4,0);
        this.scene.cylinder.display();
        this.scene.popMatrix();
        //--Gondola End--//

        //--Wings--//
        this.scene.zeppelinMat.apply();
        this.scene.pushMatrix();//Right wing
        this.scene.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();//Left wing
        this.scene.rotate(180*(Math.PI/180),0,0,1);
        this.scene.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); //Down wing
        this.scene.rotate(90*(Math.PI/180),0,0,1);
        this.scene.rotate(this.scene.wing.turnAng*(Math.PI/180),1,0,0); //For turning right or left
        this.scene.translate(this.scene.wing.turnCoords[0],this.scene.wing.turnCoords[1],this.scene.wing.turnCoords[2]);
        this.scene.wing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); //Top wing
        this.scene.rotate(270*(Math.PI/180),0,0,1);
        this.scene.rotate((-this.scene.wing.turnAng)*(Math.PI/180),1,0,0); //For turning right or left
        this.scene.translate(this.scene.wing.turnCoords[0],-this.scene.wing.turnCoords[1],this.scene.wing.turnCoords[2]);
        this.scene.wing.display();
        this.scene.popMatrix();
        //--Wings End--//

        //--Engines--//
        this.scene.zeppelinMat2.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.12,0.12,-0.2);
        this.scene.engine.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-0.12,0.12,-0.2);
        this.scene.engine.display();
        this.scene.popMatrix();
        //--Engines End--//

        //--Propellers--//
        this.scene.zeppelinMat.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.translate(2.5,-10.2,-5.3);
        this.scene.rotate(this.scene.propeller.propellerAng*(Math.PI/180),0,0,1); //Propeller Rotation based on the movement
        this.scene.propeller.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.translate(-2.5,-10.2,-5.3);
        this.scene.rotate(this.scene.propeller.propellerAng*(Math.PI/180),0,0,1); //Propeller Rotation based on the movement
        this.scene.propeller.display();
        this.scene.popMatrix();
        //--Propellers End--/
        
        //--Flag--//
        this.scene.flag.display();
        //--Flag End--//
    }
}