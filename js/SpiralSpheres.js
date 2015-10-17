function SpiralSpheres (num, relSize, radius, stretch, audioController, color, offset ) {

	var offset = offset;
	if (typeof offest ==='undefined') { offset = 0;}
	
	var numSpheres = num;
	this.relativeSize = relSize;
	this.audioController = audioController;
	this.orbitRadius = radius;
	this.sphereColor = color;
	var stretch = stretch;

	this.spiralGroup = new THREE.Object3D();

	var sphereGeometry = new THREE.SphereGeometry(this.relativeSize,32,32);
	var material = new THREE.MeshPhongMaterial( { color: this.sphereColor } );

	for ( var i = 0; i < numSpheres; i++) {

		var orbitingSphere = new THREE.Mesh(sphereGeometry, material);
		orbitingSphere.position.x = this.orbitRadius*Math.cos(2*i*Math.PI/numSpheres); 
		orbitingSphere.position.y = this.orbitRadius*Math.sin(2*i*Math.PI/numSpheres);
		orbitingSphere.position.z = -stretch*i;
		this.spiralGroup.add(orbitingSphere);	
	}

	this.spiralGroup.position.z = (camera.position.z + numSpheres)

	this.update = function () {

		if (this.spiralGroup.position.z > camera.position.z + (numSpheres* stretch + 100)) {
			for( var i = 0; i < numSpheres; i++) {

				this.spiralGroup.children[i].scale.x = this.audioController.analyzer.array[i]/20; 
				this.spiralGroup.children[i].scale.y = this.audioController.analyzer.array[i]/20; 
				this.spiralGroup.children[i].scale.z = this.audioController.analyzer.array[i]/20; 
				
			}

			this.spiralGroup.position.z = camera.position.z - (numSpheres + camera.far);

		}

		this.spiralGroup.rotation.z += time/10000;

	}
}