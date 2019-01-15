import React, { Component } from "react";
import Scrollspy from "react-scrollspy";

import "./SidebarContainer.scss";

class SidebarContainer extends Component {
  render() {
    return (
      <Scrollspy
        className="sidebar"
        items={this.props.title}
        currentClassName="sidebar-li-active"
        componentTag={"div"}
      >
        {this.props.title.map((text, i) => {
          return (
            <li className="sidebar-li" key={i}>
              <a href={"#" + text}>{text}</a>
            </li>
          );
        })}
      </Scrollspy>
    );
  }
}

export default SidebarContainer;
