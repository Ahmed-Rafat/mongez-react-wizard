import React from 'react';
import BaseTimeAgo from 'react-timeago';

// in your react component

interface TimeAgoProps {
    timestamp?: number;
    date?: string | Date;
    [key: string]: any;
}

export default function TimeAgo(props: TimeAgoProps) {
    let { date, timestamp } = props;

    if (timestamp && !date) {
        date = new Date(timestamp * 1000);
    }

    return <BaseTimeAgo date={date} />;
}