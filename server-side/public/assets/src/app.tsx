import React, { createContext, useState, useContext, ReactNode } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Socket from './components/Socket';
import PlayerName from './components/PlayerName';

const headerDOM = document.getElementById('header');
if (headerDOM !== null) render(<Header />, headerDOM);

const footerDOM = document.getElementById('footer');
if (footerDOM !== null) render(<Footer />, footerDOM);

const socketDOM = document.getElementById('socket');
if (socketDOM !== null) render(<Socket />, socketDOM);

const playerNameDOM = document.getElementById('playerName');
if (playerNameDOM !== null) render(<PlayerName />, playerNameDOM);

interface ContextInterface {
  count: number;
}

const ContextCount = createContext({} as ContextInterface);

export const useCount = () => useContext(ContextCount);