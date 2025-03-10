import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [ body, setBody ] = useState(null);

  useEffect(() => {
    fetchPage();
    async function fetchPage() {
      // You may also want the query string, just a basic example
      const url = `/cms${window.location.pathname}`;
      console.log('-->', url);
      const response = await fetch(url);
      setBody(await response.text());
    }
  }, []);

  // Bare bones example, error handling is a good idea
  return (
    <div className="App">
      { body
        ?
        <div dangerouslySetInnerHTML={{__html: body}} />
        :
        <p>Loading...</p>
      }
    </div>
  );
}

export default App;
