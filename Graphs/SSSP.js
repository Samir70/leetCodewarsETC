/**
 * Single Source Shortest Path
 * Dijkstra's Algorithm
 * 
    Mark your selected initial node with a current distance of 0 and the rest with infinity.
    Set the non-visited node with the smallest current distance as the current node C.
    For each neighbour N of your current node C: 
            add the current distance of C with the weight of the edge connecting C to N. 
            If it's smaller than the current distance of N, set it as the new current distance of N.
    Mark the current node C as visited.
    If there are non-visited nodes, go to step 2.

 */