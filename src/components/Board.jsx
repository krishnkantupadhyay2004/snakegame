import { useState, useEffect, useRef } from "react";
import Getfood from "../Getfood";



function Board() {

    let boxarray = new Array(400).fill(" ");
    let [snake, setSnake] = useState([0, 1, 2]);
    let [direction, setDirection] = useState("RIGHT");
    let [food, setFood] = useState(150);
    let [gameover,setGameover] = useState(false);
    let [gamerunning, setGamerunning] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighscore] = useState(0);
    const [level, setlevel] = useState(1);


    const snakeRef = useRef(snake);
    const directionRef = useRef(direction);
    const foodRef = useRef(food);
    const scoreRef = useRef(score);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        foodRef.current = food;
    }, [food]);


    useEffect(() => {
        directionRef.current = direction;
        console.log("direction", directionRef.current);
    }, [direction]);

    useEffect(() => {
        //    console.log("snakeref",snakeRef.current);
        //    console.log("snake",snake);
        snakeRef.current = snake;
        let head = snakeRef.current[snakeRef.current.length - 1];
        let body = snakeRef.current.slice(0, -1); // all except head

        if (body.includes(head)) {

            // setSnake([0, 1, 2]);
            setGameover(true);
            setGamerunning(false);
            setScore(0);
            setlevel(1);

        }

    }, [snake]);



    useEffect(() => {
        if (!gamerunning) return;
        let id = setInterval(() => {

            let check = checkboundary();
            if (check) {
                setGameover(true);
                clearInterval(id);
                setGamerunning(false);
                setScore(0);
                setlevel(1);
                return;
            }


            setSnake(prevSnake => {

                if (directionRef.current === "UP") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] - 20);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {

                        let random = Math.floor(Math.random() * 400);
                        while (newsnake.includes(random)) {
                            random = Math.floor(Math.random() * 400);
                        }
                        setFood(random);
                        let newscore;
                        setScore((score) => {
                            newscore = score + 10;
                            setHighscore((hs) => {
                                if (newscore > hs) {
                                    return newscore;
                                } else {
                                    return hs;
                                }
                            })
                            return newscore;
                        });



                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }
                if (directionRef.current === "DOWN") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] + 20);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {

                        let random = Math.floor(Math.random() * 400);
                        while (newsnake.includes(random)) {
                            random = Math.floor(Math.random() * 400);
                        }
                        setFood(random);
                        let newscore;
                        setScore((score) => {
                            newscore = score + 10;
                            setHighscore((hs) => {
                                if (newscore > hs) {
                                    return newscore;
                                } else {
                                    return hs;
                                }

                            })
                            setlevel((level) => {
                                if (newscore % 50 === 0) {
                                    return level + 1;
                                }
                                return level;
                            })
                            return newscore;
                        });
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }
                if (directionRef.current === "LEFT") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] - 1);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {
                        let random = Math.floor(Math.random() * 400);
                        while (newsnake.includes(random)) {
                            random = Math.floor(Math.random() * 400);
                        }
                        setFood(random);
                        let newscore;
                        setScore((score) => {
                            newscore = score + 10;
                            setHighscore((hs) => {
                                if (newscore > hs) {
                                    return newscore;
                                } else {
                                    return hs;
                                }
                            })
                            setlevel((level) => {
                                if (newscore % 50 === 0) {
                                    return level + 1;
                                }
                                return level;
                            })
                            return newscore;
                        });
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }
                if (directionRef.current === "RIGHT") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] + 1);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {
                        let random = Math.floor(Math.random() * 400);
                        while (newsnake.includes(random)) {
                            random = Math.floor(Math.random() * 400);
                        }
                        setFood(random);
                        let newscore;
                        setScore((score) => {
                            newscore = score + 10;
                            setHighscore((hs) => {
                                if (newscore > hs) {
                                    return newscore;
                                } else {
                                    return hs;
                                }
                            })
                            setlevel((level) => {
                                if (newscore % 50 === 0) {
                                    return level + 1;
                                }
                                return level;
                            })
                            return newscore;
                        });
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }

                return prevSnake;


            });


        }, 200)
        return () => clearInterval(id);
    }, [gamerunning]);

    useEffect(() => {
        let handlelistner = (event) => {
            console.log(event);
            switch (event.key) {
                case "ArrowUp":
                    if (directionRef.current !== "DOWN") setDirection("UP");
                    break;
                case "ArrowDown":
                    if (directionRef.current !== "UP") setDirection("DOWN");
                    break;
                case "ArrowLeft":
                    if (directionRef.current !== "RIGHT") setDirection("LEFT");
                    break;
                case "ArrowRight":
                    if (directionRef.current !== "LEFT") setDirection("RIGHT");
                    break;
                case " ":
                    alert("game paused");
                    break;
            }

        }




        document.addEventListener("keydown", handlelistner);

        return () => document.removeEventListener("keydown", handlelistner);
    }, [])







    function checkboundary() {
        let head = snakeRef.current[snakeRef.current.length - 1];
        console.log("head", head);
        if (head % 20 === 19 && directionRef.current === "RIGHT") return true;
        if (head % 20 === 0 && directionRef.current === "LEFT") return true;
        if (head < 0) return true;
        if (head > 399) return true;

        return false;
    }





    return (
        <>
            <div className="  flex flex-row justify-center items-center  ">
                <div className=" w-screen flex flex-col justify-center items-center gap-2">
                    <h2 className="font-semibold text-[30px]">Snake Game!</h2>
                     
                     <h2 className="text-red-500 font-bold text-[20px]">{gameover ? "Game over!" : ""}</h2>
                    <div className="  flex flex-col sm:flex-row justify-center items-center gap-5 w-full sm:w-[600px]">
                         <div className="font-semibold   flex flex-col items-center justify-evenly gap-1">
                            <h3 className="font-semibold">High Score : {highScore}</h3>
                            <h2>Score : {scoreRef.current}</h2>
                            <h3>Level : {level}</h3>
                            <button onClick={() => setGamerunning(!gamerunning)} className="bg-zinc-300 p-1 rounded-xl hover:bg-zinc-400 cursor-pointer">{gamerunning ? "Pause Game" : "Start Game"}</button>
                            <button onClick={() => {
                                setSnake([0, 1, 2]);
                                setFood(150);
                                setDirection("RIGHT");
                                setScore(0);
                                setlevel(1);
                                setGamerunning(true);
                            }}
                                className="bg-zinc-300 p-1 rounded-xl hover:bg-zinc-400 cursor-pointer cursor-pointer">Restart Game</button>



                        </div>
                        <div className=" border border-white grid grid-cols-20 grid-rows-20 w-[80vmin] sm:w-[400px] h-[70vmin] sm:h-[400px] ">


                            {
                                boxarray.map((box, index) => {
                                    let issnake = snake.includes(index);



                                    return (
                                        <span className={` ${issnake ? "bg-green-500" : ""} `} key={index}>
                                            <div className={`${index == food ? " bg-red-500 rounded-full" : " "} w-full h-full`}></div>
                                        </span>
                                    )
                                })



                            }

                        </div>
                       
                    </div>

                    <h2 className="hidden sm:block">Controls</h2>
                </div>

            </div>
        </>
    )
}

export default Board;