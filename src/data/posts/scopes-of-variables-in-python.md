---
_id: "scopes"
title: "Scope of Variables in Python"
createdAt: "2021-04-05T11:36:59.611+00:00"
updatedAt: "2021-04-05T11:36:59.611+00:00"
field: "python"
image: "/images/posts/google-two-sum.png"
isFeatured: false
slug: "scopes-of-variables-in-python"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

When we assigned an object to a variable

    a=10

We create a slot in the memory and place value 10 inside of it. Think about PO boxes in post office, you create kinda a new PO box, put the 10 in it and label it as "a". From now on, anytime you reference "a" inside your code, python will go to memeory, open the slot see the value 10. That object can be accessed using "a" in different parts of your code but not **just anywhere**. In this blog post, I am going to explain what are rules to access a variable in python. In next post, I will write about closures.

We can say that variable name "a" is bound to value 10. The part of code where that variable_name-binding_value is defined, is called the **lexical scope** of the variable "a". Those bindings are stored somewhere. Imagine a table where variable_name-bindig_value is stored. This table is called **namespace**. Each scope has its own namespace.

## Global Scope

The global scope is the module scope. It spans a single file only. There is not such thing that truly global scope which means that accessible inside all the modules in our entire app. We have some built-in functions or values such as "True","None","print()" that can be accessed anywhere but they live in **built-in** scope. Global scopes are nested inside built-in scope.

     The built-in and global variables can be used anywhere inside of our module.

     There is no overlap between modules.

![python global scope](global-scope.png)

Let's say you have code in Module_1. If you reference a variable inside that module, python will look into its namespace. If it does not find that bound value, it will go check the built-in scope. This is how python works: It always looks in the current scope and if it cannot find the binding, it starts looking at the enclosed scope's namespace. If it does not exist in there neither, you get runtime error. Let's say this is the only code we have in Module_1:

```py
print(a)
```

Python will look for `print()` and "a" inside Module_1's namespace. It will not find it there, so it will go look at in built-in scope. It will find `print()` but since it will not find variable "a" there, it will raise error:

```py
NameError           Traceback (most recent call last)
<ipython-input-9-bca0e2660b9f> in <module>
----> 1 print(a)

NameError: name 'a' is not defined

```

This error is not for `print()`, it is for variable "a".

If we had `print()` in Module_1 defined like this:

```py
print=lambda x: `hello {0}`.format(x)

s=print('world')
```

Python will find `print()` inside Module_1's namespace, it will not go look at built-in scope's namespace. We essentially override the global `print()`. Ot it is called **masking** in python. We are masking the global variable name.

## Local Scope

When we create functions, functions have their own scope. If we create variable names that assigned to value inside those functions, those variables live in the scope of that function.

    Variables are defined inside a function are not created until the function is called.

When python compiles your module, it will take function's name and put it into the module's scope's namespace but the content of the function does not run. So there is no **scope** has been created when the function is created.

     Scope will be created when the function is called.

Everytime the function is called a new scope is created and variables defined inside the function are assigned to only that scope.

The actual object that the variable references inside function could be different each time the function is called. This is why recursion works.

![python local scope](func_example.png)

At **compile time**, when python sees the definition of `my_func`, it determines that "a", "b" and "c" will be local variables. It does not create a scope or a namespace because we have not call the function but it pre-determines at compilation time that those 3 variables will be placed into the local namespace.

        Python determines the scope of objects at compile-time, not at run-time.

Then when we call `my_func('z',2)`, python creates the scope. When `my_func('z',2)` is running, we have those variables inside local namespace.

       Once the function exits, scope goes away.

When we call a function second time a new scope with a new namespace will be created.

![python-nested-scope](python-nested-scope.png)

**Accessing the global scope from a local scope:**

When retrieving the value of a global variable from inside a function, Python starts to search from the local scope's namespace it goes up the chain of all enclosing scope namespaces.

     local  -->  global -->  built-in

**The global keyword:**

We can tell Python that a variable is meant to be scoped in the global scope by using the **global** keyword.

```py
a=0
def my_func():
   global a
   a=100
```

