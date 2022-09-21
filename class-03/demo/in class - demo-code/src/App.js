import React from "react";
import Beast from "./components/Beast.js";

// copy the imports!
import "bootstrap/dist/css/bootstrap.min.css";

// import data.json
import data from "./assets/data.json";

// import the custom sass file
import "./custom.scss";

// Modal Code
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedBeast: {},
    };
  }

  setShowModalTrue = (key) => {
    this.setState({ showModal: true });
    // array of 1
    const filteredBeast = data.filter((beast) => {
      return beast._id === key;
    });
    this.setState({ selectedBeast: filteredBeast[0] });
  }

  setShowModalFalse = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        {/* <Beast src={data[0].imgUrl} description={data[0].description}/> */}

        {data.map((beast, index) => {
          return (
            <Beast
              src={beast.imgUrl}
              description={beast.description}
              key={beast._id}
              setShowModalTrue={this.setShowModalTrue}
              id={beast._id}
            />
          );
        })}

        <BeastModal showModal={this.state.showModal} setShowModalFalse={this.setShowModalFalse} selectedBeast={this.state.selectedBeast}/>
      </>
    );
  }
}

// This can be in its own file
class BeastModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.setShowModalFalse}>
          <Modal.Header closeButton>
            <Modal.Title>Beast</Modal.Title>
          </Modal.Header>
          {/* Hint for lab: you can combine/nest bootstrap components! */}
          <Modal.Body>{this.props.selectedBeast.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.setShowModalFalse}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default App;
