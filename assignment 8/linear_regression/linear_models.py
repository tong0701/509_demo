"""
Linear Regression model using closed-form solution with optional L2 regularization.
"""

import numpy as np
from .metrics import r2_score


class LinearRegressionClosedForm:
    """
    Linear Regression model using the normal equation (closed-form solution).
    Supports optional L2 (Ridge) regularization.
    """
    
    def __init__(self, fit_intercept=True, alpha=0.0):
        """
        Initialize Linear Regression model.
        
        Args:
            fit_intercept: Whether to fit the intercept term
            alpha: L2 regularization strength (0.0 = no regularization)
        """
        self.fit_intercept = fit_intercept
        self.alpha = alpha
        self.coef_ = None
        self.intercept_ = 0.0
    
    def fit(self, X, y):
        """
        Fit the model using the normal equation with optional L2 regularization.
        
        Args:
            X: Feature matrix (n_samples, n_features)
            y: Target vector (n_samples,)
        """
        X = np.array(X)
        y = np.array(y).ravel()
        
        if X.ndim == 1:
            X = X.reshape(-1, 1)
        
        n_samples, n_features = X.shape
        
        # Add intercept column if needed
        if self.fit_intercept:
            X_design = np.column_stack([np.ones(n_samples), X])
        else:
            X_design = X
        
        # Build regularization matrix
        # Note: intercept is not penalized when fit_intercept=True
        if self.alpha > 0:
            if self.fit_intercept:
                # Regularization matrix: 0 for intercept, alpha for coefficients
                reg_matrix = np.diag([0] + [self.alpha] * n_features)
            else:
                reg_matrix = self.alpha * np.eye(n_features)
        else:
            reg_matrix = np.zeros((X_design.shape[1], X_design.shape[1]))
        
        # Normal equation: (X^T X + lambda*I)^(-1) X^T y
        try:
            XTX = X_design.T @ X_design
            XTX_reg = XTX + reg_matrix
            XTy = X_design.T @ y
            coeffs = np.linalg.solve(XTX_reg, XTy)
        except np.linalg.LinAlgError:
            # Fallback to pseudo-inverse if singular
            XTX_reg = X_design.T @ X_design + reg_matrix
            coeffs = np.linalg.pinv(XTX_reg) @ X_design.T @ y
        
        # Extract intercept and coefficients
        if self.fit_intercept:
            self.intercept_ = float(coeffs[0])
            self.coef_ = coeffs[1:]
        else:
            self.intercept_ = 0.0
            self.coef_ = coeffs
    
    def predict(self, X):
        """
        Make predictions.
        
        Args:
            X: Feature matrix (n_samples, n_features)
            
        Returns:
            Predictions (n_samples,)
        """
        if self.coef_ is None:
            raise ValueError("Model must be fitted before making predictions")
        
        X = np.array(X)
        if X.ndim == 1:
            X = X.reshape(-1, 1)
        
        return (X @ self.coef_ + self.intercept_).ravel()
    
    def score(self, X, y):
        """
        Return R² score.
        
        Args:
            X: Feature matrix (n_samples, n_features)
            y: True target values (n_samples,)
            
        Returns:
            R² score
        """
        y_pred = self.predict(X)
        return r2_score(y, y_pred)

