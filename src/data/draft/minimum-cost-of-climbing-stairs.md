For a given staircase, the i-th step is assigned a non-negative cost indicated by a cost array. Once you pay the cost for a step , you can either climb one or two steps. Find the minimum cost to reach the top of the staircase. Your first step can either be the first or second step.

First step to solve the problem is to recognize that this is a dynamic programming question. The moment you see minimum or maximum, you should realize that this is an optimzation question. For this particular question it is asking us for the minumum cost to react the top of the staircase. This implies that there are numerous possible paths that we can take to walk up this staircase all with different cost values. We want the one with the minumum cost. We need to generate all of the possible paths that we can take and pick the one with the minumum value.

There are multipe stages in dynamic programming solution. Every subsequeent stage gets more optimized when it comes to space and time complexity. What we are doing is we are working through these stages trying to get the most optimal solution.

We have to realize that dynamic programming has its basis in **recursion**. Recursive function is the starting point for figuring out what the first stage for this problem will be. Recursive function receives some arguments and inside there we have a base case. Base case is certain condition that must be satisfied in order for us to return from the function. After base case, we have recursive calls of the function itself but with different arguments. Based on these different arguments that get passed into those recursive function calls is how we diecide whether or not we satisfy the conditions for the base case.

In order for us to identify what is the base case and what recursvie functions am we are going to make is based on being able to identify the **recurrence relation**. Recurrence Relation is formula that we need to derive that gives us the basis of the recursive function that we are trying to write.
We have to figure out if there is a way to solve this problem as a repetated problem that we can combine together in order to get this final answer. . Let's walk through an example:

```js
const cost = [20, 15, 50, 5];
```

After last step we reach the top. Since we can climb two steps, we can reach the end either from the "n-1"th or "n-2"th. We need to choose the minumum between those. We will recursively calculate the minimum cost of takin previous steps.

![minimum cost algorithm](min-cost.png)

Very important thing to keep in mind, to step on a stair, the cost for stepping on a stair includes its cost plus the minumum cost between the previous and one before previous. But for the last step we do not have any cost to reach the top. You can thing that cost of stepping on the top is 0.

        cost(n)=min(min(cost(n-1),min(cost(n-2)))) + 0

This is our starting point. The answer is minimum of them but we do not know which one is minimum yet.

        min(cost(n-1)     or     min(cost(n-2))

But for previous stairs, for example for "n-1"th stair, we have to add the cost of "n-1"th step.

       min(cost(n-1)) = min(min(cost(n-2),min(cost(n-3))))+cost(n-1)

As you notice that we are starting from the very end value. We are taking top to down approach and definning the relationship between the function call, given its arguments and its internal subsequent recursive function call and the arguments that they receive. This relation is called **recurrence relation**. That is the relation you see on the above image. The bottom of that recurrence tree is when `n=0`. Now we need to redefine that tree into a generic formula that gives us an idea of what this definition is for any given step. In "i" th step we can derive this:

      minCost(i)=cost[i]+min(minCost(i-1),minCost(i-2))

This is the recurrence relation formula. You see how we are just taking a larger problem and figuring out a way to redefine it as the same problem but repeated on a smaller scale that we then build together to build the final solution. This is the whole idea of defining the recurrence relation from this. The last we have to do is to figure out the base case. Our base case is going to essentially depend on the arguments that come into our recursive function We defined that argument that our recursive function will take is "i" which is the index of step we are on. So what are the different conditions that we can get for "i" that might change what this calculation ends up :

      cost[i]+min(minCost(i-1),minCost(i-2))

This calculation is defined for every "i"th value except a couple of instances. "i" cannot be less than zero. So

```js
if (i < 0) return 0;
```

Also if there is only one item in the cost array, we say

```js
if (i === 0) {
  const minCost = cost[0];
}
```

So far first two base cases are to cover what will happen if we are given an empty array or an array with only one item.

Finally

```js
if (i === 1) {
  const minCost = cost[1];
}
```

If "i" is 1 that means we have only two stairs to climb. Inorder to get the second stair, we either have to climb first and second or just the second. This base is gonna end the recursive calls.

## Brute Force Solution:

Once we figured the recurrence relation formula defined, it is easy to write its code.

```js
const minCost = function (i, costArray) {
  if (i < 0) return 0;
  if (i === 0 || i === 1) return costArray[i];
  return (
    costArray[i] +
    Math.min(minCost(i - 1, costArray), minCost(i - 2, costArray))
  );
};
```

```js
const minCostClimbing = (costArray) => {
  const n = costArray.length;
  return Math.min(minCost(n - 1, costArray), minCost(n - 2, costArray));
};
};
```

We are starting with two recursive calls to decide the last step.

      Math.min(minCost(n - 1, costArray), minCost(n - 2, costArray));

Remember this is our starting point and inorder to find which one is minumum each `minCost` is going to call itself twice. Because to calculate `minCost(n - 1)`, you need to call `minCost(n - 2)` and `minCost(n - 3)` and to calculate `minCost(n - 2)` , you need to calculate `minCost(n - 3)` and this will go till the second stair. Becase this base case will end the recursive call:

```js
if (i === 1) {
  const minCost = cost[1];
}
```

That means that there is base 2 that is going to call itself as well twice inside. This is going to call continually twice on both sides until "n" is zero. This means it is doubling for every single value of N, which is equivalent to 2^n which is very bad.

Space complexity is O(N).The call stack only contains calls of a single branch down to the bottom of our binary tree at worst so while there are still 2^N calls being made, the callstack will only ever be as large as N in size.

We have followed those steps so far:
1- Get the recurrence relation
2- Create the initial recursive function.

Since we have horribe time complexity, 3rd step will be utilizing memoization so we do not do repetitive work.

## Memoization

Memoization helps us to make our solution much more efficient and performant. What we need to do is to figure out what to memoize. The easiest way to figure this out is actually to draw your state based tree. If you see the state based tree, you notice we are recalculating to many values over and over again. We need to initalize some type of data structure that will keep track of the cost at certain index
