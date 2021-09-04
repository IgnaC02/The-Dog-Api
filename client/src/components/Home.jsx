import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); // esto es lo mismo que mapStateToProps, pero con hooks
  // paginado
  //     declaro un estado local
  const [currentPage, setCurrentPage] = useState(1); // en uno porque siempre empeza en la página n1
  //     declaro otro estado local
  const [dogsPerPage, setDogsPerPage] = useState(8); // dogs por página
  const indexOfLastDog = currentPage * dogsPerPage;
  //    busco siempre el primer dog de la pagina
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // agarra al arreglo de todos los perros, y los divide en n paginas

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs()); // esto es lo mismo que mapDispatchToProps, pero con hooks
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs()); // esto es para volver a cargar todos la página
  }

  return (
    <div className={styles.container}>
      <Link to="/dog">Create a new dog</Link>
      <h1 className={styles.title}>THE DOG API</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Remove all filters
      </button>
      <div>
        <select>
          <option value="default">Order by...</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
          <option value="mayor_menor">Weight: from ⬆ to ⬇</option>
          <option value="menor_mayor">Weight: from ⬇ to ⬆</option>
        </select>
        <select>
          <option value="default">Show...</option>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Reals</option>
        </select>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      <div className={styles.containerCards}>
        {currentDogs?.map((ob) => {
          return (
            <div key={ob.id} className={styles.cards}>
              <Link to={"/home"} className={styles.card}>
                <Card
                  name={ob.name}
                  image={ob.image}
                  temperament={ob.temperament}
                  weight={ob.weight + " kg"}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
