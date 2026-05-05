"""
GridWorld class for representing a grid with walls, start, and goal.
"""

from .position import Position


class GridWorld:
    """Represents a grid world with walls, start position, and goal position."""
    
    def __init__(self, rows, cols, walls=None, start=None, goal=None):
        """
        Initialize a GridWorld.
        
        Args:
            rows: Number of rows
            cols: Number of columns
            walls: Set of Position objects representing walls
            start: Start Position
            goal: Goal Position
        """
        self.rows = rows
        self.cols = cols
        self.walls = set(walls) if walls else set()
        self.start = start
        self.goal = goal
    
    def in_bounds(self, pos):
        """
        Check if position is inside the grid.
        
        Args:
            pos: Position object
            
        Returns:
            True if position is within bounds
        """
        return 0 <= pos.row < self.rows and 0 <= pos.col < self.cols
    
    def passable(self, pos):
        """
        Check if position is not a wall.
        
        Args:
            pos: Position object
            
        Returns:
            True if position is passable (not a wall)
        """
        return pos not in self.walls
    
    def is_goal(self, pos):
        """
        Check if position is the goal.
        
        Args:
            pos: Position object
            
        Returns:
            True if position is the goal
        """
        return pos == self.goal
    
    def place_wall(self, pos):
        """
        Add a wall at the given position.
        
        Args:
            pos: Position object
        """
        self.walls.add(pos)
    
    def remove_wall(self, pos):
        """
        Remove a wall at the given position.
        
        Args:
            pos: Position object
        """
        self.walls.discard(pos)
    
    def render(self, path=None, agent=None):
        """
        Print the grid in ASCII format.
        
        Args:
            path: List of Position objects representing the path
            agent: Current agent Position
        """
        path_set = set(path) if path else set()
        
        print("+" + "-" * self.cols + "+")
        for row in range(self.rows):
            print("|", end="")
            for col in range(self.cols):
                pos = Position(row, col)
                
                if agent and pos == agent:
                    print("A", end="")
                elif pos == self.start:
                    print("S", end="")
                elif pos == self.goal:
                    print("G", end="")
                elif pos in path_set:
                    print("*", end="")
                elif pos in self.walls:
                    print("#", end="")
                else:
                    print(".", end="")
            print("|")
        print("+" + "-" * self.cols + "+")

