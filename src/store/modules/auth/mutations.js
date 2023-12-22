import {
    SET_AUTO_LOGOUT_MUTATION,
    SET_USER_TOKEN_DATA_MUTATION,
    LOADING_SPINNER_SHOW_MUTATION
} from '@/store/storeconstants';

export default {
    [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
        state.email = payload.email;
        state.token = payload.token;
        state.expiresIn = payload.expiresIn;
        state.refreshToken = payload.refreshToken;
        state.userId = payload.userId;
        state.autoLogout = false;
    },

    [SET_AUTO_LOGOUT_MUTATION](state) {
        state.autoLogout = true;
    },

     [LOADING_SPINNER_SHOW_MUTATION] (state, show) {
    state.loading = show
  }
};
    // [IS_USER_AUTHENTICATE_GETTER]: (state) => {
    //     if (!state.token) return false; // No token present
      
    //     const now = Date.now(); // Current time in milliseconds
    //     const expiresIn = state.expiresIn * 1000; // Convert expiration from seconds to milliseconds
    //     const expiryDate = state.issuedAt + expiresIn; // Calculate token expiry date
      
    //     return now < expiryDate; // Check if token is still valid
    //   },
      
