import { createRoot } from "react-dom/client";

import useCamera from "../src/index";

const App = () => {
  const ref = useCamera();
  return <video ref={ref} autoPlay playsInline muted width={640} height={480} />;
};

createRoot(document.getElementById("root")!).render(<App />);
