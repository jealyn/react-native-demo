import types from '../types';
import { createAction } from 'redux-actions';

export const incrementAction = createAction(types.INCREMENT);
export const decrementAction = createAction(types.DECREMENT);
export const logoutAction = createAction(types.LOGOUT);
