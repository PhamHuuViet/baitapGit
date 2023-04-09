import configureStore from '@reduxjs/toolkit';
import authSlice, {
  login,
  logout,
  selectIsLoggedIn,
  selectIsLoggingIn,
} from './authSlice';

describe('authSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice.reducer,
      },
    });
  });

  it('should have initial state', () => {
    const initialState = store.getState().auth;
    expect(initialState.isLoggedIn).toBe(false);
    expect(initialState.isLoggingIn).toBe(false);
  });

  describe('login', () => {
    it('should set isLoggedIn to true and isLoggingIn to false on success', async () => {
      await store.dispatch(login({ username: 'testuser', password: 'testpass' }));
      const state = store.getState().auth;
      expect(state.isLoggedIn).toBe(true);
      expect(state.isLoggingIn).toBe(false);
    });

    it('should set isLoggingIn to true on start', () => {
      store.dispatch(login({ username: 'testuser', password: 'testpass' }));
      const state = store.getState().auth;
      expect(state.isLoggingIn).toBe(true);
    });

    it('should set isLoggingIn to false on failure', async () => {
      await store.dispatch(login({ username: 'wronguser', password: 'wrongpass' }));
      const state = store.getState().auth;
      expect(state.isLoggingIn).toBe(false);
    });
  });

  describe('logout', () => {
    it('should set isLoggedIn to false on success', async () => {
      await store.dispatch(login({ username: 'testuser', password: 'testpass' }));
      await store.dispatch(logout());
      const state = store.getState().auth;
      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe('selectors', () => {
    it('selectIsLoggedIn should return the isLoggedIn state', () => {
      const isLoggedIn = selectIsLoggedIn(store.getState());
      expect(isLoggedIn).toBe(false);
    });

    it('selectIsLoggingIn should return the isLoggingIn state', () => {
      const isLoggingIn = selectIsLoggingIn(store.getState());
      expect(isLoggingIn).toBe(false);
    });
  });
});
