require("dotenv").config();
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// necesario => img, nombre, temperamento, peso, altura, años de vida, id

const getApiData = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  // obtengo solo lo necesario
  const apiInfo = await apiUrl.data.map((ob) => {
    return {
      name: ob.name,
      id: ob.id,
      image: ob.image.url,
      temperament: ob.temperament,
      weight: ob.weight.metric,
      height: ob.height.metric,
      life_span: ob.life_span,
    };
  });
  return apiInfo;
};

const getDbData = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllData = async () => {
  const apiInfo = await getApiData();
  const dbInfo = await getDbData();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

// --- RUTAS ---

// GET /dogs & GET /dogs?name=
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllData();
  if (name) {
    let dogName = await dogsTotal.filter(
      (ob) => ob.name.toLowerCase().includes(name.toLowerCase()) // includes porque así trae a todo lo que lo incluya al name
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("The wanted dog was not found");
  } else {
    res.status(200).send(dogsTotal);
  }
});

// GET /temperament:
router.get("/temperament", async (req, res) => {
  const temperamentApi = (await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  )).data
  
  let temperaments = temperamentApi.map((ob) => ob.temperament);
  temperaments = temperaments.join().split(",");
  
  temperaments = temperaments.filter (ob => ob)
  
  temperaments = [...new Set (temperaments)].sort();

  temperaments.forEach((ob) => {
    Temperament.findOrCreate({
      where: { name: ob },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});

// GET /dogs/{idRaza}
router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  const dogsTotal = await getAllData();
  if (id) {
    let dogId = await dogsTotal.filter((ob) => ob.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Not found");
  }
});

// // POST /dog
router.post("/dog", async (req, res) => {
  let { name, temperament, weight, height, life_span, image, createdDb } = req.body;
  console.log(req.body);
  try {
    let dogCreated = await Dog.create({
      name,
      weight,
      height,
      life_span,
      image,
      createdDb,
    });
    await dogCreated.setTemperaments(temperament)
    // let temperamentDb = await dogCreated.setTemperaments(temperaments)
    res.send("Your dog has been created!");
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
