import React from "react";
import style from "./Todo.module.css";
import { database, timeStamp, storage } from "../Fire";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      condition: true,
      inputvalue: "",
      donedata: [],
      search: "",
      // file: [],
      // fileUrl: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    const dataRef = database.collection("demo").orderBy("timeStamp", "desc");

    dataRef.where("condition", "==", true).onSnapshot((snap) => {
      this.setState({
        donedata: [],
      });
      snap.forEach((item) => {
        this.setState({
          donedata: [
            ...this.state.donedata,
            { Data: item.data(), Id: item.id },
          ],
        });
      });
    });

    dataRef.where("condition", "==", false).onSnapshot((snap) => {
      this.setState({
        data: [],
      });
      // console.log("ss", snap.docs);

      snap.forEach((item) => {
        // console.log("data", item.id);
        this.setState({
          data: [...this.state.data, { Data: item.data(), Id: item.id }],
          isLoading: false,
        });
      });
    });
  }

  search = (e) => {
    e.preventDefault();
    if (this.state.search) {
      database
        .collection("demo")
        .orderBy("timeStamp", "desc")
        .where("condition", "==", false)
        .where("title", "==", this.state.search)
        .get()
        .then((snap) => {
          this.setState({
            data: [],
          });
          snap.forEach((item) => {
            // console.log("data", item.id);
            this.setState({
              data: [...this.state.data, { Data: item.data(), Id: item.id }],
            });
          });
        });
    } else {
      database
        .collection("demo")
        .orderBy("timeStamp", "desc")
        .where("condition", "==", false)
        .get()
        .then((snap) => {
          this.setState({
            data: [],
          });
          snap.forEach((item) => {
            // console.log("data", item.id);
            this.setState({
              data: [...this.state.data, { Data: item.data(), Id: item.id }],
            });
          });
        });
    }
  };
  /* showing img in web (selected img show in page) */

  // filechange = (files) => {
  //   let reader = new FileReader();
  //   console.log("files", files[0]);
  //   this.setState({
  //     file: files[0],
  //   });

  //   reader.onloadend = () => {
  //     this.setState({
  //       fileUrl: reader.result,
  //     });
  //   };

  //   if (files[0]) {
  //     reader.readAsDataURL(files[0]);
  //   }
  // };

  // upload = (databaseId) => {
  //   var uploadTask = storage.ref(this.state.inputvalue).put(this.state.file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       switch (snapshot.state) {
  //         case storage.TaskState.PAUSED: // or 'paused'
  //           console.log("Upload is paused");
  //           break;
  //         case storage.TaskState.RUNNING: // or 'running'
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },

  //     function (error) {
  //       // Handle unsuccessful uploads
  //     },

  //     function () {
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //         console.log("File available at", downloadURL);
  //         databaseId.update({ imageUrl: downloadURL });
  //       });
  //     }
  //   );
  //   this.setState({ file: [], fileUrl: "" });
  // };
  addData = (e) => {
    e.preventDefault();
    if (!this.state.inputvalue) {
      return;
    }
    const databaseId = database.collection("demo").doc();
    databaseId.set({
      title: this.state.inputvalue,
      condition: false,
      timeStamp: timeStamp,
    });

    // this.upload(databaseId);

    this.setState({
      inputvalue: "",
    });
  };

  // setCheck = (e) => {
  //   console.log("setcheck", e.target.checked);
  //   database.collection("demo").doc().update({ condition: e.target.checked });
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.search}>
          <input
            placeholder="search"
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
          />
        </form>

        <p>this is getdata</p>
        <form onSubmit={this.addData}>
          <input
            placeholder="text"
            onChange={(e) => {
              this.setState({ inputvalue: e.target.value });
            }}
            value={this.state.inputvalue}
          ></input>
          {/* <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              this.filechange(e.target.files);
            }}
          /> */}
          <button onClick={this.addData}>add</button>
        </form>
        {/* <img src={this.state.fileUrl} /> */}

        <hr />
        <h1>this is false data </h1>
        {this.state.isLoading ? (
          <h1>loading...</h1>
        ) : (
          <div>
            {this.state.data.map((item) => (
              <div>
                <p>{item.Data.title}</p>
                {/* <img src={item.Data.imageUrl} /> */}
                {item.Data.timeStamp && (
                  <p>{item.Data.timeStamp.toDate().toLocaleTimeString()}</p>
                )}

                <Input item={item} />
              </div>
            ))}
          </div>
        )}

        <hr />
        <h1>this iis true data</h1>
        {this.state.donedata.map((item) => (
          <div>
            <p>{item.Data.title}</p>
            {/* <img src={item.Data.imageUrl} /> */}
            <Input item={item} />
          </div>
        ))}
        {/* {this.state.condition && <p> loading ...... </p>} */}
      </div>
    );
  }
}

function Input(props) {
  const setCheck = (e) => {
    console.log("setcheck", props.item.Id);
    database
      .collection("demo")
      .doc(props.item.Id)
      .update({ condition: e.target.checked });
  };
  return (
    <input
      onChange={setCheck}
      type="checkbox"
      checked={props.item.Data.condition}
    />
  );
}

export default Todo;
