import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo192.jpg" className="App-logo" alt="Logo don de sang" />
        <h1 className="App-title">Chatbot Don de Sang</h1>
        <p className="App-subtitle">Posez vos questions sur le don de sang</p>
      </header>
      <main className="App-main">
        <Chatbot />
      </main>
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} - Chatbot pour le don de sang</p>
      </footer>
    </div>
  );
};

export default App;