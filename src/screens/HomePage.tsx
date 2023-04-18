import React, { useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllNotes } from '../redux/reducers/notesReducer';
import { useAppDispatch } from '../redux/hooks';
import { deleteNoteById } from '../redux/reducers/deleteNoteReducer';
import Loader from '../components/Loader';

const HomePage = () => {
  const { notes, state, error } = useSelector(
    (state: RootState) => state.notes
  );
  const { state: deleteNoteState, error: deleteNoteError } = useSelector(
    (state: RootState) => state.deleteNote
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllNotes());
  }, [deleteNoteState, dispatch]);

  const deleteNote = (id: string) => {
    dispatch(deleteNoteById(id));
  };

  if (state === 'loading') {
    return (
      <div className="container pt-5 min-vw-100 d-flex justify-content-center align-items-center fs-2">
        Loading
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="row">
          <div className="col-md-12 py-4">
            <div className="welcome-card border rounded p-3 mb-3">
              <h1 className="fw-bold">
                Welcome ! {user?.fullName ? user.fullName : 'N/A'}
              </h1>
            </div>
            <div className="notes-container">
              <div className="container-header d-flex justify-content-between align-items-center">
                <h2 className="mb-3">Stored Notes</h2>
                <Link to="/addnote" className="btn btn-primary">
                  Add Note
                </Link>
              </div>
              <div className="row ">
                {error || deleteNoteError ? (
                  <p className="fs-3 fw-bold">
                    {error}
                    {deleteNoteError}
                  </p>
                ) : notes.length === 0 ? (
                  <h3>No Notes to show</h3>
                ) : (
                  notes.map((note) => (
                    <div className="col-md-4 col-12 mb-3" key={note.id}>
                      <NoteCard
                        title={note.title}
                        description={note.description}
                        id={note.id}
                        deleteNote={deleteNote}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
