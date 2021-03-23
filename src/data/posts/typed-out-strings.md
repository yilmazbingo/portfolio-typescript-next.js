---
_id: "typed-out"
title: "Typed out Strings"
createdAt: "2021-03-22T19:30:59.611+00:00"
updatedAt: "2021-03-22T19:30:59.611+00:00"
field: "algorithms"
image: "/images/featured/bitcoin.jpg"
isFeatured: false
slug: "typed-out-strings"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

Given two strings S and T, return if they equal when both are typed out. Any '#' that appears in the string counts as a backspace. For example we have our string S="cb#d".

- type out first character "C"
- type out next character "b"
- type out next character "#". This means delete the previos character which is "b" so we have "c" left
- type out next character "d"

  We end up having "cd"

Let's say we have another string T="cz#d"

- type out first character "C"
- type out next character "z"
- type out next character "#". This means delete the previos character which is "z" so we have "c" left
- type out next character "d"

  We end up having "cd"

So S and T are equal.

**Let's consider the edge cases:**

1- What happens when two #'s appear beside each other?
Delete the previous two values

2- What happens to # when there is no character to remove?
It deletes nothing. For example we have "a####b". First # deletes "a", second and third # deletes nothing.

3- Are two empty strings are equal to each other?
Yes. Considet this example. S="x#y#z#", T="a#"
In S, "x" gets deleted by first #, "y" gets deleted by second #, "z" gets deleted by last #. So S=""
in T, "a" gets deleted by #, So T=""
S and T are considered to be equal.

4- Does case sensitivity matter?
It does. "a" does not equal to "A".

In order to solve this, we have to compare each string letter by letter. We place pointers to the end of each string and we will shift down till the beginning of the string. If the last letters are not equal, those two strings cannot be equal so we just return false. While shifting down, each time we encounter with "#", instead of shifting down 1 step, we will shift down 2 steps, because "#" deletes the previous character if previous character is a letter. What if previous character is "#", too. In this case we will shift down 2 more steps.

The reason why we do not start from the first letter and shift up till the end, because if we encounter with "#", our current value will be deleted and in fact we do not how many "#" will be there in a row. For example, we have A="abc", B="abc###de". First two characters are equal, but in B, after third character, there are 3 "#" in a row which will delete entire "abc", then have new characters. Therefore for letter by letter comparison we cannot start from the beginning. However we could start from first character, if we were building the new strings in an array, and then compare those arrays which would end up having 2 for loops which will be inefficient solution.

```js
const compare = (S: string, T: string) => {
  let p1 = S.length - 1,
    p2 = T.length - 1;

  while (p1 >= 0 || p2 >= 0) {
    // we dont compare the hash values.
    // Initially S[p1] and T[p2] are last characters
    if (S[p1] === "#" || T[p2] === "#") {
      // we encounter #, so step down 2
      if (S[p1] === "#") {
        let backCount = 2;
        // Checking if there is another # after #
        while (backCount > 0) {
          p1--;
          backCount--;
          // if there is another #, we step down 2 more
          if (S[p1] === "#") {
            backCount += 2;
          }
        }
      }

      if (T[p2] === "#") {
        let backCount = 2;
        while (backCount > 0) {
          p2--;
          backCount--;
          if (T[p2] === "#") {
            backCount += 2;
          }
        }
      }
    } else {
      if (S[p1] !== T[p2]) {
        // after passing #, if characters are not equal
        return false;
      } else {
        //  after passing #, if characters are equal
        p1--;
        p2--;
      }
    }
  }
  return true;
};
```

To check the space complexity of this solution, we have to check how we store any data. In this case, we initialized 2 pointers, p1 and p2, but they do not scale. Meaning that in each iteration we are taking space only for 2 primitive variables. That makes S:O(1).

For time complexity, we have to check how often our two pointers move. Both pointers always move in every iteration. Becasue if S[p1]==="#", we shift down "p1" 2 or more steps depends on next character, if S[p1]!=="#" we shift dows p1 on step. Same is true for "p2". For

     S.length=a   ,  T.length=b

In the worst case p1 will be shifting down "a" times and p2 will be moving "b" times. So our time complexity, T=O(a+b)

## What if I place pointers to the beginning of each string

I mentioned above for letter by letter comparison, it is better to place the pointer to the end of the string. Let me show you how we would solve this if wanted to place the pointers to the beginning of the strings. Our solution will be 2 steps. In the first step we are going to iterate over each letter and push it onto the array. If we encounter with "#", we remove the last element from the array.

```js
const buildString = (string) => {
  const buildString = [];
  for (let p = 0; p < string.length; p++) {
    if (string[p] !== "#") {
      buildString.push(string[p]);
    } else {
      buildString.pop();
    }
  }
};
```

Note that to build the string, I used a for-loop. After I build the strings, I will compare them index-by-index. For this comparison I will be using another for-loop:

```js
const backspaceCompare = (S, T) => {
  // Time for finalS: O(a=sizeOfS)
  // Time for finalT: O(b=sizeOfT)
  // Total Time: O(a + b)
  const finalS = buildString(S);
  const finalT = buildString(T);
  if (finalS.length !== finalT.length) {
    // O(1) only 1 check
    return false;
  } else {
    // in the worst case, there is no "#" in each string
    // finalT.length=T.length
    // finalS.length=S.length
    for (let p = 0; p < finalT.length; p++) {
      // O(a) or O(b)
      if (finalS[p] !== finalT[p]) {
        return false;
      }
    }
  }
  return true;
};
```

To check the performance, we always consider the worst case which means, there is no "#" in any string.

**Time Complexity:**

For building the finalS, we spent O(a=sizeOfS), for finalT we spend O(b=sizeOfT). Total amount we spend to build both is O(atb). In order for those final values to be equal, they must have same length and since we are considering the worst case, for building finalS, there is no "#" in **S**, or there is no "#" in **T**. So our final length will be either "a" or "b" meaning that our second for-loop will be either "a" times or "b" times. Final T:

     O(2a+b)   ||     O(a+2b)

We drop the constants. So each case we will have

     O(a+b)

**Space Complexity**

For building final strings, we reserve an array for each string. For the S, our array size will be `a=sizeOfS`, for T, it will be `b=sizeOfT`. But in backspaceCompare function we do not store anything. So total space complexity

      O(a+b)

## Optimal Solution with Python

```py
def compare(S:str,T:str)->bool:
    print("yilmaz")
    p1=len(S)-1
    p2=len(T)-1
    while p1>=0 or p2>=0:
        print(p1)
        if S[p1]=="#" or T[p2]=="#":
            if(S[p1]=="#"):
                backcount=2
                while backcount>0:
                    p1-=1

                    backcount-=1
                    if S[p1]=="#":
                        backcount+=2
            if(T[p2]=="#"):
                backcount=2
                while backcount>0:
                    p2-=1
                    backcount-=1
                    if T[p2]=="#":
                        backcount+=2
        else:
            if S[p1]!=T[p2]:
                return False
            else:
                p1-=1
                p2-=1
    return True
```
