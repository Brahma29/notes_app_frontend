import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../redux/store';
import AxiosInstance from '../../helpers/AxiosInstance';
import { SignUpValues } from '../../interfaces/FormValues';

interface InitialState {
  token: string | null;
  user: User | null;
  state: 'idle' | 'loading' | 'failed';
}

interface User {
  fullName: string | null;
  email: string | null;
  id: string | null;
}

const initialState: InitialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  state: 'idle',
};

export const loginUser = createAsyncThunk(
  'userLogin',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await AxiosInstance.post('/auth/login', {
      email,
      password,
    });
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'createuser',
  async (user: SignUpValues) => {
    const { data } = await AxiosInstance.post('/auth/signup', user);
    return data;
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
    builder.addCase(loginUser.rejected, (state) => {
      state.state = 'failed';
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
    builder.addCase(registerUser.rejected, (state) => {
      state.state = 'failed';
    });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
