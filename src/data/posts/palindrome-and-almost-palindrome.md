---
_id: "palindrom"
slug: "palindrome-and-almost-palindrome"
title: "Palindrome and Almost-Palindrome"
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

![palidrome](palidrome.jpeg)

Palindrom is a string that reads the same forwards and backwards as in the picture.

Even "A man, a plan, a canal:Panama" is a palindrome despite having upper case characters and symbols as well as there are spaces in the string. This is the edge case you have to ask the interviewer to ignote symbols, spaces and uppercases. In most cases those are ignored in palindrome questions. We have to make a transformation :"amanaplanacanalpanama"

Solving palinrome is easy. We place a pointer at the beginning of the string, an another one on the end of the string, we compare each character and shift pointers to each other. We implement this till pointers meet each other. Or we could initiate the pointers from the center and we could shift them outwards, one till the beginning of the string, one till the end of the string and compare each character. Another method is we could reverse the string, and then compare the original and reversed string character by character. Depending on the content of the problem, it may be easier to use one of the methods.

## Solution with initalizing the pointers from the edges:

```js
// type S is string
const valid = (S: string) => {
  // we are mutating S, not creating a new data structure
  // [] in regex designates the actual group of chars.
  // ^ means Not. We are catching non-alphanumerical chars
  // g, find all matches rather than stopping after the first match
  // we are replacing non-alphanumerical chars with ""
  S = S.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  left = 0;
  right = S.length - 1;
  while (left < right) {
    if (S[left] === S[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }
  return true;
};
```

**- Python Solution:**

```py
import re
def valid(S:str)->bool:
    new_S = re.sub("[^0-9a-zA-Z]+", "", S).lower()
    print(new_S)
    right=len(new_S)-1
    left=0
    while left<=right:
        if new_S[right]==new_S[left]:
            right-=1
            left +=1
        else:
            return False
    return True
```

## Solution with the initializing the pointers from the center

If the length of string is an odd number, we will have 1 center point. In this case we will have leftPointer=rightPointer. But if the length of string is an even number, we will have two center points. For example

      const A=[1,2,3,4] , A.length=4

2 and 3 are center points. we want 2 to be pointed by the left pointer, 3 to be pointed by the right pointer.

```js
let left = Math.floor(S.length / 2); //2
```

2 represents the index. A[2]=3, 3 is what we want to be pointed by right pointer. So `right=2`, to determine the left pointer we will go one step down. I will be showing this in code:

```js
const isValid = (S: string) => {
  S = S.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  let left = Math.floor(S.length / 2),
    right = left;
  if (S.length % 2 === 0) {
    left--;
  }
  // setting the boundaries for left and right
  // left pointer shifts down to the beginning
  // right pointer shifts up to the end
  while (left >= 0 && right < S.length) {
    if (S[left] !== S[right]) {
      return false;
    }
    left--;
    right++;
  }
  return true;
};
```

**- Python Solution:**

```py
import math
def valid(S:str)->bool:
    new_S = re.sub("[^0-9a-zA-Z]+", "", S).lower()
    left=math.floor(len(new_S)/2)
    right=left
    if len(S)%2==0:
        left-=1
    while left>=0 and right<len(S):
        if new_S[right]==new_S[left]:
            right+=1
            left -=1
        else:
            return False
    return True
```

## Solution with the comparing the reverse of string

We do not set any pointer in this case. We just reverse the string and check if is equal to th eoriginal string.

```js
const compare = (S) => {
  S = S.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  let reverse = "";
  for (let i = S.length - 1; i >= 0; i--) {
    // reverse.push(S[i]); push() is only for array
    reverse += S[i];
    console.log(reverse);
  }
  return reverse === S;
};
```

**- Python Solution**

```py
def valid(S:str)->bool:
    new_S = re.sub("[^0-9a-zA-Z]+", "", S).lower()
    # slicing in python
    reversed_S=new_S[::-1]
    return new_S==reversed_S
```
