import React from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    };
  }

  // Form event handler/helper function
  handleSubmit = (e) => {
    e.preventDefault();
    // parse through the form data
    // object literal, matching our catSchema on the backend
    this.handleCatCreate({
      name: e.target.name.value,
      color: e.target.color.value,
      spayNeuter: e.target.spayNeuter.checked,
      location: e.target.location.value,
    });
  }

  // Make the post request to the server
  handleCatCreate = async (catInfo) => {
    console.log('catInfo is:', catInfo);
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/cats`, catInfo);
      // Don't forget .data!
      const createdCat = res.data;
      // update state and render the createdCat
      this.setState({
        cats: [...this.state.cats, createdCat],
      })
    } catch (error) {
      console.log("we have an error: ", error.response);
    }
  }

  handleDelete = async (catToDelete) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER}/cats/${catToDelete._id}`);
      console.log('The response.status is:', response.status);
      // filter it out from state
      const filteredCats = this.state.cats.filter(cat => {
        return cat._id !== catToDelete._id;
      });
      this.setState({
        cats: filteredCats,
      });
    } catch (error) {
      console.log("we have an error: ", error.response);
    }
  }




  getCats = async () => {
    try {
      // make a call to my server/cats to get cats
      let catData = await axios.get(`${process.env.REACT_APP_SERVER}/cats`);
      // catData.data
      this.setState({
        cats: catData.data,
      });
    } catch (error) {
      console.log("we have an error: ", error.response);
    }
  };

  // React Lifecycle function that will run this block of code as soon as the component is rendered to the DOM tree... net effect: it will call this.getCats() right on site load.
  componentDidMount() {
    this.getCats();
  }

  render() {
    console.log(this.state.cats);
    let cats = this.state.cats.map((cat, index) => (
      <>
        <p key={cat._id}>
          {cat.name} is a {cat.color}
        </p>
        <button onClick={() => this.handleDelete(cat)} key={index}>Delete Cat?</button>
      </>
    ));
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>{this.state.cats.length > 0 && <>{cats}</>}</main>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Enter Cat Name</Form.Label>
              <Form.Control placeholder="Enter Cat Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="color">
              <Form.Label>Enter Their Color</Form.Label>
              <Form.Control placeholder="Enter Color" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="spayNeuter">
              <Form.Check type="checkbox" label="Are they spayed or neutered?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Enter Cat's Location</Form.Label>
              <Form.Control placeholder="Enter Location" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default App;
