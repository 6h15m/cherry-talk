import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="" className="join-input" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="" className="join-input" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link>
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
