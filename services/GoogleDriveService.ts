import {
  GDrive,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper';

const ROOT_FIELD_NAME = 'ENGLISH_BY_MOVES';

export class GoogleDriveService {
  static gdrive = new GDrive();
  static appFieldMeta: any = null;

  static connect = async (accessToken: string | null) => {
    try {
      if (accessToken) {
        this.gdrive.accessToken = accessToken;
        this.gdrive.fetchCoercesTypes = true;
        this.gdrive.fetchRejectsOnHttpErrors = true;
        this.gdrive.fetchTimeout = 3000;
        this.gdrive.permissions.fetchCoercesTypes;
      } else {
        throw new Error('now authorize');
      }
    } catch (error) {
      console.log(error);
    }
  };

  static checkAndCreateAppField = async () => {
    this.appFieldMeta = await this.getAppFolder();

    if (!this.appFieldMeta) {
      this.appFieldMeta = await this.createNewAppField();
    }
  };

  private static getAppFolder = async () => {
    return (
      await this.gdrive.files.list({
        q: `mimeType = '${MimeTypes.FOLDER}' and name = '${ROOT_FIELD_NAME}'`,
      })
    )?.files?.[0];
  };

  private static createNewAppField = async () => {
    const folder = await this.gdrive.files
      .newMetadataOnlyUploader()
      .setRequestBody({
        name: ROOT_FIELD_NAME,
        mimeType: MimeTypes.FOLDER,
      })
      .execute();

    return folder;
  };
}
