import React from "react";
import Beast from "./components/Beast.js";
import BeastForm from "./components/BeastForm.js";

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
      displayedBeasts: data,
    };
  }

  setShowModalTrue = (key) => {
    this.setState({ showModal: true });
    // array of 1
    const filteredBeast = data.filter((beast) => {
      return beast._id === key;
    });
    this.setState({ selectedBeast: filteredBeast[0] });
  };

  setShowModalFalse = () => {
    this.setState({ showModal: false });
  };

  // Step 1: define our method in App.js
  // Form event handler
  handleFormSubmit = (e) => {
    // Prevents page reload on submit
    e.preventDefault();
    console.log(e.target.emailAddress.value);
    console.log(e.target.description.value);

    const searchTerm = e.target.description.value;

    // 1. filter data.json based on e.target.description.value
    // 1a. test is going to be if beast.description.includes() the search term
    // 2. setState with filtered beasts

    const filteredBeasts = data.filter((beast) =>
      beast.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Test by console.log first
    console.log(filteredBeasts);

    this.setState({ displayedBeasts: filteredBeasts });
  };

  render() {
    return (
      <>
        {/* Step 2: pass a REFERENCE to the method as a PROP */}
        <BeastForm handleFormSubmit={this.handleFormSubmit} />

        {this.state.displayedBeasts.map((beast) => {
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

        {/* An example of a ternary */}
        {/* {this.state.displayedBeasts.length > 0
          ? this.state.displayedBeasts.map((beast) => {
              return (
                <Beast
                  src={beast.imgUrl}
                  description={beast.description}
                  key={beast._id}
                  setShowModalTrue={this.setShowModalTrue}
                  id={beast._id}
                />
              );
            })
          : data.map((beast) => {
              return (
                <Beast
                  src={beast.imgUrl}
                  description={beast.description}
                  key={beast._id}
                  setShowModalTrue={this.setShowModalTrue}
                  id={beast._id}
                />
              );
            })} */}

        <BeastModal
          showModal={this.state.showModal}
          setShowModalFalse={this.setShowModalFalse}
          selectedBeast={this.state.selectedBeast}
        />
      </>
    );
  }
}

// This can be in its own file
class BeastModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.showModal}
          onHide={this.props.setShowModalFalse}
        >
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
