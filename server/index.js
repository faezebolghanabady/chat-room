var expresse = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
var http = require("http")
const { createServer } = require('ws');
const { Server } = require("socket.io")
const User = require("./models/user");



var app = expresse();
app.use(expresse.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);


mongoose.connect("mongodb://localhost:27017/chatroom");

app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
  path: '/chat',
 
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});



io.on('connection', (socket) => {
  console.log(`user conected`);
  socket.on("chat" , chat =>{
    io.emit("chat" , chat)
  })

  socket.on("disconnected" , ()=>{
    console.log('disconnected');
  })

});


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Use strict comparison for passwords
          const accessToken = Jwt.sign(
            { email: email },
            "jwt-access-token-secret-key",
            { expiresIn: "1m" }
          );

          const refreshToken = Jwt.sign(
            { email: email },
            "jwt-refresh-token-secret-key",
            { expiresIn: "5m" }
          );

          res.cookie("accessToken", accessToken, { maxAge: 60000 });
          res.cookie("refreshToken", refreshToken, {
            maxAge: 300000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });

          res.json({ Login: true });
        } else {
          res.json({ Login: false, message: "Invalid password" });
        }
      } else {
        res.json({ Login: false, message: "Email not found" });
      }
    })
    .catch((err) => res.json(err));
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "ایمیل قبلاً استفاده شده است" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({ message: "ثبت نام با موفقیت انجام شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای رخ داده است" });
  }
});

const varifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    Jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshtoken) {
    return res.json({ valid: false, message: "no refresh token" });
  } else {
    Jwt.verify(refreshtoken, "jwt-refresh-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "invalid refresh Token" });
      } else {
        const accessToken = Jwt.sign(
          { email: decoded.email },
          "jwt-access-token-secret-key",
          { expiresIn: "1m" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        exist = true;
      }
    });
  }
  return exist;
};

app.get("/dahboard", varifyUser, (req, res) => {
  return res.json({ valid: true, message: "authorized" });
});




const port = process.env.PORT || 3000;
app.set( "ipaddr", "127.0.0.1" );
app.set( "port", 3000 );


app.listen(app.get('port'), app.get('ipaddr'), () => {
  console.log(`Server is running at http://${app.get('ipaddr')}:${app.get('port')}`);
});