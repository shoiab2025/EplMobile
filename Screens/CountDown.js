import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const MyCountdown = ({ until, onFinish }) => {
    const [timeLeft, setTimeLeft] = useState(until);
    console.log(timeLeft);

    useEffect(() => {
        if (timeLeft <= 0) {
            onFinish();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                console.log("Time left is: ", prevTime - 1);
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onFinish]);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
    };

    return (
        <View>
            <Text>{formatTime(timeLeft)}</Text> {/* Corrected this line */}
        </View>
    );
};

export default MyCountdown;