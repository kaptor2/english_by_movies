import {Employee} from './Employee';

const store = {
  employee: new Employee(),
};

export const useStore = () => store;
