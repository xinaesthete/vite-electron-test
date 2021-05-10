import React from 'react';
import ReactDOM from 'react-dom';
import {io} from 'socket.io-client';
// import QR from 'react-qr-code'
import QR from 'qrcode.react';
import Test from '/@/TestComponent';
import m from '@common/model';
import {htmlPort, apiPort} from '@common/network';
import './App.css';

function App() {
  const [message, setMessage] = React.useState('not connected');
  const [url, setURL] = React.useState(`http://${globalThis.location.hostname}`);
  const [count, setCount] = React.useState(0);
  const incrementCount = () => {
    console.log('increment ' + count);
    setCount(c => c+1);
  };
  React.useEffect(()=>{
    const api = `${url}:${apiPort}`;
    const ws = io(api);
    incrementCount();
    ws.on('connect', () => {
      incrementCount();
      setMessage('connected');
    });
    ws.on('set url', (newUrl: string) => {
      setURL(`http://${newUrl}`);
      console.log(newUrl);
    });
    setTimeout(async()=>{
      incrementCount();
      const res = await fetch(api + '/ping');
      setMessage(await res.text());
    }, 2500);
  }, []);
  return (
    <div className="App">
    <h1>{m}. {message}. How nice that you 
    remembered {count}, after everything that's happened.</h1>
    <p><a href={url}>{url}</a> {globalThis.location.host}</p>
    <QR value={`${url}:${htmlPort}`} size={240} />
    <Test />
    </div>
  );
}

export default function main() {
  ReactDOM.render(
      <React.StrictMode><App /></React.StrictMode>
  , document.getElementById('app'));
}
