const getExistingChannels = (state) => state.channelsInfo.channels.map((channel) => channel.name);
export default getExistingChannels;
