import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, SignUpRequest, SignInRequest } from '@/types/auth';
import { authService } from '@/lib/auth/service';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (request: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(request);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Sign up failed');
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (request: SignInRequest, { rejectWithValue }) => {
    try {
      const response = await authService.signIn(request);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Sign in failed');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    return authService.getCurrentUser();
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
