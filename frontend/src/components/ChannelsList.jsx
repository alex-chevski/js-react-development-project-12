import React from 'react';

const ChannelsList = ({ channels, currentChannelId, onSelectChannel }) => {
  return (
    <div className="channels-list">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Каналы</h3>
      {channels.length === 0 ? (
        <p className="text-gray-500 text-sm">Нет каналов</p>
      ) : (
        <div className="space-y-2">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${channel.id === currentChannelId
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              onClick={() => onSelectChannel(channel.id)}
            >
              <div className="flex items-center">
                <span className="font-medium"># {channel.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelsList;
