import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react'
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import axios from 'axios'

function App() {

  // for user permission to show notification
  async function requestPermission() {

    const permission = await Notification.requestPermission()

    if (permission == 'granted') {
      // Generate Token
      // messaging
      let vapKey = {
        vapidKey:'BBq1PgT_IY9bA1PLbH7I2vBU200LInBJCgnmrL-zvu01uv_iuXzwXIfXNMTyeZ5nyOMweVNZWVJVa8UTdPMzEEA'
      }
      const token = await getToken(messaging,vapKey)
      
      let tokenFinal = {
        token:token
      }
      const url = "http://localhost:5000/web-push"
     const response = await axios.post(url, tokenFinal)
     console.log('response api call =>',response)
    //  .then((res) => {
    //     console.log('Response after api call', res)
    // }).catch((err) => {
    //     console.log('Post Req error ==>>', err)
    // })

      console.log('Token Generated =>',token)
    } else if (permission == 'denied') {
      alert('You denied for the notification')
    }

  }

  useEffect(() => {
    requestPermission()
  }, [])


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
      </header>
    </div>
  );
}

export default App;
