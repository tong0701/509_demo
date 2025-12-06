# Taya Li

# How to Represent a Melody in Python

# A **melody** can be represented as an **ordered collection of notes**.
# In Python, we want a data structure that keeps both **content** (which notes) and **order** (when they occur).
# The simplest and most intuitive way is to use a **list**.

# ---

# ## Representing a Single Melody

melody_1 = ["C", "D", "E", "F", "G"]
# This structure keeps the notes in the exact sequence they are played: C → D → E → F → G

# Why a List?
# Order matters: lists preserve order automatically.
# Simple and readable: strings make each note clear.
# Expandable: we can easily add or remove notes.

melody_1.append("A")
melody_2 = ["G", "F", "E", "D", "C"]
all_melodies = [melody_1, melody_2]
print(all_melodies)

# Grouping Multiple Melodies
# When we have several melodies (for example, different phrases or short songs), we can use a list of lists to preserve both grouping and sequence.
melodies = [
    ["C", "D", "E", "F", "G"],
    ["A", "B", "C", "D", "E"],
    ["E", "F", "G", "A", "B"]
]

# Access examples:
full_melody = melodies[0]
single_note = melodies[0][2]  # "E"
print(f"Full melody: {full_melody}")
print(f"Single note: {single_note}")


# Flattening or Combining Melodies
# Sometimes, we may want to treat all melodies as one continuous sequence for analysis or training.
all_notes = []
for melody in melodies:
    all_notes.extend(melody)
print(all_notes)

# This approach uses list concatenation (+ or .extend())
# to flatten multiple melodies into a single ordered list of notes.

# Designing Training Data

# If we build a music-learning system, we might want to store not only the notes but also metadata like:
#
# Duration of each note
# Tempo or rhythm
# Title of the melody
#
# We can use a list of dictionaries to represent this structured data:

melody_data = [
    {
        "title": "Melody 1",
        "notes": ["C", "D", "E", "F", "G"],
        "durations": [1, 1, 2, 1, 1],
        "tempo": 120
    },
    {
        "title": "Melody 2",
        "notes": ["A", "B", "C", "D", "E"],
        "durations": [1, 1, 1, 2, 1],
        "tempo": 100
    }
]
print(melody_data[0]["title"]) # Accessing data


# Summary
#
# Using lists allows us to:
#
# Preserve the order of musical notes
#
# Group melodies logically
#
# Combine or flatten sequences for analysis
#
# Extend easily with metadata for learning or generation tasks
#
# In short, a list (or a list of lists) is a flexible, readable, and Pythonic way to represent melodies as ordered sequences of notes.