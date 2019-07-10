import React from "react";
import { AudioContextContainer } from "./AudioContextProvider";

export const useTimeDomainAnalyser = () => {
    const audioCtx = React.useContext(AudioContextContainer);
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const analyser = React.useMemo(() => audioCtx.createAnalyser(), [audioCtx]);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = React.useMemo(() => new Uint8Array(bufferLength), [bufferLength]);
    const draw = React.useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            requestAnimationFrame(draw);
            const canvasCtx = canvas.getContext("2d")!;

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = "rgb(200, 200, 200)";
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = "rgb(0, 0, 0)";

            canvasCtx.beginPath();

            var sliceWidth = (canvas.width * 1.0) / bufferLength;
            var x = 0;

            for (var i = 0; i < bufferLength; i++) {
                var v = dataArray[i] / 128.0;
                var y = (v * canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        }
    }, [canvasRef]);
    const AnalyserCanvas = React.memo(() => <canvas ref={canvasRef} />);
    React.useEffect(() => {
        if (canvasRef.current) {
            draw();
        }
    }, [canvasRef.current]);
    return React.useMemo(() => ({ AnalyserCanvas, analyser }), []);
};
