import React from 'react';
import style from './Loader.module.scss';

const Loader: React.FC<object> = () => (
  <div className={style.loader}>
    <span />
    <span />
    <span />
  </div>
);

export default Loader;
