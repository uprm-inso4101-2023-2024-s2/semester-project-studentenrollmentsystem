import logo from './logo.svg';
import './App.css';
import StudentPage from './pages/studentPage';

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
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Look at student page:
        </a>
      </header>
    </div>
  );
}

export default StudentPage;
