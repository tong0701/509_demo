"""Unit tests for GridWorld class."""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from position import Position
from grid_world import GridWorld


def test_in_bounds():
    """Test in_bounds method."""
    world = GridWorld(5, 7)
    assert world.in_bounds(Position(0, 0))
    assert world.in_bounds(Position(4, 6))
    assert not world.in_bounds(Position(-1, 0))
    assert not world.in_bounds(Position(5, 0))
    assert not world.in_bounds(Position(0, 7))
    print("✓ in_bounds test passed")


def test_passable():
    """Test passable method."""
    world = GridWorld(5, 7)
    pos = Position(2, 3)
    assert world.passable(pos)
    
    world.place_wall(pos)
    assert not world.passable(pos)
    print("✓ passable test passed")


def test_is_goal():
    """Test is_goal method."""
    world = GridWorld(5, 7)
    goal = Position(4, 6)
    world.goal = goal
    assert world.is_goal(goal)
    assert not world.is_goal(Position(0, 0))
    print("✓ is_goal test passed")


def test_wall_operations():
    """Test place_wall and remove_wall methods."""
    world = GridWorld(5, 7)
    pos = Position(2, 3)
    
    world.place_wall(pos)
    assert pos in world.walls
    
    world.remove_wall(pos)
    assert pos not in world.walls
    print("✓ wall operations test passed")


if __name__ == "__main__":
    test_in_bounds()
    test_passable()
    test_is_goal()
    test_wall_operations()
    print("\nAll GridWorld tests passed!")

