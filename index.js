const express = require('express')
const { myServer } = require('./configs/db') 
const { userRoute } = require('./routes/User.routes')
const { postRoute } = require('./routes/Post.routes')
const { auth } = require('./middleware/auth.middleware')
// const { auth } = require('./middleware/Auth.middleware')
const cors = require('cors');


require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/users", userRoute)

app.use(auth)

app.use('/posts', postRoute)




app.listen(PORT, async()=> {
   try {
       await myServer
     console.log("connect to DB");
   } catch (error) {
    console.log(error);
   } 
console.log(`server started at` +' '+PORT);
})