import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../redux/reducers/authReducer';
import notesReducer from '../redux/reducers/notesReducer';
import createNoteReducer from './reducers/createNoteReducer';
import singleNoteReducer from './reducers/singleNoteReducer';
import deleteNoteReducer from './reducers/deleteNoteReducer';
import updateNoteReducer from './reducers/updateNoteReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    createNote: createNoteReducer,
    singleNote: singleNoteReducer,
    updateNote: updateNoteReducer,
    deleteNote: deleteNoteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
