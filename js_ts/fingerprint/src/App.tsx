import { useEffect, useState } from "react";
import "./App.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { UAParser } from "ua-parser-js";

async function getDeviceId() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // Unique device ID
}

function App() {
  const [deviceInfo, setDeviceInfo] = useState<any>({});

  const parser = new UAParser(window.navigator.userAgent);
  console.log(parser.getResult());

  useEffect(() => {
    getDeviceId().then((deviceId) => {
      setDeviceInfo(deviceId);
    });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
    </>
  );
}

export default App;
