import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'Compose',
        path: '/compose',
        icon: <AiIcons.AiOutlinePlus />,
        cname: 'nav-text'
    },
    {
        title: 'Scheduled',
        path: '/scheduled',
        icon: <AiIcons.AiOutlineInbox />,
        cname: 'nav-text'
    },
    {
        title: 'Sent',
        path: '/sent',
        icon: <AiIcons.AiOutlineSend />,
        cname: 'nav-text'
    }
]