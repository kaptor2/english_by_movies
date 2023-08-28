import React from 'react';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {useStore} from '../store/useStore';

export const Auth = observer(() => {
  const store = useStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={store.employee.signIn}
        />
      </View>
    </View>
  );
});
