"""Unit tests for BFS pathfinding."""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from position import Position
from grid_world import GridWorld
from path import Pathfinder


def test_find_path_simple():
    """Test finding a simple path."""
    world = GridWorld(5, 5)
    start = Position(0, 0)
    goal = Position(4, 4)
    world.start = start
    world.goal = goal
    
    pathfinder = Pathfinder(world)
    path = pathfinder.find_path(start, goal)
    
    assert path is not None
    assert path[0] == start
    assert path[-1] == goal
    assert len(path) == 9  # Manhattan distance + 1
    print("✓ Simple path test passed")


def test_find_path_with_walls():
    """Test finding a path with walls."""
    world = GridWorld(5, 5)
    start = Position(0, 0)
    goal = Position(4, 4)
    world.start = start
    world.goal = goal
    
    # Add walls that force a detour
    walls = [
        Position(0, 1),
        Position(1, 1),
        Position(2, 1),
    ]
    for wall in walls:
        world.place_wall(wall)
    
    pathfinder = Pathfinder(world)
    path = pathfinder.find_path(start, goal)
    
    assert path is not None
    assert path[0] == start
    assert path[-1] == goal
    print("✓ Path with walls test passed")


def test_no_path():
    """Test when no path exists."""
    world = GridWorld(5, 5)
    start = Position(0, 0)
    goal = Position(4, 4)
    world.start = start
    world.goal = goal
    
    # Block all paths
    for row in range(5):
        for col in range(1, 5):
            world.place_wall(Position(row, col))
    
    pathfinder = Pathfinder(world)
    path = pathfinder.find_path(start, goal)
    
    assert path is None
    print("✓ No path test passed")


def test_expanded_count():
    """Test that expanded_count is tracked."""
    world = GridWorld(5, 5)
    start = Position(0, 0)
    goal = Position(2, 2)
    world.start = start
    world.goal = goal
    
    pathfinder = Pathfinder(world)
    path = pathfinder.find_path(start, goal)
    
    assert pathfinder.expanded_count > 0
    print("✓ Expanded count test passed")


if __name__ == "__main__":
    test_find_path_simple()
    test_find_path_with_walls()
    test_no_path()
    test_expanded_count()
    print("\nAll BFS tests passed!")

