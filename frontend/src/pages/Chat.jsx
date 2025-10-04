import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels, fetchMessages, clearError } from '../features/chat/chatSlice.jsx';

const Chat = () => {
  const dispatch = useDispatch();

  const { channels, messages, currentChannelId, status, error } = useSelector((state) => state.chat);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchChannels());
      dispatch(fetchMessages());
    }
  }, [dispatch, token]);

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <span className="ms-2">Загрузка чата...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="alert alert-danger m-3" role="alert">
        Ошибка: {error}
        <button
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={() => dispatch(clearError())}
        >
          Закрыть
        </button>
      </div>
    )
  }

  // успешное выполненение
}

export default Chat;
