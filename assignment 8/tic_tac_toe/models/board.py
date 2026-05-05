"""
Board class for Tic Tac Toe game.
Handles the game board and logic.
"""


class Board:
    """Represents a Tic Tac Toe game board."""
    
    def __init__(self):
        """Initialize an empty 3x3 board."""
        self.board = [[' ' for _ in range(3)] for _ in range(3)]
    
    def draw_board(self):
        """
        Draw the current board state.
        Prints the board in a readable format.
        """
        print("\n  0   1   2")
        print("  ---------")
        for i in range(3):
            print(f"{i}| {self.board[i][0]} | {self.board[i][1]} | {self.board[i][2]} |")
            if i < 2:
                print("  ---------")
        print()
    
    def is_valid_move(self, row, col):
        """
        Check if a move is valid.
        
        Args:
            row: Row index (0-2)
            col: Column index (0-2)
            
        Returns:
            True if the move is valid, False otherwise
        """
        if not (0 <= row < 3 and 0 <= col < 3):
            return False
        return self.board[row][col] == ' '
    
    def make_move(self, row, col, symbol):
        """
        Make a move on the board.
        
        Args:
            row: Row index (0-2)
            col: Column index (0-2)
            symbol: 'X' or 'O'
            
        Returns:
            True if move was successful, False otherwise
        """
        if self.is_valid_move(row, col):
            self.board[row][col] = symbol
            return True
        return False
    
    def check_winner(self):
        """
        Check if there is a winner.
        
        Returns:
            'X' if X wins, 'O' if O wins, 'Tie' if board is full with no winner,
            None if game is still ongoing
        """
        # Check rows
        for row in self.board:
            if row[0] == row[1] == row[2] != ' ':
                return row[0]
        
        # Check columns
        for col in range(3):
            if self.board[0][col] == self.board[1][col] == self.board[2][col] != ' ':
                return self.board[0][col]
        
        # Check diagonals
        if self.board[0][0] == self.board[1][1] == self.board[2][2] != ' ':
            return self.board[0][0]
        if self.board[0][2] == self.board[1][1] == self.board[2][0] != ' ':
            return self.board[0][2]
        
        # Check for tie (board is full)
        if all(self.board[i][j] != ' ' for i in range(3) for j in range(3)):
            return 'Tie'
        
        # Game is still ongoing
        return None
    
    def is_full(self):
        """
        Check if the board is full.
        
        Returns:
            True if board is full, False otherwise
        """
        return all(self.board[i][j] != ' ' for i in range(3) for j in range(3))
    
    def get_empty_cells(self):
        """
        Get list of empty cell positions.
        
        Returns:
            List of (row, col) tuples for empty cells
        """
        empty = []
        for i in range(3):
            for j in range(3):
                if self.board[i][j] == ' ':
                    empty.append((i, j))
        return empty

