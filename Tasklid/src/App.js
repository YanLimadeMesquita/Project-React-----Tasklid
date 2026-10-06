import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './componets/pages/Home';
import Contact from './componets/pages/Contact';
import Projects from './componets/pages/Projects';
import NewProjects from './componets/pages/NewProjects';
import Project from './componets/pages/Project';

import Container from './componets/layout/Container';
import NavBar from './componets/layout/NavBar';
import Footer from './componets/layout/Footer'

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass='min-height'>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newprojects" element={<NewProjects />} />
          <Route path="/project/:id" element={<Project />} />

        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
