import heapq

class Vertex:
    def __init__(self, vertex_id, types=None):
        if types is None:
            types = ['default']
        self.id = vertex_id
        self.types = types
        self.edges = {}  # Dictionary to hold edges and their weights
    
    def add_edge(self, neighbor, weight=1):
        self.edges[neighbor] = weight
    
    def __str__(self):
        return f"Vertex({self.id}, Types: {self.types})"

class Graph:
    def __init__(self):
        self.vertices = {}
    
    def add_vertex(self, vertex):
        self.vertices[vertex.id] = vertex
    
    def get_vertex(self, vertex_id):
        return self.vertices.get(vertex_id)
    
    def add_edge(self, from_id, to_id, weight=1):
        self.vertices[from_id].add_edge(self.vertices[to_id], weight)
        self.vertices[to_id].add_edge(self.vertices[from_id], weight)  # Since it's undirected

    def __str__(self):
        return "\n".join(str(v) + " -> " + str(v.edges) for v in self.vertices.values())


def dijkstra(graph, start_id, target_id, required_types):
    # Priority queue; stores tuples (distance, vertex_id, path, types_found)
    queue = [(0, start_id, [start_id], set())]
    visited = set()
    while queue:
        current_distance, current_vertex_id, path, types_found = heapq.heappop(queue)
        
        if current_vertex_id in visited:
            continue
        visited.add(current_vertex_id)

        current_vertex = graph.get_vertex(current_vertex_id)
        # Update the types found along the path
        types_found = types_found.union(set(current_vertex.types))
        
        # Check if this vertex meets all type requirements
        if target_id == current_vertex_id and required_types <= types_found:
            return current_distance, path
        
        # Explore neighbors
        for neighbor, weight in current_vertex.edges.items():
            if neighbor.id not in visited:
                heapq.heappush(queue, (current_distance + weight, neighbor.id, path + [neighbor.id], types_found))
    
    return float('inf'), []


if __name__ == '__main__':
    # Initialize graph
    complex_graph = Graph()

    # Create vertices
    # Create vertices with various types
    complex_graph.add_vertex(Vertex('A', ['default']))
    complex_graph.add_vertex(Vertex('B', ['yellow', 'blue']))
    complex_graph.add_vertex(Vertex('C', ['yellow']))
    complex_graph.add_vertex(Vertex('D', ['blue']))
    complex_graph.add_vertex(Vertex('E', ['default']))
    complex_graph.add_vertex(Vertex('F', ['yellow']))
    complex_graph.add_vertex(Vertex('G', ['blue']))
    complex_graph.add_vertex(Vertex('H', ['yellow', 'blue']))
    complex_graph.add_vertex(Vertex('I', ['default']))
    complex_graph.add_vertex(Vertex('J', ['default']))

    # Add more edges to create a richer set of adjacencies
    complex_graph.add_edge('A', 'B')
    complex_graph.add_edge('A', 'C')
    complex_graph.add_edge('B', 'D')
    complex_graph.add_edge('C', 'D')
    complex_graph.add_edge('C', 'F')
    complex_graph.add_edge('D', 'E')
    complex_graph.add_edge('E', 'H')
    complex_graph.add_edge('B', 'H')
    complex_graph.add_edge('F', 'G')
    complex_graph.add_edge('G', 'H')
    complex_graph.add_edge('H', 'I')
    complex_graph.add_edge('I', 'J')
    complex_graph.add_edge('A', 'J')
    complex_graph.add_edge('J', 'E')

    #print(graph)

    # Find a path from 'A' to 'E' that visits at least one 'yellow' and one 'blue' vertex
    print(dijkstra(complex_graph, 'A', 'J', {'yellow', 'blue'}))
