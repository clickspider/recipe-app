const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const axios = require("axios");

app.use(cors());

app.get("/jokes", async (req, res) => {
  try {
    const api_url = "http://api.icndb.com/jokes/random/10";
    const fetch_res = await axios.get(api_url);
    res.send(fetch_res.data);
  } catch (err) {
    res.send(err);
  }
});

app.get("/", (req, res) => {
  const favRecipes = [
    {
      id: 1,
      label: "Cowboy Rib-Eye Steak",
      date: " dd‐MM‐yyyy HH:mm",
      image:
        "https://www.edamam.com/web-img/69a/69a67f4147db9f27fd295be0c2ab06f8.jpg",
      ingredientLines: [
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
      ingredients: [
        {
          text: "1 3-pound bone-in rib-eye steak",
          weight: 1360.77711
        },
        {
          text: "1 tablespoon cumin seed",
          weight: 6.0
        },
        {
          text: "1 tablespoon coriander seed",
          weight: 5.0
        },
        {
          text: "2 teaspoons black peppercorns",
          weight: 5.8
        },
        {
          text: "2 tablespoons coarse salt",
          weight: 29.124999999507587
        },
        {
          text: "1 tablespoon sweet paprika",
          weight: 6.8
        },
        {
          text: "2 tablespoons light brown sugar",
          weight: 18.12499999969356
        },
        {
          text: "2 tablespoons finely chopped oregano",
          weight: 11.999999999797117
        },
        {
          text: "5 cloves garlic, minced",
          weight: 15.0
        }
      ],
      vegetarian: false
    }
  ];

  res.send(favRecipes);
});

app.get("/joke", async (req, res) => {
  try {
    const api_url = "http://api.icndb.com/jokes/random/1";
    const fetch_res = await axios.get(api_url);
    res.send(fetch_res.data);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
