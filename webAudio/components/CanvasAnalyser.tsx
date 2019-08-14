import React from "react";
import { AudioContextContainer } from "./AudioContextProvider";

class AnalyserContainer {
    private _rendering = false;
    private bufferLength?: number;
    private dataArray?: Uint8Array;
    private animation?: number;
    private canvas?: HTMLCanvasElement;
    private analyser?: AnalyserNode;

    get rendering() {
        return this._rendering;
    }

    setRendering = (value: boolean) => {
        this._rendering = value;
        if (!this._rendering && this.bufferLength) {
            this.dataArray = new Uint8Array(this.bufferLength);
        }
    };

    public init = ({ canvas, analyser }: { canvas: HTMLCanvasElement; analyser: AnalyserNode }) => {
        this.canvas = canvas;
        this.analyser = analyser;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    };

    public draw = () => {
        if (this.analyser && this.canvas && this.dataArray && this.bufferLength) {
            this.animation = requestAnimationFrame(this.draw);
            const canvasCtx = this.canvas.getContext("2d")!;

            if (this._rendering) {
                this.analyser.getByteTimeDomainData(this.dataArray);
            }

            canvasCtx.fillStyle = "rgb(50, 50, 50)";
            canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            canvasCtx.lineWidth = 1;
            canvasCtx.strokeStyle = "rgb(250, 250, 250)";

            canvasCtx.beginPath();

            let x = 0;
            const sliceWidth = (this.canvas.width * 1.0) / this.bufferLength;

            for (let i = 0; i < this.bufferLength; i++) {
                const v = this.dataArray[i] / 128.0;
                const y = (v * this.canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
            canvasCtx.stroke();
        }
    };

    public dispose = () => {
        if (this.animation !== undefined) cancelAnimationFrame(this.animation);
    };
}

export const useTimeDomainAnalyser = () => {
    const audioCtx = React.useContext(AudioContextContainer);
    const canvasRef = React.createRef<HTMLCanvasElement>();
    const analyser = React.useMemo(() => audioCtx.createAnalyser(), []);
    const analyserContainer = React.useMemo(() => new AnalyserContainer(), []);
    const startAnalyser = React.useCallback(() => analyserContainer.setRendering(true), []);
    const stopAnalyser = React.useCallback(() => analyserContainer.setRendering(false), []);
    const AnalyserRenderer = React.memo(() => <canvas ref={canvasRef} />);

    React.useEffect(() => {
        if (canvasRef.current) {
            analyserContainer.init({ canvas: canvasRef.current, analyser });
            analyserContainer.draw();
        }
        return () => {
            analyserContainer.dispose();
        };
    }, []);

    return React.useMemo(() => ({ AnalyserRenderer, analyser, startAnalyser, stopAnalyser }), []);
};
