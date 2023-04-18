import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NoteFormProps } from '../interfaces/FormValues';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getNoteById } from '../redux/reducers/singleNoteReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateNote } from '../redux/reducers/updateNoteReducer';
import { createNote } from '../redux/reducers/createNoteReducer';
import { createNoteReset } from '../redux/reducers/createNoteReducer';
import { updateNoteReset } from '../redux/reducers/updateNoteReducer';

//Note Form Validation Schema
const noteFormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  description: Yup.string().required('Description is required.'),
});

//Initial Values for the Notes Form
var initialValues: NoteFormProps = {
  title: '',
  description: '',
};

const NoteFormScreen = () => {
  const dispatch = useAppDispatch();
  const { state, note } = useSelector((state: RootState) => state.singleNote);
  const { state: createNoteState } = useSelector(
    (state: RootState) => state.createNote
  );

  const { state: updateNoteState } = useSelector(
    (state: RootState) => state.updateNote
  );

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getNoteById(id));
    } else {
      initialValues.title = '';
      initialValues.description = '';
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (updateNoteState === 'succeeded') {
      navigate('/');
      dispatch(updateNoteReset());
    }
    if (createNoteState === 'succeeded') {
      navigate('/');
      dispatch(createNoteReset());
    }
  }, [updateNoteState, createNoteState, navigate, dispatch]);

  // useEffect(() => {
  //   if (note) {
  //     initialValues.title = note?.title;
  //     initialValues.description = note?.description;
  //   }
  // }, [note]);

  //Loading

  if (state === 'loading') {
    return (
      <div className="container pt-5 min-vw-100 d-flex justify-content-center align-items-center fs-2">
        Loading
      </div>
    );
  }

  const handleSubmit = (values: NoteFormProps) => {
    if (id) {
      dispatch(updateNote({ id, updatedNote: values }));
    } else {
      dispatch(createNote(values));
    }
  };

  return (
    <div className="container">
      <div className="col-md-4 col-12 mx-auto">
        <h1 className="mt-5 mb-4">
          {id ? 'Update your note' : 'Add New Note'}
        </h1>
        <Formik
          initialValues={id && note ? note : initialValues}
          validationSchema={noteFormSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group mb-2">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                className="form-control"
                name="title"
                id="title"
                placeholder="Enter title"
              />
              <div className="text-danger">
                <ErrorMessage name="title" />
              </div>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="description">Description</label>
              <Field
                type="textarea"
                className="form-control"
                id="description"
                name="description"
                rows={3}
                placeholder="Enter description"
              ></Field>
              <div className="text-danger">
                <ErrorMessage name="description" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              {id ? 'Update' : 'Add Note'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default NoteFormScreen;
