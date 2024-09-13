const expresse = require('express')
const { mongoose } = require('mongoose');
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require ('./models/user')



const app = expresse ()
app.use(expresse.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/chatroom")

app.post('/register' , (req , res)=>{
    const {name , email , password} = req.body;
    User.create({name , email , password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


const port = process.env.PORT || 3000;
app.listen(port , ()=>console.log(`listen on port ${port}`))