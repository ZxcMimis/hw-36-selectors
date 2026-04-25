import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user');
let user = null;

try {
  user = savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
} catch (error) {
  user = null;
}

const initialState = {
  user: user,
  isLoggedIn: !!user,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;