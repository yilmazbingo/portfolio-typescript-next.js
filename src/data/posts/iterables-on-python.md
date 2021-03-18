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
