class MyFlag extends CGFobject {
	constructor(scene) {
		super(scene);
		this.phase=0.0;
		this.lastUpdate=0.0;
	}
	
	update(t)
	{
		if (this.lastUpdate == 0)
            this.lastUpdate=t;

        var elapsedTime = t - this.lastUpdate;
        this.lastUpdate=t;

        //console.log('Elapsed Time: '+elapsedTime/50.0);               //Phase of the wave calculated
		this.phase+=0.2*(this.scene.vehicle.speed+1)*(elapsedTime/50.0);//and send to the shader
		//console.log('Flag wave phase: '+this.phase);
		this.scene.shader2.setUniformsValues({ phase: this.phase});
	}

	display()
	{

		//Front Flag
		this.scene.pushMatrix();
        this.scene.translate(0,0,-3);
        this.scene.rotate(90*(Math.PI/180),0,1,0);
        this.scene.scale(2,1,1);
        this.scene.flagMat.apply();
        this.scene.shader2.setUniformsValues({ back: 0}); //If is 0 means is the front  
        this.scene.setActiveShader(this.scene.shader2); // activate selected shader
        this.scene.plane.display();
        this.scene.popMatrix();
        //Front Flag End

        this.scene.setActiveShader(this.scene.defaultShader); //Set the default shader

        //Back Flag
        this.scene.pushMatrix();
        this.scene.translate(0,0,-3);
        this.scene.rotate(270*(Math.PI/180),0,1,0);
        this.scene.scale(2,1,1);
        this.scene.flagMat.apply();
        this.scene.shader2.setUniformsValues({ back: 1}); //If is 1 means is the back
        this.scene.setActiveShader(this.scene.shader2); // activate selected shader
        this.scene.plane.display();
        this.scene.popMatrix();
        //Back Flag End
	}
}