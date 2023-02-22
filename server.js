const express = require("express");
const app = express();
const port = 3000;
const { Restaurant, Menu, Item } = require("./models/index");
const { sequelize } = require("./db");
app.use(express.json());
//TODO:

app.listen(port, () => {
  sequelize.sync();
  console.log("App listening on port " + port);
});

app.get("/restaurants", async (req, res) => {
  const allResturants = await Restaurant.findAll();
  const allMenus = await Menu.findAll();
  const allItems = await Item.findAll();

  //add Menus to the resturant (ALREADY ADDED)

  //EAGAR LOAD RESTAURANT WITH MENUS

  // console.log(JSON.stringify(restaurants, null, 2));

  //EAGER LOAD MENUS WITH ITEMS, BOTH ITEMS ARE FROM THE BREAKFAST

  const appleBees = await Restaurant.findByPk(1, {
    include: [{ model: Menu, include: [{ model: Item }] }],
  });
  console.log(JSON.stringify(appleBees, null, 2));

  res.send(appleBees);
});
