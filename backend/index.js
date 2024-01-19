// template express app

const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());

// generate random string with min 5 and max 20 characters

const generateRandomString = (min = 5, max = 20) => {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

const testIfVariableIsInteger = (variable) => {
    return !isNaN(variable) && parseInt(Number(variable)) == variable && !isNaN(parseInt(variable, 10));
}

app.get('/api/items', (req, res) => {
    const { cursor: tempCursor = 0, limit: tempLimit = 10 } = req.query;

    const errors = [];

    if (!testIfVariableIsInteger(tempCursor)) {
        errors.push('cursor must a integer number');
    }

    if (parseInt(tempCursor) < 0) {
        errors.push('cursor must be at least 0');
    }

    if (!testIfVariableIsInteger(tempLimit)) {
        errors.push('limit must a integer number');
    }

    if (parseInt(tempLimit) <= 0) {
        errors.push('limit must be greater than 0');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const cursor = parseInt(tempCursor, 10);
    const limit = parseInt(tempLimit, 10);


    const items = new Array(limit).fill(0).map((_, index) => ({ id: cursor + index, name: `Item ${cursor + index} ${generateRandomString()}` }));

    const pagination = {
        next: cursor + limit,
        previous: cursor - limit < 0 ? 0 : cursor - limit,
        limit,
    }

    return res.status(200).json({ items, pagination });

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});