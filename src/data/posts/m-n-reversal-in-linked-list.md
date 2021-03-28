---
_id: "palindrom"
slug: "m-n-reversal-in-linked-list"
title: "Reverse The Given 2 Nodes in Linked List"
createdAt: "2021-03-18T19:30:59.611+00:00"
updatedAt: "2021-03-18T19:30:59.611+00:00"
field: "algorithms"
image: "/images/featured/bitcoin.jpg"
isFeatured: false
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![reverse the part of linked list](reversepartoflinkedlist.png)
Given a linked list and numbers m and n, return it back with only positions m to n in reverse. We are going to build a new list whose tail will be current m'th, and its head will be the current n'th node. So we need to reach, **m-1**th, **m**th, **n-1**th and **n**th node.

    Unlike array, positions start from 1 in linked lists not 0

As always let's consider the edge cases:

1- Will m and n always be withing the bounds of the linked list?

    Yes. Assume 1<=m<=n<=lengthOfLinkedList

2- Can ver receive m and n values for the whole linked list?

Yes, we can receive m=1 and n=lengthOfLinkedList

All we have to change is m and n values. So

- node before m, "m-1"th should point to n, n.next should point to node after m
- node before n, "n-1"th should point to m, m.next should point to node afer n

  Our goal is to build a new linked list where its head is "m"th node and its tail is "n"th node.

Important thing to always remember, in linked lists, we iterate over by starting from head node. Frist step we have to iterate till we reach m'th node.

```js
const reverse = (head, m, n) => {
  let currentPos = 1,
    currentNode = head;
  // "start" will be the m-1 th node
  let start = head;
  // keep reference of m-1 th which is "start"
  while (currentPos < m) {
    start = currentNode; // start=m-1th
    currentNode = currentNode.next; // currentNode is the m th
    currentPos++;
  }
};
```

This while loop, will continue till we reach "m"th node meaning that the last node will be touched in this loop will be "m-1"th node. When we touch "m-1"th node:

       start       = m-1 th node,
       currentNode = m th node

We are half way there. Now we need another while loop to reach n-1 th node. We are going to build our new linked list. We have been iterating through `currentNode = currentNode.next`, so when hit the end of the while loop, `currentNode` is going to be the **tail** of the new linked list.

```js
let newList = null,
  tail = currentNode;
```

Now we need to reach the node that right before "n"th node, n-1th node should point to the "currentNode". We write another while loop to react the n-1th

```js
while (currentPos >= m && currentPos <= n) {
  const next = currentNode.next;
  // currentNode starts with mth
  currentNode.next = newList;
  newList = currentNode; // currentNode is going to represent the head of  the list that we built so far
  currentNode = next;
  currentPos++;
}
```
