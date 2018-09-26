function Task () {
	this.uuid = guid();
	this.name = "New Task";
	this.description = "";
	this.action = ""
	this.usesInternet = false;
	this.parent = {};
  this.dependencies = [];
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}