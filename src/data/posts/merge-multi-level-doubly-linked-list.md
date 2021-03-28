---
_id: "merge-lin"
slug: "merge-multi-level-doubly-linked-list"
title: "Merge Multi Level DOubly Linked List"
createdAt: "2021-03-18T19:30:59.611+00:00"

updatedAt: "2021-03-26T19:30:59.611+00:00"
field: "algorithms"
image: "/images/featured/bitcoin.jpg"
isFeatured: false
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![linked list](linked-list-like.jpg)

The only difference between a doubly linked list and a single list is the fact that the list nodes in doubly linked list have **prev** property. Similar to **next**, it either points to null or a list node. Like `tail.next` points to null, `head.prev` points to null.

      In doubly linked lists, we can traverse forwards and backwards

Here is the question:

Given a doubly linked list, list nodes also hava a child property that can point to a separate doubly linked list. These child lists can also have one or more child doubly linked lists of their own and so on. Return the list as a single level flattened doubly linked list. Our list node has also **child** property.

```js
const anInstanceOfNode={
                        value:number,
                        next:Node || null,
                        prev:Node || null
                        child:LinkedList,
                        }
```

![nested doubly list](nested-doubly-list.png)

As you see above image, second node points to another doubly linked list, our goal is to place that doubly linked list between second and third doubly list. That is the whole idea of flattening. It does not matter whether you go top down or bottom up in the merging process.

Let's consider the edge cases:

1- Can a doubly linked list have multiple child list nodes

Yes, every list node can have multiple levels of children.

![multiple child doubly lists](multiple-child-nodes.png)

2- What do we do with child properties after flattening?

Just set to child property value to null.

We will be given the "head" node and we are going to iterate over linked list using "head". We assign it to a variable "currentNode" and we keep calling `currentNode.next". If "currentNode" does not have "child" linked list, we keep calling "currentNode.next". Here is the code that implements our logic so far.

```js
const flatten = function (head) {
  if (!head) return head;
  let currentNode = head;
  while (currentNode !== null) {
    if (currentNode.child === null) {
      currentNode = currentNode.next;
    } else {
    }
  }
```

What if currentNode has a child List. The "else" statement that I left blank is where we are going to write our logic if we hit a child Linked List. Remember we were iterating over main Linked List, the node that has child linked list is named "currentNode". We are now on its child linked list "currentNode.child".

- We want our "currentNode.next" to point to the "currentNode.child"

- Important thing that we have to think about as I mentioned above ninn doubly linked lists, `head.prev`=null. Since we are on the head of child linked list, this child's `head.prev=null`. So when we merge this, we want this `head.prev`=`currentNode`

- Then we iterate through the linked list till the "tail" of child node. We want child's "tail.next" to point to the "currentNode.next". We also want `currentNode.next.prev` points back to the "tail" of child list.

- As I mentioned in the edge cases, after merging, `currentNode.next=null`

Based on these consideration, this is how I would write the code:

```js
const flatten = function (head) {
  if (!head) return head;
  let currentNode = head;
  while (currentNode !== null) {
    if (currentNode.child === null) {
      currentNode = currentNode.next;
    } else {
      // we are on child linked list
      // we have to iterate till the tail of this child list
      let tail = currentNode.child;
      //   this is how we iterate over linked list
      while (tail.next !== null) {
        tail = tail.next;
      }
      // we reached the tail of child list
      tail.next = currentNode.next;
      // what if our child list belongs to tail of main linked list
      if (tail.next !== null) {
        tail.next.prev = tail;
      }
      currentNode.next = currentNode.child;
      currentNode.next.prev = currentNode;
      currentNode.child = null;
    }
  }
  // head of entire flattened list
  return head;
};
```

Since we are not storing any scaling data structure:

         Space Complexity S : O(1)

For time complexity, we have to think about the worst case scenario which is every node has a child linked list. In our solution, the node that has child list, is "currentNode" and we touch it twice. First when dive into the child and second when we assign it to "null". So in worst case scenario, we would be touching each node twice. So our time complexity:

       Time Complexity   T : O(2n)=O(n)

## Python Solution

```py
def flatten(head):
    if head is None:
        return head
    currentNode=head
    while currentNode:
        if currentNode.child==None:
            currentNode=currentNode.next
        else:
            tail=currentNode.child
            while tail.next:
                tail=tail.next
            # we reached tail of child here
            tail.next=currentNode.next
            if tail.next:
                tail.next.prev=currentNode
            currentNode.next=currentNode.child
            currentNode.next.prev=currentNode
            currentNode.child=null
    return head
```
