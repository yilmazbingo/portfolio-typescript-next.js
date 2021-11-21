---
_id: "1ab"
slug: "longest-substring"
title: "Find the longest substring"
createdAt: "2021-03-18T19:30:59.611+00:00"
updatedAt: "2021-03-18T19:30:59.611+00:00"
field: "blockchain"
image: "/images/featured/bitcoin.jpg"
isFeatured: false
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

     Given a string, find the length of the longest substring without repeating characters.

Imagine a given a string "abccabb". We have two substrings that do not repeat. "abc" and "cab". The lenght of these asubstrings are 3. Let's consider the edge cases:

1- Is the substring contiguous?
Yes, look for a substring not a subsequence. Contigous means that characters that show up are sequential and do not have any breaks in between them. To show the differentce between substring and subsequence, let's analyze "abcbbd"

If the question asks for longest substring without repeating characters, it is "abc"
If the question asks for longest subsequence without repeating characters, it is "abc d". We skipped the 2 b's and move to "d". So the answer is "abcd".

2- Does case sensitivity matter?
No, assume all characters in the string are lowercase.

### Brute Force Solution

This is the simpliest way of solving the problem. We will start from first character, and iterate till the end of the string. I will store new seen values in a dictionary as `{key:true}`. "key" will be the character that we just saw. Let's say we have this string "abbcd"

We start from beginning element which is "a". Have seen this before, no. So store the value in a dictionary

    seen={a:true}   currentLenght=1

Next character is "b". We look up the dictionary, we have not seen this before. So

    seen={a:true,b:true} currentLenght=2

Next character is "b". We look up the dictionary, have seen this before. `seen['b']=true`. So longest string we have seen so far "ab" and its lenght is 2. We define `longest=2`, reset the seen dictionary and currentLenght, and we start iterating from second "b", this is where we have left off. Implementing the same technique till the end of the string, if new `currentLength` is greater than `longest`, we assign it to the `longest=currentlength`

We started from "a", till the end and we have a `longest` value. After we are done, we start from the second element from the array "b", and implment the same approach till the end. You can easily see that we are going to implement 2 for loops which is not going to have O(N^2) time complexity.

```js
const longest = (S) => {
  if (S.length <= 1) {
    return S.length;
  }
  let longest = 0;
  const n = S.length;
  // Initializing the first pointer
  for (let left = 0; left <= n; left++) {
    // hash map will keep track of right pointer touches upon here.
    let seenChars = {};
    let currentLength = 0;
    // Initializing the second pointer
    for (let right = left; right < n; right++) {
      // we need to keep track of char that the second pointer is on
      let currentChar = S[right];
      // When we are on next char, we look up the dictionary
      if (!seenChars[currentChar]) {
        currentLength++;
        seenChars[currentChar] = true;
        longest = Math.max(longest, currentLength);
      } else {
        // this is when look up will return true
        // We exit out the second loop
        break;
      }
    }
  }
  return longest;
};
```

For space complexity, we have to check what we are storing in the memory. We have 3 variables: longest, currentLenght and seenChars. longest and currentLenght are primitive values, meaning that they do not grow as we make more iterations. So their space complexity is O(1). but seenChars scale, in the worst case it can store all the string characters, so its space complexity is O(N). Total space complexity will be O(N) because constants can be omitted.

## Sliding Window Technique:

Form a window over some portion of sequential data, then move that window throughout the data to capture different parts of it. Sequential data means that the order in which the data appears is important. Strings, arrays and linked lists are sequential data models.

This window can grow or shrink as we move the window based on the problem. This window can even jump multiple steps or can step back. As the name says, it is sliding. We are going to apply this technique to optimize our code. If we see that our solution is based on two for-loops, we always should be looking for better solutions.

To start with sliding window technique, we have to initialize two pointers in the beginning of the string. We still have to keep track of the longest and seenChars hashmap. This time instead of storing values in hashmap as `{key:true}`, we will be storing as `{key:index}`. Let's work on an example: "abcbda"

We start two pointers, l and r, in the beginning of the string. We store a in hashmap as `{a:0}`, `longest=1`, our current window is "a". Then we shift r, now we are on "b". We look up the `seenChars['b']`, which says we have not stored this before, so we store "b" in seenChars, `{a:0,b:1}` and `longest=2`, current window is expanded to "ab". We move the r to "c", have we seen this before, no. We store it `{a:0,b:1,c:2}` `longest=3` and current window is "abc". If you look closely look, longest also tells the size of our window. We shift the r to "b", we lookup up the seenChars, have we seen this before, yes.

Here is the main part to understand. Since we have seen "b" before, any part of the window till the first "b" will be discarded, because we are looking for non repeating characters. This when we move the l pointer. Remember, we initialized two pointers in the beginning and up until now, we have been shifting only r. We end up having "cb" for our current window and longest value is still 3. What happens to our hashmap?

The values in the hashmap will still stay. We could delete, but this will add extra time to our time complexity, because we have to create a for-loop till the new index where l points to now. Instead we store the values, you will see shortly what happens to them.

This is our current state: curent window is "cb", longest=3, seenChars={a:0, b:3,c:2}. Pay attention to how we stored "b". If we have seen a character before, we just change their value as the index of new value. Our l pointer points to index of "c" which is 2 and r pointer points to index of new "b" which is 3 and (3-2+1) will give us the size of current window, then we compare this size with longest, whichever is greater will be the longest value.

Let's put what we have learnt into code:

```js
// always validate the input
const sliding = (S: string) => {
  if (S.length <= 1) {
    return S.length;
  }
  const seenChars = {};
  const n = S.length;
  let left = 0,
    longest = 0;
  // right pointer will scan entire string forward
  for (let right = 0; right < n; right++) {
    const currentChar = S[rigth];
    // we want to check if prevSeenChar>=left,
    const prevSeenChar = seenChars[currentChar];
    // to initialize a new substring, if there is a seen value, new substring will start right after seen value
    if (prevSeenChar >= left) {
      left = prevSeenChar + 1;
    }
    seenChars[currentChar] = right;
    longest = Math.max(longest, right - left + 1);
  }
  return longest;
};
```

## Optimal Solution with Python

```py
def longest(S:str)->int:
   if len(S)<=0:
       return len(S)
   m={} # char:index
   left=0
   right=0
   ans=0
   n=len(S)
   while left<n and right<n:
       current=S[right]
       print("n:",n,"current:",current)
       if current in m:
           left=max(left,m[current]+1)
       m[current]=right
       ans=max(ans,right-left+1)
       right+=1
   return ans
```
