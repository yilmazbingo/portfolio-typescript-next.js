---
id: "algo2"
slug: "iterables-on-python"
title: "Iterables on Python"
createdAt: "2021-2-15"
updatedAt: "2021-2-15"
field: "python"
image: "/images/featured/iterators.jpg"
isFeatured: false
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

On the [iterators on python post](coding-bitcoin-in-javascript-part-1), We saw that an iterator is an object that implements

    __iter__ → returns the object itself
    __next__ → returns the next element

The drawback is iterators become useless for iterating again. But iterator object was responsible for two distinct things:

- maintaining the collection of items
- iterating over the collection

In this blog post we are going to separate those concerns. Let's say we have Cities class:

```py
class Cities:
  def __init__(self):
    self._cities = ['Paris', 'Istanbul', 'Rome', 'London']
    self._index = 0
  def __iter__(self):
    return self
  def __next__(self):
    if self._index >= len(self._cities):
      raise StopIteration
    else:
      item = self._cities[self._index]
      self._index += 1
      return item
```

Cities instances are iterators. Instead, we can write two classses, one for the data and then we pass this data to next class to iterate over the data:

```py
# this class just creates the data for us
class Cities:
  def __init__(self):
    self._cities = ['New York', 'New Delhi', 'Newcastle']
  def __len__(self):
    return len(self._cities)
```

```py
         my_cities=Cities() # we will be passing this to CityIterator
```

```py
class CityIterator:
  # we are passing cities array
  def __init__(self, cities):
    self._cities = cities
    self._index = 0
  def __iter__(self):
    return self
  def __next__(self):
    if self._index >= len(self._cities):
      raise StopIteration
    else:
      result=self._cities[self._index]
      self._index+=1
      return result

```

![iterable on python](iterable_cities.png)

There we have it. We separated the concerns. At this point we have:

- a container that maintains the collection items
- a separate object, the iterator, used to iterate over the collection

So we can iterate over the collection as many times as we want, but drawback is, we just have to remember to create a new iterator every time. It would be nice if we did not have to do that manually every time and if we could just iterate over the Cities object instead of CityIterator.

# Iterable

An iterable is a Python object that implements the iterable protocol The iterable protocol requires that the object implement a single method
**iter**

returns a new instance of the **iterator object** used to iterate over the iterable.

```py
class Cities:
  def __init__(self):
    self._cities = ['New York', 'New Delhi', 'Newcastle']
  def __len__(self):
    return len(self._cities)
  def __iter__(self):
    return CityIterator(self)
```

**Iterable vs Iterator**
An iterable is an object that implements
**iter** → returns an iterator

An iterator is an object that implements
**iter** → returns itself which is an iterator.
**next** → returns the next element

    So iterators are themselves iterables but they are iterables that become exhausted

    Iterables on the other hand never become exhausted because they always return a new iterator that is then used to iterate

When we iterate over iterators, python first calls the **iter** and then calls the "next" method. When we iterate over an iterable, python will call the built-in **iter()**, which calls the **iter** which returns iterator object and finally calls the next method of the iterator object.

## Some of Python's Buuilt-in iterators and iterables

- **range**
  It is an iterable meaning that it has \***\*iter\*\*** method returns an iterator.

```py
range_10=range(10)
# Calling the _iter__
print(range_10.__iter__())
```

          <range_iterator object at 0x7fea5865e030>

We can test that it is not an iterator

```py
'__next__' in dir(range_10)
```

We are asking if \***\*next\*\*** is in the attributes list of range_10. Result is `False`

"range" function use lazy evaluation. Lazy evaluation is when evaluating a value is deferred until it is actually requested. When we execute range(10) Python does not pre-compute a "list" of all the elements in the range. Instead it uses lazy evluation and the iterator computes and returns elements one at a time.

This is why when we print a range object we do not actually see the contents of the range because they don't exist yet!

Instead, we need to iterate through the iterator and put it into something like a list:

```py
[num for num in range(10)]
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- **zip**
  It is an iterator:

  ```py
  z = zip([1, 2, 3], 'abc')

  print('__iter__' in dir(z))   # True
  print('__next__' in dir(z))   # True
  ```

  Just like range() though, it also uses lazy evaluation, so we need to iterate through the iterator and make a list for example in order to see the contents:

  ```py
  list(z)

  [(1, 'a'), (2, 'b'), (3, 'c')]
  ```

- **open('my_file.csv')**
  open() returns an iterator.

  ```py
  with open('cars.csv') as f:
    print(type(f))  # <class '_io.TextIOWrapper'>

    print('__iter__' in dir(f)) # True
    print('__next__' in dir(f)) # True
  ```

  As you can see, the open() function returns an iterator (of type TextIOWrapper), and we can read lines from the file one by one using the next() function, or calling the **next**() method. The class also implements a readline() method we can use to get the next row:

  ```py
  with open('cars.csv') as f:
    # three different methods to read lines
    print(next(f))
    print(f.__next__())
    print(f.readline())
  ```

  **Note** f.readlines() is not iterator. It reads entire file and returns the list of all the rows.

- **enumerate**
  It is a lazy iterator.

  ```py
  e = enumerate('Python')

  print('__iter__' in dir(e)) # True
  print('__next__' in dir(e)) # True
  ```

  Since enumerate is also lazy, we need to iterate through it in order to recover all the elements:

  ```py
  list(e)

  [ (0, 'P'),
    (1, 'y'),
    (2, 't'),
    (3, 'h'),
    (4, 'o'),
    (5, 'n')]
  ```
