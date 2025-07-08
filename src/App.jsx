import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

const Home = () => (
  <div className="challenge-selector">
    <h1 className="app_h1">Sandbox Targets</h1>
    <div className="challenge-cards">
      <Link className="challenge-card" to="/clock">
        <div className="card-icon">🕐</div>
        <h3>Analog Clock</h3>
        <p>Build a real-time analog clock with proper hand positioning</p>
      </Link>
      <Link className="challenge-card" to="/board">
        <div className="card-icon">🎲</div>
        <h3>Board of Boredom</h3>
        <p>Create a board game with dice rolling and win conditions</p>
      </Link>
      <Link className="challenge-card" to="/treeview">
        <div className="card-icon">🌳</div>
        <h3>Collapsible Tree View</h3>
        <p>Implement a collapsible tree structure UI component</p>
      </Link>
      <Link className="challenge-card" to="/pagination">
        <div className="card-icon">📄</div>
        <h3>Geo Deck</h3>
        <p>Create a paginated list with next/previous navigation</p>
      </Link>
      <Link className="challenge-card" to="/websocket">
        <div className="card-icon">🌐</div>
        <h3>WebSocket</h3>
        <p>
          Create a React component that connects to a WebSocket server, handles
          connection states (connect, disconnect, reconnect with exponential
          backoff)
        </p>
      </Link>
      <Link className="challenge-card" to="/accordion">
        <div className="card-icon">📂</div>
        <h3>Accordion</h3>
        <p>Build an accessible accordion component with expand/collapse</p>
      </Link>
      <Link className="challenge-card" to="/slider">
        <div className="card-icon">🎚️</div>
        <h3>Range Slider</h3>
        <p>Develop a customizable range slider input component</p>
      </Link>
      <Link className="challenge-card" to="/digital-clock">
        <div className="card-icon">⏲️</div>
        <h3>Digital Clock</h3>
        <p>Build a digital clock that updates the time every second</p>
      </Link>
      <Link className="challenge-card" to="/calendar">
        <div className="card-icon">📅</div>
        <h3>Calendar</h3>
        <p>Render a simple calendar for the current month</p>
      </Link>
      <Link className="challenge-card" to="/carousel">
        <div className="card-icon">🖼️</div>
        <h3>Image Carousel</h3>
        <p>Create an interactive image carousel with sliding transitions</p>
      </Link>
    </div>
  </div>
);

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div>
      <Header />
      <main className="challenge-content">
        {isHome ? <Home /> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
