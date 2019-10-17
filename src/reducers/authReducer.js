export default function authReducer(state = {  isAuth: false }, action) {
  const payload = action.payload;
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuth: (payload.username === 'admin' && payload.password === 'admin')
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuth: false
      };
    default:
      return state;
  }
}