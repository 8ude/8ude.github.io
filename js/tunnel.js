function Tunnel (initPos, end, audioController) {
	
	var offset = 500 
	var numObjects, tunnelRadius;
	var endTime = end;
	var audio = audioController;
	var speed = 10;
	var initialPosition = initPos;


	var objectGeo;

	//init

	var tunnelRadius = 400;
	var objectGeo = new THREE.PlaneGeometry(500, 400);
	var objectMat = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide} );

	var center = new THREE.Vector3 (0,0,0);


	this.group = new THREE.Object3D();
	numObjects = 7;
	var tunnelRot = Math.random()/100; 

	for (var i = 0; i < numObjects; i++) {
		var box = new THREE.Mesh(objectGeo, objectMat);
		box.position.x = tunnelRadius*Math.cos(2*i*Math.PI/numObjects); 
		box.position.y = tunnelRadius*Math.sin(2*i*Math.PI/numObjects);
		box.position.z = 0;

		box.lookAt(center);

		this.group.add(box);
	} 

	this.group.position.z = camera.position.z - (camera.far + offset + initialPosition);



	this.update = function () {


		//cant get color to fucking update fuck why the fuck am i so fucking terrible at this

		if (time < endTime) {
			for( var i = 0; i < numObjects; i++) {
				//thisColor.setHSL(0.6611, 1, 1);
				this.group.children[i].material.color.setHSL(0.5,audioController.analyzer.array[20]/512,audioController.analyzer.array[20]/1024);
				
			}
		}

		if (this.group.position.z > (camera.position.z + offset)) {
			this.group.position.z = camera.position.z - (camera.far+offset);
			tunnelRot = Math.random()/100
		}

		this.group.position.z += delta*speed;
		this.group.rotation.z += tunnelRot;

	}

	function tunnelRespawn () {
		//Todo - make new tunnel when passes camera - randomize tunnel segments, adjust size?
	}
}