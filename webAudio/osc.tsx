export class Oscillator {
    private oscillator: OscillatorNode;
    private connectedAudioNode?: AudioNode;
    public isConnected = false;

    constructor(private context: BaseAudioContext, options?: OscillatorOptions) {
        this.oscillator = new OscillatorNode(context, options);
    }

    public start() {
        return this.oscillator.start();
    }

    public connect(audioNode?: AudioNode) {
        if (!this.connectedAudioNode) {
            this.isConnected = true;
            this.connectedAudioNode = audioNode || this.context.destination;
            return this.oscillator.connect(this.connectedAudioNode);
        }
    }

    public disconnect() {
        if (!!this.connectedAudioNode) {
            this.isConnected = false;
            this.oscillator.disconnect(this.connectedAudioNode);
            this.connectedAudioNode = undefined;
        }
    }

    get type() {
        return this.oscillator.type;
    }

    set type(type: OscillatorType) {
        this.oscillator.type = type;
    }

    get frequency() {
        return this.oscillator.frequency;
    }

    get node() {
        return this.oscillator;
    }
}
