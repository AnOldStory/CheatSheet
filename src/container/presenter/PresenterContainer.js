import React, { Component } from "react";
import { connect } from "react-redux";

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
      contents: []
    };
  }
  componentDidMount() {
    fetch("/docs/" + this.props.path + ".ep")
      .then(res => {
        return res.text();
      })
      .then(text => {
        let parser = [];
        let type = "";

        text = text.split("===");

        for (let i = 0; i < text.length; i++) {
          if (i % 2 === 0) {
            type = text[i].trim();
          } else {
            switch (type) {
              case "title":
                parser.push(<CodeName name={text[i]} key={i / 2} />);
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
          contents: parser
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        {this.state.loaded === 0 ? <Loading /> : ""}
        <div className="presenter">
          <div className="presenter-box">
            redux.route.path : {this.props.path}
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
