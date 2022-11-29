require("./config/db");

const app = require("express")();
const port =process.env.PORT || 6000 ;
const connectDB=require('./config/db')
//for accepting post from data
connectDB()
const bodyParser = require("express").json;
app.use(bodyParser());

const UserRouter=require('./api/user')
app.use('/user', UserRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
