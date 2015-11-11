function CollectionGroup(_canPickup, _issharing, smoothing, maxPickups) {
	//this.shareGroup = otherGroup;
	this._canPickup = _canPickup;
	this._isSharing = _issharing;

	this.groupPosition = new THREE.Vector3();

	var otherGroupPosition = new THREE.Vector3();

	var collection = [];
	var explosionVectors = [];
	var expSpeed = 0.75;
	var minDistance = 50;
	var collectScale = 1;
	var smooth = smoothing;
	var maxPickups = maxPickups;
	
	for ( i = 0; i < 5000; i++) {

		if (Math.random() < 0.5) {
			explosionVectors[i] = Math.random() * expSpeed;
		} else explosionVectors[i] = -Math.random() * expSpeed;
	}

	this.update = function() {
		if (collection.length > 0){
			this.groupPosition = collection[0].position;

		}
		if (this._canPickup){
			collectionPickup();
		}
				
		collectionFollow();
		collectScale = 0.9+(time/100);
	}

	 function collectionPickup() {
		for (var i = 0; i < pickups.length; i++) {
			var dx = cursorSphere.position.x - pickups[i].position.x;
			var dy = cursorSphere.position.y - pickups[i].position.y;
			var dz = cursorSphere.position.z - pickups[i].position.z;

			var dist = Math.sqrt(dx * dx + dy*dy + dz*dz);

			if (dist < minDistance) {

				if (collection.length < maxPickups) {

					var clonedPickup = pickups[i].clone();
					pickups[i].position.z = camera.position.z + 20;
					clonedPickup.matrixAutoUpdate = true;
					scene.add(clonedPickup);
					collection.push(clonedPickup);
					//console.log(collection.length);
				} else {
					var clonedPickup = pickups[i].clone();
					pickups[i].position.z = camera.position.z + 20;
					clonedPickup.matrixAutoUpdate = true;
					scene.add(clonedPickup);
					collection.splice(0,1);
					collection.push(clonedPickup);
					//console.log(collection.length);
				}
			}
		}
	}

	function collectionFollow() {
		for (var i = 0; i < collection.length; i++) {
			//close distance to cursor
			
			var dx = cursorSphere.position.x - collection[i].position.x;
			var dy = cursorSphere.position.y - collection[i].position.y;
			var dz = cursorSphere.position.z - collection[i].position.z;			

			collection[i].position.x += (dx) * smooth;
			collection[i].position.y += (dy) * smooth;
			if (dz > 20) {
				collection[i].position.z += (dz) * smooth;
			} else collection[i].position.z = cursorSphere.position.z + 20

			//scale and rotate
			var sx = collectScale - collection[i].scale.x;
			var sy = collectScale - collection[i].scale.y;
			var sz = collectScale - collection[i].scale.z;

			collection[i].rotation.x += 0.01;
			collection[i].rotation.y -= 0.01;

			collection[i].scale.x += sx * 0.01;
			collection[i].scale.y += sy * 0.01;
			collection[i].scale.z += sz * 0.01;


			var groupDistance = Math.sqrt(dx * dx + dy*dy + dz*dz);
		}
	}

	this.dissapate = function() {


		for (var i = 0; i < collection.length; i++) {

			

			collection[i].position.x += explosionVectors[i];
			collection[i].position.y += explosionVectors[i+2];
			
			collection[i].position.z -= i/2;
			

			collection[i].rotation.x += 0.01;
			collection[i].rotation.y -= 0.01;
		}
	}
    		

}