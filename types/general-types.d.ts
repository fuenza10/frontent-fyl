declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    webkitCancelFullScreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    webkitFullscreenElement?: Element;
    cancelFullScreen?: () => Promise<void>;
  }

  interface Element {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
  }
}
export {}