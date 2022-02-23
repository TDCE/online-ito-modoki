import { render } from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Socket from './components/Socket';

const headerDOM = document.getElementById('header');
if (headerDOM !== null) render(<Header />, headerDOM);

const footerDOM = document.getElementById('footer');
if (footerDOM !== null) render(<Footer />, footerDOM);

const socketDOM = document.getElementById('socket');
if (socketDOM !== null) render(<Socket />, socketDOM);
