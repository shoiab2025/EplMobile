import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

const Confetti = ({ config }) => {
    const canvasRef = useRef(null);
    const animationId = useRef(null);
    const confetti = useRef([]);
    const lastUpdated = useRef(Date.now());
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [svgElements, setSvgElements] = useState([]);


    const Utils = { // Utility functions (same as before)
        parsePx: (value) => parseFloat(value.replace(/px/, "")),
        getRandomInRange: (min, max, precision = 0) => { /* ... */ },
        getRandomItem: (array) => array[Math.floor(Math.random() * array.length)],
        getScaleFactor: () => Math.log(Dimensions.get('window').width) / Math.log(1920),
        debounce: (func, delay) => { /* ... */ },
    };

    const DEG_TO_RAD = Math.PI / 180;

    const defaultConfettiConfig = { // Default config (same as before)
        confettiesNumber: 250,
        confettiRadius: 6,
        confettiColors: [ /* ... */ ],
        emojies: [],
        svgIcon: null,
    };

    class ConfettiParticle {
        constructor({ initialPosition, direction, radius, colors, emojis, svgIcon }) {
            // ... (Initialization logic - same as before)
        }

        draw(context, scale) {
            const { x, y } = this.position;
            const { x: radiusX, y: radiusY } = this.radius;

            if (this.svgIcon) {
                // SVG Icon (Not implemented in this full example - you'd need to adapt this)
            } else if (this.color) {
                return (<Circle
                    cx={x * scale}
                    cy={y * scale}
                    r={radiusX * scale}
                    fill={this.color}
                />);
            } else if (this.emoji) {
                // Emoji (Not implemented in this full example - you'd likely use a Text component positioned absolutely)
            }
        }

        updatePosition(deltaTime, currentTime) {
            // ... (Update position logic - same as before)
        }

        isVisible(canvasHeight) {
            return this.position.y < canvasHeight + 100;
        }
    }

    useEffect(() => {
        const resizeCanvas = () => {
            setCanvasSize({
                width: Dimensions.get('window').width * window.devicePixelRatio,
                height: Dimensions.get('window').height * window.devicePixelRatio
            });
        };

        const debouncedResize = Utils.debounce(resizeCanvas, 200);
        Dimensions.addEventListener('change', debouncedResize);
        resizeCanvas();

        return () => {
            Dimensions.removeEventListener('change', debouncedResize);
            cancelAnimationFrame(animationId.current);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d'); // Not used with react-native-svg but needed for ConfettiParticle

        const loop = () => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastUpdated.current;
            lastUpdated.current = currentTime;

            confetti.current = confetti.current.filter((item) => {
                item.updatePosition(deltaTime, currentTime);
                return item.isVisible(Dimensions.get('window').height);
            });

            const scale = window.devicePixelRatio; // Or use Dimensions.get('window').scale if available

            setSvgElements(confetti.current.map((confettiItem) => (
                <G key={confettiItem.createdAt}>
                    {confettiItem.draw(context, scale)}
                </G>
            )));

            animationId.current = requestAnimationFrame(loop);
        };

        loop();

        return () => cancelAnimationFrame(animationId.current);
    }, [canvasSize, confetti.current]);

    const addConfetti = (conf = {}) => {
        const { confettiesNumber, confettiRadius, confettiColors, emojies, svgIcon } = {
            ...defaultConfettiConfig,
            ...conf,
        };

        const baseY = (5 * Dimensions.get('window').height) / 7;

        for (let i = 0; i < confettiesNumber / 2; i++) {
            confetti.current.push(new ConfettiParticle({
                initialPosition: { x: 0, y: baseY },
                direction: "right",
                radius: confettiRadius,
                colors: confettiColors,
                emojis: emojies,
                svgIcon,
            }));
            confetti.current.push(new ConfettiParticle({
                initialPosition: { x: Dimensions.get('window').width, y: baseY },
                direction: "left",
                radius: confettiRadius,
                colors: confettiColors,
                emojis: emojies,
                svgIcon,
            }));
        }
    };

    const resetAndStart = (conf = {}) => {
        confetti.current = [];
        addConfetti(conf);
    };

    return (
        <View style={styles.container}>
            <Svg
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height}
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000, pointerEvents: 'none' }}
            >
                {svgElements}
            </Svg>
            <Button title="Show Again" onPress={() => addConfetti()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Confetti;