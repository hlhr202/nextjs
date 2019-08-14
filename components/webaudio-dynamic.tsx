import React from "react";
import Button from "@material-ui/core/Button";
import { NextSFC } from "next";
import { useTimeDomainAnalyser } from "../webAudio/components/CanvasAnalyser";
import { AudioContextContainer } from "../webAudio/components/AudioContextProvider";
import { useOscillator } from "../webAudio/components/Oscillator";

const WebAudioRender: NextSFC = () => {
    const audioCtx = React.useContext(AudioContextContainer);
    const { oscillator, OscillatorRenderer } = useOscillator();
    const { analyser, AnalyserRenderer, startAnalyser, stopAnalyser } = useTimeDomainAnalyser();
    const [play, setPlay] = React.useState(false);
    const togglePlay = React.useCallback(() => setPlay(!play), [play]);
    React.useEffect(() => {
        oscillator.type = "sine";
        oscillator.connect(analyser);
        return () => {
            analyser.disconnect();
        };
    }, []);
    React.useEffect(() => {
        if (play) {
            analyser.connect(audioCtx.destination);
            startAnalyser();
        } else {
            analyser.disconnect();
            stopAnalyser();
        }
    }, [play]);
    return (
        <>
            <OscillatorRenderer />
            <AnalyserRenderer />
            <Button onClick={togglePlay}>{play ? "Pause" : "Play"}</Button>
        </>
    );
};

export default WebAudioRender;
