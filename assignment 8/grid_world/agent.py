"""
Agent class for controlling movement in the grid world.
"""

from .position import Position


class Agent:
    """Represents an agent that can move in a GridWorld."""
    
    def __init__(self, world, pos=None):
        """
        Initialize an Agent.
        
        Args:
            world: GridWorld instance
            pos: Starting position (defaults to world.start)
        """
        self.world = world
        self.at = pos if pos else world.start
    
    def can_move_to(self, pos):
        """
        Check if agent can move to the given position.
        
        Args:
            pos: Position object
            
        Returns:
            True if position is in bounds and not a wall
        """
        return self.world.in_bounds(pos) and self.world.passable(pos)
    
    def step(self, direction):
        """
        Move the agent in the given direction.
        
        Args:
            direction: 'up', 'down', 'left', or 'right'
            
        Returns:
            True if the move was successful, False otherwise
        """
        direction_map = {
            'up': Position(self.at.row - 1, self.at.col),
            'down': Position(self.at.row + 1, self.at.col),
            'left': Position(self.at.row, self.at.col - 1),
            'right': Position(self.at.row, self.at.col + 1),
        }
        
        if direction not in direction_map:
            return False
        
        new_pos = direction_map[direction]
        if self.can_move_to(new_pos):
            self.at = new_pos
            return True
        return False
    
    def reset(self, pos):
        """
        Teleport the agent to a new position.
        
        Args:
            pos: Position object
        """
        self.at = pos

