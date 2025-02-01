import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:3001/superheroes";

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [formData, setFormData] = useState({ name: "", power: "", humility: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuperheroes(response.data);
    } catch (error) {
      console.error("Error fetching superheroes", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(API_URL, {
        id: new Date(),
        name: formData.name,
        superpower: formData.power,
        humility_score: Number(formData.humility),
      });
      const response2 = await axios.get(API_URL);
      setSuperheroes(response2.data);
      setFormData({ name: "", power: "", humility: "" });
    } catch (error) {
      setError(error.response?.data?.error || "Error adding superhero");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Humble Superheroes</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="power"
            className="form-control"
            placeholder="Superpower"
            value={formData.power}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="humility"
            className="form-control"
            placeholder="Humility (1-10)"
            value={formData.humility}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Superhero</button>
      </form>

      {error && <p className="text-danger">{error}</p>}

      <h2 className="text-center">Superheroes List</h2>
      <ul className="list-group">
        {superheroes.map((hero, index) => (
          <li key={index} className="list-group-item">
            <strong>{hero.name}</strong> - {hero.superpower} (Humility score: {hero.humility_score})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
