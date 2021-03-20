---
_id: "container"
title: "Container With Most Water"
createdAt: "2021-03-18T19:30:59.611+00:00"
updatedAt: "2021-03-18T19:30:59.611+00:00"

field: "algorithms"
image: "/images/featured/water.jpg"
isFeatured: true
slug: "container-with-most-water"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

You are given an array of positive integers where each integer represents the height of a vertical line on a chart. Find two lines which together with the x-axis forms a container that would hold the greatest amount of water. Return the area of water it would hold.

imagine you are given this array.`[1,8,6,2,9,4]`. Each element maps to its correspondig line in order. Our goal is picking two lines that would form a container with the bottom x-axis that hold certain area of water. In this case, greates are would be between 8 and 9. What we have to imagine is that if water were to be poured into this, it would fill up a certain amount of water, which is equal to the shaded area. The area goes up to the 8 because the water will spill over after above 8. We need to return the area that this container holds. area would be 24. When we calculate the width, we consider each element is 1 unit away from previous one.

![container with most water](container.png)

Let's consider the edge cases:

1- Does the thickness of the lines affect the area?

No, assume that lines take up no space.

2- Do the left and right sides of the graph count as walls?

No. sides cannot be used to form a container. We have to use a value inside of the array in order to form the wall.

3- Does a higher line inside our container affect our area?

![container with most water](container-2.png)

On the above example, greates area is between 7 and 6, assume that none of the lines between 6 and 7 affect the area calculation.

The question seems very intimidating but the coding the solution will take only a few lines of code. Let's start with the naive approach, using nested for-loops.

This question is maximal value question that means we will run through all combinations and return the value, unlike [sum of two integer question](https://bingolyilmaz.com/blogs/sum-of-two-integers-in-array). In that question when we find the target value we stop searching and returned the indices. The maximal value can be determined if we have calculated the area of every single container first.

Before diving into coding, let's think through the logical solution. We will be comparing 2 values, from those values, we drive lenght and width. As you saw fromt the first image, greatest amount of water was between 8 and 9. Since water will spill over above 8, we picked the 8 as lenght. So given two elements, "a" and "b":

      Length = minimum(a,b)

Width will be the difference between their indices. 4^th^

      Width = b<sub>i</sub> - a_i  // i is for index

      Area = Length * Width = min(a,b) * (b_i-a_i)

When we calculate the area of first pair of values, we will be storing it as our maxValue. Then we calculate the area of next pair, we compare the new area with the maxValue, if new area is greater than maxValue, we store this as our new maxValue. We will do the same operations till we calculate the area for all pair of elements and we return the maxValue.

```js
const getMaxWater = (heights: int[]) => {
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      const height = Math.min(heights[i], heights[j]);
      const width = j - i;
      const area = height * width;
      maxArea = Math.max(maxArea, area);
    }
  }
  return maxArea;
};
```

Space complexity of this solution is O(1) because no matter how many iteration we do, we will be storing only maxArea in the memory and it does not scale, it is primitive value. However since we have two nested for loops, its time complexity T: O(N^2). Our lovely interviewer will definitely ask if we could optimize the code. To optimize the code, we use two pointers technique.
We initialize two pointers at the opposite sides of the array.

We have to decide under which conditions we are going to move the pointers. There are two things we have to pay attention as we compare the values.

        const heights= [1,8,6,2,9,4]

First pointer is the index 0 which pointes to 1, and second pointer will be the last index element, which is 4. For the first pointers, area=1\*4=4

Now which pointer is going to shift first. If I shift the first pointer forward, I reach 8, **8 X 4=32** but if I shift the second pointer, I reach 9, **9X1=9**. For this we have to examine the formula more closely.

     Area = Length * Width = min(a,b) * (bi-ai)

No matter which pointer we shift **bi-ai** will always get smaller. So we will be focusing if **min(a,b)** gets larger or smaller. If moving the first pointer increases min(a,b), I will move the first pointer otherwise I will move the second pointer.

For the first values, min(1,4)=4. If I shift the second pointer to 9, min(1,9)=1. Shifting second pointer, gave us a larger value but it had no impact on min(1,4). It is still 1. If I shift the first pointer, from 1 to 8, min(8,4)=4, so for the first step I will shift the first pointer. my first pointer points -->8, and second pointer still points -->4 and min(8,4)=4

If I shift the first pointer from 8 to 6, our new min value, min(6,4)=4 but this time, if I shift the second pointer from 4 to 9, our new min value will be min(8,9)=8. This time it increased.

So the rule is, if the value at first pointer is smaller than value at second pointer, I will be shifting the first pointer, otherwise I will be shifting the second pointer.

```js
const optimal = (heights) => {
  // Instead of types, you could write custom validation rules
  if (!Array.isArray(heights)) {
    throw new Error("input must be an array");
  }
  //   p1 and p2 are indices. [p1,  ,  ,  ,  ,p2]
  let p1 = 0,
    p2 = heights.length - 1,
    maxArea = 0;
  // We will be testing till the pointers meet
  while (p1 < p2) {
    const height = Math.min(heights[p1], heights[p2]);
    const width = p2 - p1;
    const area = height * width;
    maxArea = Math.max(maxArea, area);
    if (heights[p1] <= heights[p2]) {
      // if condion met, shift the first pointer
      p1++;
    } else {
      // otherwise shift the second pointer
      p2--;
    }
  }
  return maxArea;
};
```

## Python Solution

Here is the optimal solution with python.

```py
from typing import List
def max_water(A:List[int])->int:
    left=0
    right=len(A)-1
    maxArea=0
    while left<right:
        height=min(A[left],A[right])
        width=right-left
        maxArea=max(maxArea,height*width)
        if A[left]<A[right]:
            left+=1
        else:
            right-=1
    print(maxArea)
```
