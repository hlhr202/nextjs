import { NextSFC } from "next";
import React, { createRef, useEffect } from "react";
import Engine from "../render/main";

const Dynamic: NextSFC = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    useEffect(() => {
        if (canvasRef.current) {
            const engine = new Engine(canvasRef.current);
            engine.init();
        }
    }, []);
    return <canvas style={{ height: 800, width: 800 }} ref={canvasRef} />;
};

export default Dynamic;
