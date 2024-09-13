const expresse = require('express')
const { mongoose } = require('mongoose');
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require ('./models/user')



const app = expresse ()
app.use(expresse.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials : true
}))

mongoose.connect("mongodb://127.0.0.1:27017/chatroom")

app.post('/login' , (req , res) =>{
    const {email , password} = req.body;
    User.findOne({email})
    .then(user=>{
        if(user){
            if(user.password === password){
                const accessToken = Jwt.sign({email:email},
                "jwt-access-token-secret-key",{expiresIn : '1m'})

                const refreshToken = Jwt.sign({email:email},
                    "jwt-refresh-token-secret-key",{expiresIn : '5m'})
                    res.cookie('accessToken' , accessToken , {maxAge : 60000})
                    res.cookie('refreshToken' , refreshToken , 
                    {maxAge : 300000 , httpOnly:true , secure:true , sameSite:'strict'})

                    res.json('login successful')
            }
        }
    })
})

app.post('/register' , (req , res)=>{
    const {name , email , password} = req.body;
    User.create({name , email , password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


const port = process.env.PORT || 3000;
app.listen(port , ()=>console.log(`listen on port ${port}`))