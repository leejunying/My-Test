import logo from "./logo.svg";
import "./App.css";
import CenteredTree from "./Components/tree";
import List from "./Components/listuser";

import { UsersProvider } from "./Context/Globalstate";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

function App() {
  return (
    <UsersProvider>
      {" "}
      <div className="App">
        <div style={styles}>
          <List></List>
        </div>
      </div>
    </UsersProvider>
  );
}

export default App;
