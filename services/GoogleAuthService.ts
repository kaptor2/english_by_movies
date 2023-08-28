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

export class GoogleAuthService {
  static accessToken: string | null = null;
  static userInfo: User | null = null;

  private static requestUserInfo = async () => {
    return await GoogleSignin.signIn();
  };

  private static requestPermissions = async () => {
    return await GoogleSignin.addScopes({
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
  };

  private static getToken = async () => {
    return (await GoogleSignin.getTokens()).accessToken;
  };

  static requestEmployee = async () => {
    try {
      this.userInfo = await this.requestUserInfo();

      try {
        this.userInfo = await this.requestPermissions();
      } catch {}

      this.accessToken = await this.getToken();

      return {...this.userInfo, accessToken: this.accessToken};
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
