---
_id: "palindrom"
slug: "reverse-the-linked-list"
title: "Reverse The Given Linked List"
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

![reverse the given linked list](reverse-linked-list.png)

It is a simple question but helps us understand the fundamentals of linked list. I come up with only one edge case question

1- What do we return if we get null or a single node?
Return null and the node back respectively

Unlike in array questions, we do not know the length of linked list and linked lists are not indexed. The only way to loop through a linked list is to start from the first element which is named **Head** of the list, and shift to next value by "next" property that each member of linked list which is called **Node** has. Each "node" has "value" and "next" property. `node.value` stores the value and `node.next` points to the next node. Iterations will stop when the last node, named **Tail**, "tail.next" points to `null`.

    Iterations always start with HEAD node.

As we iterate through a linked list, we have to be careful not to lose the references. Then our linked list will break. For example, at the end of the operation, we want the first node to point to "null" `firstNode.next --> null`. But If I start with this I will cut the firstNode from linked list, becuase firstNode is connected to the entire linked list via the secondNode and `firstNode.next` will no longer point to the second node.

Remember how we swap variables. This is what we are going to use in our solution.

```js
let a = 1;
let b = 2;
let temp;

temp = a;
a = b;
b = temp;
```

As we loop through the linked list, we have to keep a reference to the current node before we shift to next node. Because if currently we are on node.value=1, `1 --> 2`, when we reverse the list, node.value=2 will be pointing to the current node.value=1, `2 --> 1`. It will be easier if I explain step by step on the code. Here is the code:

```js
// 1 -> 2 -> 3 -> 4 ->5
const reverse = (head) => {
  // We want first node to point to null
  // prev will be updated as we loop through
  let prev = null;
  let current = head;
  while (current) {
    // We have to keep reference the next node
    // current.next.value=2
    // next is our temp as above
    let next = current.next;
    // first node points to null
    // but we still keep the reference to the rest of the linked via next
    current.next = prev;
    prev = current; // 1->null
    current = next; // 2
  }
  return prev;
};
```

**- Python Solution**

Its solution is very similar to above:

```py
def reverse(head):
    prev=null
    current=head
    while current:
        next=current.next
        current.next=prev
        prev=current
        current=prev
    return prev
```
