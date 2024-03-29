# use-camera [![npm install use-camera](https://img.shields.io/badge/npm%20install-use--camera-blue.svg)](https://www.npmjs.com/package/use-camera) [![gzip size](https://img.badgesize.io/franciscop/use-camera/master/index.min.js.svg?compression=gzip)](https://github.com/franciscop/use-camera/blob/master/index.min.js)

A React hook to use the camera and audio of the device:

<img align="right" width="320" src="https://raw.githubusercontent.com/franciscop/use-camera/master/assets/prompt.png" />

```js
import React from "react";
import useCamera from "use-camera";

export default () => {
  const ref = useCamera();
  return <video ref={ref} autoPlay />;
};
```

It will ask the user to accept the camera and audio with the native browser prompt. If you only want **only** `video` or `audio`, set the other one to false:

```js
import React from "react";
import useCamera from "use-camera";

// Video streaming
export const VideoStream () => {
  const ref = useCamera({ audio: false });
  return <video ref={ref} autoPlay />;
};

// Audio streaming
export const VideoStream () => {
  const ref = useCamera({ video: false });
  return <video ref={ref} autoPlay />;
};
```

## Facing away

For mobile, if you want the camera to face the environment or want to pass some other video settings please use the `video` key:

```js
useCamera({ vide: { facingMode: 'environment', ... }})
```


## Fullscreen example

To display the video in fullscreen, get the window size either manually:

```js
import React from "react";
import useCamera from "use-camera";

const size = { width: window.innerWidth, height: window.innerHeight };

export default () => {
  const ref = useCamera();
  return <video ref={ref} autoPlay width={size.width} height={size.height} />;
};
```

Or with a [`useWindowSize` hook](https://usehooks.com/useWindowSize/) to listen for window resizing:

```js
import React from "react";
import useCamera from "use-camera";
import useWindowSize from './use-window-size';

export default () => {
  const ref = useCamera();
  const size = useWindowSize();
  return <video ref={ref} autoPlay width={size.width} height={size.height} />;
};
```
