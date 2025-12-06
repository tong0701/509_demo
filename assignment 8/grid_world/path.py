"""
Pathfinder class for finding shortest paths using BFS.
"""

from collections import deque
from .position import Position


class Pathfinder:
    """Finds paths in a GridWorld using BFS."""
    
    def __init__(self, world):
        """
        Initialize a Pathfinder.
        
        Args:
            world: GridWorld instance
        """
        self.world = world
        self.expanded_count = 0
    
    def find_path(self, start, goal):
        """
        Find shortest path from start to goal using BFS.
        
        Args:
            start: Start Position
            goal: Goal Position
            
        Returns:
            List of Position objects representing the path, or None if no path exists
        """
        if not self.world.in_bounds(start) or not self.world.passable(start):
            return None
        if not self.world.in_bounds(goal) or not self.world.passable(goal):
            return None
        
        # BFS
        queue = deque([start])
        came_from = {start: None}
        self.expanded_count = 0
        
        while queue:
            current = queue.popleft()
            self.expanded_count += 1
            
            if current == goal:
                # Reconstruct path
                path = []
                while current is not None:
                    path.append(current)
                    current = came_from[current]
                return list(reversed(path))
            
            for neighbor in current.neighbors_4():
                if (self.world.in_bounds(neighbor) and 
                    self.world.passable(neighbor) and 
                    neighbor not in came_from):
                    queue.append(neighbor)
                    came_from[neighbor] = current
        
        return None

