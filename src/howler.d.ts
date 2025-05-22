declare module 'howler' {
  export interface HowlOptions {
    src: string[];
    volume?: number;
    html5?: boolean;
    loop?: boolean;
    preload?: boolean;
    autoplay?: boolean;
    mute?: boolean;
    sprite?: { [key: string]: [number, number] };
    rate?: number;
    pool?: number;
    format?: string[];
    xhrWithCredentials?: boolean;
    onload?: () => void;
    onloaderror?: (soundId: number, error: any) => void;
    onplay?: (soundId: number) => void;
    onplayerror?: (soundId: number, error: any) => void;
    onend?: (soundId: number) => void;
    onpause?: (soundId: number) => void;
    onstop?: (soundId: number) => void;
    onmute?: (soundId: number) => void;
    onvolume?: (soundId: number) => void;
    onrate?: (soundId: number) => void;
    onseek?: (soundId: number) => void;
    onfade?: (soundId: number) => void;
    onunlock?: () => void;
  }

  export class Howl {
    constructor(options: HowlOptions);
    play(sprite?: string | number): number;
    pause(id?: number): this;
    stop(id?: number): this;
    mute(muted?: boolean, id?: number): this | boolean;
    volume(volume?: number, id?: number): this | number;
    fade(from: number, to: number, duration: number, id?: number): this;
    rate(rate?: number, id?: number): this | number;
    seek(seek?: number, id?: number): this | number;
    loop(loop?: boolean, id?: number): this | boolean;
    state(): 'unloaded' | 'loading' | 'loaded';
    playing(id?: number): boolean;
    duration(id?: number): number;
    on(event: string, callback: Function, id?: number): this;
    once(event: string, callback: Function, id?: number): this;
    off(event?: string, callback?: Function, id?: number): this;
    load(): this;
    unload(): void;
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
