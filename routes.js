// Import `Router` from express so we could have our routes defined here
const { Router } = require("express")

// Import our pre-defined functions for loading/saving json file
const { getProducts, updateProducts } = require("./products")

// Create an instance of expressjs Router
const router = Router()

// Route: /
//    - our home directory
router.get("/", (req, res) => {
  res.send("Welcome to our Simple RESTful API!")
})

// Route: /get-products
//    - returns the json data
router.get("/get-products", (req, res) => {
  res.send(getProducts())
})

// Route: /add-product
//  DATA REQUIRED:
//    - name -- Product name
//    - qty -- Quantity
//    - price -- Price
router.put("/add-product", (req, res) => {
  const { name, qty, price } = req.body
  const products = getProducts()

  if (!name || !qty || !price) res.send({"error": "Please specify name, qty, and price."})

  if (products[name]) res.send({"error": "Product already exists!"})

  products[name] = {
    qty,
    price
  }

  updateProducts(products)

  res.send({
    "message": "Success!",
    "data": products
  })
})

// https://google.com/search?q=ffff

router.delete("/delete-product", (req, res) => {
  const { name } = req.body
  const products = getProducts()

  if (!products[name]) {
    res.send("Product not found")
  }

  products[name] = undefined

  updateProducts(products)

  res.send(products)
})

module.exports = router