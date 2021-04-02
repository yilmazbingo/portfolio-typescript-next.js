---
_id: "angu"
title: "Sum of 2 integers in an array"
createdAt: ""2021-03-14T19:30:59.611+00:00""
updatedAt: ""2021-03-14T19:30:59.611+00:00""
field: "algorithms"
image: "/images/posts/google-two-sum.png"
isFeatured: true
slug: "sum-of-two-integers-in-array"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![google interview question, find two sum in array](google-two-sum.png)

The question is given an array of integers, return the indices of the two numbers that add up to a given target. For example

```js
const myArray = [2, 5, 6, 8, 12];
```

Let's say our target is 20, we will be looking for two integers that adds up 20 and return the indices of those two values.

Before diving into the solution, we have to figure out the edge cases to clearly solve the problem. I come up with 5 edge cases.

    1- Are all numbers in the array positive?
    Yes, consider no negative numbers exist.

    2- Are there any duplicate numbers in the array.
    No

    3- Will there be always a solution?
    No

    4- If there is not any solution, what should I return?
    In this case, return -1.

    5- Can there be multiple pairs that add up to the target?
    No

If you see a similar question, looking for a pair in a given data, we use **two pointer technique**. We initialize one pointer that points at some value, usually the first item in the array. Let's say first item in the array is pointed by "p1". First, I want to test every possible combination that involves **p1**. Then we need second pointer, **p2**. p2 points to the other number that we are looking for in the array so that `p1+p2` is equal to given array. Note that p1 and p2 are indices not the values.

Naive solution for this would be brute force solution which is using two nested for loops.

```js
       const bruteForce= function(nums,target){
           for(let p1=0; p1<nums.length; p1++){
                const numberToFind=target-nums[p1]
                for(p2=p1+1;p2<nums.length,p2++){
                    if(numberToFind===nums[p2]){
                        return [p1,p2]
                    }
                }
            }
            return null
        }
```

We start from first item, `nums[p1]=2`. In the second loop, we go through the rest of the array items which are [5,6,8,12]. Our target is 20. So, second value should be `20-2=18`. Technically we are looking for value 18 in the second iteration for the first value 2. If we cannot find 18 in the second iteration, we move the next item in the array for p1 which is 5, then we loop over [6,8,12] to find `20-5=15`. We go through this steps till we find the soluitoon, if not we return null.

As you know, solving an algorithm question is not enough. We have to analyze the performance with space complexity and time complexity. In this problem, the `nums` array is the only argument that gets scale. We have to consider, how much time and space will our code will take if "nums" array gets really really big.

For space complexity, the only thing that we are doing is, we are setting variable p1 which is a static variable which means it does not scale. So our space complexity is S:O(1).

With time complexity, we have to ask ourself, how many more iterations our code has to run if the "nums" array really gets big. We have two nested for-loop. In first loop, we run through all the elements in the array and in the second loop we run through the rest of elements in the array. For the first element in the array, we will be making `n-1` iterations in the second loop, if there is no solution, we jump to second element and we make `n-2` iterations in the second loop. In the worst case scenorio, If we have no solution we will end up making these many iterations:

      `(n-1) + (n-2) + (n-3) + ...............+ 3 + 2 + 1 = ((n^2)-n) / 2`

Its formula looks scary but it is actually very easy to derive it. We have "n-1" summations. if you sum up first and last item in the sequence, you get `(n-1)+1=n`. If you sum up the second item from the beginnning and from the end, `(n-2)+2=n`. You will end up (n-1)/2 times n. This is how many total iteration we make in second loop. We also make n iterations to iterate over the first array. In both iterations we would be making

        (((n-1)/2)*n)+n=((n^2)+n)/2

Our time complexity would be `T:O(((N^2)+N) / 2)= O(N^2)`. Because if "nums" array gets larger, `N^2` will grow faster than N, so we can neglect N and division, because if N^2 is very large, N^2 divided by 2 will be very large too.

We solved our problem which is a valid solution, but since we have time complexity `O(N^2)`, interviewer will definitely ask us if we could optimize the solution.

## Optimizing the Solution

Optimizing the algorithm question means finding a faster and less wasteful way, so our app will be faster and client will have better user experience. In any algorithm question, we should be avoiding nested for loops. Be aware that reducing the time complexity will increase the space complexity, there is always trade-off between both.

Our logic will change. We will not use 2 pointers technique. Instead, we will have only 1 for-loop, we loop over our array, for each element in the array, we will be calculating `target-elementValue` and store it in a hashmap. The reason why we use hashmap is, time complexity for look up operation is O(1). Our target is still 20. We will be storing `index` as value and `target-elementValue` as key:

`{target-elementValue : value}`

       const myArray=[2,5,6,8,12]

- For the first element, element 2, `20-2=18`, index=0, store={ {18,0} }

- For element 5, we look up if `store[5]` exists, if it does, it will give us the index, and we return that index with current index=1. if it does not exist, we add ,`20-5=15` {15,1} to the store
  `store={ {18,0},{15,1} }`

- For element 6, we look up if `store[6]` exists, it does not so we add {14,2} `store={ {18,0},{15,1},{14,2} }`

- For element 8, we look up if `store[8]` exists, it does not, we add {12,3}
  `store={ {18,0},{15,1},{14,2},{12,3} }`

- For element 12, we look up for `store[12]`, it does exist and its value is 3, so we return [3,4]. 4 is the index of the current item 12.

Here is its code. It is very clear code. One important thing is, anytime you write a function, you have to validate the inputs. I will be using typescript or you could write custom validations with if statement and return errors.

```ts
const findTwoSum = function (nums: number[], target: number): int[] | null {
  // hash map look up is O(1)
  const store = {};
  for (p = 0; p < nums.length; p++) {
    // we are looking for goal
    const goal = target - nums[p];
    if (store[goal]) {
      return [store[goal], p];
    } else {
      store[nums[p]] = p;
    }
  }
  return null;
};
```

## Python Solution

```py
    from typing import List
    def twoSum(nums:List[int],target:int)->List[int] or None:
        m={}
        n=len(nums)
        for i in range(0,n):
            goal=target-nums[i]
            if(goal in m):
                return [m[goal],i]
            m[nums[i]]=i
    return None
```
