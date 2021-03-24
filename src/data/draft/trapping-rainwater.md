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

As you can see, we just have to count the blue blocks. In total we have 8 blocks.

1- Do the left and right sides of the graph count as walls?
No, sides are not walls. There is no water is trapped on the left side

![trapping rainwater algorightm by yilmaz bingol](trapping-rainwater-3.png)

2- Will there be negative integers in the array?
No

Let's think about a logical solution. Given this array [0,1,0,2,1,0,3,1,0,1,2],

I will be using two pointer technique, one pointer in the beginning of the array, and second one at the end of the array. The key thing in two pointer how to decide under which condition which pointer will be moving first.

Water must be surrounded by 2 buildings on its left and right.
