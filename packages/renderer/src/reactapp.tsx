import React from 'react'
import ReactDOM from 'react-dom'
import {io} from 'socket.io-client'

function App() {
  const [message, setMessage] = React.useState('not connected');
  React.useEffect(()=>{
    const ws = io('http://localhost:8101');
    ws.on('connect', () => {
      setMessage('connected');
    })
  }, []);
  return (
    <h1>Hello World. {message}. How nice.</h1>
  )
}

export default function main() {
  ReactDOM.render(
    <App /> as React.ReactElement<any>
  , document.getElementById('app'));
}
