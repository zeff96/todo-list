/* eslint-disable no-unused-vars */
import './index.css';
import './components/app.js';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));