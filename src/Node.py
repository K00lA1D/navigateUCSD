

class Node:

    def __init__(self, name : str, node_type : str, 
                longitude : float = 0.0, lattitude : float = 0.0):
        self.name = name
        self.node_type = node_type
        self.longitude = longitude
        self.lattitude = lattitude
        self.adjacent = {}