import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Photos from "./Photos";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      photos: [],
    };
  }

  updateSearchQuery = (e) => this.setState({ searchQuery: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = process.env.REACT_APP_API_URL;
      const url = `${API}/photos`;
      const response = await axios.get(url, {
        params: {
          searchQuery: this.state.searchQuery,
        }
      });
      this.setState({ photos: response.data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Find Photos About...</Form.Label>
            <Form.Control
              onChange={this.updateSearchQuery}
              type="text"
              placeholder="Enter a search term"
            />
          </Form.Group>
        </Form>

        {this.state.photos.length > 0 && (
          <Photos
            photos={this.state.photos}
            searchQuery={this.state.searchQuery}
          />
        )}
      </>
    );
  }
}

export default Main;
