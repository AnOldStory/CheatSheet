import React, { Component } from "react";
import { connect } from "react-redux";
import * as routeActions from "store/modules/route";

import SidebarContainer from "container/sidebar/SidebarContainer";

import Top from "component/Top";
import CodeViewer from "component/CodeViewer";
import CodeName from "component/CodeName";
import CodeText from "component/CodeText";
import CodeLink from "component/CodeLink";

import Loading from "component/Loading";

import "./PresenterContainer.scss";
import { bindActionCreators } from "../../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux";

class PresenterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      contents: [],
      title: []
    };
  }
  componentDidMount() {
    if (this.props.path !== this.props.match.params.lang) {
      const { RouteActions } = this.props;
      RouteActions.set(this.props.match.params.lang);
    }
    fetch(
      process.env.PUBLIC_URL + "/docs/" + this.props.match.params.lang + ".ep"
    )
      .then(res => {
        return res.text();
      })
      .then(text => {
        let parser = [];
        let sidebarparser = [];
        let type, temp;

        /* parse start */
        text = text
          .replace(/-=\[/gi, "title^^^")
          .replace(/\]=-/gi, "^^^")
          .replace(/--\[/gi, "code^^^")
          .replace(/\]--/gi, "~~~")
          .replace(/----/gi, "^^^")
          .replace(/=-\[/gi, "text^^^")
          .replace(/]-=/gi, "^^^")
          .replace(/-=>/gi, "link^^^")
          .replace(/<=-/gi, "~~~")
          .replace(/-><-/gi, "^^^")
          .split("^^^");

        for (let i = 0; i < text.length; i++) {
          if (i % 2 === 0) {
            type = text[i].trim();
          } else {
            switch (type) {
              case "title":
                parser.push(
                  <CodeName
                    name={text[i].trim()}
                    key={i / 2}
                    id={text[i].trim()}
                  />
                );
                sidebarparser.push(text[i].trim());
                break;
              case "code":
                temp = text[i].split("~~~");
                parser.push(
                  <CodeViewer
                    type={temp[0].trim()}
                    code={temp[1].trim()}
                    key={i / 2}
                  />
                );
                break;
              case "text":
                parser.push(<CodeText text={text[i].trim()} key={i / 2} />);
                break;
              case "link":
                temp = text[i].split("~~~");
                parser.push(
                  <CodeLink
                    name={temp[0].trim()}
                    href={temp[1].trim()}
                    key={i / 2}
                  />
                );
                break;
              default:
                console.log(type);
                console.log(text[i]);
                parser.push(<CodeText text={"parse Error!"} key={i / 2} />);
            }
          }
        }

        /* parse end */
        this.setState({
          loaded: 1,
          contents: parser,
          title: sidebarparser
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        {this.state.loaded === 0 ? (
          <Loading />
        ) : (
          <SidebarContainer title={this.state.title} />
        )}
        <div className="presenter">
          <div className="presenter-box">
            <div className="presenter-brand">{this.props.path}</div>
            {this.state.contents.map(lang => {
              return lang;
            })}
          </div>
        </div>
        <Top />
      </>
    );
  }
}

export default connect(
  value => ({
    path: value.route.get("path")
  }),
  dispatch => ({
    RouteActions: bindActionCreators(routeActions, dispatch)
  })
)(PresenterContainer);
