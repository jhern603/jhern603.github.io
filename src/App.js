import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Photos from "./pages/photography"
import Navbar from "./components/navbar"
import './styles/reset.css'
import './styles/global.css'
function App() {
  return (
    <div>
      <Navbar />
      <main>
        <About />
        <Projects />
        <Photos />
      </main>
    </div>
  );
}

export default App;
