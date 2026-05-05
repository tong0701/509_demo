"""Unit tests for Agent class."""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from position import Position
from grid_world import GridWorld
from agent import Agent


def test_agent_creation():
    """Test Agent creation."""
    world = GridWorld(5, 7)
    world.start = Position(0, 0)
    agent = Agent(world)
    assert agent.at == Position(0, 0)
    print("✓ Agent creation test passed")


def test_can_move_to():
    """Test can_move_to method."""
    world = GridWorld(5, 7)
    agent = Agent(world, Position(2, 3))
    
    assert agent.can_move_to(Position(2, 4))  # Valid move
    assert not agent.can_move_to(Position(-1, 3))  # Out of bounds
    assert not agent.can_move_to(Position(5, 3))  # Out of bounds
    
    world.place_wall(Position(2, 4))
    assert not agent.can_move_to(Position(2, 4))  # Wall
    print("✓ can_move_to test passed")


def test_step():
    """Test step method."""
    world = GridWorld(5, 7)
    agent = Agent(world, Position(2, 3))
    
    # Valid move
    assert agent.step('right')
    assert agent.at == Position(2, 4)
    
    # Invalid move (out of bounds)
    agent = Agent(world, Position(0, 0))
    assert not agent.step('up')
    assert agent.at == Position(0, 0)
    
    # Invalid move (wall)
    world.place_wall(Position(2, 2))
    agent = Agent(world, Position(2, 3))
    assert not agent.step('left')
    print("✓ step test passed")


def test_reset():
    """Test reset method."""
    world = GridWorld(5, 7)
    agent = Agent(world, Position(0, 0))
    agent.reset(Position(3, 4))
    assert agent.at == Position(3, 4)
    print("✓ reset test passed")


if __name__ == "__main__":
    test_agent_creation()
    test_can_move_to()
    test_step()
    test_reset()
    print("\nAll Agent tests passed!")

