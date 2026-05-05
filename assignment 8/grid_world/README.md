# Grid World Navigation

## Problem Description

Build a simple grid world navigation system. This project implements classes to represent positions, a world with walls, an agent that moves, and a pathfinder that can find the shortest path from a start to a goal using BFS (Breadth-First Search).

## Project Structure

```
grid_world/
├── position.py          # Position(row, col): neighbors_4, eq/hash, repr
├── grid_world.py        # GridWorld(rows, cols, walls, start, goal): in_bounds, passable, render
├── agent.py             # Agent(world, pos): step(up/down/left/right), can_move_to, reset
├── path.py              # Pathfinder(world): find_path(start, goal), expanded count
├── demo.py              # Script: build world, run BFS, render path, step agent
├── README.md            # This file
└── tests/               # Unit tests
    ├── test_position.py
    ├── test_grid_world.py
    ├── test_agent.py
    └── test_bfs.py
```

## How to Run

### Dependencies

No external dependencies required. Uses only Python standard library.

### Running the Demo

```bash
cd grid_world
python demo.py
```

This will:
1. Create a 5×7 grid world with walls
2. Set start and goal positions
3. Find the shortest path using BFS
4. Display the path on the grid
5. Step the agent along the path

### Running Tests

```bash
cd grid_world
python tests/test_position.py
python tests/test_grid_world.py
python tests/test_agent.py
python tests/test_bfs.py
```

Or run all tests:
```bash
cd grid_world
for test in tests/test_*.py; do python "$test"; done
```

## Usage Example

```python
from position import Position
from grid_world import GridWorld
from agent import Agent
from path import Pathfinder

# Create a world
world = GridWorld(rows=5, cols=7)
world.start = Position(0, 0)
world.goal = Position(4, 6)

# Add walls
world.place_wall(Position(1, 2))
world.place_wall(Position(2, 2))

# Find path
pathfinder = Pathfinder(world)
path = pathfinder.find_path(world.start, world.goal)

# Render with path
world.render(path=path)

# Move agent
agent = Agent(world)
agent.step('right')
world.render(agent=agent.at)
```

## Sample Output

```
Initial Grid World:
+-------+
|S......|
|..#....|
|.###...|
|...#...|
|....G..|
+-------+

Path found! Length: 10 steps
Nodes expanded: 15
Path: (0,0) -> (0,1) -> (1,1) -> (2,1) -> (3,1) -> (3,2) -> (3,3) -> (4,3) -> (4,4) -> (4,5) -> (4,6)

Grid with path marked:
+-------+
|S*....|
|.*#....|
|.*###...|
|.***#...|
|....*G..|
+-------+
```

## Implementation Details

### Position Class
- Represents a grid cell with row and column coordinates
- Provides `neighbors_4()` to get adjacent positions
- Implements `__eq__` and `__hash__` for use in sets/dicts
- String representation: `(row,col)`

### GridWorld Class
- Manages the grid layout, walls, start, and goal positions
- `in_bounds()`: Checks if position is within grid boundaries
- `passable()`: Checks if position is not a wall
- `render()`: ASCII visualization with symbols:
  - `#` for walls
  - `.` for empty cells
  - `S` for start
  - `G` for goal
  - `A` for agent
  - `*` for path

### Agent Class
- Represents a movable agent in the world
- `step(direction)`: Moves in one of four directions
- `can_move_to()`: Validates if a move is possible
- `reset()`: Teleports to a new position

### Pathfinder Class
- Implements BFS algorithm for shortest path finding
- Tracks number of nodes expanded during search
- Returns list of positions representing the path, or None if no path exists

