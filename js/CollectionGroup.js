function CollectionGroup(_canPickup, otherGroup, _issharing) {
	this.shareGroup = otherGroup;
	this._canPickup = _canPickup;
	this._isSharing = _issharing;


	var collection = [];
	var minDistance = 50;
	var collectScale = 1;
	var groupPosition = new THREE.Vector3();

	this.update = function() {
		if (collection.length > 0){
			groupPosition = collection[0].position;
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
				var clonedPickup = pickups[i].clone();
				pickups[i].position.z = camera.position.z + 20;
				clonedPickup.matrixAutoUpdate = true;
				scene.add(clonedPickup);
				collection.push(clonedPickup);
				//console.log(collection.length);
			} if (collection.length > this.maxSize) {

			}
		}
	}

	function collectionFollow() {
		for (var i = 0; i < collection.length; i++) {
			//close distance to cursor
			var dx = cursorSphere.position.x - collection[i].position.x;
			var dy = cursorSphere.position.y - collection[i].position.y;
			var dz = cursorSphere.position.z - collection[i].position.z;

			collection[i].position.x += (dx) * 0.01;
			collection[i].position.y += (dy) * 0.01;
			collection[i].position.z += (dz) * 0.01;

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
    		

}