// use expresss
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('hello world')
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server Start on port ${PORT}`));