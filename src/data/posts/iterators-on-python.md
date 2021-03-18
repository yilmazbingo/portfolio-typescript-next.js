---
id: "algo2"
slug: "iterators-on-python"
title: "Iterators on Python"
createdAt: "2021-2-15"
updatedAt: "2021-2-15"
field: "python"
image: "/images/featured/iterators.jpg"
isFeatured: true
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

Iteration is taking each item from a collection of items. That collection does not need to be indexed. For example, sets in python are not indexable, but they are iterable. Just imagine you have a bucket of items and you are just randomly picking an item out of the bucket.

```py
     my_set={'a','b','c','d'}
     for item in my_set:
        print(item)

    {'b','d','a','c'} # items are not printed in order
```

To iterate over collections, we need to implement a method like `getme_next_item()` to get the next item. After creating this method, we will encounter three issues to solve:

1- How to tell python to stop the iteration. Otherwise we will be getting inifite amount of items

2- How are we going to call **for** to iterate.

3- Are we going to be able to restart the iteration?

Let's start our journey with defining a method to get the next item.

```py
class Square:
    def __init__(self):
        self.i = 0
    # since next is a python keyword, I name it next_
    def next_(self):
        result = self.i ** 2
        self.i += 1
        return result

sq=Square()
# we can call next_() infinitely and it will always print the square of next item. We will have an infite collection
sq.next_()
```

Let's start to solve the first issue: We specify the size of the collection when we create the instance and we raise `StopIteration` if we call `next_` too many times.

```py
    class Square:
        def __init__(self, length):
            self.i = 0
            self.length = length
        def next_(self):
            if self.i >= self.length:
                raise StopIteration
            else:
                result = self.i ** 2
                # We track how many times we called next_
                self.i += 1
                return result
```

Now when we create a new instance of Square, we will pass "length", so if we call `next_` more than "length" times, we raise StopIteration.

![stop iteration in python iterable](stop-iteration.png)

We tackled the first issue, but we still cannot iterate using for loops and once the iteration start we cannot restart it becasue it will raise StopIteration after we call more than length times.

Before we proceed, let's write our class in a pythonic way. In current implementation calling `sq.next_()` is annoying. Python has built in `__next__` function and when you call this on an object, it is going to call the special method, `__next__` inside the object. Similar to `next`, python also has `len`, which will invokes the `__len__` method of the object.

```py
class Square:
    def __init__(self, length):
        self.length = length
        self.i = 0

    def __next__(self):
        if self.i >= self.length:
            raise StopIteration
        else:
            result = self.i ** 2
            self.i += 1
            return result

    def __len__(self):
        return self.length
```

```py
    sq=Square(5)     # pass the length argument
    next(sq)  # this will return the next item.
```

let's tackle the second issue., how are we going to use **for**.

### Iterator Protocol

The iterator protocol has two methods. \***\*iter**:** This should just return the instance itself
\*\***next**:** Getting the next item. We already implemented this.

If we implement those 2 methods, python is aware that we are implementing the iterator protocol. Therefore, an **iterator** is an object that implements those two methods. If an object is an iterator, we can now use it with **for** loops. Our Square class already has **next** method, we just need to add \***\*iter\*\***.

```py
class Square:
    def __init__(self, length):
        self.length = length
        self.i = 0
    # for loop calls this method first, gets the iterator obj, then works on this object
    def __iter__(self):
        print('calling __iter__')
        return self
    def __next__(self):
        print('calling __next__')
        if self.i >= self.length:
            raise StopIteration
        else:
            result = self.i ** 2
            self.i += 1
            return result
```

```py
sq=Square(3)
for item in sq:
    print(item)
# calls the __iter__ first
calling __iter__
calling __next__
0
calling __next__
1
calling __next__
4
calling __next__
```

If we call **for** on **sq** again, we get nothing because we finished iterating. We can never restart our iteration. Once we looped through all the items the iterator has been **exhausted**, we can no longer use it. To loop second time, we have to create a new instance.

      Iterators are just throw away objects, once we loop through it, we can no longer use it again.

If we closely look at the Square class, it does two things. It mainstains the collection and then iterating over the collection. So when we are done with iterating, data is also thrown away which is wasteful. To tackle the last issue, we need to separate those two things. Maintaining the data of the collection should be one object and iterating over the data should be a separate object. Therefore we need to learn a new concept: **iterable** and thet will be in the next post.

### Consuming Iterators Manually

We do not have to use for or comprehensions to iterate over iterators. As I showed up, for loop calls the **iter** first and then calls the **next**, we can call those manually

```py
i="I am an iterator"
#  iter() calls the __iter__() of i
iter_i=iter(i)
# iter(i) returns iterator and stores it as iter_i
next(iter_i)
# next calls the __next__() of the iterator iter_i
    'I'
next(iter_i)
    ' '
next(iter_i)
    'a'
```
