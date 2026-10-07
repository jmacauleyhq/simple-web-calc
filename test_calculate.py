import pytest
from calculate import addition, subtraction, multiplication, division
    
def test_addition():
    assert addition(10,5) == 15

def test_subtraction():
    assert subtraction(10,5) == 5

def test_multiplication():
    assert multiplication(10,5) == 50

def test_division():
    assert division(10,5) == 2

def test_divison_by_zero():
    with pytest.raises(ValueError):
        division(10, 0) 