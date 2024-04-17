import Node from './Node.js'


class Graph {
    constructor(props) {
        this.nodesMap = this.createGraph();
    }

    createGraph() {
        let nodes = {
            Revelle: new Node("Revelle College", ["college"]),
            Warren: new Node("Warren College", ["college"]),
            Muir: new Node("Muir College", ["college"]),
            ERC: new Node("Eleanor Roosevelt College", ["college"]),
            Marshall: new Node("Marshall College", ["college"]),
            Sixth: new Node("Sixth College", ["college"]),
            Seventh: new Node("Seventh College", ["college"]),
            Eighth: new Node("Eighth College", ["college"]),
            RIMAC: new Node("RIMAC", ["Gym(any)"]),
            MainGym: new Node("Main Gym", ["Gym(any)"]),
            CVGym: new Node("Canyon View Center", ["Gym(any)"]),
            CafeV: new Node("Cafe Ventanas", ["Food(any)"]),
            OVT: new Node("Ocean View Terrace", ["Food(any)"]),
            Pines: new Node("Pines", ["Food(any)"]),
            Degrees64: new Node("64 Degrees", ["Food(any)"]),
            PriceCenter: new Node("Price Center", ["Food(any)", "Study(any)"]),
            Center: new Node("Center Hall", ["hall"]),
            York: new Node("York Hall", ["hall"]),
            Galbraith: new Node("Galbraith Hall", ["hall", "Study(any)"]),
            PepperCanyon: new Node("Pepper Canyon Hall", ["hall"]),
            Rady: new Node("Rady School", ["hall"]),
            SocialScience: new Node("Social Science Building", ["hall"]),
            FranklinAntonio: new Node("Franklin Antonio Hall", ["hall", "Study(any)", "Food(any)"]),
            CognitiveScience: new Node("Cognitive Science Building", ["hall"]),
            Mandeville: new Node("Mandeville Auditorium", ["hall"]),
            Jacobs: new Node("Jacobs School", ["hall"]),
            WarrenLecture: new Node("Warren Lecture Hall", ["hall"]),
            Geisel: new Node("Geisel", ["Study(any)"]),
            SuperComp: new Node("SuperComputer Center", ["Study(any)"]),
            CSE: new Node("CSE Building", ["Study(any)"])
        };

        nodes.Seventh.adjacent = new Map([[nodes.Rady, 1], [nodes.CafeV, 1]]);
        nodes.CafeV.adjacent = new Map([[nodes.ERC, 1], [nodes.Seventh, 1]]);
        nodes.ERC.adjacent = new Map([[nodes.CafeV, 1], [nodes.RIMAC, 1], [nodes.Marshall, 1], [nodes.Rady, 1]]);
        nodes.Rady.adjacent = new Map([[nodes.Seventh, 1], [nodes.RIMAC, 1], [nodes.ERC, 1]]);
        nodes.RIMAC.adjacent = new Map([[nodes.SuperComp, 1], [nodes.ERC, 1], [nodes.Rady, 1]]);
        nodes.SuperComp.adjacent = new Map([[nodes.RIMAC, 1], [nodes.SocialScience, 1]]);
        nodes.Marshall.adjacent = new Map([[nodes.ERC, 1], [nodes.OVT, 0], [nodes.Sixth, 1], [nodes.SocialScience, 1]]);
        nodes.OVT.adjacent = new Map([[nodes.Marshall, 0]]);
        nodes.SocialScience.adjacent = new Map([[nodes.Marshall, 1], [nodes.SuperComp, 1]]);
        nodes.Sixth.adjacent = new Map([[nodes.Muir, 1], [nodes.Marshall, 1], [nodes.CognitiveScience, 1]]);
        nodes.CognitiveScience.adjacent = new Map([[nodes.Geisel, 1], [nodes.Sixth, 1]]);
        nodes.Geisel.adjacent = new Map([[nodes.CognitiveScience, 1], [nodes.PriceCenter, 1], [nodes.Jacobs, 1], [nodes.WarrenLecture, 1]]);
        nodes.Jacobs.adjacent = new Map([[nodes.Geisel, 1], [nodes.CSE, 1], [nodes.WarrenLecture, 1], [nodes.FranklinAntonio, 1]]);
        nodes.WarrenLecture.adjacent = new Map([[nodes.Geisel, 1], [nodes.PriceCenter, 1], [nodes.Jacobs, 1], [nodes.CSE, 1], [nodes.CVGym, 1]]);
        nodes.PriceCenter.adjacent = new Map([[nodes.Center, 1], [nodes.Geisel, 1], [nodes.WarrenLecture, 1]]);
        nodes.Center.adjacent = new Map([[nodes.PriceCenter, 1], [nodes.Mandeville, 1]]);
        nodes.CSE.adjacent = new Map([[nodes.Warren, 1], [nodes.Jacobs, 1], [nodes.WarrenLecture, 1], [nodes.CVGym, 1]]);
        nodes.Warren.adjacent = new Map([[nodes.FranklinAntonio, 1], [nodes.CSE, 1], [nodes.CVGym, 1]]);
        nodes.FranklinAntonio.adjacent = new Map([[nodes.Warren, 1], [nodes.Jacobs, 1]]);
        nodes.CVGym.adjacent = new Map([[nodes.Warren, 1], [nodes.CSE, 1], [nodes.WarrenLecture, 1]]);
        nodes.Muir.adjacent = new Map([[nodes.Pines, 0], [nodes.Sixth, 1], [nodes.Mandeville, 1], 
            [nodes.MainGym, 1], [nodes.Revelle, 1]]);
        nodes.Pines.adjacent = new Map([[nodes.Muir, 0]]);
        nodes.MainGym.adjacent = new Map([[nodes.Degrees64, 1], [nodes.Mandeville, 1], [nodes.Muir, 1]]);
        nodes.Mandeville.adjacent = new Map([[nodes.Muir, 1], [nodes.Center, 1]]);
        nodes.Degrees64.adjacent = new Map([[nodes.Revelle, 0]]);
        nodes.Revelle.adjacent = new Map([[nodes.Muir, 1], [nodes.Galbraith, 1], [nodes.York, 1], [nodes.Eighth, 1], [nodes.Degrees64, 0]]);
        nodes.Galbraith.adjacent = new Map([[nodes.York, 1], [nodes.Revelle, 1], [nodes.Eighth, 1]]);
        nodes.York.adjacent = new Map([[nodes.Galbraith, 1], [nodes.Revelle, 1]]);
        nodes.Eighth.adjacent = new Map([[nodes.Revelle, 1], [nodes.Galbraith, 1]]);


        this.nodeList = [nodes.CafeV, nodes.CVGym, nodes.Center, nodes.CognitiveScience, 
            nodes.CSE, nodes.ERC, nodes.Eighth, nodes.FranklinAntonio, 
            nodes.Jacobs, nodes.Galbraith, nodes.Geisel, nodes.MainGym, nodes.Mandeville, 
            nodes.Marshall, nodes.Muir, nodes.OVT, nodes.PepperCanyon, nodes.Pines, 
            nodes.PriceCenter, nodes.Rady, nodes.Revelle, nodes.RIMAC, 
            nodes.Seventh, nodes.Sixth, nodes.SocialScience, nodes.SuperComp,
            nodes.Warren, nodes.WarrenLecture, nodes.York,  nodes.Degrees64]
 

        let nodesMap = new Map();

        Object.values(nodes).forEach(node => {
            nodesMap.set(node.name, {
                type: node.nodeType,
                adjacent: node.adjacent
            });
        });

        return nodesMap;
    }


