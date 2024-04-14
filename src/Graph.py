
import heapq
import itertools
from Node import Node



class Graph:

    def __init__(self):
     
        self.node_list = self.initialize_graph()

        self.node_name_list = ['Cafe Ventanas', 'Canyon View Center', 
                                  'Center Hall', 'Cognitive Science Building',
                  'CSE Building', 'Eleanor Roosevelt College', 'Eighth College',
                  'Franklin Antonio Hall', 'Jacobs School',
                  'Galbraith Hall', 'Geisel', 'Main Gym', 'Mandeville Auditorium',
                  'Marshall College', 'Muir College',
                  'Ocean View Terrace', 'Pepper Canyon Hall',
                  'Pines', 'Price Center', 'Rady School', 
                  'Revelle College', 'RIMAC',
                  'Seventh College',
                  'Sixth College',
                  'Social Sciences Building',
                   'SuperComputer Center', 'Warren College', 'Warren Lecture Hall', 'York Hall',
                     '64 Degrees']

        self.graph = self.create_graph()

        #print(f"self.graph: {self.graph}")


    def initialize_graph(self) -> list:

        # Initialize all colleges           
        Revelle = Node("Revelle College", ["college"])
        Warren = Node("Warren College", ["college"])
        Muir = Node("Muir College", ["college"])
        ERC = Node("Eleanor Roosevelt College", ["college"])
        Marshall = Node("Marshall College", ["college"])
        Sixth = Node("Sixth College", ["college"])
        Seventh = Node("Seventh College", ["college"])
        Eighth = Node("Eighth College", ["college"])


        # Initialize gyms
        RIMAC = Node("RIMAC", ["Gym(any)"])
        MainGym = Node("Main Gym", ["Gym(any)"])
        CVGym = Node("Canyon View Center", ["Gym(any)"])

        # Initialize food spots
        CafeV = Node("Cafe Ventanas", ["Food(any)"])
        OVT = Node("Ocean View Terrace", ["Food(any)"])
        Pines = Node("Pines", ["Food(any"])
        Degrees64 = Node("64 Degrees", ["Food(any)"])
        PriceCenter = Node("Price Center", ["Food(any)", "Study(any)"])

        # Initialize lecture halls
        Center = Node("Center Hall", ["hall"])
        York = Node("York Hall", ["hall"])
        Galbraith = Node("Galbraith Hall", ["hall", "Study(any)"])
        PepperCanyon = Node("Pepper Canyon  Hall", ["hall"])
        Rady = Node("Rady School", ["hall"])
        SocialScience = Node("Social Science Building", ["hall"])
        FranklinAntonio = Node("Franklin Antonio Hall", ["hall", "Study(any)", "Food(any)"])
        CognitiveScience = Node("Cognitive Science Building", ["hall"])
        Mandeville = Node("Mandeville Auditorium", ["hall"])
        Jacobs = Node("Jacobs School", ["hall"])
        WarrenLecture = Node("Warren Lecture Hall", ["hall"])

        # Initialize study areas

        Geisel = Node("Geisel", ["Study(any)"])
        SuperComp = Node("SuperComputer Center", ["Study(any)"])
        CSE = Node("CSE Building", ["Study(any)"])

        #Create connections

        Seventh.add_adjacency(Rady, 1)
        Seventh.add_adjacency(CafeV, 1)

        CafeV.add_adjacency(ERC, 1)
        CafeV.add_adjacency(Seventh, 1)

        ERC.add_adjacency(CafeV, 1)
        ERC.add_adjacency(RIMAC, 1)
        ERC.add_adjacency(Marshall, 1)
        ERC.add_adjacency(Rady, 1)

        Rady.add_adjacency(Seventh, 1)
        Rady.add_adjacency(RIMAC, 1)
        Rady.add_adjacency(ERC, 1)

        RIMAC.add_adjacency(SuperComp, 1)
        RIMAC.add_adjacency(ERC, 1)
        RIMAC.add_adjacency(Rady, 1)

        SuperComp.add_adjacency(RIMAC, 1)
        SuperComp.add_adjacency(SocialScience, 1)

        Marshall.add_adjacency(ERC, 1)
        Marshall.add_adjacency(OVT, 0)
        Marshall.add_adjacency(Sixth, 1)
        Marshall.add_adjacency(SocialScience, 1)

        OVT.add_adjacency(Marshall, 0)

        SocialScience.add_adjacency(Marshall, 1)
        SocialScience.add_adjacency(SuperComp, 1)

        Sixth.add_adjacency(Muir, 1)
        Sixth.add_adjacency(Marshall, 1)
        Sixth.add_adjacency(CognitiveScience, 1)

        CognitiveScience.add_adjacency(Geisel, 1)
        CognitiveScience.add_adjacency(Sixth, 1)

        Geisel.add_adjacency(CognitiveScience, 1)
        Geisel.add_adjacency(PriceCenter, 1)
        Geisel.add_adjacency(Jacobs, 1)
        Geisel.add_adjacency(WarrenLecture, 1)

        Jacobs.add_adjacency(Geisel, 1)
        Jacobs.add_adjacency(CSE, 1)
        Jacobs.add_adjacency(WarrenLecture, 1)
        Jacobs.add_adjacency(FranklinAntonio, 1)

        WarrenLecture.add_adjacency(Geisel, 1)
        WarrenLecture.add_adjacency(PriceCenter, 1)
        WarrenLecture.add_adjacency(Jacobs, 1)
        WarrenLecture.add_adjacency(CSE, 1)
        WarrenLecture.add_adjacency(CVGym, 1)

        PriceCenter.add_adjacency(Center, 1)
        PriceCenter.add_adjacency(Geisel, 1)
        PriceCenter.add_adjacency(WarrenLecture, 1)

        Center.add_adjacency(PriceCenter, 1)
        Center.add_adjacency(Mandeville, 1)

        CSE.add_adjacency(Warren, 1)
        CSE.add_adjacency(Jacobs, 1)
        CSE.add_adjacency(WarrenLecture, 1)
        CSE.add_adjacency(CVGym, 1)

        Warren.add_adjacency(FranklinAntonio, 1)
        Warren.add_adjacency(CSE, 1)
        Warren.add_adjacency(CVGym, 1)

        FranklinAntonio.add_adjacency(Warren,1)
        FranklinAntonio.add_adjacency(Jacobs, 1)

        CVGym.add_adjacency(Warren, 1)
        CVGym.add_adjacency(CSE, 1)
        CVGym.add_adjacency(WarrenLecture, 1)

        Muir.add_adjacency(Pines, 0)
        Muir.add_adjacency(Sixth, 1)
        Muir.add_adjacency(Mandeville, 1)
        Muir.add_adjacency(MainGym, 1)
        Muir.add_adjacency(Revelle, 1)

        Pines.add_adjacency(Muir, 0)

        MainGym.add_adjacency(Degrees64, 1)
        MainGym.add_adjacency(Mandeville, 1)
        MainGym.add_adjacency(Muir, 1)


        Mandeville.add_adjacency(Muir, 1)
        Mandeville.add_adjacency(Center, 1)

        Degrees64.add_adjacency(Revelle, 0)

        Revelle.add_adjacency(Muir, 1)
        Revelle.add_adjacency(Galbraith, 1)
        Revelle.add_adjacency(York, 1)
        Revelle.add_adjacency(Eighth, 1)
        Revelle.add_adjacency(Degrees64, 0)

        Galbraith.add_adjacency(York, 1)
        Galbraith.add_adjacency(Revelle, 1)
        Galbraith.add_adjacency(Eighth, 1)

        York.add_adjacency(Galbraith, 1)
        York.add_adjacency(Revelle, 1)

        Eighth.add_adjacency(Revelle, 1)
        Eighth.add_adjacency(Galbraith, 1)
   
        return [CafeV, CVGym, Center, CognitiveScience, CSE, ERC, Eighth, FranklinAntonio, 
                Jacobs, Galbraith, Geisel, MainGym, Mandeville, Marshall, Muir, 
                OVT, PepperCanyon, Pines, PriceCenter, Rady, Revelle, RIMAC, 
                Seventh, Sixth, SocialScience, SuperComp, Warren, WarrenLecture, York,  Degrees64]


    def create_graph(self) -> dict:

        graph = {}

        for node in self.node_list:
            graph[node.name] = {'type': node.node_type, 'adjacent' : node.adjacent}

        return graph


    def find_shortest_path(self, start_name, end_name):
        #print(f"Finding shortest path from {start_name} to {end_name}")
        distances = {node.name: float('infinity') for node in self.node_list}
        previous_nodes = {node.name: None for node in self.node_list}
        distances[start_name] = 0
        pq = [(0, start_name)]

        while pq:
            current_distance, current_node_name = heapq.heappop(pq)
            #print(f"Current node: {current_node_name}, distance: {current_distance}")
            current_node = next(node for node in self.node_list if node.name == current_node_name)

            if current_distance > distances[current_node_name]:
                continue

            for neighbor, weight in current_node.adjacent.items():
                distance = current_distance + weight
                #print(f"  Checking neighbor: {neighbor.name}, distance: {distance}")

                if distance < distances[neighbor.name]:
                    distances[neighbor.name] = distance
                    previous_nodes[neighbor.name] = current_node_name
                    heapq.heappush(pq, (distance, neighbor.name))

        path = []
        current_node_name = end_name
        while current_node_name is not None:
            path.append(current_node_name)
            current_node_name = previous_nodes[current_node_name]
        path.reverse()

        #print(f"Shortest path: {path}, distance: {distances[end_name]}")
        return path, distances[end_name]

    def find_closest_location(self, current_location_name, activity_type):
        #print(f"Finding closest location to {current_location_name} for activity {activity_type}")
        min_distance = float('infinity')
        closest_location = None
        path_to_closest = []

        for node in self.node_list:
            if activity_type in node.node_type and node.name != current_location_name:
                #print(f"  Checking node: {node.name} for activity type {activity_type}")
                path, distance = self.find_shortest_path(current_location_name, node.name)
                if distance < min_distance:
                    min_distance = distance
                    closest_location = node.name
                    path_to_closest = path

        #print(f"Closest location: {closest_location}, path: {path_to_closest}, distance: {min_distance}")
        return closest_location, path_to_closest, min_distance

    def optimize_schedule(self, start, schedule):
        #print(f"Optimizing schedule from {start} with schedule {schedule}")
        current_location = start
        total_distance = 0
        full_path = [start]

        for item in schedule:
            #print(f"Processing schedule item: {item}")

            #current_node = next((node for node in self.node_list if node.name == current_node.name), None)
            current_node = next((node for node in self.node_list if node.name == current_location), None)


            if item in ["Food(any)", "Gym(any)", "Study(any)"]:

                if item in current_node.node_type:
                    closest_location = current_location

                    path = [current_location]
                    distance = 0
                else:
                    closest_location, path, distance = self.find_closest_location(current_location, item)

                #print(f"current_location : {current_location}")
                #print(f"closest_location : {closest_location}")
                #print(f"path : {path}")
                #print(f"distance : {distance}")
                if closest_location != current_location:
                    total_distance += distance
                    current_location = closest_location
                    full_path += path[1:]
                else:
                    full_path.append(current_location)
                #print(f"path[1:] : {path[1:]}")
                #full_path += path[1:]  # Include intermediate stops
                #full_path.append(current_location)
                #print(f"full_path: {full_path}")
                # Always append the current location for each schedule item
                #full_path.append(current_location)
            else:
                path, distance = self.find_shortest_path(current_location, item)
                total_distance += distance
                current_location = item

                full_path += path[1:]  # Include intermediate stops

                #print(f"full_path: {full_path}")

        #print(f"Optimized path: {full_path}, total distance: {total_distance}")
        return total_distance, full_path


if __name__ == '__main__':

    graph = Graph()

    start = 'Warren Lecture Hall'

    schedule = ['Seventh College']

    result = graph.optimize_schedule(start, schedule)

    print(f"result : {result}")










