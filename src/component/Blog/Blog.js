import React from "react";
import style from "./Test.module.css";
import wtf_wikipedia from "wtf_wikipedia";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      onesections: [],
      onecategories: [],
      oneparagraphs: [],
    };
  }
  componentDidMount() {}
  getdata = () => {
    this.setState({
      onesections: [],
      onecategories: [],
      oneparagraphs: [],
      message: "",
    });
    wtf_wikipedia.fetch(this.state.search).then((doc) => {
      console.log("doc", doc);
      if (doc === null) {
        this.setState({
          message: "not found",
        });
        return;
      }
      for (let i = 0; i < doc.data.categories.length; i++) {
        this.setState({
          onecategories: [...this.state.onecategories, doc.data.categories[i]],
        });
      }

      for (let i = 0; i < doc.data.sections.length; i++) {
        this.setState({
          onesections: [...this.state.onesections, doc.data.sections[i]._title],
        });
        for (let j = 0; j < doc.data.sections[i].data.paragraphs.length; j++) {
          for (
            let k = 0;
            k < doc.data.sections[i].data.paragraphs[j].data.sentences.length;
            k++
          ) {
            this.setState({
              oneparagraphs: [
                ...this.state.oneparagraphs,
                doc.data.sections[i].data.paragraphs[j].data.sentences[k].data
                  .text,
              ],
            });
          }
        }
      }
      this.setState({
        search: "",
      });
    });
  };

  render() {
    return (
      <div class={style.parent}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
            value={this.state.search}
          ></input>
          <button type="submit" onClick={this.getdata}>
            search
          </button>
        </form>
        <h1>{this.state.message}</h1>

        <h1> this is search ={this.state.search}</h1>
        {this.state.onecategories.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    );
  }
}
export default Test;
