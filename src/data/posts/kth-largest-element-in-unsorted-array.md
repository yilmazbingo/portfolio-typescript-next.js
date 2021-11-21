---
_id: "kth-largest"
title: "k'th Largest Element in Unsorted Array"
createdAt: "2021-04-1T19:33:59.611+00:00"
updatedAt: "2021-04-1T19:33:59.611+00:00"
field: "algorithms"
image: "/images/posts/google-two-sum.png"
isFeatured: false
slug: "kth-largest-element-in-unsorted-array"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

Given an unsorted array, return the kth largest element. It's the kth largest element in sorted order, not the kth distinct element.

Let's say we received [2,3,1,2,4,2] and we need to find the 4th largest element. We sort the array first [1,2,2,2,3,4]. If it was asking for 4th distinct largest element, answer would be 1. But our question is asking for 4th largest element, we will simply move 4 elements from right.

There is only one edge case to consider in this question:

1- Can we get an array where k is larger than the array length?

No, assume that answer is always available.

First thing is we have to sort the array with the most optimized sorting algorithm. By default, most languages implement quicksort or merge sort because they are the most optimized soring algorithms. I will be using quick sort therefore I need to write about quick sort algorithm.

    **Quick Sort:**

- It sorts the array in place, it does not create a new array, it mutates the array.
- It is recursive

  Quick sort works on this concept, if we take a number, let say the right most number, we call this number **pivot** number. Our goal is to find the final resting place for this number or final index that pivot number should be in once the array is sorted. Let's take this an example: [5,3,1,6,4,2]

  Initially let's choose 2 as pivot number. We are not trying to sort the whole array, we are just looking for the final spot for 2. That final spot is where all elements on the left is less than 2 and all the elements on the right is greater than 2. We do not care about the order of other numbers. We actually do not care about anything else. Let's say we found the space for 2.

        [[, , ...],2, [ , , ,... ]]

  Once we found the final spot for 2, we end up having 2 unsorted arrays, one on the left of 2, another one on the right of 2. Next step is to sort those two sub arrays with the same quick sort algorithm. This implementation makes this algorithm recursive because after we sort those two sub arrays, we are going to have other sub arrays of those sub arrays till we sort all the elements inside the array. That is the basic idea. But how are we actually start to sort 2:

  Any element that less than 2 must be placed on its left, and any element that greater than 2 must stay on its right. To do so, we are going to compare 2, with the rest of the array elements.

We initialize 2 pointers at the beginning of the array, **i** and **j**. "i" will keep track of the final position of the elements that less than 2 till the last comparison, "j" will scan entire array and compare the element at index "j", with "pivot" number which is 2 in this case. If the element at index "j" is smaller than 2, we are going to swap the element at index "j" with the element at index "i". After swapping, we move "i" and "j" forward. Note that we are not swapping indices, we are swapping the elements at those indices.

- Starting to compare from first element, 5. It is greater than 2, so we move "j" to next element.
- 3 is greater than 2, we move "j" to next element
- 1 is less than 2. "j" points to 5, "i" points to 1, we swap 1 and 5. We end up having this array

          [1,3,5,6,4,2]

  After performing swapping, we moved "i" and "j" forward. Currently "i" points to 3, "j" points to 6.

- 6, then 4 are less than 2. We move forward "j" till we reach 2. Since we finished comparing elements with 2, all we need to to now is swap the element at index "i" which is 3, with the element 2. This will be our current state:

        [1,2,5,6,4,3]

We guaranteed that all the elements on the left side of 2 are less than 2 and elements that are on the right side are greater than 2. Since 1 is already sorted, we apply same sorting algorithm to the sub array [5,6,4,3]. This algorithm is a little confusing so here is an [entartaining video](https://www.youtube.com/watch?v=ywWBy6J5gz8) to watch how quick sort is being performed.

As you noticed, our main problem was sorting the array but we broke the main problem into smaller sub problems and solving this subproblems leads us to the solution. This strategy is called **divide and conquer**.

## Coding Solution:

It is time to apply our knowledge into the solution. Here are 4 steps to solve this problem:

**1- Partitioning the array for quicksort**

I showed how to find the final position of 2 above, let's code this first.

```js
const partition = function (array, left, right) {
  const pivotElement = array[right];
  // we return this. Initially it is 0.
  let partitionIndex = left;
  for (let j = left; j < right; j++) {
    if (array[j] < pivotElement) {
      // we should think functional. I implement this in 2nd step
      swap(array, partitionIndex, j);
      partitionIndex++;
    }
  }
  // when we reach the pivot, we swap pivot and array[partitionIndex]
  swap(array, partitionIndex, right);
  return partitionIndex;
};
```

**2- Implementing swap function**

```js
const swap = function (array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
```

If we naively say `array[i]=array[j]`, array[i] would hold the same value as array[j] holds and we would lose the initial value of array[i]. Not to lose it, we assign it to "temp" variable, we changed the value of array[i] and then we change the value of array[j].

** 3- Recursive Quick Sort**

So far we sorted only one element of array.

```js
const quickSort = function (array, left, right) {
  // if left=right, it means we have only one item, it is already sorted
  if (left < right) {
    const partitionIndex = partition(array, left, right);
    // finding partitionIndex, divides array into 2 arrays
    // left array is between 0 and "partitionIndex-1" index
    quickSort(array, left, partitionIndex - 1);
    // right array is between "partitioon+1" and right most index
    quickSort(array, partitionIndex + 1, right);
  }
};
```

** 4- Scoring the goal**

We have finished the heavy work so far. All we have to is sort the given array and count down 4 elements from the end:

```js
const getKthLargest = function (array, k) {
  const indexToFind = array.length - k; // O(1)
  quickSort(array, 0, array.length - 1); // time O(nLogn) space O(logn)
  return array[indexToFind]; // O(1)
};
```

## Python Solution

Python has a unique way to swap variables:

      a,b=b,a

How does this work?

Python first evaluates the right side of assignment and it pushes "b" and "a" to the stack. Then left-hand side names are assigned using opcodes that take values from stack again. At this time, top 2 values from the stack are swapped by python ROT_TWO().

```py
def partition(array,left,right):
    pivot_element=array[right]
    partition_index=left
    # j is going to scan the array
    j=partition_index
    while j<=right:
        if array[j]<pivot_element:
            array[partition_index],array[j]=array[j],array[partition_index]
            partition_index+=1
            j+=1
        if array[j]>=pivot_element:
            j+=1
    #Swapping in python
    array[partition_index],array[right]=array[right],array[partition_index]
    return partition_index
```

```py
def quick_sort(A:list,low:int,high:int):
    if not isinstance(A,list):
        raise TypeError("")
    if low<high:
        pi=partition(A,low,high)#rearranges elements in the array then returns the index of the pivot
        quick_sort(A,low,pi-1)
        quick_sort(A,pi+1,high)
```
