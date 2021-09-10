import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments } from "../actions/index";
import doge from "../img/doge.png";
import styles from "./DogForm.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.weight) {
    errors.weight = "Weight is required and should be a number (min - max)";
  } else if (!input.height) {
    errors.height = "Height is required and should be a number (min - max)";
  } else if (!input.life_span) {
    errors.life_span =
      "Life span is required and should be a number (min - max)";
  } else if (!input.image) {
    errors.image = "Please insert a valid internet image URL";
  }

  return errors;
}

export default function CreateDogs() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    image: "",
    temperament: [],
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postDogs(input));
    alert("Your breed has been created successfully");
    setInput({
      name: "",
      weight: "",
      height: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    history.push("/home");
  }

  function handleDelete(ob) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== ob),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  var index = 0;

  return (
    <div className={styles.container}>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1 className={styles.title}>Create your breed</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div>
          {/* <label>Name:</label> */}
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Name..."
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          {/* <label>Weight:</label> */}
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
            placeholder="Weight...e.g 20 - 25"
          />
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          {/* <label>Height:</label> */}
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
            placeholder="Height...e.g 20 - 25"
          />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          {/* <label>Life span:</label> */}
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
            placeholder="Life span...e.g 20 - 25"
          />
          {errors.life_span && <p>{errors.life_span}</p>}
        </div>
        <div>
          {/* <label>Image:</label> */}
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            placeholder="Image url..."
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          {/* <label>Temperaments:</label> */}
          <p>Select at least one temperament</p>  
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((ob) => (
              <option key={ob.id} value={ob.id}>
                {ob.name}
              </option>
            ))}
          </select>
          <ul>
            <li>{input.temperament.map((ob) => ob + ", ")}</li>
          </ul>
        </div>
        <button type="submit">Create</button>
      </form>
             
      {input.temperament.map((ob) => (
        <div key={index++} className={styles.delete}>
          <p>{ob}</p>
          <button onClick={() => handleDelete(ob)}>X</button>
        </div>
      ))}

      <img
        className={styles.img}
        src={doge}
        alt="Landing img not found"
        width="150px"
      />
    </div>
  );
}

// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// Posibilidad de seleccionar/agregar uno o más temperamentos
