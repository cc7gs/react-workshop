import React from 'react'
import ReactDOM from 'react-dom'
const Pet = ({ name, animal, breed }) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed)
  ]);
};
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt me"),
    React.createElement(Pet, { name: "Luna", animal: "dog", breed: "Havanes" }),
    React.createElement(Pet, { name: "Pepper", animal: "Bird", breed: "ha" })
  ]);
};
ReactDOM.render(React.createElement(App), document.getElementById("root"));
