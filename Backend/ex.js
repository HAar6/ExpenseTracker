const express = require("express");
const app = express();
const port = 5000;
app.get('/' ,(req, res)=>{
    res.send("harshit");
})
app.listen(port ,()=>{
    console.log(`listening at ${port}`);
})