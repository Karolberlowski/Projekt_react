import './App.css';
import Mem from './components/mem';
import About from './components/about';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Mem</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/Mem">
            <Mem />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/">
            <Mem />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
