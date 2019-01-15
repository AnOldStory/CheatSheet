import React, { Component } from "react";
import { connect } from "react-redux";

import SidebarContainer from "container/sidebar/SidebarContainer";

import CodeViewer from "component/CodeViewer";
import CodeName from "component/CodeName";
import CodeText from "component/CodeText";

import Loading from "component/Loading";

import "./PresenterContainer.scss";

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
    fetch("/docs/" + this.props.path + ".ep")
      .then(res => {
        return res.text();
      })
      .then(text => {
        let parser = [];
        let sidebarparser = [];
        let type = "";

        text = text
          .replace(/-=\[/gi, "title^^^")
          .replace(/\]=-/gi, "^^^")
          .replace(/--\[/gi, "code^^^")
          .replace(/\]--/gi, "~~~")
          .replace(/----/gi, "^^^")
          .replace(/=-\[/gi, "text^^^")
          .replace(/]-=/gi, "^^^");

        text = text.split("^^^");

        for (let i = 0; i < text.length; i++) {
          if (i % 2 === 0) {
            type = text[i].trim();
          } else {
            switch (type) {
              case "title":
                parser.push(
                  <CodeName name={text[i]} key={i / 2} id={text[i].trim()} />
                );
                sidebarparser.push(text[i].trim());
                break;
              case "code":
                let temp = text[i].split("~~~");
                parser.push(
                  <CodeViewer
                    type={temp[0].trim()}
                    code={temp[1].trim()}
                    key={i / 2}
                  />
                );
                break;
              case "text":
                parser.push(<CodeText text={text[i]} key={i / 2} />);
                break;
              default:
                parser.push(<CodeText text={"parse Error!"} key={i / 2} />);
            }
          }
        }

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
            <div className="presenter-brand">{this.props.path} </div>
            {this.state.contents.map(lang => {
              return lang;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default connect(value => ({
  path: value.route.get("path")
}))(PresenterContainer);
