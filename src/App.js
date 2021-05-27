import Header from './components/Header';
import Home from './components/Home';
import ViewPokemon from './components/ViewPokemon';
import TypesList from './components/TypesList';
import NoMatch from'./components/NoMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div >
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/pokemon/:id">
              <ViewPokemon />
            </Route>
            <Route exact path="/types">
              <TypesList />
            </Route>
            <Route path="*">
            <NoMatch />
          </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
