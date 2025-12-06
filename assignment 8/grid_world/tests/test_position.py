"""Unit tests for Position class."""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from position import Position


def test_position_creation():
    """Test Position creation."""
    pos = Position(2, 3)
    assert pos.row == 2
    assert pos.col == 3
    print("✓ Position creation test passed")


def test_neighbors_4():
    """Test neighbors_4 method."""
    pos = Position(2, 3)
    neighbors = pos.neighbors_4()
    assert len(neighbors) == 4
    assert Position(1, 3) in neighbors  # up
    assert Position(3, 3) in neighbors  # down
    assert Position(2, 2) in neighbors  # left
    assert Position(2, 4) in neighbors  # right
    print("✓ neighbors_4 test passed")


def test_equality():
    """Test __eq__ method."""
    pos1 = Position(2, 3)
    pos2 = Position(2, 3)
    pos3 = Position(3, 2)
    assert pos1 == pos2
    assert pos1 != pos3
    print("✓ Equality test passed")


def test_hash():
    """Test __hash__ method."""
    pos1 = Position(2, 3)
    pos2 = Position(2, 3)
    pos_set = {pos1, pos2}
    assert len(pos_set) == 1  # Should be deduplicated
    print("✓ Hash test passed")


def test_repr():
    """Test __repr__ method."""
    pos = Position(2, 3)
    assert repr(pos) == "(2,3)"
    print("✓ __repr__ test passed")


if __name__ == "__main__":
    test_position_creation()
    test_neighbors_4()
    test_equality()
    test_hash()
    test_repr()
    print("\nAll Position tests passed!")

