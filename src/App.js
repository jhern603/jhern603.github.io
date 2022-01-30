import { initializeApp } from 'firebase/app';
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
  const firebaseConfig = {
    apiKey: 'AIzaSyCAraiwf-Fk_DoiD1oUwGgoBBePv41gUgM',
    authDomain: 'uwuportfolio.firebaseapp.com',
    projectId: 'uwuportfolio',
    storageBucket: 'uwuportfolio.appspot.com',
    messagingSenderId: '923273703749',
    appId: '1:923273703749:web:6f79b9aa75ca2334e80e2c',
  };
  const app = initializeApp(firebaseConfig);
  return (
    <div className="App">
      <Navbar />
      <Home ref={home} />
      <About ref={about} />
      <Projects ref={projects} />
      <p className="footer">
        &copy; Jose "UWU" Hernandez 2020 -{' '}
        <Link to="home" smooth={true} duration={500} className="back_to_top">
          Back to UWU
        </Link>
      </p>
    </div>
  );
}

export default App;
