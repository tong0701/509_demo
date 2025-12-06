"""
Demo script for Grid World Navigation.
Builds a 5x7 world, finds a path using BFS, and steps the agent along the path.
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from position import Position
from grid_world import GridWorld
from agent import Agent
from path import Pathfinder


def main():
    # Build a 5x7 world
    world = GridWorld(rows=5, cols=7)
    
    # Set start and goal
    start = Position(0, 0)
    goal = Position(4, 6)
    world.start = start
    world.goal = goal
    
    # Add some walls
    walls = [
        Position(1, 2),
        Position(2, 2),
        Position(2, 3),
        Position(2, 4),
        Position(3, 4),
    ]
    for wall in walls:
        world.place_wall(wall)
    
    # Print initial world
    print("Initial Grid World:")
    world.render()
    print()
    
    # Find path using BFS
    pathfinder = Pathfinder(world)
    path = pathfinder.find_path(start, goal)
    
    if path:
        print(f"Path found! Length: {len(path) - 1} steps")
        print(f"Nodes expanded: {pathfinder.expanded_count}")
        print(f"Path: {' -> '.join(str(p) for p in path)}")
        print()
        
        # Render path on grid
        print("Grid with path marked:")
        world.render(path=path)
        print()
        
        # Step agent along the path
        agent = Agent(world, start)
        print("Stepping agent along the path:")
        for i, target_pos in enumerate(path[1:], 1):
            # Determine direction
            if target_pos.row < agent.at.row:
                direction = 'up'
            elif target_pos.row > agent.at.row:
                direction = 'down'
            elif target_pos.col < agent.at.col:
                direction = 'left'
            else:
                direction = 'right'
            
            agent.step(direction)
            print(f"\nStep {i} (moved {direction}):")
            world.render(agent=agent.at)
    else:
        print("No path found!")


if __name__ == "__main__":
    main()

