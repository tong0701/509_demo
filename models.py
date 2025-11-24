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

