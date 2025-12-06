"""
Unit tests for check_winner method of Board class.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from models.board import Board


def test_check_winner_row():
    """Test check_winner with winning row."""
    board = Board()
    # X wins in first row
    board.make_move(0, 0, 'X')
    board.make_move(1, 0, 'O')
    board.make_move(0, 1, 'X')
    board.make_move(1, 1, 'O')
    board.make_move(0, 2, 'X')
    
    assert board.check_winner() == 'X', "X should win with a row"
    print("✓ Row win test passed")


def test_check_winner_column():
    """Test check_winner with winning column."""
    board = Board()
    # O wins in second column
    board.make_move(0, 0, 'X')
    board.make_move(0, 1, 'O')
    board.make_move(1, 0, 'X')
    board.make_move(1, 1, 'O')
    board.make_move(2, 2, 'X')
    board.make_move(2, 1, 'O')
    
    assert board.check_winner() == 'O', "O should win with a column"
    print("✓ Column win test passed")


def test_check_winner_diagonal():
    """Test check_winner with winning diagonal."""
    board = Board()
    # X wins with main diagonal
    board.make_move(0, 0, 'X')
    board.make_move(0, 1, 'O')
    board.make_move(1, 1, 'X')
    board.make_move(0, 2, 'O')
    board.make_move(2, 2, 'X')
    
    assert board.check_winner() == 'X', "X should win with main diagonal"
    print("✓ Main diagonal win test passed")


def test_check_winner_anti_diagonal():
    """Test check_winner with winning anti-diagonal."""
    board = Board()
    # O wins with anti-diagonal
    board.make_move(0, 0, 'X')
    board.make_move(0, 2, 'O')
    board.make_move(1, 0, 'X')
    board.make_move(1, 1, 'O')
    board.make_move(2, 0, 'X')
    board.make_move(2, 0, 'O')  # This should fail, but let's test properly
    board = Board()
    board.make_move(0, 0, 'X')
    board.make_move(0, 2, 'O')
    board.make_move(1, 0, 'X')
    board.make_move(1, 1, 'O')
    board.make_move(0, 1, 'X')
    board.make_move(2, 0, 'O')
    
    assert board.check_winner() == 'O', "O should win with anti-diagonal"
    print("✓ Anti-diagonal win test passed")


def test_check_winner_tie():
    """Test check_winner with a tie."""
    board = Board()
    # Create a tie scenario
    # X O X
    # O O X
    # X X O
    board.make_move(0, 0, 'X')
    board.make_move(0, 1, 'O')
    board.make_move(0, 2, 'X')
    board.make_move(1, 0, 'O')
    board.make_move(1, 1, 'O')
    board.make_move(1, 2, 'X')
    board.make_move(2, 0, 'X')
    board.make_move(2, 1, 'X')
    board.make_move(2, 2, 'O')
    
    assert board.check_winner() == 'Tie', "Should be a tie"
    print("✓ Tie test passed")


def test_check_winner_ongoing():
    """Test check_winner when game is still ongoing."""
    board = Board()
    board.make_move(0, 0, 'X')
    board.make_move(0, 1, 'O')
    
    assert board.check_winner() is None, "Game should still be ongoing"
    print("✓ Ongoing game test passed")


def test_check_winner_no_winner():
    """Test check_winner with no winner but board not full."""
    board = Board()
    # Partial board with no winner
    board.make_move(0, 0, 'X')
    board.make_move(1, 1, 'O')
    board.make_move(2, 2, 'X')
    
    assert board.check_winner() is None, "No winner yet"
    print("✓ No winner test passed")


if __name__ == "__main__":
    test_check_winner_row()
    test_check_winner_column()
    test_check_winner_diagonal()
    test_check_winner_anti_diagonal()
    test_check_winner_tie()
    test_check_winner_ongoing()
    test_check_winner_no_winner()
    print("\nAll check_winner tests passed!")

