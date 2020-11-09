import React from 'react';
import Header from '../../components/Header';
import Tracklist from './Tracklist';

export const Home: React.FC<object> = () => (
  <>
    <Header withSearch />
    <Tracklist />
  </>
);

export default Home;
