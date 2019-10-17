import { LOGIN, LOGOUT } from '../constants/constants';

export const signIn = (payload) => ({type: LOGIN, payload });
export const signOut = (payload) => ({type: LOGOUT, payload });