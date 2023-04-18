import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../../helpers/AxiosInstance';
import { NoteFormProps } from '../../interfaces/FormValues';

interface Note {
  title: string;
  description: string;
  user: string;
  id: string;
}

interface InitialState {
  note: Note | null;
  state: 'idle' | 'loading' | 'succeeded' | 'rejected';
  error: string | undefined;
}

const initialState: InitialState = {
  note: null,
  state: 'idle',
  error: '',
};

export const createNote = createAsyncThunk(
  'notes/createNote',
  async (noteForm: NoteFormProps) => {
    try {
      const response = await AxiosInstance.post('/notes', noteForm);
      return response.data as Note;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

const createNoteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNoteReset: (state) => {
      state.error = '';
      state.note = null;
      state.state = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.state = 'loading';
        state.error = '';
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.note = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.state = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { createNoteReset } = createNoteSlice.actions;

export default createNoteSlice.reducer;
