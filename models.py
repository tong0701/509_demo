import random


def load_melodies(path: str) -> list[list[str]]:
    """
    Read melodies from a file and return as list of note lists.
    
    Parameters:
    path: str - path to the file containing melodies
    
    Returns:
    list[list[str]] - list of melodies, where each melody is a list of notes
    """
    melodies = []
    try:
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line:  # Skip empty lines
                    # Split the line into notes (assuming space or comma separated)
                    # Try comma first, then space
                    if ',' in line:
                        notes = [note.strip() for note in line.split(',')]
                    else:
                        notes = line.split()
                    melodies.append(notes)
        return melodies
    except FileNotFoundError:
        print(f"File not found: {path}")
        print("Please make sure the dataset file exists.")
        return []
    except Exception as e:
        print(f"Error reading file: {e}")
        return []


def save_melodies(melodies: list[list[str]], path: str) -> None:
    """
    Save a list of generated melodies to a file, one melody per line.
    
    Parameters:
    melodies: list[list[str]] - list of melodies to save
    path: str - path to the output file
    """
    try:
        with open(path, 'w', encoding='utf-8') as f:
            for melody in melodies:
                # Join notes with space (or comma if preferred)
                line = ' '.join(melody)
                f.write(line + '\n')
    except Exception as e:
        print(f"Error saving file: {e}")


# --- Bigram Model Functions ---


def preprocess_melodies(melodies: list[list[str]]) -> list[list[str]]:
    """
    Add start (^) and end ($) tokens to melodies for training.
    
    Parameters:
    melodies: list[list[str]] - list of melodies to preprocess
    
    Returns:
    list[list[str]] - melodies with start and end tokens added
    """
    processed = []
    for melody in melodies:
        processed.append(['^'] + melody + ['$'])
    return processed


def build_bigram_model(melodies: list[list[str]]) -> dict:
    """
    Build a Bigram model from melodies.
    The model stores transition counts between consecutive notes.
    
    Parameters:
    melodies: list[list[str]] - preprocessed melodies with ^ and $ tokens
    
    Returns:
    dict - Bigram model where model[note1][note2] = count of note1->note2 transitions
    """
    model = {}
    for melody in melodies:
        for i in range(len(melody) - 1):
            current_note = melody[i]
            next_note = melody[i + 1]
            
            if current_note not in model:
                model[current_note] = {}
            
            if next_note not in model[current_note]:
                model[current_note][next_note] = 0
            
            model[current_note][next_note] += 1
    return model


def generate_melody(model: dict, max_length: int = 20) -> list[str]:
    """
    Generate a new melody using the trained Bigram model.
    
    Parameters:
    model: dict - trained Bigram model
    max_length: int - maximum length of generated melody (default: 20)
    
    Returns:
    list[str] - generated melody as a list of notes
    """
    if '^' not in model:
        return []
    
    melody = []
    current_note = '^'
    
    for _ in range(max_length):
        if current_note not in model:
            break
        
        transitions = model[current_note]
        next_notes = list(transitions.keys())
        weights = list(transitions.values())
        
        # Weighted random selection based on transition frequencies
        next_note = random.choices(next_notes, weights=weights, k=1)[0]
        
        if next_note == '$':
            break
        
        melody.append(next_note)
        current_note = next_note
    
    return melody

