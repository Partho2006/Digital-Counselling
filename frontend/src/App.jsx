import CounsellingApp from "./components/CounsellingApp";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/counselling' element={<CounsellingApp />} />
      </Routes>
    </Router>
  )
}

export default App;
