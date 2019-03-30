import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavigationContainer from "container/navigation/NavigationContainer";
import MainContainer from "container/main/MainContainer";
import PresenterContainer from "container/presenter/PresenterContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageList: [
        "Algorithm",
        "C",
        "C++",
        "CSS",
        "Java",
        "Linux",
        "Machine Learning",
        "Markdown",
        "Node.js",
        "OCaml",
        "Python",
        "React",
        "Regexp"
      ]
    };
    // ABCDE FGHIJ KLMNO PQRST UVWXY Z
  }
  render() {
    return (
      <BrowserRouter basename="/CheatSheet">
        <>
          <Route path="/" component={NavigationContainer} />
          <Route
            exact
            path="/"
            component={() => (
              <MainContainer languageList={this.state.languageList} />
            )}
          />

          <Switch>
            <Route path="/:lang" component={PresenterContainer} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
