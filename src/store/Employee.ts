import {action, computed, makeObservable, observable} from 'mobx';
import {GoogleAuthService} from '../../services/GoogleAuthService';
import {MmkvStorageService} from '../../services/MmkvStorageService';

type EmployeeType = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
} | null;

type StoreType = {
  employee: EmployeeType;
  accessToken: string | null;
};

const LOCAL_STORAGE_KEY = 'Employee';

export class Employee {
  private localStorage = new MmkvStorageService<StoreType>(LOCAL_STORAGE_KEY);

  constructor() {
    const store = this.localStorage.get(LOCAL_STORAGE_KEY);

    if (store) {
      this.store = store;
    } else {
      this.localStorage.set(LOCAL_STORAGE_KEY, this.store);
    }

    makeObservable(this);
  }

  @computed get accessToken() {
    return this.store.accessToken;
  }

  @computed get employee() {
    return this.store.employee;
  }

  @observable
  private store: StoreType = {
    accessToken: null,
    employee: null,
  };

  @action.bound
  private setStore(store: StoreType) {
    this.localStorage.set(LOCAL_STORAGE_KEY, store);

    this.store = store;
  }

  @action.bound
  async signIn() {
    const response = await GoogleAuthService.requestEmployee();

    if (response) {
      const {accessToken, user} = response;

      this.setStore({accessToken, employee: user ?? null});
    }
  }
}
