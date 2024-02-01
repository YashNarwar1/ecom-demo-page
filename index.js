const express = require("express");
const bodyParser = require("body-parser");
const cookieSesssion = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminproductsRouter = require("./routes/admin/product");
const productsRouter = require("./routes/products.js");
const cartsRouter = require("./routes/carts.js");

const userRepo = require("./repositories/users.js");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSesssion({
    keys: ["asd#@$%^&fljktewqs1235464126asdga"],
  })
);
app.use(authRouter);
app.use(productsRouter);
app.use(adminproductsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
