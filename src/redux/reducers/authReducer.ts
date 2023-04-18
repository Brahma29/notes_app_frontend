import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../redux/store';
import AxiosInstance from '../../helpers/AxiosInstance';
import { SignUpValues } from '../../interfaces/FormValues';

interface InitialState {
  token: string | null;
  user: User | null;
  state: 'idle' | 'loading' | 'failed';
  error: string | undefined;
}

interface User {
  fullName: string | null;
  email: string | null;
  id: string | null;
}

const initialState: InitialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  error: '',
  state: 'idle',
};

export const loginUser = createAsyncThunk(
  'userLogin',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await AxiosInstance.post('/auth/login', {
        email,
        password,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'createuser',
  async (user: SignUpValues) => {
    try {
      const { data } = await AxiosInstance.post('/auth/signup', user);
      return data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.state = 'loading';
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.state = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.state = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.state = 'loading';
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.state = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.state = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { logOut, resetError } = authSlice.actions;

export default authSlice.reducer;
