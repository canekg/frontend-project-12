const getChannelsInfo = (state) => state.channelsInfo;

const getExistingChannels = (state) => state.channelsInfo.channels.map((channel) => channel.name);

const getOldNameChannel = (state) => state.channelsInfo.channels.find((channel) => channel.id === state.modal.extra.channalId)?.name || '';

export { getChannelsInfo, getExistingChannels, getOldNameChannel };
