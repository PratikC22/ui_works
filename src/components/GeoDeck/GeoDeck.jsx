import React, { useState, useEffect } from "react";
import BackButton from "../BackButton/BackButton";
import Sidebar from "../Sidebar/Sidebar";
import "./GeoDeck.css";

const GeoDeck = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,cca3"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentCountries = countries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(0, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible);

    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const formatCapitals = (capitals) => {
    if (!capitals || capitals.length === 0) return "No capital";
    return capitals.join(", ");
  };

  if (loading) {
    return (
      <section className="GeoDeck_container">
        <div className="loading">Loading countries...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="GeoDeck_container">
        <div className="error">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="GeoDeck_container">
      <div className="game-wrapper">
        <Sidebar>
          <BackButton />
          <div className="side-panel rules">
            <h2>Rules</h2>
            <ul>
              <li>Browse through country cards</li>
              <li>4x4 grid layout (16 per page)</li>
              <li>Fixed card sizing prevents shift</li>
              <li>Use pagination to navigate</li>
              <li>Circular navigation wraps</li>
            </ul>
          </div>
          <div className="side-panel hints">
            <h2>Hints</h2>
            <ul>
              <li>Card size: 160×200px</li>
              <li>Flag height: 80px</li>
              <li>🌍 indicates region</li>
              <li>🏛 indicates capital(s)</li>
              <li>
                Page {currentPage + 1} of {totalPages}
              </li>
            </ul>
          </div>
        </Sidebar>

        <div className="main-game">
          <h1 className="GeoDeck_title">Geo Deck</h1>
          <div className="GeoDeck_board">
            {currentCountries.map((country) => (
              <div key={country.cca3} className="tile">
                <div className="flag-container">
                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="flag-image"
                    loading="lazy"
                  />
                </div>
                <div className="tile-content">
                  <div className="country-name">{country.name.common}</div>
                  <div className="country-info">🌍 {country.region}</div>
                  <div className="country-info">
                    🏛 {formatCapitals(country.capital)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="dice-container">
            <button onClick={handlePrevPage}>‹ Prev</button>
            {getVisiblePages().map((page) => (
              <button
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </button>
            ))}
            <button onClick={handleNextPage}>Next ›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeoDeck;
