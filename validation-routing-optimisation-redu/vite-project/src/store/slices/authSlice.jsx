import { createSlice } from "@reduxjs/toolkit";

// Fake user database for practice
const USERS = {
  alice: { id: 1, name: "Alice Chen",  email: "alice@example.com", role: "Admin"  },
  bob:   { id: 2, name: "Bob Okafor", email: "bob@example.com",   role: "Member" },
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,         // null = logged out
    error: null,
  },
  reducers: {
    // Payload: { username, password }
    // In a real app this would be an async thunk hitting an API.
    // Here we keep it synchronous so you can focus on the Redux mechanics.
    login(state, action) {
      const { username } = action.payload;
      const found = USERS[username.toLowerCase()];
      if (found) {
        state.user  = found;
        state.error = null;
      } else {
        state.error = `No user "${username}". Try alice or bob.`;
      }
    },
    logout(state) {
      state.user  = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
