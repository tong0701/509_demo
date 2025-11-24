"""
Example usage of load_melodies and save_melodies functions.
"""
from models import load_melodies, save_melodies

# Example 1: Load melodies from file
print("Loading melodies from data/melodies.txt...")
melodies = load_melodies('data/melodies.txt')
print(f"Loaded {len(melodies)} melodies:")
for i, melody in enumerate(melodies, 1):
    print(f"  Melody {i}: {' '.join(melody)}")

# Example 2: Create new melodies and save them
print("\nCreating new melodies...")
new_melodies = [
    ['C', 'E', 'G', 'C'],
    ['D', 'F', 'A'],
    ['G', 'B', 'D', 'G']
]
save_melodies(new_melodies, 'data/generated_melodies.txt')
print("Saved new melodies to data/generated_melodies.txt")

# Example 3: Load the saved melodies
print("\nLoading saved melodies...")
loaded = load_melodies('data/generated_melodies.txt')
print(f"Loaded {len(loaded)} melodies:")
for i, melody in enumerate(loaded, 1):
    print(f"  Melody {i}: {' '.join(melody)}")

# Example 4: Try loading a non-existent file (should show error message)
print("\nTrying to load non-existent file...")
result = load_melodies('data/nonexistent.txt')
print(f"Result: {result}")

