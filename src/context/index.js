import React from 'react';

export const ProfileContext = React.createContext({
    email: 'qing.luo@accenture.com',
    EID: 'qing.luo',
    changeEmail: () => {},
    changeEID: () => {}
})