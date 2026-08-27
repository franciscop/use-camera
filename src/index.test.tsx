import $ from "react-test";

import useCamera, { type CameraOptions } from "./index";

const delay = (time = 50) => new Promise((done) => setTimeout(done, time));

const stream = { id: "fake-stream" } as unknown as MediaStream;
let getUserMedia: ReturnType<typeof vi.fn>;

beforeEach(() => {
  getUserMedia = vi.fn(async () => stream);
  Object.defineProperty(navigator, "mediaDevices", {
    configurable: true,
    value: { getUserMedia },
  });
});

const Camera = (props: CameraOptions) => {
  const ref = useCamera(props);
  return <video ref={ref} />;
};

describe("useCamera", () => {
  it("attaches the ref to the video element", async () => {
    const camera = $(<Camera />);
    await delay();
    expect(camera.nodes[0].nodeName).toBe("VIDEO");
  });

  it("requests the camera with the defaults", async () => {
    $(<Camera />);
    await delay();
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(getUserMedia).toHaveBeenCalledWith({
      audio: true,
      video: { facingMode: "user", width: 0, height: 0 },
    });
  });

  it("sets the stream on the video element", async () => {
    const camera = $(<Camera />);
    await delay();
    const video = camera.nodes[0] as HTMLVideoElement;
    expect(video.srcObject).toBe(stream);
  });

  it("can disable the audio", async () => {
    $(<Camera audio={false} />);
    await delay();
    expect(getUserMedia).toHaveBeenCalledWith(
      expect.objectContaining({ audio: false }),
    );
  });

  it("accepts video constraints", async () => {
    $(
      <Camera video={{ facingMode: "environment", width: 640, height: 480 }} />,
    );
    await delay();
    expect(getUserMedia).toHaveBeenCalledWith({
      audio: true,
      video: { facingMode: "environment", width: 640, height: 480 },
    });
  });
});
