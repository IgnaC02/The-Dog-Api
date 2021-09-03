import React from "react";

export default function Card({
  name,
  image,
  temperament,
  weight,
  id
}) {
  return (
    <div>
      <img src={image} alt="Img not found" width="200px" height="200px" />
      <h2>{name}</h2>
      <h3>{temperament}</h3>
      <h3>{weight}</h3>
    </div>
  );
}
