import { authReducer, initialAuthState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('AuthReducer', () => {

  it('should store tokens on loginSuccess', () => {
    const action = AuthActions.loginSuccess({
      access: 'access-token',
      refresh: 'refresh-token',
    });

    const state = authReducer(initialAuthState, action);

    expect(state.access).toBe('access-token');
    expect(state.refresh).toBe('refresh-token');
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should store error on loginFailure', () => {
    const action = AuthActions.loginFailure({
      error: 'Invalid credentials',
    });

    const state = authReducer(initialAuthState, action);

    expect(state.error).toBe('Invalid credentials');
    expect(state.loading).toBeFalse();
  });

  it('should reset state on logout', () => {
    const loggedState = {
      access: 'token',
      refresh: 'refresh',
      loading: false,
      error: null,
    };

    const action = AuthActions.logout();

    const state = authReducer(loggedState, action);

    expect(state).toEqual(initialAuthState);
  });

});
