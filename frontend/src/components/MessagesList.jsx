import React from 'react';

const MessagesList = ({ messages }) => {
  if (messages.length === 0) {
    return <p className="text-muted"></p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-start space-x-3">
            {/* Аватар пользователя */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {message.username?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className="flex-1 min-w-0">
              {/* Заголовок с именем и временем */}
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="font-semibold text-gray-800 text-sm">
                  {message.username}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Текст сообщения */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {message.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

export default MessagesList;
