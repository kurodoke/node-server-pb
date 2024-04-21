import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";

export class PlayerConfig {
    declare keyboard: Keyboard;
    declare mouse: Mouse;

    public crosshair = 1;
    public audio1 = 100;
    public audio2 = 60;
    public sensitivity = 50;
    public vision = 70;
    public blood = 1;
    public hand = 0;
    public audio_enabled = 7;
    public configuration = 55;
    public inverted_mouse = 0;
    public invite_message = 0;
    public whisper_chat = 0;
    public macro = 0;
    public unk1 = 0;
    public unk2 = 0;
    public unk3 = 0;
    public unk4 = 0;

    constructor(keyboard: Keyboard, mouse: Mouse) {
        this.keyboard = keyboard;
        this.mouse = mouse;
    }
}
