import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ── Fake API (simulates network delay) ──────────────────────────────────────
const FAKE_USERS = {
  1: { id: 1, name: "Alice Chen",    email: "alice@example.com",   role: "Admin",     joined: "Jan 2022", posts: 142 },
  2: { id: 2, name: "Bob Okafor",   email: "bob@example.com",     role: "Member",    joined: "Mar 2022", posts: 87  },
  3: { id: 3, name: "Carol Mendes", email: "carol@example.com",   role: "Moderator", joined: "Jun 2023", posts: 210 },
  4: { id: 4, name: "David Kim",    email: "david@example.com",   role: "Member",    joined: "Sep 2023", posts: 34  },
};

function fakeApiFetch(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = FAKE_USERS[userId];
      if (user) resolve(user);
      else reject(new Error(`User #${userId} not found`));
    }, 900); // simulate ~900ms network latency
  });
}

// ── createAsyncThunk ─────────────────────────────────────────────────────────
// First arg  : action type prefix  → generates pending / fulfilled / rejected
// Second arg : async "payload creator" — do your API call here
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fakeApiFetch(userId);
      return data; // becomes action.payload in fulfilled
    } catch (err) {
      // rejectWithValue lets you control the rejected payload
      return rejectWithValue(err.message);
    }
  }
);

// ── Slice ────────────────────────────────────────────────────────────────────
const userSlice = createSlice({
  name: "user",
  initialState: {
    data:   null,            // fetched user object
    status: "idle",          // "idle" | "loading" | "succeeded" | "failed"
    error:  null,
  },
  reducers: {
    clearUser(state) {
      state.data   = null;
      state.status = "idle";
      state.error  = null;
    },
  },
  // extraReducers handles actions created OUTSIDE this slice (i.e. the thunk)
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
        state.data   = null;
        state.error  = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data   = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload; // the value from rejectWithValue()
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
