import React, { Component } from "react";

import MainLink from "component/MainLink";

import "./MainContainer.scss";

class MainContainer extends Component {
  render() {
    return (
      <div className="main">
        <div className="main-box">
          {this.props.languageList.map((lang, i) => {
            return <MainLink language={lang} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default MainContainer;
