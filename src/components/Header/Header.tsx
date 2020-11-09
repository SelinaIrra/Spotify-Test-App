import React from 'react';
import { useSelector } from 'react-redux';
import Search from './Search';
import user from '../../style/media/user.png';
import style from './Header.module.scss';
import { usernameSelector } from '../../redux/modules/session/selectors';

interface HeaderProps {
  withSearch: boolean
}

const Header: React.FC<HeaderProps> = ({ withSearch }: HeaderProps) => {
  const userName = useSelector(usernameSelector);
  return (
    <header className={style.header}>
      <h1>Medusa</h1>
      { withSearch && <Search /> }
      <div className={style.user_name}>
        <img alt="user" src={user} />
        <p>{userName}</p>
      </div>
    </header>
  );
};

export default Header;
