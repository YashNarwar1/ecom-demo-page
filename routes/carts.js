const express = require("express");

const router = express.Router();

// Recieve a post requres to add a item to a cart

router.post("/cart/products", (req, res) => {
  console.log(req.body.productId);

  res.send("Product added to cart");
});

//Receive a GET requrest to show all items in cart

// Receive a post requrest to delete an item from a cart

module.exports = router;
