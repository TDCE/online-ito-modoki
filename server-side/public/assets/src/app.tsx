import { createContext, useContext } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Player from './components/PlayWindow';

const headerDOM = document.getElementById('header');
if (headerDOM !== null) render(<Header />, headerDOM);

const footerDOM = document.getElementById('footer');
if (footerDOM !== null) render(<Footer />, footerDOM);

const playerDOM = document.getElementById('player');
if (playerDOM !== null) render(<Player />, playerDOM);

interface ContextInterface {
  count: number;
}

const ContextCount = createContext({} as ContextInterface);

export const useCount = () => useContext(ContextCount);
