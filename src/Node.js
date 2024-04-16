

class Node {

    constructor(name, nodeType, longitude = 0.0, latitude = 0.0) {
        this.name = name;
        this.nodeType = nodeType;
        this.longitude = longitude;
        this.latitude = latitude;
        this.adjacent = new Map();
    }
}

export default Node;