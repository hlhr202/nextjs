import Typography from "@material-ui/core/Typography";
import TrendingUp from "@material-ui/icons/TrendingUp";
import TrendingDown from "@material-ui/icons/TrendingDown";
import Slider from "@material-ui/core/Slider";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { NextSFC } from "next";
import { AudioContextContainer } from "./AudioContextProvider";

export const useOscillator = () => {
    const context = React.useContext(AudioContextContainer);
    const [frequency, setFrequency] = React.useState(440);
    const handleChange = React.useCallback((_: React.ChangeEvent<{}>, value: number | number[]) => {
        if (typeof value === "number") setFrequency(value);
    }, []);
    const oscillator = React.useMemo(() => context.createOscillator(), []);

    React.useEffect(() => {
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    }, [frequency]);

    React.useEffect(() => {
        oscillator.start();
        return () => {
            oscillator.stop();
        };
    }, []);

    const OscillatorRenderer = React.memo(() => <OscillatorUI frequency={frequency} setFrequency={handleChange} />);

    return { OscillatorRenderer, oscillator };
};

const OscillatorUI: NextSFC<{
    frequency: number;
    setFrequency: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}> = ({ frequency, setFrequency }) => {
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
                        onChange={setFrequency}
                        aria-labelledby="continuous-slider"
                    />
                </Grid>
                <Grid item>
                    <TrendingUp />
                </Grid>
            </Grid>
        </>
    );
};
