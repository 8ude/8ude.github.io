function orbitingGroup(zpos, rotspeed, orbitradius, numspheres, sphereradius) {

	this.zPos = zpos;
	this.rotSpeed = rotspeed;
	this.orbitRadius = orbitradius;
	this.numSpheres = numspheres;
	this.sphereRadius = sphereradius;

	var sphereGroup = new THREE.Object3D();

	var sphereGeometry = new THREE.SphereGeometry(this.sphereRadius,32,32);
	var material = new THREE.MeshPhongMaterial( { color: 0xFF0000 } );

	for ( var i = 0; i < this.numSpheres; i++) {

		var orbitingSphere = new THREE.Mesh(sphereGeometry, material);
		orbitingSphere.position.x = this.orbitRadius*Math.cos(2*i*Math.PI/this.numSpheres); 
		orbitingSphere.position.y = this.orbitRadius*Math.sin(2*i*Math.PI/this.numSpheres);
		orbitingSphere.position.z = this.zPos;
		sphereGroup.add (orbitingSphere);	
	}

	scene.add(sphereGroup);

	this.update = function (time) {

		sphereGroup.rotation.z = time * this.rotSpeed; 

	}
}
