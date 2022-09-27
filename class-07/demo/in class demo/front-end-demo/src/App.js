import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    // searchQuery, lat, and lon are for example only
    this.state = {
      supplies: [],
      food: [],
      
      searchQuery: 'city goes here',
      lat: 'lat goes here',
      lon: 'lon goes here',
    };
  }

  // do the server request here:
  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (e.target.supplies.checked) {
        const supplies = await axios.get(`http://localhost:3001/supplies?searchQuery=${this.state.searchQuery}&lat=${this.state.lat}&lon=${this.state.lon}`);
        this.setState({ supplies: supplies.data });
      }
      if (e.target.food.checked) {
        const food = await axios.get('http://localhost:3001/food');
        this.setState({ food: food.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Container>
          <Form className="my-4" onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="supplies">
              <Form.Check type="checkbox" label="View supplies?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="food">
              <Form.Check type="checkbox" label="View food?" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
        <Container>
          <h1>Supply Items:</h1>
          {this.state.supplies.length > 0 && this.state.supplies.map((item) => {
            return (
              <p key={item.id}> {item.name} </p>
            );
          })}
        </Container>
        <Container>
          <h1>Food Items:</h1>
          {this.state.food.length > 0 && this.state.food.map((item) => {
            return (
              <p key={item.id}> {item.name} </p>
            );
          })}
        </Container>
      </>
    );
  }
}

export default App;
