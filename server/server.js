const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  const favRecipes = [
    {
      id: 1,
      label: "Cowboy Rib-Eye Steak",
      date: "05‐03‐2020 11:03",
      image:
        "https://www.edamam.com/web-img/69a/69a67f4147db9f27fd295be0c2ab06f8.jpg",
      ingredients: [
        "1 3-pound bone-in rib-eye steak",
        "1 tablespoon cumin seed",
        "1 tablespoon coriander seed",
        "2 teaspoons black peppercorns",
        "2 tablespoons coarse salt",
        "1 tablespoon sweet paprika",
        "2 tablespoons light brown sugar",
        "2 tablespoons finely chopped oregano",
        "5 cloves garlic, minced"
      ],
      vegetarian: false,
      url: "https://www.marthastewart.com/867361/cowboy-ribeye-steak",
      numOfPeople: "1-2"
    },

    {
      id: 2,
      label: "Individual vegetarian lasagnes",
      date: "05‐03‐2020 13:00",
      image:
        "https://www.edamam.com/web-img/775/7757b08b70371bcb03d3c10199e70e77.jpg",
      ingredients: [
        "1.2 kg cherry tomatoes",
        "5 sprigs of fresh thyme",
        "extra virgin olive oil",
        "2 shallots",
        "2 cloves of garlic",
        "500 g baby spinach",
        "8-12 fresh or dried lasagne sheets",
        "350 g ricotta cheese",
        "WHITE SAUCE",
        "600 ml milk",
        "25 g unsalted butter",
        "2 heaped tablespoons flour",
        "150 g vegetarian sharp, mature cheese",
        "100 g mozzarella"
      ],
      vegetarian: true,
      url: "https://www.jamieoliver.com/recipes/vegetables-recipes/",
      numOfPeople: "1-2"
    }
  ];

  res.send(favRecipes);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
