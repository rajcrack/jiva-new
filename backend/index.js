// const express = require("express");
// const app = express();

// const con = require("./src/config/config.js");
// const cors = require("cors");

// con.connect((err) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("database connected");
//   }
// });
// app.use(express.json());
// app.use(cors());

// app.listen(3000, () => {
//   console.log("server is runing on port 3000");
// });

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const dataBase = require("./src/config/config.js");
const cors = require("cors");

const { adminRoutes } = require("./src/modules/admin/controller/index.js");



app.use(express.json());
app.use(cors());



// app.use("/jiva-smile", adminRoutes);


app.use("/jiva-smile", adminRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
