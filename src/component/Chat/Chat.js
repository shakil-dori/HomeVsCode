import React from "react";
import style from "./Chat.module.css";
import { database, timeStamp, storage } from "../Fire";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputval: "",
      file: [],
      imageUrl: "",
      data: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    database
      .collection("chat")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snap) => {
        this.setState({ data: [] });

        snap.forEach((item) => {
          this.setState({
            data: [
              ...this.state.data,
              {
                title: item.data().title,
                id: item.id,
                img: item.data().imageUrl,
              },
            ],
            isLoading: false,
          });
        });
      });
  }
  uploadingimg = (dataId) => {
    if (!this.state.file[0]) {
      this.setState({ inputval: "" });
    }

    var uploadTask = storage.ref(this.state.inputval).put(this.state.file);
    console.log("yooooo");

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads
      },

      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          dataId.update({ imageUrl: downloadURL });
        });
      }
    );

    this.setState({ file: [], imageUrl: "", inputval: "" });
  };

  addData = (e) => {
    e.preventDefault();
    if (!this.state.inputval) {
      return;
    }
    const dataId = database.collection("chat").doc();
    dataId.set({
      title: this.state.inputval,
      timeStamp: timeStamp,
    });
    this.uploadingimg(dataId);

    this.setState({ inputval: "" });
  };
  /* showing img in web (selected img show in page) */
  filechange = (files) => {
    let reader = new FileReader();
    console.log("file", files[0]);

    this.setState({ file: files[0] });

    reader.onloadend = () => {
      this.setState({ imageUrl: reader.result });
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  render() {
    return (
      <div class={style.parent}>
        <p>this is chat</p>
        <form onSubmit={this.addData}>
          <input
            placeholder="text"
            onChange={(e) => {
              this.setState({ inputval: e.target.value });
            }}
            value={this.state.inputval}
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              this.filechange(e.target.files);
            }}
          />
          <button onClick={this.addData}>add</button>
        </form>

        <img src={this.state.imageUrl} />
        <hr />
        <div>
          <p>this is email</p>
        </div>
        <hr />

        {this.state.data.map((item) => (
          <div>
            <p> {item.title}</p>
            <Deletey item={item} />
            <img src={item.img} />
          </div>
        ))}
      </div>
    );
  }
}

function Deletey(props) {
  const setdelete = () => {
    database.collection("chat").doc(props.item.id).delete();
  };

  return (
    <div>
      <button onClick={setdelete}>delete</button>
    </div>
  );
}
export default Chat;
