"""
Game data storage utilities.
Stores game outcomes in a CSV file.
"""

import os
import csv
from datetime import datetime


def save_game_data(first_player, winner):
    """
    Save game outcome to CSV file.
    
    Args:
        first_player: 'X' or 'O' (who went first)
        winner: 'X', 'O', or 'Tie'
    """
    # Create data directory if it doesn't exist
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    # CSV file path
    csv_file = os.path.join(data_dir, 'game_data.csv')
    
    # Check if file exists to determine if we need headers
    file_exists = os.path.exists(csv_file)
    
    # Write to CSV
    with open(csv_file, 'a', newline='') as f:
        writer = csv.writer(f)
        
        # Write header if file is new
        if not file_exists:
            writer.writerow(['timestamp', 'first_player', 'winner'])
        
        # Write game data
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        writer.writerow([timestamp, first_player, winner])

