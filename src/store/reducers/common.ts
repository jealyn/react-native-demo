import { handleActions } from 'redux-actions';
import * as navigation from '../../router/navigation';
import { removeStorage } from '../../utils/storage';
import types from '../types';

interface commonState {
  num: number;
}

// 初始状态
const initialState: commonState = {
  num: 0,
};

export default handleActions(
  {
    [types.DECREMENT](state) {
      return {
        ...state,
        num: state.num - 1,
      };
    },
    [types.INCREMENT](state) {
      return {
        ...state,
        num: state.num + 1,
      };
    },
    [types.LOGOUT](state) {
      removeStorage('token');
      navigation.navigate('Login');
      return state;
    },
  },
  initialState
);
