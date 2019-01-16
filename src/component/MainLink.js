import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as routeActions from "store/modules/route";

class MainLink extends Component {
  constructor(props) {
    super(props);
    this.handleSet = this.handleSet.bind(this);
  }
  handleSet = (path, event) => {
    const { RouteActions } = this.props;
    RouteActions.set(path);
  };
  render() {
    return (
      <Link
        className="main-link"
        to={this.props.language}
        onClick={this.handleSet.bind(this, this.props.language)}
      >
        <div className="main-link-span">{this.props.language}</div>
      </Link>
    );
  }
}
export default connect(
  null,
  dispatch => ({
    RouteActions: bindActionCreators(routeActions, dispatch)
  })
)(MainLink);
