function Tunnel (initPos, end, audioController) {
	
	var offset = 500; 
	var numObjects, tunnelRadius;
	var endTime = end;
	var audio = audioController;
	this.speed = 10;
	var initialPosition = initPos;
	this.tunnelRadius = 400;
	this.colPosition = collectionGroup1.groupPosition;
	var minDistance = 450; 


	var objectGeo;

	//init

	var objectGeo = new THREE.PlaneGeometry(600, 400, 10, 10);
	//var objectMat = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide} );

	var center = new THREE.Vector3 (0,0,0);

	this.planes = [];
	this.group = new THREE.Object3D();
	numObjects = 7;
	var tunnelRot = Math.random()/100; 

	for (var i = 0; i < numObjects; i++) {
		var box = new THREE.Mesh(objectGeo, tunnelMaterial);
		this.planes[i] = box;
		box.position.x = this.tunnelRadius*Math.cos(2*i*Math.PI/numObjects); 
		box.position.y = this.tunnelRadius*Math.sin(2*i*Math.PI/numObjects);
		box.position.z = 0;

		box.lookAt(center);

		this.group.add(box);
	} 

	this.group.position.z = camera.position.z - (camera.far + offset + initialPosition);

	var randomSeed = [];
	for (var i = 0; i < objectGeo.vertices.length; i ++) {
		randomSeed[i] = Math.random();

	}


	this.update = function () {

		//detect collection group position
		this.group.updateMatrixWorld();
		this.colPosition = collectionGroup1.groupPosition;
		//console.log(this.colPosition);
		for (var j = 0; j < numObjects; j++) {
			var planePos = new THREE.Vector3();
			planePos.setFromMatrixPosition( this.planes[j].matrixWorld );
			var difference = this.colPosition.distanceTo(planePos);
			
			var planeVerts = this.planes[j].geometry.vertices;
			for (var i = 0; i < planeVerts.length; i++) {
				
				 if (difference < minDistance) {
					planeVerts[i].z += difference * randomSeed[i] * 0.01;
					this.planes[j].geometry.verticesNeedUpdate = true;
				} else if (planeVerts[i].z > 0) { 
					planeVerts[i].z += 0-planeVerts[i].z * 0.005;
					this.planes[j].geometry.verticesNeedUpdate = true;
				}

			}
		}

		if (time < endTime) {
			for( var i = 0; i < numObjects; i++) {
				//thisColor.setHSL(0.6611, 1, 1);
				//this.group.children[i].material.color.setHSL(0.5,audioController.analyzer.array[20]/512,audioController.analyzer.array[20]/1024);
				
			}
		}

		if (this.group.position.z > (camera.position.z + offset)) {
			this.group.position.z = camera.position.z - (camera.far+offset+initialPosition);
			tunnelRot = Math.random()/100
		}

		this.group.position.z += delta*this.speed;
		this.group.rotation.z += tunnelRot;

	}


	function tunnelRespawn () {
		//Todo - make new tunnel when passes camera - randomize tunnel segments, adjust size?
	}
}