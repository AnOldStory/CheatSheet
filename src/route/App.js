import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavigationContainer from "container/navigation/NavigationContainer";
import PresenterContainer from "container/presenter/PresenterContainer";
import SidebarContainer from "container/sidebar/SidebarContainer";
import MainContainer from "container/main/MainContainer";

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
        "Machine Learning",
        "Markdown",
        "Node.js",
        "Python",
        "React",
        "Regex"
      ]
    };
  }
  render() {
    return (
      <BrowserRouter basename="/">
        <>
          <Route path="/" component={NavigationContainer} />
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <MainContainer languageList={this.state.languageList} />
              )}
            />
            <SidebarContainer />
          </Switch>

          <Switch>
            <Route path="/:lang" component={PresenterContainer} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
