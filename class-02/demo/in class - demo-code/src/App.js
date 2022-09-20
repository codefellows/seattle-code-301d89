import React from "react";
import Beast from "./components/Beast.js";

// copy the imports!
import "bootstrap/dist/css/bootstrap.min.css";

// import data.json
import data from "./assets/data.json";



class App extends React.Component {
  render() {
    return (
      <>
        {/* <Beast src={data[0].imgUrl} description={data[0].description}/> */}
        {data.map((beast, index) => {
          return <Beast src={beast.imgUrl} description={beast.description} key={index}/>
        })}
      </>
    );
  }
}

export default App;
