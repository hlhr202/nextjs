import TrendingUp from "@material-ui/icons/TrendingUp";
import TrendingDown from "@material-ui/icons/TrendingDown";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Oscillator } from "../webAudio/osc";
import { NextSFC } from "next";
import { useTimeDomainAnalyser } from "../webAudio/components/CanvasAnalyser";
import { AudioContextContainer } from "../webAudio/components/AudioContextProvider";

const WebAudioRender: NextSFC = () => {
    const audioCtx = React.useContext(AudioContextContainer);
    const oscillator = React.useMemo(() => new Oscillator(audioCtx), []);
    const [play, setPlay] = React.useState(false);
    const [frequency, setFrequency] = React.useState(440);
    const togglePlay = React.useCallback(() => setPlay(!play), [play]);
    const handleChange = React.useCallback((_: React.ChangeEvent<{}>, value: number | number[]) => {
        if (typeof value === "number") setFrequency(value);
    }, []);
    const { AnalyserCanvas, analyser } = useTimeDomainAnalyser();
    React.useEffect(() => {
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }, [frequency]);
    React.useEffect(() => {
        oscillator.type = "sine";
        oscillator.start();
        analyser.connect(audioCtx.destination);
    }, []);
    React.useEffect(() => {
        if (play) {
            oscillator.connect(analyser);
        } else if (oscillator.isConnected) {
            oscillator.disconnect();
        }
    }, [play]);
    return (
        <>
            <Typography id="continuous-slider" gutterBottom>
                Volume
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <TrendingDown />
                </Grid>
                <Grid item xs>
                    <Slider
                        min={20}
                        max={440}
                        valueLabelDisplay="auto"
                        value={frequency}
                        onChange={handleChange}
                        aria-labelledby="continuous-slider"
                    />
                </Grid>
                <Grid item>
                    <TrendingUp />
                </Grid>
            </Grid>
            <Button onClick={togglePlay}>{play ? "Pause" : "Play"}</Button>
            <AnalyserCanvas />
        </>
    );
};

export default WebAudioRender;
