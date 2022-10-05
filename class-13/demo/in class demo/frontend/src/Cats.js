import { Component } from "react";
import UpdateCatForm from './UpdateCatForm';

class Cats extends Component {
  render() {
    const cats = this.props.cats.map((cat, index) => {
			return(
				<>
					<Cat 
						cat={cat} 
						key={cat._id} 
						handleDelete={this.props.handleDelete} 
						index={index} 
						updateCats={this.props.updateCats} 
					/>
				</>
			);
		});
    return (
		<>
			{cats}
		</>
		);
  }
}

class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
			showUpdateForm: false,
		};
  }
  render() {
    return (
      <>
        <p key={this.props.key}>
          {this.props.cat.name} is a {this.props.cat.color}
        </p>
        <button onClick={() => this.props.handleDelete(this.props.cat)} key={this.props.index}>
          Delete Cat?
        </button>
				<button onClick={() => this.setState({ showUpdateForm: true })} key={this.props.index}>
          Update Cat?
        </button>
				
				{ this.state.showUpdateForm && <UpdateCatForm cat={this.props.cat} updateCats={this.props.updateCats}/> }
      </>
    );
  }
}

export default Cats;
