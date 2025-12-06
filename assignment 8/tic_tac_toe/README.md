# Tic Tac Toe Game

## Problem Description

A simple command-line implementation of the classic Tic Tac Toe game, written in Python. This project demonstrates object-oriented programming concepts, including encapsulation, inheritance, and modularity. The game supports both human and random AI players.

## Features

- **Two Players**: Human vs Human or Human vs Random AI
- **Random AI Player**: The random player chooses moves randomly
- **Game Logging**: Saves the winner and first player to a CSV file for tracking game outcomes

## Project Structure

```
tic_tac_toe/
├── main.py                   # Entry point to start the game
├── models/                   # Core game classes
│   ├── __init__.py
│   ├── board.py              # Handles the game board and logic
│   ├── player.py             # Manages human and AI players
├── utils/                    # Support functions
│   ├── __init__.py
│   ├── game_logic.py         # Orchestrates the game flow
│   ├── game_data.py          # Stores game outcomes in a CSV file
├── data/                     # Stores generated game data
│   └── game_data.csv         # Records first player and winner
├── tests/                    # Unit tests
│   └── test_check_winner.py  # Unit test of check_winner method
├── .gitignore                # Specifies ignored files and directories
├── README.md                 # Project documentation
└── requirements.txt          # Required packages for the project
```

## Installation and Usage

### Build Environment

```bash
cd tic_tac_toe
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### How to Run

**For MacOS/Linux users:**
```bash
python3 main.py
```

**For Windows users:**
```bash
python main.py
```

### Gameplay

1. When prompted, choose player types:
   - Enter `h` for human player
   - Enter `r` for random AI player

2. Enter moves by typing row and column indices separated by space (e.g., `1 2`)

3. The game continues until there's a winner or a tie

4. Game results are automatically saved to `data/game_data.csv`

### Customization

Customize the maximum number of attempts of AI player by changing `max_attempts` in the `RandomPlayer` class initialization in `models/player.py`.

## Implementation Details

### Board Class (`models/board.py`)

- **`draw_board()`**: Displays the current board state in a readable format
- **`check_winner()`**: Checks for winning conditions (rows, columns, diagonals) or a tie
- **`is_valid_move()`**: Validates if a move is legal
- **`make_move()`**: Places a symbol on the board
- **`get_empty_cells()`**: Returns list of available positions

### Player Classes (`models/player.py`)

- **`Player`**: Human player that gets input from terminal
- **`RandomPlayer`**: AI player that makes random valid moves

### Game Logic (`utils/game_logic.py`)

- **`play_tic_tac_toe()`**: Main game loop that orchestrates gameplay

### Game Data (`utils/game_data.py`)

- **`save_game_data()`**: Saves game outcomes (first player, winner) to CSV file

## Testing

Run unit tests for the `check_winner` method:

```bash
python tests/test_check_winner.py
```

The tests cover:
- Row wins
- Column wins
- Diagonal wins (main and anti-diagonal)
- Tie games
- Ongoing games

## Sample Input and Output

```
Welcome to Tic Tac Toe!
Enter 'h' for human player or 'r' for random AI player
Player 1 (X) type (h/r): h
Player 2 (O) type (h/r): r

Game started! Player X goes first.

  0   1   2
  ---------
0|   |   |   |
  ---------
1|   |   |   |
  ---------
2|   |   |   |

Player X, enter your move (row col): 1 1

  0   1   2
  ---------
0|   |   |   |
  ---------
1|   | X |   |
  ---------
2|   |   |   |

...

Player X wins!
```

## Game Data

Game results are saved to `data/game_data.csv` with the following format:
- `timestamp`: When the game ended
- `first_player`: Who went first ('X' or 'O')
- `winner`: Game outcome ('X', 'O', or 'Tie')

