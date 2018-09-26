function xhrSuccess() { 
  console.log("saved: " + this.statusText)
  drawLife(false);
}

function xhrError() { 
    console.error(this.statusText); 
}

var selectedTask = "";
document.getElementById("saveButton").onclick = function() {
	// var node = lifeMap[selectedTask];
	// node.name = document.getElementById("title").value;
	// node.description = document.getElementById("description").value;
	// node.action = document.getElementById("action").value;

	// draw(mapToRaw(lifeMap), false);
	persistDisk();
};

var showInfo = function(uuid) {
	console.log(uuid);
	var task = lifeMap[uuid];
	document.getElementById("title").value = task.name;
	document.getElementById("description").value = task.description;
	document.getElementById("action").value = task.action;

	var parentSection = document.getElementById("parent");
	if (!task.parent || jQuery.isEmptyObject(task.parent)) {
		parentSection.style.display = "none";
	} else {
		parentSection.style.display = "block";
		var parentTask = lifeMap[task.parent];
		clearChildren(parentSection);
		parentSection.appendChild(createListHeader("Parent2"));
		var parentNode = createListEntry(parentTask.name);
		parentNode.onclick = function() {
			showInfo(parentTask.uuid);
		}
		parentSection.appendChild(parentNode)
	}

	var dependenciesSection = document.getElementById("dependencies");
	clearChildren(dependenciesSection);
	dependenciesSection.appendChild(createListHeader("Dependencies"));
	task.dependencies.forEach(function(dep) {
		var depTask = lifeMap[dep];
		var addNode = createListEntry(depTask.name);
		addNode.onclick = function() {
			showInfo(depTask.uuid);
		};
		dependenciesSection.appendChild(addNode);

	});
	var addNode = createListEntry("+");
	addNode.onclick = function() {
		var newTask = new Task();
		newTask.parent = task.uuid;
		task.dependencies.push(newTask.uuid);
		lifeMap[newTask.uuid] = newTask;
		lifeData = mapToRaw(lifeMap);
		draw(lifeData, true);
		selectedTask = newTask.uuid;
		showInfo(newTask.uuid);
	}
	dependenciesSection.appendChild(addNode);
}

var clearChildren = function(node) {
	while (node.firstChild) {
   		node.removeChild(node.firstChild);
	}
}

var createListHeader = function(title) {
	var node = createListEntry(title);
	node.classList.add("active");
	return node;                  
}

var createListEntry = function(title) {
	var node = document.createElement("LI");
	var textnode = document.createTextNode(title);
	node.appendChild(textnode);    
	node.classList.add("list-group-item");
	node.classList.add("list-group-item-action");
	return node;                  
}

var addDependency = function() {
	var newTask = new Task();
	newTask.parent = selectedTask;
	selectedTask.children.push(newTask);
	drawLife(true);
}
