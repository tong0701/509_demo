"""
Evaluation metrics for regression.
"""

import numpy as np


def mse(y_true, y_pred):
    """
    Calculate Mean Squared Error.
    
    Args:
        y_true: True target values (n_samples,)
        y_pred: Predicted values (n_samples,)
        
    Returns:
        Mean Squared Error
    """
    y_true = np.array(y_true).ravel()
    y_pred = np.array(y_pred).ravel()
    return np.mean((y_true - y_pred) ** 2)


def r2_score(y_true, y_pred):
    """
    Calculate R² (coefficient of determination).
    
    Args:
        y_true: True target values (n_samples,)
        y_pred: Predicted values (n_samples,)
        
    Returns:
        R² score
    """
    y_true = np.array(y_true).ravel()
    y_pred = np.array(y_pred).ravel()
    
    ss_res = np.sum((y_true - y_pred) ** 2)
    ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
    
    if ss_tot == 0:
        return 0.0
    
    return 1 - (ss_res / ss_tot)

