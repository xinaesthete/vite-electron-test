import React from 'react';
import ReactDOM from 'react-dom';
import {io} from 'socket.io-client';
// import QR from 'react-qr-code'
import QR from 'qrcode.react';
import Test from '/@/TestComponent';
import './App.css';

function App() {
  const [message, setMessage] = React.useState('not connected');
  const [url, setURL] = React.useState('http://localhost:8101');
  const [count, setCount] = React.useState(0);
  const incrementCount = () => {
    console.log('increment ' + count);
    setCount(c => c+1);
  };
  React.useEffect(()=>{
    const ws = io('http://localhost:8101');
    incrementCount();
    ws.on('connect', () => {
      incrementCount();
      setMessage('connected');
    });
    ws.on('set url', (newUrl: string) => {
      setURL(newUrl);
    });
    setTimeout(async()=>{
      incrementCount();
      const res = await fetch('http://localhost:8101/ping');
      setMessage(await res.text());
    }, 2500);
  }, []);
  return (
    <div className="App">
    <h1>Hello World. {message}. How nice that you 
    remembered {count}, after everything that's happened.</h1>
    <QR value={url} />
    <Test />
    </div>
  );
}

export default function main() {
  ReactDOM.render(
      <React.StrictMode><App /></React.StrictMode>
  , document.getElementById('app'));
}
