"""
Game logic for Tic Tac Toe.
Orchestrates the game flow.
"""

from models.board import Board
from models.player import Player, RandomPlayer
from utils.game_data import save_game_data


def play_tic_tac_toe():
    """
    Main game loop for Tic Tac Toe.
    """
    print("Welcome to Tic Tac Toe!")
    print("Enter 'h' for human player or 'r' for random AI player")
    
    # Get player types
    player1_type = input("Player 1 (X) type (h/r): ").lower().strip()
    player2_type = input("Player 2 (O) type (h/r): ").lower().strip()
    
    # Create players
    if player1_type == 'r':
        player1 = RandomPlayer('X')
    else:
        player1 = Player('X')
    
    if player2_type == 'r':
        player2 = RandomPlayer('O')
    else:
        player2 = Player('O')
    
    # Initialize game
    board = Board()
    current_player = player1
    first_player = 'X'
    
    print("\nGame started! Player X goes first.")
    board.draw_board()
    
    # Game loop
    while True:
        try:
            # Get move
            row, col = current_player.get_move(board)
            
            # Make move
            board.make_move(row, col, current_player.symbol)
            board.draw_board()
            
            # Check for winner
            winner = board.check_winner()
            if winner:
                if winner == 'Tie':
                    print("It's a tie!")
                    save_game_data(first_player, 'Tie')
                else:
                    print(f"Player {winner} wins!")
                    save_game_data(first_player, winner)
                break
            
            # Switch players
            current_player = player2 if current_player == player1 else player1
            
        except (ValueError, KeyboardInterrupt) as e:
            print(f"\nGame ended: {e}")
            break

