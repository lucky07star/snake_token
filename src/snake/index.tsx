
import { useRef, useEffect, useState } from 'react';
import Snake from './snake';

interface SnakePanelProps {
    snake?: Snake.Snake | undefined,
    milisecond?: number | undefined,
    callback?: (result: string) => void;
}

function SnakePanel({ snake, milisecond = 100, callback = (result: string) => { } }: SnakePanelProps) {
    let _cellSizeRef = useRef(10);
    let _cellCountXRef = useRef(50);
    const _cellCountY: number = 50;

    // reference of canvas and its parent
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasParentRef = useRef<HTMLDivElement>(null);

    // state
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [_snake, setSnake] = useState<Snake.Snake | undefined>(snake);
    const [eatenCoin, setEatenCoin] = useState<boolean>(false);

    useEffect(() => {
        // create a snake
        let snake = Snake.createSnake(52, 2, 30);
        let vectors = [];
        for (var i = 0; i < 52; i++) {
            if (i > 30) {
                vectors.push(2)
            } else if (i > 12) {
                vectors.push(3)
            } else {
                vectors.push(0)
            }
        }
        snake = Snake.setSnakeVectors(snake, vectors);
        setSnake(snake);

        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // resive event
        window.addEventListener('resize', handleResize);

        // timer for moving snake
        const interval = setInterval(() => {
            // define next position of snake
            const nextVector: number = 1;
            setSnake(Snake.move(snake, nextVector));

            // compare if snake take the coin (as default, coin position is (60, 30).)
            if (snake.x === (_cellCountXRef.current - 5) && snake.y === 30) {
                setEatenCoin(true);
            } else if ((snake.x <= 0 || snake.x >= _cellCountXRef.current) || (snake.y <= 0 || snake.y >= _cellCountY)) {
                callback('out');
            }

        }, milisecond);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasParent = canvasParentRef.current;

        if (canvas && canvasParent) {
            const { width, height } = canvasParent.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            // define cell size
            _cellSizeRef.current = Math.floor(height / _cellCountY);
            const cellSize = _cellSizeRef.current;
            _cellCountXRef.current = Math.floor(width / cellSize) + 1;

            const context = canvas.getContext('2d');
            if (context) {
                // Example: Clear canvas and draw a rectangle
                context.clearRect(0, 0, canvas.width, canvas.height);

                // render snake
                if (_snake) {
                    let index_x: number = _snake.x;
                    let index_y: number = _snake.y;

                    _snake.nodes.forEach(node => {
                        context.fillStyle = node.color;
                        if (node.index === 0) { // header
                            context.fillRect(index_x * cellSize - cellSize / 2 - 1, index_y * cellSize - cellSize / 2 - 1, cellSize * 2 - 2, cellSize * 2 - 2)
                            if (node.vector === 0) { // bottom
                                context.fillRect(index_x * cellSize - 1, index_y * cellSize - 1, cellSize - 2, cellSize * 1.8 - 2)
                            } else if (node.vector === 2) { // top
                                context.fillRect(index_x * cellSize - 1, index_y * cellSize - cellSize - 1, cellSize - 2, cellSize * 1.8 - 2)
                            } else if (node.vector === 3) { // left
                                context.fillRect(index_x * cellSize - cellSize - 1, index_y * cellSize - 1, cellSize * 1.8 - 2, cellSize - 2)
                            } else if (node.vector === 1) { // right
                                context.fillRect(index_x * cellSize - 1, index_y * cellSize - 1, cellSize * 2 - 1.8, cellSize - 2)
                            }
                        } else if (node.index === _snake.node_count - 1) { // tail
                            if (node.vector === 0) { // bottom
                                context.fillRect(index_x * cellSize - 1, index_y * cellSize + cellSize / 2 - 1, cellSize - 2, cellSize / 2 - 2)
                            } else if (node.vector === 2) { // top
                                context.fillRect(index_x * cellSize - 1, index_y * cellSize - 1, cellSize - 2, cellSize / 2 - 2)
                            } else if (node.vector === 3) { // left
                                context.fillRect(index_x * cellSize - 1, index_y * cellSize - 1, cellSize / 2 - 2, cellSize - 2)
                            } else if (node.vector === 1) { // right
                                context.fillRect(index_x * cellSize + cellSize / 2 - 1, index_y * cellSize - 1, cellSize / 2 - 2, cellSize - 2)
                            }
                        } else { // body
                            context.fillRect(index_x * cellSize - 1, index_y * cellSize - 1, cellSize - 2, cellSize - 2);
                        }

                        // change the position of next node
                        if (node.vector === 0) { // bottom
                            index_y--;
                        } else if (node.vector === 1) { // right
                            index_x--;
                        } else if (node.vector === 2) { // top
                            index_y++;
                        } else if (node.vector === 3) { // left
                            index_x++;
                        }
                    })
                }

                // render coin
                if (!eatenCoin) {
                    const img = new Image();
                    img.src = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="${cellSize * 2}" height="${cellSize * 2}" viewBox="0 0 198 200" fill="none">
                        <path d="M170.487 89.2915H161.971V97.8075H170.487V89.2915Z" fill="black"/>
                        <path d="M170.487 80.7751H161.971V89.2912H170.487V80.7751Z" fill="black"/>
                        <path d="M170.487 72.1753H161.971V80.6913H170.487V72.1753Z" fill="black"/>
                        <path d="M170.487 63.6592H161.971V72.1752H170.487V63.6592Z" fill="black"/>
                        <path d="M170.487 55.0586H161.971V63.6589H170.487V55.0586Z" fill="black"/>
                        <path d="M161.97 97.8918H153.37V106.492H161.97V97.8918Z" fill="black"/>
                        <path d="M161.97 89.2915H153.37V97.8075H161.97V89.2915Z" fill="#A9E000"/>
                        <path d="M161.97 80.7751H153.37V89.2912H161.97V80.7751Z" fill="#A9E000"/>
                        <path d="M161.97 72.1753H153.37V80.6913H161.97V72.1753Z" fill="#A9E000"/>
                        <path d="M161.97 63.6592H153.37V72.1752H161.97V63.6592Z" fill="#A9E000"/>
                        <path d="M161.97 55.0586H153.37V63.6589H161.97V55.0586Z" fill="#A9E000"/>
                        <path d="M161.97 46.543H153.37V55.059H161.97V46.543Z" fill="black"/>
                        <path d="M153.37 140.64H144.854V149.24H153.37V140.64Z" fill="black"/>
                        <path d="M153.37 132.125H144.854V140.641H153.37V132.125Z" fill="black"/>
                        <path d="M153.37 97.8918H144.854V106.492H153.37V97.8918Z" fill="black"/>
                        <path d="M153.37 89.2915H144.854V97.8075H153.37V89.2915Z" fill="#A9E000"/>
                        <path d="M153.37 80.7751H144.854V89.2912H153.37V80.7751Z" fill="#A9E000"/>
                        <path d="M153.37 72.1753H144.854V80.6913H153.37V72.1753Z" fill="black"/>
                        <path d="M153.37 63.6592H144.854V72.1752H153.37V63.6592Z" fill="black"/>
                        <path d="M153.37 55.0586H144.854V63.6589H153.37V55.0586Z" fill="#A9E000"/>
                        <path d="M153.37 46.543H144.854V55.059H153.37V46.543Z" fill="#A9E000"/>
                        <path d="M153.37 37.9424H144.854V46.4584H153.37V37.9424Z" fill="black"/>
                        <path d="M144.769 149.241H136.253V157.757H144.769V149.241Z" fill="black"/>
                        <path d="M144.769 140.64H136.253V149.24H144.769V140.64Z" fill="#A9E000"/>
                        <path d="M144.769 132.125H136.253V140.641H144.769V132.125Z" fill="#A9E000"/>
                        <path d="M144.769 123.524H136.253V132.04H144.769V123.524Z" fill="black"/>
                        <path d="M144.769 115.008H136.253V123.524H144.769V115.008Z" fill="black"/>
                        <path d="M144.769 106.408H136.253V114.924H144.769V106.408Z" fill="black"/>
                        <path d="M144.769 97.8918H136.253V106.492H144.769V97.8918Z" fill="black"/>
                        <path d="M144.769 89.2915H136.253V97.8075H144.769V89.2915Z" fill="#A9E000"/>
                        <path d="M144.769 80.7751H136.253V89.2912H144.769V80.7751Z" fill="#A9E000"/>
                        <path d="M144.769 72.1753H136.253V80.6913H144.769V72.1753Z" fill="#A9E000"/>
                        <path d="M144.769 63.6592H136.253V72.1752H144.769V63.6592Z" fill="#A9E000"/>
                        <path d="M144.769 55.0586H136.253V63.6589H144.769V55.0586Z" fill="#A9E000"/>
                        <path d="M144.769 46.543H136.253V55.059H144.769V46.543Z" fill="#A9E000"/>
                        <path d="M144.769 37.9424H136.253V46.4584H144.769V37.9424Z" fill="black"/>
                        <path d="M136.338 149.241H127.737V157.757H136.338V149.241Z" fill="black"/>
                        <path d="M136.338 140.64H127.737V149.24H136.338V140.64Z" fill="#A9E000"/>
                        <path d="M136.338 132.125H127.737V140.641H136.338V132.125Z" fill="#A9E000"/>
                        <path d="M136.338 123.524H127.737V132.04H136.338V123.524Z" fill="black"/>
                        <path d="M136.338 115.008H127.737V123.524H136.338V115.008Z" fill="#A9E000"/>
                        <path d="M136.338 106.408H127.737V114.924H136.338V106.408Z" fill="#A9E000"/>
                        <path d="M136.338 97.8918H127.737V106.492H136.338V97.8918Z" fill="black"/>
                        <path d="M136.338 89.2915H127.737V97.8075H136.338V89.2915Z" fill="#A9E000"/>
                        <path d="M136.338 80.7751H127.737V89.2912H136.338V80.7751Z" fill="#A9E000"/>
                        <path d="M136.338 72.1753H127.737V80.6913H136.338V72.1753Z" fill="#A9E000"/>
                        <path d="M136.338 63.6592H127.737V72.1752H136.338V63.6592Z" fill="#A9E000"/>
                        <path d="M136.338 55.0586H127.737V63.6589H136.338V55.0586Z" fill="#A9E000"/>
                        <path d="M136.338 46.543H127.737V55.059H136.338V46.543Z" fill="#A9E000"/>
                        <path d="M136.338 37.9424H127.737V46.4584H136.338V37.9424Z" fill="black"/>
                        <path d="M127.652 149.241H119.136V157.757H127.652V149.241Z" fill="black"/>
                        <path d="M127.652 140.64H119.136V149.24H127.652V140.64Z" fill="#A9E000"/>
                        <path d="M127.652 132.125H119.136V140.641H127.652V132.125Z" fill="#A9E000"/>
                        <path d="M127.652 123.524H119.136V132.04H127.652V123.524Z" fill="black"/>
                        <path d="M127.652 115.008H119.136V123.524H127.652V115.008Z" fill="#A9E000"/>
                        <path d="M127.652 106.408H119.136V114.924H127.652V106.408Z" fill="#A9E000"/>
                        <path d="M127.652 97.8918H119.136V106.492H127.652V97.8918Z" fill="black"/>
                        <path d="M127.652 89.2915H119.136V97.8075H127.652V89.2915Z" fill="#A9E000"/>
                        <path d="M127.652 80.7751H119.136V89.2912H127.652V80.7751Z" fill="#A9E000"/>
                        <path d="M127.652 72.1753H119.136V80.6913H127.652V72.1753Z" fill="#A9E000"/>
                        <path d="M127.652 63.6592H119.136V72.1752H127.652V63.6592Z" fill="#A9E000"/>
                        <path d="M127.652 55.0586H119.136V63.6589H127.652V55.0586Z" fill="#A9E000"/>
                        <path d="M127.652 46.543H119.136V55.059H127.652V46.543Z" fill="#A9E000"/>
                        <path d="M127.652 37.9424H119.136V46.4584H127.652V37.9424Z" fill="black"/>
                        <path d="M119.221 149.241H110.62V157.757H119.221V149.241Z" fill="black"/>
                        <path d="M119.221 140.64H110.62V149.24H119.221V140.64Z" fill="#A9E000"/>
                        <path d="M119.221 132.125H110.62V140.641H119.221V132.125Z" fill="#A9E000"/>
                        <path d="M119.221 123.524H110.62V132.04H119.221V123.524Z" fill="black"/>
                        <path d="M119.221 115.008H110.62V123.524H119.221V115.008Z" fill="#A9E000"/>
                        <path d="M119.221 106.408H110.62V114.924H119.221V106.408Z" fill="#A9E000"/>
                        <path d="M119.221 97.8918H110.62V106.492H119.221V97.8918Z" fill="black"/>
                        <path d="M119.221 89.2915H110.62V97.8075H119.221V89.2915Z" fill="#A9E000"/>
                        <path d="M119.221 80.7751H110.62V89.2912H119.221V80.7751Z" fill="#A9E000"/>
                        <path d="M119.221 72.1753H110.62V80.6913H119.221V72.1753Z" fill="black"/>
                        <path d="M119.221 63.6592H110.62V72.1752H119.221V63.6592Z" fill="black"/>
                        <path d="M119.221 55.0586H110.62V63.6589H119.221V55.0586Z" fill="#A9E000"/>
                        <path d="M119.221 46.543H110.62V55.059H119.221V46.543Z" fill="#A9E000"/>
                        <path d="M119.221 37.9424H110.62V46.4584H119.221V37.9424Z" fill="black"/>
                        <path d="M110.535 149.241H102.019V157.757H110.535V149.241Z" fill="black"/>
                        <path d="M110.535 140.64H102.019V149.24H110.535V140.64Z" fill="#A9E000"/>
                        <path d="M110.535 132.125H102.019V140.641H110.535V132.125Z" fill="#A9E000"/>
                        <path d="M110.535 123.524H102.019V132.04H110.535V123.524Z" fill="black"/>
                        <path d="M110.535 115.008H102.019V123.524H110.535V115.008Z" fill="#A9E000"/>
                        <path d="M110.535 106.408H102.019V114.924H110.535V106.408Z" fill="#A9E000"/>
                        <path d="M110.535 97.8918H102.019V106.492H110.535V97.8918Z" fill="black"/>
                        <path d="M110.535 89.2915H102.019V97.8075H110.535V89.2915Z" fill="#A9E000"/>
                        <path d="M110.535 80.7751H102.019V89.2912H110.535V80.7751Z" fill="#A9E000"/>
                        <path d="M110.535 72.1753H102.019V80.6913H110.535V72.1753Z" fill="#A9E000"/>
                        <path d="M110.535 63.6592H102.019V72.1752H110.535V63.6592Z" fill="#A9E000"/>
                        <path d="M110.535 55.0586H102.019V63.6589H110.535V55.0586Z" fill="#A9E000"/>
                        <path d="M110.535 46.543H102.019V55.059H110.535V46.543Z" fill="#A9E000"/>
                        <path d="M110.535 37.9424H102.019V46.4584H110.535V37.9424Z" fill="black"/>
                        <path d="M102.02 149.241H93.5038V157.757H102.02V149.241Z" fill="black"/>
                        <path d="M102.02 140.64H93.5038V149.24H102.02V140.64Z" fill="#A9E000"/>
                        <path d="M102.02 132.125H93.5038V140.641H102.02V132.125Z" fill="#A9E000"/>
                        <path d="M102.02 123.524H93.5038V132.04H102.02V123.524Z" fill="black"/>
                        <path d="M102.02 115.008H93.5038V123.524H102.02V115.008Z" fill="#A9E000"/>
                        <path d="M102.02 106.408H93.5038V114.924H102.02V106.408Z" fill="#A9E000"/>
                        <path d="M102.02 97.8918H93.5038V106.492H102.02V97.8918Z" fill="black"/>
                        <path d="M102.02 89.2915H93.5038V97.8075H102.02V89.2915Z" fill="black"/>
                        <path d="M102.02 80.7751H93.5038V89.2912H102.02V80.7751Z" fill="#A9E000"/>
                        <path d="M102.02 72.1753H93.5038V80.6913H102.02V72.1753Z" fill="#A9E000"/>
                        <path d="M102.02 63.6592H93.5038V72.1752H102.02V63.6592Z" fill="#A9E000"/>
                        <path d="M102.02 55.0586H93.5038V63.6589H102.02V55.0586Z" fill="black"/>
                        <path d="M102.02 46.543H93.5038V55.059H102.02V46.543Z" fill="black"/>
                        <path d="M93.503 149.241H84.9027V157.757H93.503V149.241Z" fill="black"/>
                        <path d="M93.503 140.64H84.9027V149.24H93.503V140.64Z" fill="#A9E000"/>
                        <path d="M93.503 132.125H84.9027V140.641H93.503V132.125Z" fill="#A9E000"/>
                        <path d="M93.503 123.524H84.9027V132.04H93.503V123.524Z" fill="black"/>
                        <path d="M93.503 115.008H84.9027V123.524H93.503V115.008Z" fill="#A9E000"/>
                        <path d="M93.503 106.408H84.9027V114.924H93.503V106.408Z" fill="#A9E000"/>
                        <path d="M93.503 97.8918H84.9027V106.492H93.503V97.8918Z" fill="black"/>
                        <path d="M93.503 80.7751H84.9027V89.2912H93.503V80.7751Z" fill="black"/>
                        <path d="M93.503 72.1753H84.9027V80.6913H93.503V72.1753Z" fill="black"/>
                        <path d="M93.503 63.6592H84.9027V72.1752H93.503V63.6592Z" fill="black"/>
                        <path d="M84.9031 149.241H76.3871V157.757H84.9031V149.241Z" fill="black"/>
                        <path d="M84.9031 140.64H76.3871V149.24H84.9031V140.64Z" fill="#A9E000"/>
                        <path d="M84.9031 132.125H76.3871V140.641H84.9031V132.125Z" fill="#A9E000"/>
                        <path d="M84.9031 123.524H76.3871V132.04H84.9031V123.524Z" fill="black"/>
                        <path d="M84.9031 115.008H76.3871V123.524H84.9031V115.008Z" fill="#A9E000"/>
                        <path d="M84.9031 106.408H76.3871V114.924H84.9031V106.408Z" fill="#A9E000"/>
                        <path d="M84.9031 97.8918H76.3871V106.492H84.9031V97.8918Z" fill="black"/>
                        <path d="M76.3888 149.241H67.7885V157.757H76.3888V149.241Z" fill="black"/>
                        <path d="M76.3888 140.64H67.7885V149.24H76.3888V140.64Z" fill="#A9E000"/>
                        <path d="M76.3888 132.125H67.7885V140.641H76.3888V132.125Z" fill="#A9E000"/>
                        <path d="M76.3888 123.524H67.7885V132.04H76.3888V123.524Z" fill="black"/>
                        <path d="M76.3888 115.008H67.7885V123.524H76.3888V115.008Z" fill="#A9E000"/>
                        <path d="M76.3888 106.408H67.7885V114.924H76.3888V106.408Z" fill="#A9E000"/>
                        <path d="M76.3888 97.8918H67.7885V106.492H76.3888V97.8918Z" fill="black"/>
                        <path d="M67.7864 149.241H59.2704V157.757H67.7864V149.241Z" fill="black"/>
                        <path d="M67.7864 140.64H59.2704V149.24H67.7864V140.64Z" fill="#A9E000"/>
                        <path d="M67.7864 132.125H59.2704V140.641H67.7864V132.125Z" fill="#A9E000"/>
                        <path d="M67.7864 123.524H59.2704V132.04H67.7864V123.524Z" fill="black"/>
                        <path d="M67.7864 115.008H59.2704V123.524H67.7864V115.008Z" fill="black"/>
                        <path d="M67.7864 106.408H59.2704V114.924H67.7864V106.408Z" fill="black"/>
                        <path d="M59.1878 149.241H50.6718V157.757H59.1878V149.241Z" fill="black"/>
                        <path d="M59.1878 140.64H50.6718V149.24H59.1878V140.64Z" fill="black"/>
                        <path d="M59.1878 132.125H50.6718V140.641H59.1878V132.125Z" fill="black"/>
                        <path d="M59.1878 123.524H50.6718V132.04H59.1878V123.524Z" fill="#A9E000"/>
                        <path d="M59.1878 115.008H50.6718V123.524H59.1878V115.008Z" fill="black"/>
                        <path d="M50.7565 149.241H42.1561V157.757H50.7565V149.241Z" fill="black"/>
                        <path d="M50.7565 140.64H42.1561V149.24H50.7565V140.64Z" fill="#A9E000"/>
                        <path d="M50.7565 132.125H42.1561V140.641H50.7565V132.125Z" fill="#A9E000"/>
                        <path d="M50.7565 123.524H42.1561V132.04H50.7565V123.524Z" fill="#A9E000"/>
                        <path d="M50.7565 115.008H42.1561V123.524H50.7565V115.008Z" fill="black"/>
                        <path d="M50.7565 106.408H42.1561V114.924H50.7565V106.408Z" fill="black"/>
                        <path d="M42.0711 140.64H33.5551V149.24H42.0711V140.64Z" fill="black"/>
                        <path d="M42.0711 132.125H33.5551V140.641H42.0711V132.125Z" fill="#A9E000"/>
                        <path d="M42.0711 123.524H33.5551V132.04H42.0711V123.524Z" fill="#A9E000"/>
                        <path d="M42.0711 115.008H33.5551V123.524H42.0711V115.008Z" fill="#A9E000"/>
                        <path d="M42.0711 106.408H33.5551V114.924H42.0711V106.408Z" fill="#A9E000"/>
                        <path d="M42.0711 97.8918H33.5551V106.492H42.0711V97.8918Z" fill="black"/>
                        <path d="M33.6398 132.125H25.0394V140.641H33.6398V132.125Z" fill="black"/>
                        <path d="M33.6398 123.524H25.0394V132.04H33.6398V123.524Z" fill="black"/>
                        <path d="M33.6398 115.008H25.0394V123.524H33.6398V115.008Z" fill="black"/>
                        <path d="M33.6398 106.408H25.0394V114.924H33.6398V106.408Z" fill="black"/>
                    </svg>`)}`; // Convert SVG string to base64
                    context.drawImage(img, (_cellCountXRef.current - 5) * cellSize - cellSize / 2, 30 * cellSize - cellSize / 2);
                }
            }
        }
    }, [size, _snake, eatenCoin]);

    return (
        <div className='w-100 h-100' ref={canvasParentRef}>
            <canvas ref={canvasRef}>Sorry, your browser doesn't support canvas.</canvas>
        </div>
    );
}

export default SnakePanel;
