var lifeData = {};
var lifeMap = {};
var lifeTree = {};
// Get JSON data
var loadJSONData = function() { 
    d3.json("http://localhost:3000/", function(error, treeData) {
        lifeData = convertIDToUUID(treeData);
        draw(lifeData, true);
    });
}

var draw = function(rawData, withAnimation) {
    lifeMap = createDataMap(rawData);
    lifeTree = createDataTree(lifeData, lifeMap);
    if (lifeTree.length > 1) {
        console.error("Life Tree has multiple roots.");
    }
    drawLife(lifeTree[0], withAnimation);
}

var createDataMap = function(rawData) {
    return rawData.reduce(function(map, node) {
        map[node.uuid] = node;
        return map;
      }, {});
}

var createDataTree = function(rawData, mapData) {
    // Make clones to not mess up original objects.
    var cloneRawData = clone(rawData);
    var cloneMapData = createDataMap(cloneRawData);

    var treeData = [];
    cloneRawData.forEach(function(node) {
        // add to parent
        var parent = cloneMapData[node.parent];
        if (parent) {
            // create child array if it doesn't exist
            (parent.children || (parent.children = []))
                // add node to child array
                .push(node);
        } else {
            // parent is null or missing
            treeData.push(node);
        }
      });
      return treeData;
}

var clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

var mapToRaw = function(map) {
    var raw = [];
    for (var key in map) {
        raw.push(map[key]);
    }
    return raw;
}

var persistDisk = function() {
    /*Your code goes here */
    console.log("somethin")
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:3000/life", true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.onload = xhrSuccess;
    // xhr.onerror = xhrError;
    // var lifeObj = mapToRaw(lifeMap);
    // var lifeJSON = JSON.stringify(lifeObj);
    // var idedLifeJSON = convertUUIDToID(lifeJSON);
    // xhr.send(idedLifeJSON);
    localStorage.setItem("life", "{life: or something}");
}

var convertUUIDToID = function(jsonString) {
   return JSON.stringify(JSON.parse(jsonString.split('"uuid":').join('"id":')));
}

var convertIDToUUID = function(obj) {
    return obj.map(function(node) {
        node.uuid = node.id;
        delete node.id;
        return node;
    });
}

loadJSONData();