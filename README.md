# TECHIN 509: Melody Generator

A Python project for loading, saving, and managing musical melodies represented as sequences of notes.

## Project Overview

This project provides utilities for working with musical melodies in a simple text-based format. Melodies are represented as sequences of note names (e.g., C, D, E, F, G, A, B) and can be loaded from or saved to text files. The project uses a **Bigram model** to learn patterns from existing melodies and generate new ones.

## Features

- **Load melodies** from text files (space or comma-separated)
- **Save melodies** to text files
- **Generate new melodies** using a Bigram probability model trained on existing melodies
- **Error handling** for missing files and invalid inputs
- **Comprehensive test suite** for all functionality

## Project Structure

```
509/
├── README.md              # This file
├── models.py              # Core functions for loading and saving melodies
├── example_usage.py       # Example usage demonstrations
├── data/
│   └── melodies.txt       # Sample melody dataset
└── tests/
    └── test_models.py     # Unit tests for the melody functions
```

## Requirements

- **Python 3.9+** (required for type hints syntax like `list[list[str]]`)

No external dependencies are required - this project uses only Python standard library modules.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/tong0701/melody-generator-509.git
   cd melody-generator-509
   ```

2. Ensure you have Python 3.9 or higher installed:
   ```bash
   python3 --version
   ```

## Usage

### Basic Usage

#### Loading Melodies

```python
from models import load_melodies

# Load melodies from a file
melodies = load_melodies('data/melodies.txt')
print(f"Loaded {len(melodies)} melodies")
for melody in melodies:
    print(' '.join(melody))
```

#### Saving Melodies

```python
from models import save_melodies

# Create and save melodies
new_melodies = [
    ['C', 'E', 'G', 'C'],
    ['D', 'F', 'A'],
    ['G', 'B', 'D', 'G']
]
save_melodies(new_melodies, 'data/generated_melodies.txt')
```

#### Generating Melodies with Bigram Model

```python
from models import (
    load_melodies,
    preprocess_melodies,
    build_bigram_model,
    generate_melody,
    save_melodies
)

# Load and preprocess melodies
melodies = load_melodies('data/melodies.txt')
processed = preprocess_melodies(melodies)

# Train the model
model = build_bigram_model(processed)

# Generate new melodies
new_melody = generate_melody(model, max_length=20)
print(' '.join(new_melody))
```

### Running Examples

Run the example usage script to generate new melodies:

```bash
python3 example_usage.py
```

This will:
1. Load melodies from `data/melodies.txt`
2. Preprocess melodies (add start/end tokens)
3. Train a Bigram model on the loaded melodies
4. Generate 5 new melodies using the trained model
5. Save the generated melodies to `data/generated_melodies.txt`

### Running Tests

Run the test suite to verify all functionality:

```bash
python3 -m pytest tests/
```

Or using unittest:

```bash
python3 -m unittest tests.test_models
```

## Data Format

Melodies are stored in text files where each line represents one melody. Notes can be separated by spaces or commas:

**Space-separated format:**
```
C D E F G A B C
A B C D E
G A B C D E F G
```

**Comma-separated format:**
```
C, D, E, F, G, A, B, C
A, B, C, D, E
```

## API Reference

### `load_melodies(path: str) -> list[list[str]]`

Read melodies from a file and return as a list of note lists.

**Parameters:**
- `path` (str): Path to the file containing melodies

**Returns:**
- `list[list[str]]`: List of melodies, where each melody is a list of notes

**Example:**
```python
melodies = load_melodies('data/melodies.txt')
```

### `save_melodies(melodies: list[list[str]], path: str) -> None`

Save a list of melodies to a file, one melody per line.

**Parameters:**
- `melodies` (list[list[str]]): List of melodies to save
- `path` (str): Path to the output file

**Example:**
```python
save_melodies([['C', 'E', 'G']], 'output.txt')
```

### `preprocess_melodies(melodies: list[list[str]]) -> list[list[str]]`

Add start (^) and end ($) tokens to melodies for training.

**Parameters:**
- `melodies` (list[list[str]]): List of melodies to preprocess

**Returns:**
- `list[list[str]]`: Melodies with start and end tokens added

**Example:**
```python
processed = preprocess_melodies([['C', 'D', 'E']])
# Returns: [['^', 'C', 'D', 'E', '$']]
```

### `build_bigram_model(melodies: list[list[str]]) -> dict`

Build a Bigram model from preprocessed melodies. The model stores transition counts between consecutive notes.

**Parameters:**
- `melodies` (list[list[str]]): Preprocessed melodies with ^ and $ tokens

**Returns:**
- `dict`: Bigram model where `model[note1][note2]` = count of note1→note2 transitions

**Example:**
```python
model = build_bigram_model(processed_melodies)
```

### `generate_melody(model: dict, max_length: int = 20) -> list[str]`

Generate a new melody using the trained Bigram model.

**Parameters:**
- `model` (dict): Trained Bigram model
- `max_length` (int): Maximum length of generated melody (default: 20)

**Returns:**
- `list[str]`: Generated melody as a list of notes

**Example:**
```python
new_melody = generate_melody(model, max_length=15)
```

## Example Output

When running `example_usage.py`, you should see output like:

```
--- Step 1: Loading Data ---
Loaded 8 melodies from data/melodies.txt

--- Step 2: Preprocessing ---
Added start (^) and end ($) tokens to melodies.

--- Step 3: Training Model ---
Model trained. Learned 9 unique notes/states.

--- Step 4: Generating Music ---
Generated 1: C D E F G A B C
Generated 2: A B C D E
Generated 3: G A B C D E F G
Generated 4: C E G
Generated 5: F A C

--- Step 5: Saving Results ---
Saved 5 generated melodies to data/generated_melodies.txt
```

## Testing

The project includes comprehensive unit tests covering:
- Saving and loading melodies
- Error handling for non-existent files
- Empty file handling
- Empty melody list handling

Run tests with:
```bash
python3 -m unittest tests.test_models
```

All tests should pass successfully.

## Error Handling

The functions include error handling for:
- **File not found**: Returns empty list and prints informative error message
- **Empty files**: Returns empty list
- **Invalid file paths**: Gracefully handles exceptions

## Contributing

This is a course project for TECHIN 509. For questions or issues, please open an issue on the GitHub repository.

## License

This project is part of the TECHIN 509 course work.

## Author

Tong - TECHIN 509 Student

