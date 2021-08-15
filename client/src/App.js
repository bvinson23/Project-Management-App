import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onLoginStatusChange } from './modules/authManager';
import { Spinner } from 'reactstrap';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // The "isLoggedIn" state variable will be null until
  // the app's connection to firebase has been established.
  // The bit will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is Logged in or not just show a spinner
    return <Spinner className="app-spinner dark"/>;
  }

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </Router>
    </div>
  );
}

export default App;