    findShortestPath(startName, endName) {
        // console.log(`Finding shortest path from ${startName} to ${endName}`);
        let distances = {};
        let previousNodes = {};
        this.nodeList.forEach(node => {
            distances[node.name] = Infinity;
            previousNodes[node.name] = null;
        });
        distances[startName] = 0;
        let pq = [[0, startName]];

        //console.log("nodeList : ")
        //for (let i = 0; i < this.nodeList.length; i++) {
          //  console.log(this.nodeList[i]); // Prints each element in the array
        //}
    
        while (pq.length) {
            pq.sort((a, b) => a[0] - b[0]); // This emulates a priority queue in JavaScript.
            let [currentDistance, currentNodeName] = pq.shift();
            // console.log(`Current node: ${currentNodeName}, distance: ${currentDistance}`);
            //console.log("NodeList : " + this.nodeList);
            let currentNode = this.nodeList.find(node => node.name === currentNodeName);
            
            //console.log("currentNode : " + currentNode);
            if (currentDistance > distances[currentNodeName]) {
                continue;
            }
            
            currentNode.adjacent.forEach((weight, neighbor) => {
                let distance = currentDistance + weight;
                // console.log(`  Checking neighbor: ${neighbor.name}, distance: ${distance}`);
    
                if (distance < distances[neighbor.name]) {
                    distances[neighbor.name] = distance;
                    previousNodes[neighbor.name] = currentNodeName;
                    pq.push([distance, neighbor.name]);
                }
            });
        }
    
        let path = [];
        let currentNodeName = endName;
        while (currentNodeName !== null) {
            path.push(currentNodeName);
            currentNodeName = previousNodes[currentNodeName];
        }
        path.reverse();
    
        // console.log(`Shortest path: ${path}, distance: ${distances[endName]}`);
        return [path, distances[endName]];
    }
    
