import axios from "axios";
import React from "react";
import "./App.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Snack from './Snack.js';

const SERVER = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snacks: []
    }
  }

  componentDidMount() {
    this.getSnacks();
  }

  async getSnacks() {
    try {
      const response = await axios.get(`${SERVER}/snacks`);
      console.log("get all the snacks: ", response.data)
      this.setState({ snacks: response.data});
    } catch(error) {
      console.error(error);
    }
  }

  async createSnack(snackInfo) {
    try {
      const response = await axios.post(`${SERVER}/snacks`, snackInfo);
      console.log("create a snack: ", response.data);
      this.setState({ snacks: [...this.state.snacks, response.data]});
    } catch(error) {
      console.error(error);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.snackName.value);
    const snackInfo = {
      name: event.target.snackName.value,
      description: event.target.snackDescription.value
    }
    console.log(snackInfo);
    this.createSnack(snackInfo);
    this.getSnacks();
  }

  // Add a delete handler method
  // id represents the ._id of the object to delete
  deleteSnack = async (id) => {
    try {
      const response = await axios.delete(`${SERVER}/snacks/${id}`);
      console.log(response.data);
      // this will rerender the Snack component
      this.getSnacks();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Create a Snack</Form.Label>
          <Form.Group controlId="snackName">
            <Form.Control type="text" placeholder="snack name"  />
          </Form.Group>
          <Form.Group controlId="snackDescription">
            <Form.Control type="text" placeholder="snack description" />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        {this.state.snacks.length && 
          <Snack deleteSnack={this.deleteSnack} snackArray={this.state.snacks} />
        };
      </div>
    );
  }
}

export default App;
