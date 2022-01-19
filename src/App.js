import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import { Link } from 'react-scroll';

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
      <p className="footer">
        &copy; Jose Hernandez 2020 -{' '}
        <Link to="home" smooth={true} duration={500} className = "back_to_top">
          Back to top
        </Link>
      </p>
    </div>
  );
}

export default App;
