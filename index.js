const express = require("express");
const app = express();
const PORT = 8000;

// Define User Data
let userData = {
    totalPoints: 0,
    transactions: [],
};

app.use(express.json());

//Helper function for post /add
//Inserts transaction into userData.transactions in chronological order
function insertTransaction(transaction) {
    let transactions = userData.transactions;
    //Convert timestamp to Date object
    let time = new Date(transaction.timestamp);
    //If transactions is empty, push transaction
    if (transactions.length === 0) {
        transactions.push(transaction);
        userData.transactions = transactions;
        return;
    }
    //Loop through transactions to find where to insert transaction
    for (let x = 0; x < transactions.length; x++) {
        let timestamp = new Date(transactions[x].timestamp);
        //If transaction is older than current transaction, insert transaction
        if (time < timestamp) {
            transactions.splice(x, 0, transaction);
            userData.transactions = transactions;
            return;
        }
    }
    transactions.push(transaction);
    userData.transactions = transactions;
}

//Helper function for post /spend
//Spends points in chronological order
function spend(points) {
    let transactions = userData.transactions;
    let spentPoints = [];
    let index = 0;
    //Loop through transactions until points is 0
    while (points > 0) {
        //If points is greater than current transaction points, subtract points from current transaction points
        if (transactions[index].points > points) {
            transactions[index].points -= points;
            userData.totalPoints -= points;
            output = 0 - points;
            spentPoints.push({ payer: transactions[index].payer, points: output });
            points = 0;

        }
        //If points is less than current transaction points, subtract current transaction points from points
        //and increment index to move to next transaction
        else {
            points -= transactions[index].points;
            userData.totalPoints -= transactions[index].points;
            output = 0 - transactions[index].points;
            spentPoints.push({ payer: transactions[index].payer, points: output });
            transactions[index].points = 0;
            index++;
        }
    }
    userData.transactions = transactions;
    return spentPoints;
}
app.post("/add", (req, res) => {
    try {
        const { payer, points, timestamp } = req.body;
        insertTransaction({ payer, points, timestamp });
        userData.totalPoints += points;

        res.status(200).send();
    }

    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.post("/spend", (req, res) => {
    try{
        const { points } = req.body;
        //If points is greater than total points, return error
        if (points > userData.totalPoints) {
            return res.status(400).json({ error: "Not enough points"});
        }

        const spentPoints = spend(points);
        res.status(200).json(spentPoints);

    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.get("/balance", (req, res) => {
    try {
        let payerPoints = new Map();
        //Loop through transactions and add payer and point to the map
        for (let transaction of userData.transactions){
            let {payer, points} = transaction;
            if (!payerPoints.has(payer)) {
                payerPoints.set(payer, 0);
            }
            payerPoints.set(payer, payerPoints.get(payer) + points);
        }
        //format output json
        const output = {}
        for (let [key, value] of payerPoints) {
            output[key] = value;
        }
        res.status(200).json(output);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

app.listen(PORT,() => {
    console.log(`Listening on port: http://localhost:${PORT}`)
});