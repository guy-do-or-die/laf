import { useState, useEffect } from 'react';

const messages = [
    "making lost things found",
    "bringing people together",
    "creating happy endings",
    "turning loss into hope",
    "spreading kindness",
    "raising chances",
    "building trust"
];

export default function Logo() {
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-shrink-0 w-48 md:w-80">
            <a href="/" className="hover:text-blue-600 transition-colors block">
                <h1 className="text-lg md:text-2xl font-bold">
                    <span className="inline-block">LAF is...</span>
                </h1>
                <p 
                    key={currentMessage}
                    className="text-base text-sm md:text-lg text-pink-500 font-medium transition-all duration-500 ease-in-out transform hover:scale-105 mt-1 leading-tight min-h-[24px] md:min-h-[28px]"
                >
                    {messages[currentMessage]}
                </p>
            </a>
        </div>
    );
}
