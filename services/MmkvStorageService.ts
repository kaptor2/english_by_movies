import {MMKV} from 'react-native-mmkv';

export interface IMmkvStorageService<SchemeType extends object> {
  get(key: string): SchemeType | undefined;
  has(key: string): boolean;
  set(key: string, value: SchemeType): void;
  keys(): string[];
  values(): SchemeType[];
  delete(key: string): void;
  clearAll(): void;
  entries(): Array<[string, SchemeType]>;
  size: number;
}

export class MmkvStorageService<SchemeType extends object>
  implements IMmkvStorageService<SchemeType>
{
  private storage: MMKV;

  constructor(storageName: string) {
    this.storage = new MMKV({id: storageName});
  }

  get size(): number {
    return this.keys().length;
  }

  entries(): Array<[string, SchemeType]> {
    return this.keys().map(key => [key, this.get(key)!]);
  }

  get(key: string): SchemeType | undefined {
    const stringValue = this.storage.getString(key);

    if (stringValue) {
      return JSON.parse(stringValue) as SchemeType;
    }
  }

  has(key: string): boolean {
    return !!this.storage.getString(key);
  }

  set(key: string, value: SchemeType): void {
    const stringValue = JSON.stringify(value);

    this.storage.set(key, stringValue);
  }

  keys(): string[] {
    return this.storage.getAllKeys();
  }

  values(): SchemeType[] {
    return this.storage.getAllKeys().map(key => {
      return this.get(key)!;
    });
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  clearAll(): void {
    this.storage.clearAll();
  }
}
