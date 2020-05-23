class MyEngine extends CGFobject {
	constructor(scene) {
		super(scene);
	}

	display()
	{
                //Front half sphere of the engine
		this.scene.pushMatrix(); 
                this.scene.scale(0.5,0.5,0.5);
                this.scene.scale(0.25,0.25,0.25);
                this.scene.scale(0.25,0.25,0.25);
                this.scene.rotate(90*(Math.PI/180),1,0,0);
                this.scene.translate(0,1,20);
                this.scene.halfSphere.display();
                this.scene.popMatrix();

                //Back half sphere of the engine
                this.scene.pushMatrix();
                this.scene.scale(0.5,0.5,0.5);
                this.scene.scale(0.25,0.25,0.25);
                this.scene.scale(0.25,0.25,0.25);
                this.scene.rotate(270*(Math.PI/180),1,0,0);
                this.scene.translate(0,1,-20);
                this.scene.halfSphere.display();
                this.scene.popMatrix();

                //Cylinder at the middle part
                this.scene.pushMatrix();
                this.scene.scale(0.5,0.5,0.5);
                this.scene.scale(0.25,0.25,0.25);
                this.scene.scale(0.25,0.25,0.25);
                this.scene.translate(0,-20,0);
                this.scene.cylinder.display();
                this.scene.popMatrix();
	}
}