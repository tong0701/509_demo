# Linear Regression Toolkit

## Problem Description

This project implements a small, reusable Linear Regression toolkit using plain Python classes and NumPy. The toolkit includes:

- A closed-form linear regression model with optional L2 (Ridge) regularization
- Evaluation metrics (MSE, R²)
- Data splitting utilities
- Plotting helpers
- A Jupyter notebook with experiments demonstrating the toolkit

## Project Structure

```
linear_regression/
├── __init__.py
├── linear_models.py      # LinearRegressionClosedForm class
├── metrics.py            # mse, r2_score functions
├── selection.py          # train_test_split function
├── plotting.py           # Visualization helpers
├── examples/
│   └── demo.ipynb        # Experiments and analysis
├── tests/
│   └── test_core.py      # Unit tests
└── README.md             # This file
```

## How to Run

### Dependencies

```bash
pip install numpy matplotlib jupyter
```

### Running Tests

```bash
cd linear_regression
python tests/test_core.py
```

### Running Experiments

```bash
cd linear_regression
jupyter notebook examples/demo.ipynb
```

Or open the notebook in your preferred Jupyter environment.

## Usage Example

```python
import numpy as np
from linear_regression.linear_models import LinearRegressionClosedForm
from linear_regression.metrics import mse, r2_score
from linear_regression.selection import train_test_split

# Generate data
X = np.linspace(0, 10, 100).reshape(-1, 1)
y = 3 + 2 * X.ravel() + np.random.normal(0, 1, 100)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Fit model
model = LinearRegressionClosedForm(fit_intercept=True, alpha=0.0)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
print(f"MSE: {mse(y_test, y_pred):.4f}")
print(f"R²: {r2_score(y_test, y_pred):.4f}")
```

## API Reference

### LinearRegressionClosedForm

```python
model = LinearRegressionClosedForm(fit_intercept=True, alpha=0.0)
```

**Parameters:**
- `fit_intercept`: Whether to fit the intercept term (default: True)
- `alpha`: L2 regularization strength (default: 0.0, no regularization)

**Methods:**
- `fit(X, y)`: Fit the model to training data
- `predict(X)`: Make predictions
- `score(X, y)`: Return R² score

**Attributes:**
- `coef_`: NumPy array of coefficients
- `intercept_`: Intercept value

### Metrics

- `mse(y_true, y_pred)`: Mean Squared Error
- `r2_score(y_true, y_pred)`: Coefficient of determination

### Selection

- `train_test_split(X, y, test_size=0.2, random_state=None, shuffle=True)`: Split data into train/test sets

## Experiments

The `examples/demo.ipynb` notebook contains three experiments:

1. **Straight Line with Noise**: Demonstrates basic linear regression on synthetic data
2. **Collinearity and Ridge Regularization**: Shows how L2 regularization helps with collinear features
3. **Polynomial Regression**: Compares different polynomial degrees and discusses overfitting

## Results

- The toolkit successfully recovers true coefficients on synthetic linear data
- Ridge regularization effectively reduces coefficient magnitudes when features are collinear
- Polynomial regression demonstrates the bias-variance tradeoff, with degree 2 fitting best for quadratic data

