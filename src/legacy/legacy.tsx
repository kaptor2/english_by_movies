import {observer} from 'mobx-react-lite';
import React from 'react';
import {Main} from './Main';
import {Auth} from './Auth';
import {useStore} from '../store/useStore';

export const Legacy = observer(() => {
  const store = useStore();

  if (store.employee.employee) {
    return <Main />;
  } else {
    return <Auth />;
  }
});
