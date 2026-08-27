import { useEffect, useRef, type RefObject } from "react";

export type VideoOptions = {
  facingMode?: ConstrainDOMString;
  width?: ConstrainULong;
  height?: ConstrainULong;
};

export type CameraOptions = {
  audio?: boolean;
  video?: VideoOptions;
};

const attachCam = async (
  el: HTMLVideoElement,
  audio = true,
  opts: VideoOptions = {},
) => {
  const { facingMode = "user", width = el.width, height = el.height } = opts;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("No camera available");
  }
  el.srcObject = await navigator.mediaDevices.getUserMedia({
    audio,
    video: { facingMode, width, height },
  });
};

export default function useCamera({
  audio,
  video,
}: CameraOptions = {}): RefObject<HTMLVideoElement> {
  const ref = useRef<HTMLVideoElement>(null);
  // Ref is already set when useEffect() is called
  useEffect(() => {
    if (!ref.current) return;
    attachCam(ref.current, audio, video);
  }, []);
  return ref;
}
