require("./config/db");

const app = require("express")();
const port = process.env.PORT || 6030;
const connectDB = require("./config/db");
connectDB();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const bodyParser = require("express").json;
app.use(bodyParser());

const UserRouter = require("./api/user");
app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
