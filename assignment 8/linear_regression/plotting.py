"""
Plotting utilities for regression visualization.
"""

import numpy as np
import matplotlib.pyplot as plt


def plot_predictions(y_true, y_pred, title="Predictions vs True Values"):
    """
    Plot predicted values against true values with y=x reference line.
    
    Args:
        y_true: True target values
        y_pred: Predicted values
        title: Plot title
    """
    y_true = np.array(y_true).ravel()
    y_pred = np.array(y_pred).ravel()
    
    plt.figure(figsize=(8, 6))
    plt.scatter(y_true, y_pred, alpha=0.6)
    
    # Add y=x reference line
    min_val = min(np.min(y_true), np.min(y_pred))
    max_val = max(np.max(y_true), np.max(y_pred))
    plt.plot([min_val, max_val], [min_val, max_val], 'r--', label='y=x')
    
    plt.xlabel('True Values')
    plt.ylabel('Predicted Values')
    plt.title(title)
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    return plt


def plot_residuals(y_true, y_pred, title="Residual Plot"):
    """
    Plot residuals (errors) against predicted values.
    
    Args:
        y_true: True target values
        y_pred: Predicted values
        title: Plot title
    """
    y_true = np.array(y_true).ravel()
    y_pred = np.array(y_pred).ravel()
    residuals = y_true - y_pred
    
    plt.figure(figsize=(8, 6))
    plt.scatter(y_pred, residuals, alpha=0.6)
    plt.axhline(y=0, color='r', linestyle='--', label='Zero residual')
    plt.xlabel('Predicted Values')
    plt.ylabel('Residuals')
    plt.title(title)
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    return plt