When Python compiles this code, it adds "my_func" to global scope's namespace, and at that point it sees `global` keyword. This is telling Python "You are going to assign value 100 to variable 'a' but this 'a' is actually in the global namespace". So when the function runs "a" will be inside global module's namespace, not inside the functions's namespace. After we call the function, scope will disappear but we can still access to variable "a" because it is inside the global scope's namespace.

```py
a=0
def my_func():
   global a
   a=100

my_func()
print(a)   # 100
```

Let's look at another example:

```py
a=10
def func1():
    print(a) //10
```

At compile time, Python pre-determines that "a" will be non-local because we did not assign the value inside the local space.

Here is an interesting example:

```py
a=10
def func():
    print(a)
    a=100
```

At compile time, Python sees `a=100` an assignment operation. Since there is no "global" flag for "a", "a" is considered to be local. What happens when we call `func()`? We are referencing "a", is it going to global module or use the local `a=100`?

At first glance, it should go to global namespace, because when `print(a)` is called "a" does not exist so it should go to look at the global module.

But the thing is "a" already exists in local scope but it does not assigned to a value. At compile time, Python already made that determination, "a" is local. Python will look at inside the local namespace, will see "a" but it is not assigned:

```py
UnboundLocalError: local variable 'a' referenced before assignment
```

## Nonlocal Scope

**Inner Functions**

![nonlocal scope in python](local_scopes.png)

Both "inner_func" and "outer_func" have access to the global and built-in scopes as well as their respective local scopes.
But the inner function also has access to the scope of the "outer_func". That scope is neither local to "inner_func" nor global. It is called **nonlocal**.

```py
def outer_func():
    a=10
    def inner_func():
        print(a)

    inner_func()

outer_func()
```

When we call "outer_func", "inner_func" is created and called. When "inner_func" is called, Python does not find "a" in the local "inner_func" scope, it does not exist because it is referenced but not assigned to a value. Then Python will start to look at the enclosing scope. In this case, it first goes to look at "outer_func" scope and finds it and uses that one.

**global keyword**

We can use "global" inside "inner_func" to modify the global variables:

```py
a=10
def outer_func2():
    def inner_func():
        global a
        a="hello"

    inner_func()

outer_func2()
print(a) # prints "hello"

```

**Modifying nonlocal variables**

```py
def outer_func():
    x="hello"
    def inner_func():
        x="python"
    inner_func()
    print(x)

outer_func() # "hello"

```

In this example there is no modification. Why?

When Python compiles this code:

- It sees an assignment inside "inner_func" `x="python"`
- Another assignment is inside "outer_func" `x="hello"`

  Those two "x" variables are two different variables. They are stored in different namespaces.

- When "inner_func" is called, Python sees `x="python"` in local scope so

       x="python"

- When "outer_func" is called, Python sees `x="hello"`

       x="hello"

That is why `print(x)` will print out "hello"

In order to modify the nonlocal variable we have to explicitly tell Python, we are modiyfing a nonlocal variable by using **nonlocal** keyword. Let's see how this works:

```py
def outer_func():
    x="hello"
    def inner_func():
        nonlocal x
        x="python"
    inner_func()
    print(x)

outer_func() # "python"
```

Now when we call "inner_func", it modifies the `x="hello"`.

Whenever Python is told that that variable is nonlocal, it will look for it in the enclosing local scopes chain but not global scope. If you meant to use a global variable, just use the **global** keyword. Let's see a triple nested function:

```py
def outer():
    x="hello"
    def inner1():
        def inner2():
            nonlocal x
            x="python"
        inner2()
    inner1()
    print(x) # "python"

```

Python will see **nonlocal** keyword in "inner2()", so it will search for it up to global scope but not global scope. It will find it inside "outer()" and will modify it.

Last example

```py
x = 100
def outer():
    global x
    x = 'python'

    def inner():
        nonlocal x
        x = 'javascript'
    inner()
```

When we call `inner()`, we get error because there is no "x" inside "outer" functions's local scope. Because `x='python'` points to the global "x", therefore it is stored in the global scope's namespace. Python will raise this error:

```py
File "<ipython-input-17-3ccaec905318>", line 7
    nonlocal x
    ^
SyntaxError: no binding for nonlocal 'x' found
```
