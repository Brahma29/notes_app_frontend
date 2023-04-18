import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface Props {
  children: JSX.Element;
}

const ProtectedScreen = ({ children }: Props) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token === null) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [token, navigate]);
  if (loading) {
    return (
      <div className="container mx-auto min-vh-100 d-flex justify-content-center align-items-center fs-1">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedScreen;
