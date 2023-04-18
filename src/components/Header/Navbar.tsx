import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { logOut } from '../../redux/reducers/authReducer';

const Navbar = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">
          <h3>MyNotes</h3>
        </Link>
        <div className="d-flex" role="search">
          {token ? (
            <button className="btn btn-danger" onClick={logOutUser}>
              LogOut
            </button>
          ) : (
            <Link to="/login" className="btn btn-danger" type="submit">
              Login / SignUp
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
