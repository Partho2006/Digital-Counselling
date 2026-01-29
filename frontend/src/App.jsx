import CounsellingApp from "./components/CounsellingApp";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CounsellingApp />} />
      </Routes>
    </Router>
  )
}

export default App;
