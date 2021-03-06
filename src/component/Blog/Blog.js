import React from "react";
import style from "./Blog.module.css";
import wtf_wikipedia from "wtf_wikipedia";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onecategories: [],
      onesections: [],
      oneparagraphs: [],
      oneinput: "",
      twoinput: "bangladesh",
      isLoading: true,
    };
  }

  componentDidMount() {
    wtf_wikipedia.fetch(this.state.twoinput).then((doc) => {
      console.log("doc", doc);
      // const c = doc.data.categories;
      for (let i = 0; i < doc.data.categories.length; i++) {
        this.setState({
          onecategories: [...this.state.onecategories, doc.data.categories[i]],
        });
      }

      for (let i = 0; i < doc.data.sections.length; i++) {
        this.setState({
          isLoading: false,
          onesections: [...this.state.onesections, doc.data.sections[i]._title],
        });
        // for (let j = 0; j < doc.data.sections[i].data.paragraphs.length; j++) {
        //   // console.log("para", doc.data.sections[i].data.paragraphs[j]);
        //   for (
        //     let k = 0;
        //     k < doc.data.sections[i].data.paragraphs[j].data.sentences.length;
        //     k++
        //   ) {
        //     // console.log(
        //     //   "sentence",
        //     //   doc.data.sections[i].data.paragraphs[j].data.sentences[k].data
        //     //     .text
        //     // );
        //     this.setState({
        //       oneparagraphs: [
        //         ...this.state.oneparagraphs,
        //         doc.data.sections[i].data.paragraphs[j].data.sentences[k].data
        //           .text,
        //       ],
        //     });
        //   }
        // }
      }
    });
  }

  render() {
    return (
      <div class={style.parent}>
        <h1>this is {this.state.twoinput}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            onChange={(e) => {
              this.setState({ oneinput: e.target.value });
            }}
            value={this.state.oneinput}
          ></input>
          <button
            type="submit"
            onClick={() => {
              // console.log("one", this.state.oneinput);
              this.setState({ twoinput: this.state.oneinput });
              // this.componentDidMount();
              // this.clicks;
              // console.log("two", this.state.twoinput);
              // this.setState({ oneinput: "" });
            }}
          >
            search
          </button>
        </form>

        {this.state.isLoading ? <h1>loading...</h1> : <h1>ses</h1>}
        <div class={style.view}>
          <div class={style.left}>
            <h1>this is sections </h1>
            {this.state.onesections.map((item) => (
              <p>{item}</p>
            ))}
          </div>
          <div class={style.middle}>
            <h1>THIS is about {this.state.twoinput}</h1>
            {this.state.oneparagraphs.map((item) => (
              <p>{item}</p>
            ))}
          </div>
          <div class={style.right}>
            <h1>this is categories</h1>
            {this.state.onecategories.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
