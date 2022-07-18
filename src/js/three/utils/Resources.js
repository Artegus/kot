import { Experience } from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { VideoTexture, NearestFilter, sRGBEncoding } from "three";

export class Resources extends EventTarget {

    experience;
    renderer;
    /**
     * @typedef {{ name: string; type: string; path: string; }} Asset
     * @type { Asset[] }
     */
    assets;

    /**@type {Object.<string, KotSpace.GLTF>} */
    gltfItems;
    /**@type {Object.<string, VideoTexture>} */
    videoItems;
    queue;
    loaded;

    /**@type {{ gltfLoader: GLTFLoader, dracoLoader: DRACOLoader }} */
    loaders;

    /**
     * 
     * @param {Asset[]} assets 
     */
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        
        this.assets = assets;

        this.gltfItems = {};
        this.videoItems = {};
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

    async startLoading() {
        for( const asset of this.assets) {
            if (asset.type === 'glbModel') {
                let gltf = await this.loaders.gltfLoader.loadAsync(asset.path);
                this.singleAssetLoaded(asset, gltf);
            } else if (asset.type === 'videoTexture') {
                /**@type {Object.<string, HTMLVideoElement>} */
                this.video = {};
                /** @type {Object.<string, VideoTexture>} */
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
                this.videoTexture[asset.name].magFilter = NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = sRGBEncoding;
                this.singleVideoLoaded(asset, this.videoTexture[asset.name]);
            }
        }
        if (this.loaded === this.queue) {
            this.dispatchEvent(new Event('ready'));
        }
    }
    
    /**
     * 
     * @param { Asset } asset 
     * @param { GLTF } file 
     */
    singleAssetLoaded(asset, file) {
        this.gltfItems[asset.name] = file;
        this.loaded++;
    }

    /**
     * 
     * @param { Asset } asset
     * @param { VideoTexture } video
     */
    singleVideoLoaded(asset, video) {
        this.videoItems[asset.name] = video;
        this.loaded++;
    }

}