import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); // esto es lo mismo que mapStateToProps, pero con hooks

  useEffect(() => {
    dispatch(getDogs()); // esto es lo mismo que mapDispatchToProps, pero con hooks
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs()); // esto es para volver a cargar todos la página
  }

  return (
    <div>
      <Link to="/dog">Create a new dog</Link>
      <h1>THE DOG API</h1>
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
      </div>

      {allDogs?.map((ob) => {
        return (
          <div key={ob.id}>
            <Link to={"/home"}>
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
  );
}

// {allDogs?.map((ob) => (
//   <Link to={"/home/" + ob.id}>
//     <Card
//       image={ob.image}
//       name={ob.name}
//       temperament={ob.temperament}
//       weight={ob.weight}
//       key={ob.id}
//     />
//   </Link>
// ))}
