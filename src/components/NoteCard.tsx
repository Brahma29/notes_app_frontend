import React from 'react';
import { Link } from 'react-router-dom';

interface NoteCardProps {
  title: string;
  description: string;
  id: string;
  deleteNote: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  description,
  id,
  deleteNote,
}) => {
  return (
    <div className="note-card rounded border p-3">
      <div className="card-body">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="card-footer d-flex pt-3 justify-content-end border-top">
        <Link to={`/edit/${id}`} className="btn btn-primary btn-sm">
          Edit
        </Link>
        <button
          className="ms-2 btn btn-danger btn-sm"
          onClick={() => deleteNote(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
