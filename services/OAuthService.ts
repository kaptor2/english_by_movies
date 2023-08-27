import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// https://console.cloud.google.com/apis/credentials/oauthclient/169771787827-pfpuu8e5t729qrntcb7bmsprc4ev0deb.apps.googleusercontent.com?project=english-397111
GoogleSignin.configure({
  iosClientId:
    '169771787827-pfpuu8e5t729qrntcb7bmsprc4ev0deb.apps.googleusercontent.com',
});

export class OAuthService {
  static accessToken: string | null = null;
  static userInfo: User | null = null;

  static signIn = async () => {
    try {
      let userInfo = await GoogleSignin.signIn();

      try {
        const response = await GoogleSignin.addScopes({
          scopes: ['https://www.googleapis.com/auth/drive'],
        });
        if (response) {
          userInfo = response;
        }
      } catch {}

      this.accessToken = (await GoogleSignin.getTokens()).accessToken;
      this.userInfo = userInfo;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.error('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.error('play services not available or outdated');
      } else {
        console.error('some other error happened');
      }
    }
  };
}
