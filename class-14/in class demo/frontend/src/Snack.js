import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Snack extends React.Component {
    render() {
			return(
				<Card key={this.props.snack._id} style={{ width:'18rem' }}>
					<Card.Body>
						<Card.Title>{this.props.snack.name}</Card.Title>
						<Card.Text>{this.props.snack.description}</Card.Text>
						<Button onClick={() => this.props.deleteSnack(this.props.snack._id)}>Eat this snack!</Button>
					</Card.Body>
				</Card>
			);
		}
}

export default Snack;

// What needs to be passed down as props
// deleteSnack method
// App's state of the snack object

// Props:
	// deleteSnack
	// snack
	// From the child's perspective: this.props.<prop_name_here>