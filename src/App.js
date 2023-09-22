import { Route,Routes,Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Mainpage from './components/mainpage'

function App() {
  return (
    <Router basename="/Stock-Tracker">
    <Routes>
      <Route path='/' element={<Mainpage/>}/>
    </Routes>
    </Router>
  );
}

export default App;