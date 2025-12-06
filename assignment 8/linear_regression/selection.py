"""
Data splitting utilities.
"""

import numpy as np


def train_test_split(X, y, test_size=0.2, random_state=None, shuffle=True):
    """
    Split data into training and testing sets.
    
    Args:
        X: Feature matrix (n_samples, n_features)
        y: Target vector (n_samples,)
        test_size: Proportion of data to use for testing (default: 0.2)
        random_state: Random seed for reproducibility
        shuffle: Whether to shuffle data before splitting
        
    Returns:
        X_train, X_test, y_train, y_test
    """
    X = np.array(X)
    y = np.array(y)
    
    n_samples = X.shape[0]
    n_test = int(n_samples * test_size)
    n_train = n_samples - n_test
    
    if random_state is not None:
        np.random.seed(random_state)
    
    indices = np.arange(n_samples)
    if shuffle:
        np.random.shuffle(indices)
    
    test_indices = indices[:n_test]
    train_indices = indices[n_test:]
    
    X_train = X[train_indices]
    X_test = X[test_indices]
    y_train = y[train_indices]
    y_test = y[test_indices]
    
    return X_train, X_test, y_train, y_test

