---
_id: "bl"
title: "Coding Bitcoin in Javascript Part-2"
createdAt: "2022-10-16"
updatedAt: "2022-10-16"
field: "blockchain"
image: "/images/featured/bitcoin.jpg"
isFeatured: true
slug: "coding-bitcoin-in-javascript-part-2"
author:
  name: "yilmazbingol"
  picture: ""
isMarkdown: true
---

![block and blockchain](block-hash.png)

On the [previous part](https://bingolyilmaz.com/blogs/coding-bitcoin-in-javascript-part-1) of this series, I wrote code for Block class, explained nonce and difficulty. In this part I will be writing about Blockchain class which is responsible for connecting the blocks. To better understand how blockchain works, here is a [great video](https://www.youtube.com/watch?v=_160oMzblY8) to visually show what blockchain is and how nonce works.

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
addBlock({ data }) {
    // check mineBlock() in the first part of the post
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }
```

## What exactly is Mining?

Bitcoin's money supply is created by mining. Mining is an incentive system. Since it needs a lot of work to be done, miner gets two types of reward: New coins that created with each new block and transaction fees from all the transactions included in the block. All transactions have the different transaction fees, so the miners can look for the transaction that has the highest fee, and validate it.

To earn these rewards, miners compete to solve a difficult mathematical problem based on a cryptographic hash algorithm. The solution to the problem, called the **Proof-of-Work**, is included in the new block and acts as proof that the miner expended significant computing effort. That proof is actualy finding the **nonce** value. In November 2012, the new bitcoin issuance rate was decreased to 25 bitcoin per block. Every 4 years, which is precisely after 210000 blocks get created, that rewards cuts in half, in 2016 it was 12.5 and since 2020, it was 6.25. That means every 4 year, there will be less and less bitcoin to be sold by miners, that one reason why bitcoin price will keep go up as new supply lowers and demand gets higher.

For a side note, the first transaction in any block is a special transaction, called a **coinbase transaction**. This is the transaction receives the mining reward.

Mining secures the decentralized bitcoin network. By mining, transactions are validated and cleared. Before creation of a new block, there is a pool for new transactions. After a new block get created, new transactions will be stored in the transaction pool. Miner's job is to validate those transactions. When Blockchain calls **addBlock** method, addBlock will receive those transactions as data argument. Validation of the transaction will be done by the Transaction class which we will discuss in the next post.

In bitcoin, a new block gets created in every 10 minutes, by those valid transactions. Once a transaction becomes a part of the block it is called **confirmed**, then receiver can spend it. The block that contains the transaction is counted as one confirmation of that transaction. Each block that gets added to this block will strenghtening the trust in that transaciton. By convevntion, any transaction with more than 6 confirmations is considered irrevocable.

Any system, such as a server, desktop application, or wallet, that participates in the bitcoin network by “speaking” the bitcoin protocol is called a bitcoin node. Any bitcoin node that receives a valid transaction it has not seen before will immedi‐
ately forward it to all other nodes to which it is connected.Thus, the transaction rapidly broadcasted across the peer-to-
peer network, reaching a large percentage of the nodes within a few seconds. Some of the nodes on the bitcoin network are specialized nodes called miners which do not keep the all the transactions in the blockchain, they just listen to those new incoming transactions.

Transaction pool is not stored in the blockchain, therefore we will write another class to handle this pool.

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
