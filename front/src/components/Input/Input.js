import './Input.scss';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="메세지 입력"
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <button className="send-button" onClick={(e) => sendMessage(e)}>
      <img className="send-img" src="img/logo_small.png" alt="send button" />
    </button>
  </form>
);

export default Input;
