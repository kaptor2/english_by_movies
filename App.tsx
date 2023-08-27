import React from 'react';
import {View, Button} from 'react-native';

import {OAuthService} from './services/OAuthService';
import {GoogleDriveService} from './services/GoogleDriveService';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const App = () => {
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
          onPress={OAuthService.signIn}
        />
        <Button
          title="check google drive"
          onPress={() =>
            GoogleDriveService.connect(OAuthService.accessToken).then(
              GoogleDriveService.checkAndCreateAppField,
            )
          }
        />
      </View>
    </View>
  );
};

export default App;
