import unittest
import os
import sys

# Add parent directory to path to import models
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from models import load_melodies, save_melodies


class TestMelodyFunctions(unittest.TestCase):
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.test_file = 'tests/test_melodies.txt'
        self.test_melodies = [
            ['C', 'D', 'E', 'F', 'G'],
            ['A', 'B', 'C'],
            ['G', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
        ]
    
    def tearDown(self):
        """Clean up after each test method."""
        # Remove test file if it exists
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
    
    def test_save_and_load_melodies(self):
        """Test that melodies can be saved and then loaded correctly."""
        # Save melodies
        save_melodies(self.test_melodies, self.test_file)
        
        # Check file exists
        self.assertTrue(os.path.exists(self.test_file))
        
        # Load melodies
        loaded = load_melodies(self.test_file)
        
        # Check that loaded melodies match original
        self.assertEqual(len(loaded), len(self.test_melodies))
        self.assertEqual(loaded, self.test_melodies)
    
    def test_load_nonexistent_file(self):
        """Test that loading a non-existent file returns empty list and prints error."""
        nonexistent_file = 'tests/nonexistent_file.txt'
        
        # Should return empty list without crashing
        result = load_melodies(nonexistent_file)
        self.assertEqual(result, [])
    
    def test_load_empty_file(self):
        """Test that loading an empty file returns empty list."""
        empty_file = 'tests/empty_file.txt'
        
        # Create empty file
        with open(empty_file, 'w') as f:
            pass
        
        # Load should return empty list
        result = load_melodies(empty_file)
        self.assertEqual(result, [])
        
        # Clean up
        os.remove(empty_file)
    
    def test_save_empty_melodies_list(self):
        """Test that saving an empty list creates an empty file."""
        empty_file = 'tests/empty_output.txt'
        save_melodies([], empty_file)
        
        # File should exist but be empty (or have no content lines)
        self.assertTrue(os.path.exists(empty_file))
        with open(empty_file, 'r') as f:
            content = f.read().strip()
            self.assertEqual(content, '')
        
        # Clean up
        os.remove(empty_file)


if __name__ == '__main__':
    unittest.main()

