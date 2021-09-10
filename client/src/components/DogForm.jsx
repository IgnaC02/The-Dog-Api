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
    wMin: "",
    wMax: "",
    hMin: "",
    hMax: "",
    life_spanMin: "",
    life_spanMax: "",
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
    const formCompleto = {
      name: input.name,
      weight: input.wMin + " - " + input.wMax,
      height: input.hMin + " - " + input.hMax,
      life_span: input.life_spanMin + " - " + input.life_spanMax,
      image: input.image,
      temperament: input.temperament,
    };
    e.preventDefault();
    dispatch(postDogs(formCompleto));
    alert("Your dog has been created successfully");
    setInput({
      name: "",
      wMin: "",
      wMax: "",
      hMin: "",
      hMax: "",
      life_spanMin: "",
      life_spanMax: "",
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
      <h1 className={styles.title}>Create your breed!</h1>
      <div className={styles.oo}>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          {/* ----------- NAME ----------- */}
          <div>
            {/* <label>Name:</label> */}
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name..."
              className={styles.name}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          {/* ----------- WEIGTH ----------- */}
          <div>
            {/* <label>Weight:</label> */}
            <input
              type="number"
              value={input.wMin}
              name="wMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min weight..."
              className={styles.wMin}
            />
            <input
              type="number"
              value={input.wMax}
              name="wMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max weight..."
              className={styles.wMax}
            />
            {errors.weight && <p>{errors.weight}</p>}
          </div>
          {/* ----------- HEIGHT ----------- */}
          <div>
            {/* <label>Height:</label> */}
            <input
              type="number"
              value={input.hMin}
              name="hMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min height..."
              className={styles.hMax}
            />
            <input
              type="number"
              value={input.hMax}
              name="hMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max height..."
              className={styles.hMax}
            />
            {errors.height && <p>{errors.height}</p>}
          </div>
          {/* ----------- LIFE_SPAN ----------- */}
          <div>
            {/* <label>Life span:</label> */}
            <input
              type="number"
              value={input.life_spanMin}
              name="life_spanMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min life span..."
              className={styles.lsMin}
            />
            <input
              type="number"
              value={input.life_spanMax}
              name="life_spanMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max life span..."
              className={styles.lsMax}
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
              className={styles.image}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div>
            {/* <label>Temperaments:</label> */}
            {/* <p>Select at least one temperament</p> */}
            <select onChange={(e) => handleSelect(e)} className={styles.select}>
              {temperaments.map((ob) => (
                <option key={ob.id} value={ob.id}>
                  {ob.name}
                </option>
              ))}
            </select>
          </div>
          {/* <ul>
              <li className={styles.list}>{input.temperament.map((ob) => ob + ", ")}</li>
            </ul> */}
          <div className={styles.btns}>
            <button type="submit" className={styles.submit_btn}>
              Create
            </button>
          </div>
        </form>

        {input.temperament.map((ob) => (
          <div key={index++} className={styles.delete}>
            <p>{ob}</p>
            <button onClick={() => handleDelete(ob)}>X</button>
          </div>
        ))}

        <img className={styles.img} src={doge} alt="Landing img not found" />
      </div>
        <Link to="/home" className={styles.btn_container}>
          <button className={styles.back_btn}> Go home</button>
        </Link>
    </div>
  );
}

// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// Posibilidad de seleccionar/agregar uno o más temperamentos
