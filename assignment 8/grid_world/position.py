"""
Position class for representing grid cell coordinates.
"""


class Position:
    """Represents a position (row, col) in a grid world."""
    
    def __init__(self, row, col):
        """
        Initialize a Position.
        
        Args:
            row: Row index
            col: Column index
        """
        self.row = row
        self.col = col
    
    def neighbors_4(self):
        """
        Return the four neighboring positions (up, down, left, right).
        
        Returns:
            List of Position objects
        """
        return [
            Position(self.row - 1, self.col),  # up
            Position(self.row + 1, self.col),  # down
            Position(self.row, self.col - 1),  # left
            Position(self.row, self.col + 1),  # right
        ]
    
    def __eq__(self, other):
        """Check if two positions are equal."""
        if not isinstance(other, Position):
            return False
        return self.row == other.row and self.col == other.col
    
    def __hash__(self):
        """Make Position hashable for use in sets and dicts."""
        return hash((self.row, self.col))
    
    def __repr__(self):
        """Return string representation like '(2,3)'."""
        return f"({self.row},{self.col})"

