import React from "react";
import { Link } from "react-router-dom";
import landingDog from "../img/landing_dog.png";

export default function LandingPage() {
  return (
    <div>
      <h1>THE DOG API</h1>
      <Link to="/home">
        <button>Get started</button>
      </Link>
      <img src={landingDog} alt="Landing img not found" />
    </div>
  );
}
