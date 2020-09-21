import React from "react";
import style from "./Chat.module.css";
import { database, timeStamp, storage, auth } from "../Fire";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputval: "",
      file: [],
      imageUrl: "",
      data: [],
      isLoading: true,
      nameofuser: "",
    };
  }
  componentDidMount() {
    //setting name using database :P
    database
      .collection("profilemid")
      .doc("one")
      .get()
      .then((snap) => {
        console.log("snap check", snap.data());
        if (!snap.data()) {
          return;
        } else if (snap.data()) {
          this.setState({ nameofuser: snap.data().name });
          console.log("profilemid check name", snap.data().name);

          database.collection("profile").doc(auth.currentUser.uid).set({
            name: snap.data().name,
            userUid: auth.currentUser.uid,
            timeStamp: timeStamp,
          });
          return;
        }
      });
    database
      .collection("profile")
      .doc(auth.currentUser.uid)
      .get()
      .then((snap) => {
        if (!snap.data()) {
          return;
        } else {
          this.setState({ nameofuser: snap.data().name });
        }
      });

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
                name: item.data().name,
              },
            ],
            // isLoading: false,
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
      name: this.state.nameofuser,
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
        <p>this is chat= {this.state.nameofuser}</p>
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
        <div class={style.viewmsg}>
          {this.state.data.map((item) => (
            <div>
              <p>name={item.name}</p>
              <p> text={item.title}</p>
              <Deletey item={item} />
              <img src={item.img} />
            </div>
          ))}
        </div>
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
