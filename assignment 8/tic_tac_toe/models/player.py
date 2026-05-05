"""
Player classes for Tic Tac Toe game.
"""

import random


class Player:
    """Represents a human player."""
    
    def __init__(self, symbol):
        """
        Initialize a player.
        
        Args:
            symbol: 'X' or 'O'
        """
        self.symbol = symbol
    
    def get_move(self, board):
        """
        Get move from human player via input.
        
        Args:
            board: Board instance
            
        Returns:
            (row, col) tuple
        """
        while True:
            try:
                move = input(f"Player {self.symbol}, enter your move (row col): ").split()
                if len(move) != 2:
                    print("Please enter two numbers separated by space.")
                    continue
                row, col = int(move[0]), int(move[1])
                if board.is_valid_move(row, col):
                    return row, col
                else:
                    print("Invalid move. Try again.")
            except ValueError:
                print("Please enter valid numbers.")
            except (IndexError, KeyboardInterrupt):
                print("\nGame interrupted.")
                raise


class RandomPlayer:
    """Represents a random AI player."""
    
    def __init__(self, symbol, max_attempts=100):
        """
        Initialize a random player.
        
        Args:
            symbol: 'X' or 'O'
            max_attempts: Maximum number of attempts to find a valid move
        """
        self.symbol = symbol
        self.max_attempts = max_attempts
    
    def get_move(self, board):
        """
        Get a random valid move.
        
        Args:
            board: Board instance
            
        Returns:
            (row, col) tuple
        """
        empty_cells = board.get_empty_cells()
        if not empty_cells:
            raise ValueError("No valid moves available")
        
        return random.choice(empty_cells)

