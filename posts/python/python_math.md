---
title: "python sympy 解方程"
hidemeta: true
---
```
from sympy import *


def test():
    x = symbols('x')
    f = x ** 9
    x2 = symbols('x2')
    g = x2 ** 8

    h = ((f - g) ** 2 + (x - x2) ** 2)
    dh = diff(h, x)
    dh2 = diff(h, x2)
    print(dh)
    print(dh2)
    s = solve([dh, dh2], [x, x2])
    print(s)


def demo1():
    # 解方程 有限解
    # 定义变量
    x = Symbol('x')
    fx = x * 3 + 9
    # 可求解直接给出解向量
    print(solve(fx, x))


def demo2():
    # 解方程无穷多解
    # 定义变量
    x = Symbol('x')
    y = Symbol('y')
    fx = x * 3 + y ** 2
    # 得到是x与y的关系式，
    print(solve(fx, x, y))


def demo3():
    # 解方程组
    # 定义变量
    x = Symbol('x')
    y = Symbol('y')
    f1 = x + y - 3
    f2 = x - y + 5
    print(solve([f1, f2], [x, y]))


test()

```

