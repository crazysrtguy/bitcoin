// Add NodeJS namespace for setTimeout and setInterval
declare namespace NodeJS {
  interface Timeout {}
  interface Timer {}
}

// In case we need to declare howler module explicitly
declare module 'howler' {
  export class Howl {
    constructor(options: any);
    play(): number;
    stop(id?: number): this;
    pause(id?: number): this;
    volume(volume?: number): this | number;
    mute(muted?: boolean): this | boolean;
    loop(loop?: boolean): this | boolean;
    seek(seek?: number): this | number;
    playing(id?: number): boolean;
    duration(id?: number): number;
    state(): string;
    on(event: string, callback: Function, id?: number): this;
    once(event: string, callback: Function, id?: number): this;
    off(event: string, callback?: Function, id?: number): this;
    load(): this;
    unload(): void;
    fade(from: number, to: number, duration: number, id?: number): this;
  }

  export class Howler {
    static volume(volume?: number): number | Howler;
    static mute(muted?: boolean): boolean | Howler;
    static stop(): void;
    static codecs(ext: string): boolean;
    static unload(): void;
    static usingWebAudio: boolean;
    static noAudio: boolean;
    static autoUnlock: boolean;
    static autoSuspend: boolean;
    static ctx: AudioContext;
    static masterGain: GainNode;
  }
}
