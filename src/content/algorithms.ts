export interface AlgorithmContent {
  id: string;
  title: string;
  description: string;
  category: "pathfinding" | "graph" | "tree";
  difficulty: "beginner" | "intermediate" | "advanced";
  timeComplexity: string;
  spaceComplexity: string;
  content: string;
}

export const algorithms: AlgorithmContent[] = [
  {
    id: "bfs",
    title: "Breadth-First Search (BFS)",
    description: "Explores nodes level by level, guarantees shortest path in unweighted graphs",
    category: "pathfinding",
    difficulty: "beginner",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    content: `
# Breadth-First Search (BFS)

## What is BFS?

Breadth-First Search is a graph traversal algorithm that explores nodes level by level. It starts at a source node and explores all neighboring nodes at the present depth before moving to nodes at the next depth level.

## How It Works

1. Start at the source node and mark it as visited
2. Add the source node to a queue
3. While the queue is not empty:
   - Dequeue a node from the front
   - For each unvisited neighbor of this node:
     - Mark it as visited
     - Add it to the queue
     - Record the parent for path reconstruction

## Time & Space Complexity

- **Time Complexity:** O(V + E) where V is vertices and E is edges
- **Space Complexity:** O(V) for the queue and visited set

## When to Use BFS

- Finding the shortest path in **unweighted graphs**
- Level-order traversal of trees
- Finding all nodes within one connected component
- Testing if a graph is bipartite

## Real-World Applications

- **Social Networks:** Finding the shortest connection between two people
- **GPS Navigation:** Finding shortest route (with equal edge weights)
- **Web Crawlers:** Crawling websites level by level
- **Broadcasting:** Broadcasting in networks

## Pseudocode

\`\`\`
function BFS(graph, start, end):
    create empty queue Q
    create empty set visited
    
    Q.enqueue(start)
    visited.add(start)
    
    while Q is not empty:
        current = Q.dequeue()
        
        if current == end:
            return reconstructPath()
        
        for each neighbor of current:
            if neighbor not in visited:
                visited.add(neighbor)
                neighbor.parent = current
                Q.enqueue(neighbor)
    
    return "no path found"
\`\`\`

## Advantages

✅ Guarantees shortest path in unweighted graphs  
✅ Complete - will find a solution if one exists  
✅ Simple to implement and understand  

## Disadvantages

❌ Uses more memory than DFS (stores all nodes at current level)  
❌ Not optimal for weighted graphs  
❌ Can be slow for very large graphs  
`
  },
  {
    id: "dfs",
    title: "Depth-First Search (DFS)",
    description: "Explores as far as possible along each branch before backtracking",
    category: "pathfinding",
    difficulty: "beginner",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    content: `
# Depth-First Search (DFS)

## What is DFS?

Depth-First Search is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to keep track of the path.

## How It Works

1. Start at the source node and mark it as visited
2. For each unvisited neighbor:
   - Recursively visit that neighbor
   - Backtrack when no unvisited neighbors remain

## Time & Space Complexity

- **Time Complexity:** O(V + E) where V is vertices and E is edges
- **Space Complexity:** O(V) for the recursion stack

## When to Use DFS

- Finding if a path exists between two nodes
- Detecting cycles in a graph
- Topological sorting
- Solving puzzles with only one solution (mazes, sudoku)

## Real-World Applications

- **Maze Solving:** Finding any path through a maze
- **Cycle Detection:** Detecting deadlocks in operating systems
- **Topological Sorting:** Task scheduling with dependencies
- **Path Finding:** Finding any path (not necessarily shortest)

## Pseudocode

\`\`\`
function DFS(graph, current, end, visited):
    visited.add(current)
    
    if current == end:
        return true
    
    for each neighbor of current:
        if neighbor not in visited:
            if DFS(graph, neighbor, end, visited):
                return true
    
    return false
\`\`\`

## Advantages

✅ Uses less memory than BFS  
✅ Good for searching deep trees/graphs  
✅ Can be implemented with simple recursion  

## Disadvantages

❌ Does not guarantee shortest path  
❌ Can get stuck in infinite loops without visited tracking  
❌ May explore very deep paths unnecessarily  
`
  },
  {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    description: "Finds shortest path in weighted graphs with non-negative weights",
    category: "pathfinding",
    difficulty: "intermediate",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    content: `
# Dijkstra's Algorithm

## What is Dijkstra's Algorithm?

Dijkstra's algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights. It uses a greedy approach, always selecting the node with the smallest known distance.

## How It Works

1. Initialize distances to all nodes as infinity, except source (0)
2. Create a priority queue and add the source node
3. While the queue is not empty:
   - Extract the node with minimum distance
   - For each neighbor, calculate new distance through current node
   - If new distance is shorter, update it and add to queue

## Time & Space Complexity

- **Time Complexity:** O((V + E) log V) with min-heap
- **Space Complexity:** O(V) for distances and priority queue

## When to Use Dijkstra's

- Finding shortest path in **weighted graphs**
- All edge weights are **non-negative**
- Need single-source shortest paths
- Network routing protocols

## Real-World Applications

- **GPS Navigation:** Finding shortest driving route
- **Network Routing:** OSPF (Open Shortest Path First) protocol
- **Robotics:** Path planning with varying terrain costs
- **Game AI:** NPC pathfinding with movement costs

## Pseudocode

\`\`\`
function Dijkstra(graph, start, end):
    create distance array, set all to infinity
    distance[start] = 0
    create priority queue PQ
    PQ.add(start, 0)
    
    while PQ is not empty:
        current = PQ.extractMin()
        
        if current == end:
            return reconstructPath()
        
        for each neighbor of current:
            newDist = distance[current] + weight(current, neighbor)
            
            if newDist < distance[neighbor]:
                distance[neighbor] = newDist
                neighbor.parent = current
                PQ.add(neighbor, newDist)
    
    return "no path found"
\`\`\`

## Advantages

✅ Guarantees shortest path in weighted graphs  
✅ Efficient with priority queue implementation  
✅ Widely used and well-understood  

## Disadvantages

❌ Doesn't work with negative edge weights  
❌ Slower than BFS for unweighted graphs  
❌ Can be memory-intensive for large graphs  
`
  },
  {
    id: "astar",
    title: "A* Search Algorithm",
    description: "Informed search using heuristics to find optimal path efficiently",
    category: "pathfinding",
    difficulty: "intermediate",
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    content: `
# A* (A-Star) Search Algorithm

## What is A*?

A* is an informed search algorithm that uses heuristics to efficiently find the shortest path. It combines the benefits of Dijkstra's algorithm and Greedy Best-First Search by considering both the cost to reach a node and the estimated cost to the goal.

## How It Works

1. Use two costs for each node:
   - g(n): actual cost from start to node n
   - h(n): heuristic estimated cost from n to goal
   - f(n) = g(n) + h(n): total estimated cost
2. Always expand the node with lowest f(n) value
3. Update costs when finding shorter paths

## Time & Space Complexity

- **Time Complexity:** O(E) in worst case, but much faster with good heuristic
- **Space Complexity:** O(V) for storing nodes and costs

## When to Use A*

- Need optimal path in weighted graphs
- Have a good heuristic function available
- Want faster performance than Dijkstra's
- Grid-based pathfinding (games, robotics)

## Heuristic Functions

Common heuristics for grid-based pathfinding:

**Manhattan Distance:** |x1 - x2| + |y1 - y2|  
Best for 4-directional movement

**Euclidean Distance:** √((x1-x2)² + (y1-y2)²)  
Best for any-angle movement

**Chebyshev Distance:** max(|x1-x2|, |y1-y2|)  
Best for 8-directional movement

## Real-World Applications

- **Video Games:** Character pathfinding with obstacles
- **Robotics:** Navigation in complex environments
- **Route Planning:** Finding optimal routes with traffic
- **AI Planning:** Problem-solving in AI systems

## Pseudocode

\`\`\`
function AStar(graph, start, end):
    create openSet with start node
    create closedSet (empty)
    
    g[start] = 0
    f[start] = heuristic(start, end)
    
    while openSet is not empty:
        current = node in openSet with lowest f score
        
        if current == end:
            return reconstructPath()
        
        remove current from openSet
        add current to closedSet
        
        for each neighbor of current:
            if neighbor in closedSet:
                continue
            
            tentative_g = g[current] + distance(current, neighbor)
            
            if neighbor not in openSet:
                add neighbor to openSet
            else if tentative_g >= g[neighbor]:
                continue
            
            neighbor.parent = current
            g[neighbor] = tentative_g
            f[neighbor] = g[neighbor] + heuristic(neighbor, end)
    
    return "no path found"
\`\`\`

## Advantages

✅ Optimal if heuristic is admissible  
✅ Much faster than Dijkstra's with good heuristic  
✅ Widely used in games and robotics  
✅ Flexible with different heuristics  

## Disadvantages

❌ Requires good heuristic function  
❌ Can use more memory than other algorithms  
❌ Performance depends heavily on heuristic quality  
`
  },
  {
    id: "greedy",
    title: "Greedy Best-First Search",
    description: "Fast pathfinding using heuristics, but doesn't guarantee shortest path",
    category: "pathfinding",
    difficulty: "beginner",
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    content: `
# Greedy Best-First Search

## What is Greedy Best-First Search?

Greedy Best-First Search is an informed search algorithm that uses a heuristic to estimate the cost from the current node to the goal. Unlike A*, it only considers the heuristic value, not the actual cost to reach the current node.

## How It Works

1. Use only the heuristic h(n) to estimate distance to goal
2. Always expand the node that appears closest to goal
3. Does not track actual cost from start
4. Finds a path quickly but may not be optimal

## Time & Space Complexity

- **Time Complexity:** O(E) in worst case
- **Space Complexity:** O(V) for storing nodes

## When to Use Greedy Best-First

- Need a fast solution, not necessarily optimal
- Good heuristic available
- Memory or time constraints
- Initial solution for iterative refinement

## Real-World Applications

- **Video Games:** Quick pathfinding where approximate paths are acceptable
- **Robot Navigation:** Fast obstacle avoidance
- **Route Suggestions:** Quick preliminary routes
- **Puzzle Solving:** Finding solutions quickly

## Pseudocode

\`\`\`
function GreedyBestFirst(graph, start, end):
    create openSet with start node
    create closedSet (empty)
    
    while openSet is not empty:
        current = node in openSet with lowest h score
        
        if current == end:
            return reconstructPath()
        
        remove current from openSet
        add current to closedSet
        
        for each neighbor of current:
            if neighbor in closedSet:
                continue
            
            if neighbor not in openSet:
                neighbor.parent = current
                h[neighbor] = heuristic(neighbor, end)
                add neighbor to openSet
    
    return "no path found"
\`\`\`

## Advantages

✅ Very fast - often faster than A*  
✅ Simple to implement  
✅ Uses less memory than Dijkstra's or A*  
✅ Good for finding quick approximate solutions  

## Disadvantages

❌ Does not guarantee shortest path  
❌ Can get stuck in dead ends  
❌ No optimality guarantee  
❌ Path quality depends heavily on heuristic  

## Comparison with A*

| Aspect | Greedy | A* |
|--------|--------|-----|
| Optimality | ❌ No | ✅ Yes |
| Speed | ✅ Faster | Slower |
| Memory | ✅ Less | More |
| Use Case | Quick paths | Optimal paths |
`
  },
  {
    id: "bellman-ford",
    title: "Bellman-Ford Algorithm",
    description: "Finds shortest paths and can handle negative edge weights",
    category: "pathfinding",
    difficulty: "advanced",
    timeComplexity: "O(V × E)",
    spaceComplexity: "O(V)",
    content: `
# Bellman-Ford Algorithm

## What is Bellman-Ford?

Bellman-Ford is a shortest path algorithm that can handle graphs with negative edge weights. Unlike Dijkstra's algorithm, it can also detect negative weight cycles.

## How It Works

1. Initialize distances to all vertices as infinity except source (0)
2. Relax all edges V-1 times
3. Check for negative weight cycles

## Time & Space Complexity

- **Time Complexity:** O(V × E)
- **Space Complexity:** O(V)

## When to Use Bellman-Ford

- Graph has **negative edge weights**
- Need to detect **negative cycles**
- Distributed systems (distance vector routing)
- Currency arbitrage detection

## Real-World Applications

- **Currency Exchange:** Detecting arbitrage opportunities
- **Network Routing:** Distance-vector routing protocols (RIP)
- **Game Theory:** Analyzing strategic scenarios
- **Finance:** Portfolio optimization with constraints

## Advantages

✅ Works with negative edge weights  
✅ Detects negative cycles  
✅ Simple implementation  

## Disadvantages

❌ Slower than Dijkstra's (O(VE) vs O((V+E)logV))  
❌ Not suitable for very large graphs  
`
  },
  {
    id: "floyd-warshall",
    title: "Floyd-Warshall Algorithm",
    description: "Finds shortest paths between all pairs of vertices",
    category: "pathfinding",
    difficulty: "advanced",
    timeComplexity: "O(V³)",
    spaceComplexity: "O(V²)",
    content: `
# Floyd-Warshall Algorithm

## What is Floyd-Warshall?

Floyd-Warshall is an all-pairs shortest path algorithm. It finds the shortest paths between all pairs of vertices in a weighted graph.

## How It Works

1. Initialize distance matrix with edge weights
2. For each vertex k, update all pairs (i,j) if path through k is shorter
3. After V iterations, have shortest paths for all pairs

## Time & Space Complexity

- **Time Complexity:** O(V³)
- **Space Complexity:** O(V²)

## When to Use Floyd-Warshall

- Need shortest paths between **all pairs**
- Dense graphs
- Small graphs (due to cubic time complexity)
- Transitive closure computation

## Real-World Applications

- **Network Analysis:** Finding all shortest paths in a network
- **Route Optimization:** Pre-computing routes between all locations
- **Graph Reachability:** Determining connectivity
- **Game AI:** Pre-calculating movement costs

## Advantages

✅ Finds all-pairs shortest paths  
✅ Works with negative edges (not negative cycles)  
✅ Simple implementation  
✅ Good for dense graphs  

## Disadvantages

❌ Slow for large graphs (O(V³))  
❌ High memory usage (O(V²))  
❌ Overkill if only need single-source paths  
`
  }
];
