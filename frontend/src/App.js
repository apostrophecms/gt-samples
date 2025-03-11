import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [ body, setBody ] = useState(null);

  useEffect(() => {
    fetchPage();
    async function fetchPage() {
      // You may also want the query string, just a basic example
      const url = `/cms${window.location.pathname}?aposRefresh=1`;
      const response = await fetch(url);
      setBody(await response.text());
    }
  }, []);

  // Has no dependencies (intended to run after each render)
  useEffect(() => {
    if (body) {
      // Run ApostropheCMS widget players
      window.apos.util.runPlayers();
      // Update the title tag after the new content is in the DOM
      const title = document.querySelector('[data-page-title]').getAttribute('data-page-title');
      document.querySelector('title').innerText = title;
    }
  });

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
