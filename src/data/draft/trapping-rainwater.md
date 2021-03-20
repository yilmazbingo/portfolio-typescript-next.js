---
_id: "bl"
title: "Trapping Rain Water"
createdAt: "2021-03-05T19:30:59.611+00:00"
updatedAt: "2021-03-18T19:30:59.611+00:00"
field: "algorithms"
image: "/images/featured/bitcoin.jpg"
isFeatured: false
slug: "trapping-rainwater"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![trapping rainwater algorightm by yilmaz bingol](trapping-rainwater.png)

Given an array of integers representing an elevation map where the width of each bar is 1, return how much rainwater can be trapped.

Width of each bar is one, that means that the only distance between elements is when the element is zero. You can see that throughout above image, there are some gaps at the bottom, that is when the element in the array is 0. Imagine that rain is falling down, how much water would get trapped.

![trapping rainwater algorightm by yilmaz bingol](trapping-rainwater-2.png)

As you can see, we just have to count the bluw blocks. In total we have 8 blocks.

This is very creative problem, I wonder who created this question. Unlike other problems, this question looks simple but coding part is challenging. Let's consider the edge cases:

1- Do the left and right sides of the graph count as walls?
No, sides are not walls. There is no water is trapped on the left side

![trapping rainwater algorightm by yilmaz bingol](trapping-rainwater-3.png)

2- Will there be negative integers in the array?
No

Let's think about a logical solution. Given this array [0,1,0,2,1,0,3,1,0,1,2],

Our question is not a max-value question. We just have to find the total amount of water that gets trapped. First step is to find the left wall and right wall, then we will be analyzing what is there between the left wall and right wall. We know that left and right sides are not wall, so we have to skip the first "0"s and last "0"s.

To find the left side wall, we simply start from the beginning of the array, it is 0, we skip this, we move to value 1. We dont immediately count 1 as our left value. We look at the next value, if next value is greater than 1, we skip 1 because no vater will be trapped between 1 and next value. If next value is less than 1, we count value 1 as our left wall.

To find the right side wall, start from the end of the array. It's 2, we look at the next value if it is greater than 2 or less than 2. Since it is less than 2, we count 2 as our right wall.
