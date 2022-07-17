import { Experience } from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { VideoTexture } from "three";
import { NearestFilter } from "three";
import { sRGBEncoding } from "three";

export class Resources extends EventTarget {

    experience;
    renderer;
    assets;

    items;
    queue;
    loaded;

    /**@type {{ gltfLoader: GLTFLoader, dracoLoader: DRACOLoader }} */
    loaders;

    /**
     * 
     * @param {{ name: string; type: string; path: string; }[]} assets 
     */
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        
        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath('/draco/');
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        for( const asset of this.assets) {
            if (asset.type === 'glbModel') {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                })
            } else if (asset.type === 'videoTexture') {
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement('video')
                this.video[asset.name].src = asset.path;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].mute = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new VideoTexture(
                    this.video[asset.name]
                );

                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = NearestFilter;
                this.videoTexture[asset.name].mageFilter = NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].enconding = sRGBEncoding;
                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.dispatchEvent(new Event('ready'));
        }
    }

}