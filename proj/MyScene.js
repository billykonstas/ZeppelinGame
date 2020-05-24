/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Instruction for the game
        window.alert('Game Controls:\n W -> Increase Speed\n S -> Decrease Speed\n D -> Rotate Clockwise\n A -> Rotate Anticlockwise\n R-> Restart\n L -> Drop Supplies\n P -> Autopilot Mode');

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        this.lastKey=""; //Which key was last pressed
        this.LPressed=false; //Checking if L is pressed at least once
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.halfSphere = new MyHalfSphere(this, 6, 8); //Used as front and back face at the blimp
        this.sphere = new MySphere(this, 14, 20);       
        this.cylinder = new MyCylinder(this,6);
        this.cube = new MyUnitCube(this);
        this.vehicle = new MyVehicle(this);
        this.square = new MySquare(this);
        this.triangle = new MyTriangle(this);
        this.wing = new MyWing(this);
        this.engine = new MyEngine(this);
        this.propeller = new MyPropeller(this);
        this.terrain = new MyTerrain(this,20);
        this.billboard = new MyBillboard(this);
        this.plane = new MyPlane(this);
        this.planeCounter = new MyPlane(this);
        this.flag = new MyFlag(this);
        this.supply = []; //The list containing the 5 available supplies
        this.supply[0] = new MySupply(this);
        this.supply[1] = new MySupply(this);
        this.supply[2] = new MySupply(this);
        this.supply[3] = new MySupply(this);
        this.supply[4] = new MySupply(this); 
        this.nSuppliesDelivered = 0; //Counter of how many supplies have already been delivered
        this.skyboxScaleFactor = 50.0; //Scaling the size of the Skybox

        //Earth Material
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(3, 3, 3, 3);
        this.earthMaterial.setDiffuse(9, 9, 9, 1);
        this.earthMaterial.setSpecular(1, 1, 1, 1);
        this.earthMaterial.setShininess(10.0);
        this.earthMaterial.loadTexture('../proj/images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Skybox Material
        this.skybox = new CGFappearance(this);
        this.skybox.setAmbient(3, 3, 3, 3);
        this.skybox.setDiffuse(0, 0, 0, 0);
        this.skybox.setSpecular(0, 0, 0, 0);
        this.skybox.setShininess(10.0);

        //Main Body Zeppelin Material
        this.zeppelinMat = new CGFappearance(this);
        this.zeppelinMat.setAmbient(4.5, 4.5, 0, 4.0);
        this.zeppelinMat.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.zeppelinMat.setSpecular(1, 1, 1, 1.0);
        this.zeppelinMat.setShininess(5.0); 

        //Second Zeppelin Material
        this.zeppelinMat2 = new CGFappearance(this);
        this.zeppelinMat2.setAmbient(0, 0, 2, 1.0);
        this.zeppelinMat2.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.zeppelinMat2.setSpecular(0, 0, 0, 1.0);
        this.zeppelinMat2.setShininess(5.0); 

        //Third Zeppelin Material
        this.zeppelinMat3 = new CGFappearance(this);
        this.zeppelinMat3.setAmbient(5, 5, 5, 3.0);
        this.zeppelinMat3.setDiffuse(0, 0, 0, 0.0);
        this.zeppelinMat3.setSpecular(0, 0, 0, 0.0);
        this.zeppelinMat3.setShininess(10.0); 
        this.zeppelinMat3.loadTexture('../proj/images/gradient.png');
        this.zeppelinMat3.setTextureWrap('REPEAT', 'REPEAT');

        //Terrain Material
        this.terrainMat = new CGFappearance(this);
        this.terrainMat.setAmbient(3, 3, 3, 3);
        this.terrainMat.setDiffuse(0, 0, 0, 0);
        this.terrainMat.setSpecular(0, 0, 0, 0);
        this.terrainMat.setShininess(10.0);

        //Supply Material
        this.supplyMat = new CGFappearance(this);
        this.supplyMat.setAmbient(3, 3, 3, 3);
        this.supplyMat.setDiffuse(9, 9, 9, 1);
        this.supplyMat.setSpecular(1, 1, 1, 1);
        this.supplyMat.setShininess(10.0);
        this.supplyMat.loadTexture('../proj/images/crate.jpg');
        this.supplyMat.setTextureWrap('REPEAT', 'REPEAT');

        //Billboard Material
        this.billMat = new CGFappearance(this);
        this.billMat.setAmbient(3, 3, 3, 3);
        this.billMat.setDiffuse(9, 9, 9, 1);
        this.billMat.setSpecular(1, 1, 1, 1);
        this.billMat.setShininess(5.0);
        this.billMat.loadTexture('../proj/images/billboard.png');
        this.billMat.setTextureWrap('REPEAT', 'REPEAT');        

        //Billboard Leg Material
        this.billLegMat = new CGFappearance(this);
        this.billLegMat.setAmbient(3, 3, 3, 3);
        this.billLegMat.setDiffuse(9, 9, 9, 1);
        this.billLegMat.setSpecular(1, 1, 1, 1);
        this.billLegMat.setShininess(5.0);

        //Flag Material
        this.flagMat = new CGFappearance(this);
        this.flagMat.setAmbient(3, 3, 3, 3);
        this.flagMat.setDiffuse(9, 9, 9, 1);
        this.flagMat.setSpecular(1, 1, 1, 1);
        this.flagMat.setShininess(5.0);
        this.flagMat.loadTexture('../proj/images/FEUP.jpg');
        this.flagMat.setTextureWrap('REPEAT', 'REPEAT');

        //Textures
        this.texture1 = new CGFtexture(this, '../proj/images/cubemap.png'); //The initial skybox texture
        this.texture2 = new CGFtexture(this, '../proj/images/cubemap2.png'); //Second skybox texture
        this.texture3 = new CGFtexture(this, '../proj/images/terrain_new.jpg'); //Terrain texture
        this.texture4 = new CGFtexture(this, '../proj/images/heightmap_new.jpg'); //Terrain heightmap
        this.texture5 = new CGFtexture(this, '../proj/images/sunset.png'); //Third skybox texture

        this.textures = [this.texture1, this.texture2, this.texture5];
        this.textureIds = { 'Skybox': 0, 'Night': 1 ,'Sunset': 2};
        this.selectedTexture = 0;

        this.terrainMat.setTexture(this.texture3);
        this.terrainMat.setTextureWrap('REPEAT', 'REPEAT');
        this.skybox.setTexture(this.textures[this.selectedTexture]);
        this.skybox.setTextureWrap('REPEAT', 'REPEAT');

        //Shaders initialization
        this.shader1 = new CGFshader(this.gl, "../proj/shaders/terrain.vert", "../proj/shaders/terrain.frag");
        this.shader1.setUniformsValues({ uSampler2: 1 });

        this.shader2 = new CGFshader(this.gl, "../proj/shaders/flag.vert", "../proj/shaders/flag.frag");

        this.shader3 = new CGFshader(this.gl, "../proj/shaders/billboard.vert", "../proj/shaders/billboard.frag");

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.speedFactor=1.0; //Speed controller at the interface
        this.vehicleScaleFactor = 1.0; //Scaler of the vehicle at the interface

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.7, 0.1, 400, vec3.fromValues(15, 17, 15), vec3.fromValues(1, 5, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    //Function that resets selected texture in skybox
    updateAppliedTexture() {
        this.skybox.setTexture(this.textures[this.selectedTexture]);
    }

    checkKeys(t)
    {
        var text="Keys pressed: ";
        var keysPressed=false;
        
        //checks if a supply has been dropped
        if (this.LPressed)
            this.supply[this.nSuppliesDelivered].update(t);


        //Check for key codes e.g in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW"))
        {
            if (this.vehicle.autopilotMode == false)
            {
                text+=" W ";
                keysPressed=true;
                this.lastKey="W";
                
                console.log('Speed: ' + this.vehicle.speed); //See the vehicle speed
                this.vehicle.accelerate(1);
                console.log('New Speed: ' + this.vehicle.speed);
                this.vehicle.update(t);
            }
        }


        if (this.gui.isKeyPressed("KeyS"))
        {
            if (this.vehicle.autopilotMode == false) //Can be used only when autopilot is not working
            {
                text+=" S ";
                keysPressed=true;
                console.log(this.vehicle.speed);
                this.vehicle.accelerate(-1);
                console.log('New Speed: ' + this.vehicle.speed);
                this.vehicle.update(t);
            }
        }

        if (this.gui.isKeyPressed("KeyA"))
        {
            if (this.vehicle.autopilotMode == false) //Can be used only when autopilot is not working
            {
                text+=" A ";
                keysPressed=true;
                this.vehicle.turn(10);
            }
        }

        if (this.gui.isKeyPressed("KeyD"))
        {
            if (this.vehicle.autopilotMode == false) //Can be used only when autopilot is not working
            {
                text+=" D ";
                keysPressed=true;
                this.vehicle.turn(-10);
            }
        }

        if (this.gui.isKeyPressed("KeyR"))
        {
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset(); //rendering the vehicle at its initial position
            this.lastKey="";
            for(var j=0;j<5;j++)
                this.supply[j].reset(); //clearing the supplies from the scene
            this.nSuppliesDelivered=0;
            this.LPressed=false; 
            this.vehicle.autopilot_reset(); //reseting autopilot's attributes
        }

        if (this.gui.isKeyPressed("KeyP"))
        {
            if (this.vehicle.autopilotMode == false) //Can be used only when autopilot is not working
            {
                text+=" P ";
                keysPressed=true;
                this.lastKey="P";
                this.vehicle.update(t);
            }
        }        

        if (this.gui.isKeyPressed("KeyL"))
        {
            if (this.vehicle.autopilotMode == false) //Can be used only when autopilot is not working
            {
                text+=" L ";
                keysPressed=true;
                //this.lastKey="L";
                if (this.nSuppliesDelivered>4)
                    console.log('All supplies dropped! Press R for Restart');
                else
                {
                    this.supply[this.nSuppliesDelivered].update(t);
                    this.LPressed=true;
                } 
            }
             
        }

        if (keysPressed)
            console.log(text);

        if (this.lastKey=="W" || this.lastKey=="P")
            this.vehicle.update(t);   

    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys(t);
        this.flag.update(t); //Updates the flag animation and the shaders
        this.billboard.update(); //Calls billboard update, responsible to pass nSuppliesDelivered to shader
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section


        /*
        //Cylinder Display 1.1
        this.pushMatrix();
        this.zeppelinMat.apply();
        this.cylinder.display();
        this.popMatrix();
        */

        /*
        //Sphere Display 1.2
        this.scale(this.vehicleScaleFactor, this.vehicleScaleFactor, this.vehicleScaleFactor);
        this.earthMaterial.apply();
        this.sphere.display();
        */

        
        //Skybox Display 1.3
        this.pushMatrix();
        this.scale(this.skyboxScaleFactor,this.skyboxScaleFactor,this.skyboxScaleFactor); //Scaling skybox to be 50 units
        this.skybox.apply(); //Applying skybox material
        this.cube.display();
        this.popMatrix();
        
        //Vehicle Display 3
        this.pushMatrix();
        this.translate(0,10,0); //Correct placement in the map
        this.scale(this.vehicleScaleFactor, this.vehicleScaleFactor, this.vehicleScaleFactor);
        this.zeppelinMat.apply(); //Applying blimp material
        this.vehicle.display();
        this.popMatrix();

        this.setActiveShader(this.defaultShader); //Set the default shader
        
        //Terrain Display 4
        this.pushMatrix();
        this.translate(0,-1.1,0);
        this.rotate(270*(Math.PI/180),1,0,0);
        this.scale(this.skyboxScaleFactor,this.skyboxScaleFactor,this.skyboxScaleFactor); //Scaling the terrain to match skybox size
        this.terrainMat.apply();
        this.setActiveShader(this.shader1); // activate selected shader
        this.texture4.bind(1);         // bind additional texture to texture unit 1
        this.terrain.display();
        this.popMatrix();
        
        this.setActiveShader(this.defaultShader); //Set the default shader 
        
        if(this.LPressed)
        {
            //Supply Display
            this.pushMatrix();
            this.translate(this.supply[this.nSuppliesDelivered].sposition[0],this.supply[this.nSuppliesDelivered].sposition[1],this.supply[this.nSuppliesDelivered].sposition[2]);
            this.scale(0.5,0.5,0.5);
            this.supply[this.nSuppliesDelivered].display();
            this.popMatrix();
        }

        for(var i=1;i<6;i++) //Displaying the landed supplies at the positions they landed
        {
            if(this.supply[i-1].state == 2)
            {
                this.pushMatrix();
                this.translate(this.supply[i-1].sposition[0],0,this.supply[i-1].sposition[2]);
                this.scale(0.5,0.5,0.5);
                this.supply[i-1].display_landed();
                this.popMatrix();
            }
        }
        
        
        //Billboard Display 6.2
        this.pushMatrix();
        this.translate(4,0,3);
        this.rotate(45*(Math.PI/180),0,1,0);
        this.billboard.display();
        this.popMatrix();


        this.setActiveShader(this.defaultShader); //Set the default shader 
    
        // ---- END Primitive drawing section
    }
}