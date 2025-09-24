import { useState, useEffect, useRef } from "react";
import Getfood from "../Getfood";



function Board() {

    let boxarray = new Array(400).fill(" ");
    let [snake, setSnake] = useState([0, 1, 2]);
    let [direction, setDirection] = useState("RIGHT");
    let [food, setFood] = useState(150);
    let [snakelength, setSnakelength] = useState(3);

    const snakeRef = useRef(snake);
    const directionRef = useRef(direction);
    const foodRef = useRef(food);

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
            alert("Game Over - You hit yourself!");
        }

    }, [snake]);



    useEffect(() => {
        let id = setInterval(() => {

            let check = checkboundary();
            if (check) {
                alert("game over");
                clearInterval(id);
                return;
            }


            setSnake(prevSnake => {

                if (directionRef.current === "UP") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] - 20);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {
                    
                        setFood(Math.floor(Math.random() * 400));
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }
                if (directionRef.current === "DOWN") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] + 20);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {
                 
                        setFood(Math.floor(Math.random() * 400));
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }
                if (directionRef.current === "LEFT") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] - 1);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {
                        setFood(Math.floor(Math.random() * 400));
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }
                if (directionRef.current === "RIGHT") {
                    let newsnake = [...prevSnake];
                    newsnake.push(newsnake[newsnake.length - 1] + 1);

                    if (newsnake[newsnake.length - 1] === foodRef.current) {
                        setFood(Math.floor(Math.random() * 400));
                    } else {
                        newsnake.shift();
                    }
                    return newsnake;
                }

                return prevSnake;


            });


        }, 200)
        return () => clearInterval(id);
    }, [])

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
            <div className="border-2 border-red-500 mt-10">
                <div className="border-2 border-white-500 grid grid-cols-20 grid-rows-20 w-[400px] h-[400px] ">
                    {
                        boxarray.map((box, index) => {
                            let issnake = snake.includes(index);



                            return (
                                <span className={` z-10 w-[20px] h-[20px] ${issnake ? "bg-green-500" : ""} `} key={index}>
                                    <div className={`${index == food ? "bg-red-500" : " "} z-1 w-[17px] h-[17px] rounded-full`}></div>
                                </span>
                            )
                        })



                    }

                </div>
            </div>
        </>
    )
}

export default Board;