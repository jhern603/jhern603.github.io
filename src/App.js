import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';

function App() {
  const home = React.useRef();
  const about = React.useRef();
  const projects = React.useRef();

  return (
    <div className="App">
      <Navbar />
      <Home ref={home} />
      <About ref={about} />
      <Projects ref={projects} />
    </div>
  );
}

export default App;
