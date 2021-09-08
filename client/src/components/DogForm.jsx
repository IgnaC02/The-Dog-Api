import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments } from "../actions/index";
import styles from "./DogForm.module.css";

export default function CreateDogs() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);

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
    history.push('/home');
  }

  function handleDelete(ob) {
    setInput({
      ...input,
      temperament: input.temperament.filter(temp => temp !== ob)
    })
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1 className={styles.title}>Create your breed</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Life span:</label>
          <input
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Temperaments:</label>
          <select onChange={(e) => handleSelect(e)}>
            {temperaments.map((tem) => (
              <option key={tem.id} value={tem.name}> {tem.name}</option>
            ))}
          </select>
          <ul>
            <li >{input.temperament.map((ob) => ob + ", ")}</li>
          </ul>
        </div>
        <button type="submit">Create</button>
      </form>

      {input.temperament.map(ob => 
        <div>
          <p>{ob}</p>
          <button onClick={()=> handleDelete(ob)}>X</button>
        </div>
        )}
    </div>
  );
}

// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// Posibilidad de seleccionar/agregar uno o más temperamentos
