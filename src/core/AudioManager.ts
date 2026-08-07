import * as THREE from 'three';
import blastAudio from '../assets/audio/blast.mp3';

export class AudioManager {
    public listener: THREE.AudioListener;
    public loader: THREE.AudioLoader;

    private unlocked = false;

    public sounds: { [key in SoundNames]: THREE.Audio | null } = {
        [SoundNames.blast]: null,
    };

    constructor(
        public camera: THREE.Camera,
    ) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);

        this.loader = new THREE.AudioLoader();

        this.load(SoundNames.blast);
    }

    public load(name: SoundNames) {
        this.sounds[SoundNames.blast] = new THREE.Audio(this.listener);

        this.loader.load(this.getSoundUrlByName(name), (buffer) => {
            this.sounds[SoundNames.blast]?.setBuffer(buffer);
            this.sounds[SoundNames.blast]?.setVolume(0.5);
        });
    }

    public play(name: SoundNames) {
        const audio = this.sounds[name];
        if (!audio) return;

        if (audio.isPlaying)
            audio.stop();

        audio.play();
    }

    public async unlock() {
        if (this.unlocked) return;

        await this.listener.context.resume();
        this.unlocked = true;
    }

    private getSoundUrlByName(name: SoundNames): string {
        switch (name) {
            case SoundNames.blast:
                return blastAudio;
            default:
                return '';
        }
    }
}
export enum SoundNames {
    blast = 'blast',
}