import { createContext, useContext } from 'react';
import { render } from 'react-dom';
import Player from './components/PlayWindow';

const playerDOM = document.getElementById('player');
if (playerDOM !== null) render(<Player />, playerDOM);

interface ContextInterface {
  count: number;
}

const ContextCount = createContext({} as ContextInterface);

export const useCount = () => useContext(ContextCount);
