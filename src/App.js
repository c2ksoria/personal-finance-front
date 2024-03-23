import logo from './logo.svg';
import './App.css';
const app_port = process.env.REACT_APP_PORT
console.log(app_port)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h4>
          {app_port}
        </h4>
      </header>
    </div>
  );
}

export default App;
