"""Linear Regression Toolkit package."""

from .linear_models import LinearRegressionClosedForm
from .metrics import mse, r2_score
from .selection import train_test_split

__all__ = ['LinearRegressionClosedForm', 'mse', 'r2_score', 'train_test_split']

