---
_id: "genera"
title: "Generators on Python"
createdAt: "2021-03-20T19:30:59.611+00:00"
updatedAt: "2021-03-20T19:30:59.611+00:00"
field: "python"
image: "/images/featured/iterators.jpg"
isFeatured: false
slug: "generators-on-python"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

This is what an iterator on Python

```py
class FactIter:
    def __init__(self, n):
        self.n = n
        self.i = 0
    def __iter__(self):
        return self
    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        else:
            result = math.factorial(self.i)
            self.i += 1
    return result
```

This is alot of work to iterate over a collection. With generations, we will be iterating over a collection upon a request. When next() is called, it will return the value then it will suspend and wait for next() call.

**Generators** are functions that contain at least one **yield** statement which is used almost like a return statement in a function - but there is a huge difference - when the yield statement is encountered, Python returns whatever value yield specifies, but it "pauses" execution of the function. We can then "call" the same function again and it will "resume" from where the last yield was encountered.

```py
def my_func():
    yield 1
    yield 2
    yield 3
```

my_func is a simple **generator function**. When we call it, it will return a **generator object**. Generator functions are also called **generator factories**.

    my_gen_obj=my_func()

This returns a generator object. Now we can call `next()` on this object.

```py
next(my_gen_obj) # returns 1. suspends itself till next call
next(my_gen_obj) # returns 2. suspends itself till next call
next(my_gen_obj) # returns 3. suspends itself till next call
next(my_gen_obj) # StopIteration
```

If I call `next(my_gen_obj)` 4th time, python will raise SopIteration error because it encountered a "return". After calling, next() three times, we have no more **yield** statement so python will return us **None** value since we do not have explicit "return". If we used "return" implicitly in our function

```py
def my_func():
    yield 1
    yield 2
    yield 3
    return "Done"
```

After consuming yield statements, python will return a `StopIteration: "Done"`

As you see, we are able to call next() and we get a StopIteration error. That is what exactly an iterator is. In fact generators are iterators. They are lazy iterators which returns the next value upon request. Note that a generator is an iterator, but not vice-versa - iterators are not necessarily generators.

```py
my_gen_obj.__iter__()
```

this will return `<generator object func at 0x7fedad36ff20>` which is the same object as my_gen_obj. We can test this out:

```py
print(id(my_gen_obj))
print(id(my_gen_obj.__iter__()))
```

This will show that their memory address is same. Since they are iterators, they also get exhausted once the function returns a value.

## Making an iterable from a Gereator

Recall that, iterable is a class that implements iterable protocol which tells us that object should implement **\_iter\_\_()** that returns an iterator. In this case **iter** will return a generator. So let's define a simple generator:

```py
def squares_gen(n):
    for i in range(n):
        yield i ** 2
```

Then we return this inside **iter**

```py
class Squares:
    def __init__(self, n):
        self.n = n
    # We are returning a generator object
    def __iter__(self):
        return squares_gen(self.n)
```

# Generator Expressions vs List Comprehension

We can easily create a generator by using () parentheses instead of the [] brackets for list comprehensions:

```py
g = (i ** 2 for i in range(5))
```

g is a lazy evaluated generator but list comprehensions are eager.

In list comprehensions all objects are created right away, it takes longer to create and return the list. In generator expressions, object creation is delayed until requested by next(). Upon next(), generator object is created and returned immediately.

Iteration is faster in list comprehensions because objects are already created.

If you iterate **all** the elements in list comprehension and generator expression, time performance is about the same. Even though generator expression return generator object right away, it does not create all the elements. Everytime you iterate over a new element, it will create and return it.

But if you do not iterate through all the elements generator are more efficient. Let's say you need to create a list comprehensions that contains millions of items but you are using only 10 of them. You still have to create millions of items. You are just wasting time for making millions of calculations to create millions of items to use only 10 of them. Or if you are making millions of api requests but end up using only 10 of them. Since generator expressions are lazy, it does not make all the calculations or api calls unless it is requested. In this case using generator expressions will be more efficient.

In list comprehensions entire collection is loaded to the memory. But generator expressions, once it returns a value to you upon your next() call, it is done with it and it does not need to store it in the memory any more. Only a single item is loaded to the memory. If you are iterating over a huge file in disk, if file is too big you might get memory issue. In this case using generator expression is more efficient.

## Fibonacci Sequence

Here is the Fibonacci sequence:

       1 1 2 3 5 8 13 ...

As you can see there is a recursive definition of the numbers in this sequence:

        Fib(n) = Fib(n-1) + Fib(n-2)

where

        Fib(0) = 1, Fib(1) = 1

We can certainly use a recursive approach to calculate the n-th number in the sequence, it is not a very effective method - we can of course help it by using memoization, but we'll still run in Python's maximum recursion depth (which is a guard against stackoverflow and we can change it) - but overall it's not very efficient:

```py
def fib_recursive(n):
    if n <= 1:
        return 1
    else:
        return fib_recursive(n-1) + fib_recursive(n-2)
```

This is not memoized, means that we did not store any previous calculations, everytime we call fib_recursive(n), we start everything from scratch. Memoization will dramatically increase the performance:

```py
from functools import lru_cache

@lru_cache()
def fib_recursive(n):
    if n <= 1:
        return 1
    else:
        return fib_recursive(n-1) + fib_recursive(n-2)
```

`fib_recursive(2000)` this will cause

      RecursionError: maximum recursion depth exceeded while calling a Python object

So we can use a non-recursive approach to calculate the n-th Fibonacci number:

```py
def fib(n):
    fib_0 = 1
    fib_1 = 1
    for i in range(n-1):
        fib_0, fib_1 = fib_1, fib_0 + fib_1
    return fib_1
```

Notice what happens every time the next method is called - it has to calculate every Fibonacci number from scratch (using the fib function) - that is wasteful. Instead, we can use a generator function

```py
def fib_gen(n):
    fib_0 = 1
    yield fib_0
    fib_1 = 1
    yield fib_1
    for i in range(n-2):
        fib_0, fib_1 = fib_1, fib_0 + fib_1
        yield fib_1
```
