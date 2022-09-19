// imports!
import React from 'react'; // checks in node_modules
import './App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

// extends
class App extends React.Component {
  render() {

    // What's JSX?
    // Technically JavaScript but LOOKS like HTML
    return(
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}

// export it
export default App;