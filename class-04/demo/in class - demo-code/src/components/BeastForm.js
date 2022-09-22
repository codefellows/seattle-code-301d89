import React from "react";
// Form Code
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

class BeastForm extends React.Component {
	// How to use onChange
	handleChange = (e) => {
		e.preventDefault();
		console.log(e.target.value);
	}

  render() {
    return (
      <>
        <Container>
					{/* Invoke the prop's method in the child component */}
          <Form onSubmit={this.props.handleFormSubmit}>
            <Form.Group className="mb-3" controlId="emailAddress">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                This is not a secure site!
              </Form.Text>
            </Form.Group>

						{/* Form.Control default behavior is text input */}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Enter Description</Form.Label>
							{/* a text input */}
              <Form.Control placeholder="Description" onChange={this.handleChange}/>
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

export default BeastForm;
