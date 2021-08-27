import './Participants.scss';

const Participants = ({ users }) => (
  <div className="participants">
    {users ? (
      <div>
        <h2 className="mt-3">참여자 ({users.length})</h2>
        <div className="active-container">
          <h3>
            {users.map(({ name }) => (
              <div key={name} className="mb-1">
                <img className="name-img" alt="circle" src="./img/circle_green.png" />
                {name}
              </div>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default Participants;
