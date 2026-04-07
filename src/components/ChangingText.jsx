import { useState, useEffect } from "react";
import BlurText from "./BlurText";

const words = ["Beginner Friendly", "OPEN SOURCE", "Simple Syntax", "Fun Commands"];

export default function ChangingText() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setFade(true);
            }, 300);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <h1
            className="reveal-text"
            style={{
                opacity: fade ? 1 : 0,
                transition: "opacity 0.2s ease",
                textShadow:" 0 0px 40px rgba(255, 0, 0, 0.26)"
                
            }}
        >
            <BlurText
                text={words[index]}
                delay={200}
                animateBy="words"
                direction="bottom"
                className="text-2xl mb-8"
            />

        </h1>
    );
}