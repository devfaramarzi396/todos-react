
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Home from "./pages/Home/Index.js";
import IndexTodods from "./pages/Todos/Index.js";

function App() {
  return (
    <>

      <BrowserRouter>
        <Header />
        <div className="container mt-6">
          <div className="row ">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/todos" component={IndexTodods} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>


    </>
  );
}

export default App;
