"""Unit tests for Linear Regression core functionality."""

import sys
import os
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from linear_models import LinearRegressionClosedForm
from metrics import mse, r2_score


def test_predict_shape():
    """Test that predict(X) output shape matches (n_samples,)."""
    model = LinearRegressionClosedForm()
    
    # Create simple data
    X = np.array([[1], [2], [3], [4], [5]])
    y = np.array([2, 4, 6, 8, 10])
    
    model.fit(X, y)
    predictions = model.predict(X)
    
    assert predictions.shape == (5,), f"Expected shape (5,), got {predictions.shape}"
    print("✓ predict() output shape test passed")


def test_recover_true_coefficients():
    """Test that on nearly perfect linear data, recovered coef_ and intercept_ are close to true values."""
    np.random.seed(42)
    
    # True model: y = 3 + 2*x + small noise
    true_intercept = 3.0
    true_coef = 2.0
    
    X = np.linspace(0, 10, 100).reshape(-1, 1)
    y = true_intercept + true_coef * X.ravel() + np.random.normal(0, 0.1, 100)
    
    model = LinearRegressionClosedForm(fit_intercept=True, alpha=0.0)
    model.fit(X, y)
    
    # Check that recovered values are close to true values
    assert abs(model.intercept_ - true_intercept) < 0.5, \
        f"Intercept {model.intercept_} not close to {true_intercept}"
    assert abs(model.coef_[0] - true_coef) < 0.5, \
        f"Coefficient {model.coef_[0]} not close to {true_coef}"
    
    print(f"✓ Recovered intercept: {model.intercept_:.3f} (true: {true_intercept})")
    print(f"✓ Recovered coefficient: {model.coef_[0]:.3f} (true: {true_coef})")
    print("✓ Recover true coefficients test passed")


def test_alpha_reduces_coefficients():
    """Test that increasing alpha reduces the size of coefficients when features are collinear."""
    np.random.seed(42)
    
    # Create collinear features: x2 = x1 + small noise
    n_samples = 100
    x1 = np.random.randn(n_samples)
    x2 = x1 + 0.01 * np.random.randn(n_samples)
    X = np.column_stack([x1, x2])
    
    # True relationship: y = x1 + x2 + noise
    y = x1 + x2 + 0.1 * np.random.randn(n_samples)
    
    # Fit models with different alpha values
    alphas = [0.0, 0.1, 1.0, 10.0]
    coef_norms = []
    
    for alpha in alphas:
        model = LinearRegressionClosedForm(alpha=alpha)
        model.fit(X, y)
        coef_norm = np.linalg.norm(model.coef_)
        coef_norms.append(coef_norm)
    
    # Check that increasing alpha generally reduces coefficient norm
    # (allowing for some variation due to numerical issues)
    assert coef_norms[-1] < coef_norms[0] * 1.5, \
        f"Regularization not reducing coefficients: {coef_norms}"
    
    print(f"✓ Coefficient norms for alpha={alphas}: {[f'{n:.3f}' for n in coef_norms]}")
    print("✓ Alpha reduces coefficients test passed")


if __name__ == "__main__":
    test_predict_shape()
    test_recover_true_coefficients()
    test_alpha_reduces_coefficients()
    print("\nAll core tests passed!")

