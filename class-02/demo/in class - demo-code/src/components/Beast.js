import React from "react";

// bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Beast extends React.Component {
	// when a component has state, it MUST have a constructor method
	constructor(props){
		// type super(props) every time!
		super(props);
		this.state = {
			description: this.props.description,
			src: this.props.src,
		}
	}

	// event handler!
	handleClick = () => {
		// this is where the magic happens! .setState() rerenders the component
		// this is what makes react "reactive"
		this.setState({ description: 'this component rerendered! ❤️'});
		// this.setState({ description: this.state.description + "test"});
	}

  render() {
    return (
      <Card style={{ width: "18rem" }} className="mx-auto my-5">
        <Card.Img variant="top" src={this.state.src} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text className="fst-italic">{this.state.description}</Card.Text>
					{/* add the click event listener: */}
					{/* in the {} in onClick is a reference to the event listener method */}
          <Button variant="primary" onClick={this.handleClick}>Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Beast;
