import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './App.module.scss';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import useUserMounting from '../../hooks/userMounting';
import { isDataLoadedSelector } from '../../redux/modules/tracklist/selectors';
import { loadingSelector } from '../../redux/modules/session/selectors';

interface AppProps {
  oauthConfirm?: boolean,
  children?: React.ReactNode
}

export const App: React.FC<AppProps> = ({ oauthConfirm, children }: AppProps) => {
  const [isRulesAccept, setRulesAccept] = useState(false);
  const isDataLoaded = useSelector(isDataLoadedSelector);
  const loading = useSelector(loadingSelector);
  useUserMounting(oauthConfirm);

  return (
    <div className={style.app}>
      <main className={style.content}>
        { loading && <Loader /> }
        { isDataLoaded && (
        <>
          {isRulesAccept ? children : (
            <div className={style.container}>
              <p>
                NOTE: It is list of your saved track&apos;s in 30 second
                preview (MP3 format). Unfortunately, can be null.
                Also the search is limited with 50 items.
              </p>
              <Button onClick={() => setRulesAccept(true)} title="Ok" />
            </div>
          )}
        </>
        )}
      </main>
    </div>
  );
};

App.defaultProps = {
  oauthConfirm: false,
  children: React.Fragment,
};

export default App;
