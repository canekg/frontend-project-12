import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelsList = ({
  channels, currentChannelId, handleChannelClick, handleRemoveChannel, handleRenameChannel,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          {channel.removable ? (
            <div role="group" className="d-flex dropdown btn-group">
              <Button
                className="w-100 rounded-0 text-start text-truncate "
                variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                onClick={() => handleChannelClick(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown>
                <Dropdown.Toggle
                  id={`dropdownToggle_${channel.id}`}
                  type="button"
                  aria-expanded="false"
                  className="flex-grow-0 dropdown-toggle dropdown-toggle-split "
                  variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                >
                  <span className="visually-hidden">{t('dropdown.control')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('dropdown.remove')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('dropdown.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Button
              className="w-100 rounded-0 text-start"
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
              onClick={() => handleChannelClick(channel.id)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
        </li>
      ))}
    </>
  );
};

export default ChannelsList;
