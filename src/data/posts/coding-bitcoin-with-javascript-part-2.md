---
_id: "1ab"
slug: "coding-bitcoin-with-javascript-part-2"
title: "Coding Bitcoin with Javascript Part-2"
createdAt: "2021-03-18T19:30:59.611+00:00"
updatedAt: "2021-03-18T19:30:59.611+00:00"
field: "blockchain"
image: "/images/featured/bitcoin.jpg"
isFeatured: true
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![block and blockchain](block-hash.png)

On the [previous part](https://bingolyilmaz.com/blogs/coding-bitcoin-in-javascript-part-1) of this series, I wrote code for Block class, explained nonce and difficulty. In this part I will be writing about Blockchain class which is responsible for connecting the blocks. To better understand how blockchain works, here is a [great video](https://www.youtube.com/watch?v=_160oMzblY8) to visually show what blockchain is and how nonce works.

Constructor is where we define what properties each instance of Blockchain class will have.

```js
class Blockchain {
  constructor() {
    // first block is genesisBlock
    this.chain = [Block.getGenesisBlock()];
    this.getLastBlock = function () {
      return this.chain[this.chain.length - 1];
    };
}

```

Then we add a method to mine block and add it to the chain. We will be using this method at the end of the post.

```js
class Blockchain {
  constructor() {
    // first block is genesisBlock
    this.chain = [Block.getGenesisBlock()];
    this.getLastBlock = function () {
      return this.chain[this.chain.length - 1];
    };
  }

  // Each instance of Blockchain class has a secret property called "prototype'. Methods that defined outside constructor are stored in prototype.
  addBlock({ data }) {
    // check mineBlock() in the first part of the post
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }
}
```

## What exactly is Mining?

Bitcoin's money supply is created by mining. Mining is an incentive system. Since it needs a lot of work to be done, miner gets two types of reward: New coins that created with each new block and transaction fees from all the transactions included in the block. All transactions have the different transaction fees, so the miners can look for the transaction that has the highest fee, and validate those.

To earn these rewards, miners compete to solve a difficult mathematical problem based on a cryptographic hash algorithm. The solution to the problem, called the **Proof-of-Work**, is included in the new block and acts as proof that the miner expended significant computing effort. That proof is actualy finding the **nonce** value. Bitcoin was first mined in 2009 and mining reward was 50 bitcoin which values about 3 million dollars as of writing this blog post. In November 2012, the new bitcoin issuance rate was decreased to 25 bitcoin per block. Every 4 years, which is precisely after 210000 blocks get created, that rewards cuts in half, in 2016 it was 12.5 and since 2020, it was 6.25. That means every 4 year, there will be less and less bitcoin to be sold by miners, that one reason why bitcoin price will keep go up as new supply lowers and demand gets higher.

       The first transaction in any block is a special transaction, called a **coinbase transaction**. This is the transaction that miner receives the mining reward.

Mining secures the decentralized bitcoin network. By mining, transactions are validated and cleared. Before creation of a new block, there is a pool for new transactions. After a new block gets created, new transactions will be stored in the transaction pool. Miner's job is to validate those transactions. When Blockchain calls **addBlock** method, addBlock will receive those transactions as data argument. Validation of the transaction will be done by the Transaction class which we will discuss in the next post.

In bitcoin, a new block gets created in every 10 minutes, by those valid transactions. Once a transaction becomes a part of the block it is called **confirmed**, then receiver can spend it. The block that contains the transaction is counted as one confirmation of that transaction. Each block that gets added to this block will strenghtening the trust in that transaciton. By convevntion, any transaction with more than 6 confirmations is considered irrevocable.

Any system, such as a server, desktop application, or wallet, that participates in the bitcoin network by “speaking” the bitcoin protocol is called a bitcoin node. Any bitcoin node that receives a valid transaction it has not seen before will immedi‐
ately forward it to all other nodes to which it is connected.Thus, the transaction rapidly broadcasted across the peer-to-
peer network, reaching a large percentage of the nodes within a few seconds. Some of the nodes on the bitcoin network are specialized nodes called miners which do not keep the all the transactions in the blockchain, they just listen to those new incoming transactions.

## The Supply of Bitcoin Is Limited to 21 Million

There are only 21 million bitcoins that can be mined in total. As of writing this post, 18.65 million bitcoin has been mined. That does not mean that 18.65 million bitcoin is in circulation. Because people who lost access to their bitcoin account, or have died without transferring their bitcoin, actual amount of bitcoin in circulation is less than 18.65. Also, in the first months of bitcoin, new bitcoins were mined only by its creator, Satoshi Nakamoto. His account has about 1.1 million untouched bitcoins which is worth of $66 billion. If bitcoin was created by a single person and s/he was still alive, he would definitely touch this money.

How do we know that Satoshi has 1.1 million bitcoin in his account? Blockchain technology offers decentralized and private system. No name is written on the transactions or on the wallet address in the block. If Alice sends money to Bob, we do not see their name we just see their wallet id.

    from : "543f9f9118a5ad.2836dd734d2804fe65fa35779"
    to   :  "186f9f998a5e2836dd734d2804fe65fa3577119"

Since Satoshi is the first miner, and mining rewards go to the same address, we say it belongs to Satoshi.

     In blockchain, we can see all the previous transactions
     We cannot see who sent it and we cannot alter the transaction history.

In fact we could apply this in voting system. Every registered voter would have their unique id, they will be voting in the blockchain system, everyone else could see the results without altering it.

Since every 4 years mining reward cuts in half, the last bitcoin will be mined by the year 2140. There will not be more than 21 million bitcoins. Bitcoin can not be inflated by creating new bitcoin the way how central banks prints more and more money. Price of anything depends on the intersection of demand and supply. Since supply can not be altered, we just need to predict the demand. If demand increases, price will rise, if demand decreases price will drop

         Bitcoin has been deflationary so far  meaning that purchasing power has been increasing.

### Transaction Pool

Let's get back to coding. Transaction pool is not stored in the blockchain, therefore we will write another class to handle this pool.

```js
// we use this to validate the transactions
const Transaction = require("../transaction/Transaction");

class TransactionPool {
  constructor() {
    // this is where transactions gets stored. it dynamically gets populated by incoming transactions
    this.transactionMap = {};
  }
  // after trnasactions are added to a new block, it gets cleared
  clear() {
    this.transactionMap = {};
  }
  // every transaction has id. this is how transactions are stored
  //     this.transactionMap = { idOfTranaction : transactionObject };
  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }
  // this will be used later on for synchronization. If a  node was shutdown, when it runs again, it has to get the latest data
  setMap(transactionMap) {
    this.transactionMap = transactionMap;
  }
  // This checks if incoming transaction was received before
  existingTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);
    return transactions.find(
      (transaction) => transaction.input.address === inputAddress
    );
  }
  // Validates all transactions
  validTransactions() {
    return Object.values(this.transactionMap).filter((transaction) =>
      Transaction.validTransaction(transaction)
    );
  }
  // when we replace a new chain, I will talk about it later, we go throught all the transactions inside new blockchain,
  // if any transaction inside transactionPool exists in new blockchain, we delete that transaction from the transaction pool.
  clearBlockchainTransactions({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (this.transactionMap[transaction.id]) {
          delete this.transactionMap[transaction.id];
        }
      }
    }
  }
}
```

To summarize, for mining we need 4 things:

1- TransactionPool which stores the transactions that need to be mined and then clears the list.

2- Miner's wallet to send the reward

3- Blockchain to add the new block to the chain

4 Lastly a broadcasting mechanism to broadcast the new chain.

```js
class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransactions() {
    //  gets the all valid transactions
    const validTransactions = this.transactionPool.validTransactions();
    // sending the reward to the miner is also a transaction, therefore Transaction class sends the reward
    // Transactions will be the topic of next part
    validTransactions.push(
      Transaction.rewardTransaction({ minerWallet: this.wallet })
    );
    // Blockchain class adds the new block by mining the validTransactions
    this.blockchain.addBlock({ data: validTransactions });
    // This broadcasts the new chain to each note to be replaced as new chain which I will be writing about it later
    this.pubsub.broadcastChain();
    // after transactions are mined, transactionPool clears itself.
    this.transactionPool.clear();
  }
}
```

I mentioned transaction a alot but I have not told you anything about it. In the next part I will dive deep into the transaction, write the TransactionPool class and introduce you Wallet class which uses cryptography. This post started with Blockchain class but it is not completed yet. As we learn more new concepts, I will write other responsibilites of Blockchain class.
