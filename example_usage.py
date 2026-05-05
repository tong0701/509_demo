"""
Example usage of the Melody Generator with Bigram model.
"""
from models import (
    load_melodies,
    save_melodies,
    preprocess_melodies,
    build_bigram_model,
    generate_melody
)


def main():
    """Main function demonstrating melody generation workflow."""
    # Step 1: Load melodies from file
    print("--- Step 1: Loading Data ---")
    input_path = 'data/melodies.txt'
    melodies = load_melodies(input_path)
    
    if not melodies:
        print("No melodies found. Exiting.")
        return
    
    print(f"Loaded {len(melodies)} melodies from {input_path}")
    
    # Step 2: Preprocess (Add ^ and $ tokens)
    print("\n--- Step 2: Preprocessing ---")
    processed_data = preprocess_melodies(melodies)
    print("Added start (^) and end ($) tokens to melodies.")
    
    # Step 3: Train the Bigram Model
    print("\n--- Step 3: Training Model ---")
    model = build_bigram_model(processed_data)
    print(f"Model trained. Learned {len(model)} unique notes/states.")
    
    # Step 4: Generate New Melodies
    print("\n--- Step 4: Generating Music ---")
    new_melodies = []
    num_generated = 5
    for i in range(num_generated):
        new_song = generate_melody(model)
        new_melodies.append(new_song)
        print(f"Generated {i+1}: {' '.join(new_song)}")
    
    # Step 5: Save Results
    print("\n--- Step 5: Saving Results ---")
    output_path = 'data/generated_melodies.txt'
    save_melodies(new_melodies, output_path)
    print(f"Saved {len(new_melodies)} generated melodies to {output_path}")


if __name__ == "__main__":
    main()

