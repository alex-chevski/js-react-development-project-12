import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannels, fetchMessages, clearError, setCurrentChannel } from '../features/chat/chatSlice.jsx';
import ChannelsList from "../components/ChannelsList.jsx";
import MessagesList from "../components/MessagesList.jsx";

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
  // сообщения текущего канала
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  //получаем текущий канал
  const currentChannel = channels.find(channel => channel.id === currentChannelId);

  return (
    <div className="flex h-screen">
      {/* 📋 Левая колонка - список каналов */}
      <div className="w-1/4 border-r p-6 bg-gray-50">
        <ChannelsList
          channels={channels}
          currentChannelId={currentChannelId}
          onSelectChannel={(id) => dispatch(setCurrentChannel(id))}
        />
      </div>

      {/* 💬 Правая колонка - сообщения */}
      <div className="w-3/4 flex flex-col p-6">
        {/* Заголовок с именем канала */}
        {currentChannel && (
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              # {currentChannel.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {currentMessages.length} сообщений
            </p>
          </div>
        )}

        {/* Список сообщений */}
        <div className="flex-grow mb-6 overflow-y-auto">
          <MessagesList messages={currentMessages} />
        </div>

        {/* 📝 Форма для отправки сообщений (заглушка) */}
        <div className="mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Введите сообщение..."
              disabled
            />
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              disabled
            >
              Отправить
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Функция отправки сообщений будет добавлена позже
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
