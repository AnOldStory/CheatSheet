import React, { Component } from "react";

import "./SidebarContainer.scss";

class SidebarContainer extends Component {
  render() {
    return (
      <div className="sidebar">
        <li className="sidebar-li">사이드빠다아</li>
        <li className="sidebar-li sidebar-li-active">싸이뜨바따야</li>
      </div>
    );
  }
}

export default SidebarContainer;
