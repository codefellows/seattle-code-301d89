import React from "react";
// NEW
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery:'',
      location: {},
      error: false,
      errorMessage: '',
    }
  }

  getLocation = async () => {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const res = await axios.get(API);
      console.log(res.data[0])
      this.setState({ location:res.data[0] });
    } catch (error) {
      console.log(error)
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
    }

  }

  render() {
    return(
      <>
        <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button>
        {this.state.location.place_id && 
          <>
            <h2>The city is: {this.state.location.display_name}</h2>
            <h2>The lat is: {this.state.location.lat}</h2>
            <h2>The lon is: {this.state.location.lon}</h2>
          </>
        }
        {this.state.error && 
          <h2>Oh no! {this.state.errorMessage}</h2>
        }
      </>
    )
  }
}

// https://locationiq.com/docs-html/index.html#static-maps
// https://maps.locationiq.com/v3/staticmap?key=76a8dfbd6f55bf&center=47.6038321,-122.3300624&zoom=13

export default App;