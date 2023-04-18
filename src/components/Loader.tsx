import React from 'react';

const Loader = () => {
  return (
    <div
      className="position-fixed top-0 left-0 min-vh-100 min-vw-100 d-flex justify-content-center align-items-center"
      style={{ background: 'rgba(255, 255, 255, 0.5)' }}
    >
      It won't take long :)
    </div>
  );
};

export default Loader;
