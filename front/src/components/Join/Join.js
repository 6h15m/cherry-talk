import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <img alt="Cherry Talk" src="./img/title.png" />
        <div>
          <input
            placeholder="닉네임 입력"
            className="join-input"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="방 이름 입력"
            className="join-input"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button" type="submit">
            방 입장
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
