

class Node:

    def __init__(self, name : str, node_type : str, 
                longitude : float = 0.0, lattitude : float = 0.0):
        
        self.name = name
        self.node_type = node_type
        self.longitude = longitude
        self.lattitude = lattitude
        self.adjacent = {}
        self.visited = False


    def add_adjacency(self, node, weight):
        
        self.adjacent[node] = weight