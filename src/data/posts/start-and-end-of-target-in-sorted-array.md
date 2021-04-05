---
_id: "angu"
title: "Start and End of Target in Sorted Array"
createdAt: "2021-03-14T19:30:59.611+00:00"
updatedAt: "2021-03-14T19:30:59.611+00:00"
field: "algorithms"
image: "/images/posts/google-two-sum.png"
isFeatured: false
slug: "start-and-end-of-target-in-sorted-array"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

Given an array of integers sorted in ascending order, return the starting and ending index of a given target value in an array. Let's say we are given this array:

       [1,3,5,5,5,5,8,9]

If our target is 5, the answer would be [2,5]. 2 is the index of first 5 and 5 would be the index of last 5.

Since we are given array as sorted, it will be better to implement binary search instead of linear search.

## Binary Search

If we have a sorted array, we are able to do **binary search**. We initialize two pointers, one points to the first element of array and second one points to the last element of array. Using two pointers, we calculate the third pointer which points to the element that in the middle of array. I name it "mid element".

      midIndex=(right+left)/2

if the element that we are searching is at this index, we are done. If not, we check if target element is on the right side or on the left side of "mid element". Since array is sorted, if the target element is greater than "mid elment", it means target element is on the right side of mid element, otherwise it is on the left side.

      [firstElement, , , , mid, , , , , , ,lastElement]

If target element is on the left side, we initialize another search but this time we throw away the elements that on the right side of "mid element". We reduced our search space in half and our second pointer will point to the "mid elemant" which is the last element of our search space. We will be searching our target in this array

     [firstElement, , , , ,mid]

if target element is on the right side of mid element, we will be searching out target in this array. This

     [mid+1, , , , , , lastElement]

We recursively keep dividing the array and search the target element till the "mid pointer" points to the target value or we have only one element in the array.

This algorithm has O(Log(n)) time complexity becasue everytime we perform binary search on our search space, we were removing half of tha search space. Since we are dividing our search space by 2, its base value should be 2 but since we are ignoring the constants in complexity analysis, we always take base value as 10.

Log(n) tells us how many times we divide our search space till we find the target value. Let's say we have an array with 16 elements. If we linearly search for the target, in worst scenario, target value will be at the end so we would be doing 16 operations to find the element and its time complexity would be O(N).

If we implment binary search, worst case scenario would be we find the element when only 1 element left in the array

       16 -> 8 -> 4 -> 2 -> 1

How many times we performed division till we reach target? in this case it is 4=Log2(16)=Log2(2^4)

Coding of binary search is very simple:

```js
const binarySearch = function (A, left, right, target) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const foundValue = A[mid];
    if (foundValue === target) {
      return mid;
    } else if (foundValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};
```

## Solving the Problem

Now, we learnt how binary search works, we are going to find the target value with binary search: This is our given array:

          [1,3,5,5,5,5,8,9]

```js
const firstPos = binarySearch(nums, 0, nums.length - 1, target); // index 4
```

Then, to find the starting index, we perform another binary search from the beginning of array till the "firstPos" index:

       [1,3,5,5,5]

       We cannot perform linear search because if the entire array consists of 5, we would get O(N) time complexity.

We do not know how many binary search we are going to perform, so each time we find a new index, we assign in to "temp1" till binary search returns -1.

To find the ending index, we perform another set of binary search starting from "firstPos+1" till the end of array.

     [5,8,9]

This time we assign each found index to "temp2".

Finally we return [temp1,temp2]

```js
const searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1];
  const firstPos = binarySearch(nums, 0, nums.length - 1, target);
  // If first position does not exist it means it does not exist
  if (firstPos === -1) return [-1, -1];
  let startPosition = firstPos,
    endPosition = firstPos,
    // temp1 will be starting index
    temp1,
    // temp2 will be ending index
    temp2;
  while (startPosition !== -1) {
    temp1 = startPosition;
    startPosition = binarySearch(nums, 0, startPosition - 1, target);
  }
  startPosition = temp1;
  while (endPosition !== -1) {
    temp2 = endPosition;
    endPosition = binarySearch(nums, endPosition + 1, nums.length - 1, target);
  }
  endPosition = temp2;
  return [startPosition, endPosition];
  // return [temp1, temp2];
};
```

## Python Solution

```py
def binary_search(A,left,right,target):
    while left<=right:
        mid=(left+right)//2
        found_value=A[mid]
        if found_value==target:
            return mid
        elif found_value<target:
            left=mid+1
        else:
            right=mid-1
    return -1
```