    findClosestLocation(currentLocationName, activityType) {
        // console.log(`Finding closest location to ${currentLocationName} for activity ${activityType}`);
        let minDistance = Infinity;
        let closestLocation = null;
        let pathToClosest = [];
    
        this.nodeList.forEach(node => {
            if (node.nodeType.includes(activityType) && node.name !== currentLocationName) {
                // console.log(`  Checking node: ${node.name} for activity type ${activityType}`);
                let [path, distance] = this.findShortestPath(currentLocationName, node.name);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestLocation = node.name;
                    pathToClosest = path;
                }
            }
        });
    
        // console.log(`Closest location: ${closestLocation}, path: ${pathToClosest}, distance: ${minDistance}`);
        return [closestLocation, pathToClosest, minDistance];
    }
    
    optimizeSchedule(start, schedule) {
        // console.log(`Optimizing schedule from ${start} with schedule ${schedule}`);
        let currentLocation = start;
        let totalDistance = 0;
        let fullPath = [start];
    
        schedule.forEach(item => {
            // console.log(`Processing schedule item: ${item}`);
    
            let currentNode = this.nodeList.find(node => node.name === currentLocation);
    
            if (["Food(any)", "Gym(any)", "Study(any)"].includes(item)) {
    
                if (currentNode.nodeType.includes(item)) {
                    let closestLocation = currentLocation;
                    let path = [currentLocation];
                    let distance = 0;
                } else {
                    console.log("Being fed into findclosestLocation: " + currentLocation)
                    let [closestLocation, path, distance] = this.findClosestLocation(currentLocation, item);
    
                    // console.log(`current_location : ${currentLocation}`);
                    // console.log(`closest_location : ${closestLocation}`);
                    // console.log(`path : ${path}`);
                    // console.log(`distance : ${distance}`);
                    if (closestLocation !== currentLocation) {
                        totalDistance += distance;
                        currentLocation = closestLocation;
                        fullPath = fullPath.concat(path.slice(1));
                    }
                }
            } else {
                let [path, distance] = this.findShortestPath(currentLocation, item);
                totalDistance += distance;
                currentLocation = item;
    
                fullPath = fullPath.concat(path.slice(1));
            }
    
            // console.log(`full_path: ${fullPath}`);
        });
    
        // console.log(`Optimized path: ${fullPath}, total distance: ${totalDistance}`);
        return [totalDistance, fullPath];
    }
}

export default Graph;