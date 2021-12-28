import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import Projects from './pages/projects';

function App() {
  const home = React.useRef();
  const projects = React.useRef();

  return (
    <div className="App">
      <Navbar />
      <Home ref={home} />
      <Projects ref={projects} />
    </div>
  );
}

export default App;
