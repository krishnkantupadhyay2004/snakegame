import { useState, useEffect, useRef } from "react";

function newboard() {
    let boxarray = new Array(400).fill(" ");
    let [snake, setSnake] = useState([0, 1, 2]);
    let [direction, setDirection] = useState("RIGHT");
    let [isGameRunning, setIsGameRunning] = useState(true);
    const snakeRef = useRef(snake);
    const directionRef = useRef(direction);

    // Keep refs updated
    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    // FIXED: Keyboard event listener
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                    setDirection("LEFT");
                    break;
                case "ArrowRight":
                    setDirection("RIGHT");
                    break;
                case "ArrowUp":
                    setDirection("UP");
                    break;
                case "ArrowDown":
                    setDirection("DOWN");
                    break;
                case " ": // Spacebar
                    setIsGameRunning(prev => !prev);
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        
        // Cleanup
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // FIXED: Movement logic with proper dependencies
    useEffect(() => {
        if (!isGameRunning) return;

        let id = setInterval(() => {
            setSnake(prevSnake => {
                const currentDirection = directionRef.current;
                
                // Check collision before moving
                if (!checkPosition(prevSnake, currentDirection)) {
                    setIsGameRunning(false);
                    return prevSnake;
                }

                let newSnake = [...prevSnake];
                let head = newSnake[newSnake.length - 1];
                let newHead;

                // FIXED: Complete movement logic for all directions
                switch(currentDirection) {
                    case "RIGHT":
                        newHead = head + 1;
                        break;
                    case "LEFT":
                        newHead = head - 1;
                        break;
                    case "DOWN":
                        newHead = head + 20;
                        break;
                    case "UP":
                        newHead = head - 20;
                        break;
                    default:
                        newHead = head + 1;
                }

                newSnake.push(newHead);
                newSnake.shift();
                return newSnake;
            });
        }, 200); // Made it faster for better gameplay

        return () => clearInterval(id);
    }, [isGameRunning]); // Added isGameRunning dependency

    // FIXED: Better collision detection
    function checkPosition(currentSnake, currentDirection) {
        let head = currentSnake[currentSnake.length - 1];
        let nextHead;

        switch(currentDirection) {
            case "RIGHT":
                nextHead = head + 1;
                // Check right wall (every 20th position)
                if (head % 20 === 19) return false;
                break;
            case "LEFT":
                nextHead = head - 1;
                // Check left wall
                if (head % 20 === 0) return false;
                break;
            case "DOWN":
                nextHead = head + 20;
                // Check bottom wall
                if (nextHead >= 400) return false;
                break;
            case "UP":
                nextHead = head - 20;
                // Check top wall
                if (nextHead < 0) return false;
                break;
            default:
                nextHead = head + 1;
        }

        // Check self collision
        if (currentSnake.includes(nextHead)) return false;

        return true;
    }

    return (
        <>
            <div className="border-2 border-red-500 mt-10">
                <div className="border-2 border-white-500 grid grid-cols-20 grid-rows-20 w-[400px] h-[400px]">
                    {boxarray.map((box, index) => {
                        let issnake = snake.includes(index);
                        return (
                            <span 
                                className={`border-1 border-grey-400 w-[20px] h-[20px] ${issnake ? "bg-green-500" : ""}`} 
                                key={index}
                            />
                        );
                    })}
                </div>
                <div className="mt-2 text-center">
                    <p>Use Arrow Keys to control • Spacebar to pause/resume</p>
                    <p>Game Status: {isGameRunning ? "Running" : "Paused"}</p>
                </div>
            </div>
        </>
    );
}

export default newboard;
