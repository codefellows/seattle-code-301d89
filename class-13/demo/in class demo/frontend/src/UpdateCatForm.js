import { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";

// This is where we actually handle our update!
class UpdateCatForm extends Component {

	// This will look similar to handleSubmit on App.js
	handleSubmit = (e) => {
		e.preventDefault();
		const catToUpdate = {
			name: e.target.name.value || this.props.cat.name,
			color: e.target.color.value || this.props.cat.color,
			spayNeuter: e.target.spayNeuter.checked || this.props.cat.spayNeuter,
			location: e.target.location.value || this.props.cat.location,
			_id: this.props.cat._id,
			__v: this.props.cat.__v,
		}

		this.props.updateCats(catToUpdate);
	}

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Enter Cat Name</Form.Label>
            <Form.Control placeholder={this.props.cat.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Enter Their Color</Form.Label>
            <Form.Control placeholder={this.props.cat.color} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="spayNeuter">
						{this.props.cat.spayNeuter ? 
							<Form.Check type="checkbox" label="Are they spayed or neutered?" checked/> :
							<Form.Check type="checkbox" label="Are they spayed or neutered?" /> 
						}
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Enter Cat's Location</Form.Label>
            <Form.Control placeholder={this.props.cat.location} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default UpdateCatForm;
