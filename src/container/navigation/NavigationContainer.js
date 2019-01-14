import React, { Component } from "react";

import "./NavigationContainer.scss";

class NavigationContainer extends Component {
  constructor(props) {
    super(props);
    this.handleMain = this.handleMain.bind(this);
  }
  handleMain() {
    this.props.history.replace("/");
  }
  render() {
    return (
      <div className="navigation">
        <div className="navigation-brand" onClick={this.handleMain}>
          <strong>Cheat Sheet</strong>
        </div>
      </div>
    );
  }
}

export default NavigationContainer;
