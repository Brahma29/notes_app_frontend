import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../redux/store';
import AxiosInstance from '../../helpers/AxiosInstance';

interface CreatedAt {
  seconds: number;
}

interface Note {
  title: string;
  description: string;
  user: string;
  id: string;
  createdAt: CreatedAt;
}

interface InitialState {
  notes: Note[];
  state: 'idle' | 'loading' | 'rejected';
  error: string | undefined;
}

const initialState: InitialState = {
  notes: [],
  state: 'idle',
  error: '',
};

//Get All Notes
export const getAllNotes = createAsyncThunk('notes/getAllNotes', async () => {
  try {
    const { data } = await AxiosInstance.get('/notes');
    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
});

const notesSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.pending, (state) => {
      state.state = 'loading';
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.state = 'idle';
      state.notes = action.payload;
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      state.state = 'rejected';
      state.error = action.error.message;
    });
  },
});

export default notesSlice.reducer;
