---
_id: "palindrom"
slug: "m-n-reversal-in-linked-list"
title: "Reverse The Sublist of Linked List"
createdAt: "2021-03-25T19:12:59.611+00:00"
updatedAt: "2021-03-25T19:30:59.611+00:00"
field: "algorithms"
image: "/images/featured/bitcoin.jpg"
isFeatured: false
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![reverse the part of linked list](reversepartoflinkedlist.png)

Given a linked list and numbers m and n, return it back with only positions m to n in reverse. We are not going to build a new list, we are just going to reverse the given part as it is shown on image.

As always let's consider the edge cases:

1- Will m and n always be within the bounds of the linked list?

    Yes. Assume 1<=m<=n<=lengthOfLinkedList

2- Can we receive m and n values for the whole linked list?

Yes, we can receive m=1 and n=lengthOfLinkedList

Let's break the promlem into smaller parts:

**Step-1 :** Iterate through the linked list till m'th Node, and keep the reference of `m-1`th and `m`th node. Eventually we want "m-1"th node to point to the "n"th node. Since we are swapping the positions of "m" and "n" nodes, "m"th node will point to the "n+1"th node.

Important thing to always remember, in linked lists, we iterate over by starting from head node. First step we have to iterate till we reach m'th node.

           Unlike array, positions start from 1 in linked lists not 0

```js
const reverse = (head, m, n) => {
  let currentPos = 1,
    currentNode = head;
  // "start" will be the m-1 th node
  // keep reference of m-1 th which is "start"
  let start = head;
  while (currentPos < m) {
    start = currentNode;
    currentNode = currentNode.next;
    currentPos++;
  }
};
```

The last iteration will be when `currentPos=m-1`. At the end of this loop, we will have:

       start       = m-1'th node,
       currentNode = m'th node

**Step-2:** We are half way there. Now we need another while loop to reach "n"th and "n+1"th node. Eventually, we want "n"th node to point to "m"th node, and "m-1"th node to point to the "n"th node. To do so we have to initalize two new variables

Before I explain what those two variables are and how we are going to loop through step by step, I want to make a pause and explain how we swap variables in javascript with creating a "temp" variable. Just a quick side node:

**Swap variables in Javascript**

    let a=5
    let b=7

When we initialize variables, we are actually reserving a new spot from memory, we place the value in that spot and our variable name just points to that spot, in other words to memory address.

    a ---> memoryAddressOf5
    b ---> memoryAddressOf7

If we naively say `b=a`, **b** will point to the same variable as **a** points to, in this case `b --> 5`. If you check "a" and "b" values:

```js
console.log(b); // 5
console.log(a); // 5
```

We currently lost our reference to memory address that stores the value 7. In other words, nothing is pointing to that memory address. To fix this, we define a new variable **temp** which will be pointing to the same memory address as **b**.

```js
let temp = b; // temp points to 7
b = a; // both points to 5
a = temp; // a points to 7
```

if we print those values

```js
console.log(a); // 7
console.log(b); // 5
console.log(temp); // 7
```

We are going to apply swapping logic to swap the nodes. Our goal is to swap each node as we iterate over linked list to reach "n"th and "n+1"th node. I said that we were going to initialize two new variables:

```js
let newList = null,
  tail = currentNode;
```

You can think of "newList" as "temp" variable that we used during swapping. We will assign `currentNode.next=newList` then, `newList=currentNode`. At the end of while loop, "newList" will be the "n"th node.

Also, do not forget that we still have `currentNode` which references to "m"th node.

In each iteration, we will be reversing "currentNode" and "currentNode.next".

     currentNode --> currentNode.next

Since we iterate over linked list as `currentNode=currentNode.next`, in order to proceed to next node, we should always keep reference of `currentNode.next`. Now let's dive into our second while loop:

```js
while (currentPos >= m && currentPos <= n) {
  // keep reference of next node so we can proceed
  const next = currentNode.next;
  // swapping starts here.
  currentNode.next = newList;
  // newList is prev node
  newList = currentNode;
  currentNode = next;
  currentPos++;
}
```

Let's think what we are going to end up at the end of second while loop. For `currentPos=n`, this loop will run last time.

```js
    next        = n+1th Node
    currentNode = n+1th Node
    newList     = nth Node

    start       = m-1 the Node
    tail        = mth Node
```

We have kept "start" since first loop. Now it is time to set its next value to point to nth Node which is newList

```js
start.next = newList;
```

Eventually, if you look at the image, we want "m"th node which is "tail" to point to "n+1"th node which is "currentNode":

```js
tail.next = currentNode;
```

Here is the full code :

```js
const reverse = (head, m, n) => {
  let currentPos = 1,
    currentNode = head;
  let start = head;
  while (currentPos < m) {
    start = currentNode;
    currentNode = currentNode.next;
    currentPos++;
  }
  let newList = null,
    tail = currentNode;

  while (currentPos >= m && currentPos <= n) {
    let next = currentNode.next;

    currentNode.next = newList;
    newList = currentNode;
    currentNode = next;
    currentPos++;
  }
  start.next = newList;
  tail.next = currentNode;
  if (m > 1) {
    return head;
  } else {
    return newList;
  }
};
```

In order to test the solution, I also provide a LinkedList class:

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  append(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    // return this;
  }
  prepend(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    // return this;
  }
  search(value) {
    let currentNode = this.head;
    let position = 1;
    while (currentNode) {
      currentNode = currentNode.next;
      if (currentNode.value === value) {
        return { value: currentNode, position };
      }
      position++;
    }
    return -1;
  }
  display() {
    const array = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  }
  insertAny(position, value) {
    //Check for proper parameters;
    if (position >= this.length) {
      return this.append(value);
    }
    const newNode = new Node(value);
    const leader = this.traverseToPosition(position - 1);
    const holdingPointer = leader.next;
    leader.next = newNode;
    newNode.next = holdingPointer;
    this.length++;
    return this.printList();
  }
  traverseToPosition(position) {
    let counter = 0;
    let currentNode = this.head;
    while (counter !== position) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  removeFirst() {
    if (this.length === 0) {
      return null;
    }
    // return the removed value

    const deletedValue = this.head.value;
    this.head = this.head.next;
    this.length--;
    return deletedValue;
  }

  removeLast() {
    if (this.length === 0) {
      return null;
    }
    let currentNode = this.head;
    let i = 1;
    // since linked list is not indexed, we have to loop till the last node
    while (i < this.length - 1) {
      currentNode = currentNode.next;
      i++;
    }
    const deletedValue = currentNode.next.value;
    this.tail = currentNode;
    this.tail.next = null;
    this.length--;
    return deletedValue;
  }

  removeAny(position) {
    if (position > 0 && position < this.length) {
      const leader = this.traverseToPosition(position - 1);
      const unwantedNode = leader.next;
      leader.next = unwantedNode.next;
      this.length--;
      return unwantedNode.value;
    }
    return -1;
  }
}
```
