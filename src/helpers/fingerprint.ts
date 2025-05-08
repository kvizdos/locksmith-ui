async function sha256(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function GenerateFingerprint() {
  const canvasFingerprint = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.display = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Hello, world!", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Hello, world!", 4, 17);

    ctx.fillText("🤙", 100, 20);
    ctx.fillText("🎉", 110, 25);
    ctx.fillText("🤣", 115, 30);

    const dataUrl = canvas.toDataURL();

    canvas.remove();
    const hash = await sha256(dataUrl);
    return hash;
  };

  const getWebGLContext = () => {
    const canvas = document.createElement("canvas");
    let gl;
    try {
      gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
      console.error("Failed to get WebGL context: ", e);
    }
    return gl;
  };

  const getWebGLRendererInfo = async () => {
    const gl = getWebGLContext();
    if (!gl) {
      return null;
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const info = {
        renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      };

      const hash = await sha256(JSON.stringify(info));
      return hash;
    }

    return await sha256(JSON.stringify("blank"));
  };

  const hasTouchSupport = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  const getTouchPoints = () => {
    return navigator.maxTouchPoints;
  };

  const getTouchFingerprint = () => {
    return {
      touchSupport: hasTouchSupport(),
      maxTouchPoints: getTouchPoints(),
    };
  };

  const generateAudioFingerprint = async () => {
    // Create an OfflineAudioContext
    const audioContext = new OfflineAudioContext(1, 44100, 44100);

    // Create an oscillator and connect it to the context
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(0);

    // Render the audio
    const audioBuffer = await audioContext.startRendering();
    const audioData = audioBuffer.getChannelData(0);

    // Convert the audio data to a Uint8Array
    const data = new Uint8Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      // Normalize the float32 audio data into uint8
      data[i] = Math.floor((audioData[i] * 0.5 + 0.5) * 255);
    }

    // Hash the data using SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  };

  // Relatively Static Variables
  const screenHeight = window.screen.height * window.devicePixelRatio;
  const screenWidth = window.screen.width * window.devicePixelRatio;
  const colorDepth = window.screen.colorDepth;
  console.log("Color Depth", colorDepth);
  const screen = await sha256(
    JSON.stringify({
      screenHeight,
      screenWidth,
      colorDepth,
    }),
  );
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const hardwareConcurrency = window.navigator.hardwareConcurrency;
  const lang = window.navigator.language;
  const canvas = await canvasFingerprint();
  const webgl = await getWebGLRendererInfo();
  const touch = await sha256(JSON.stringify(getTouchFingerprint()));
  const platform = navigator?.platform || "unknown";
  const audio = await generateAudioFingerprint();

  let fingerprint = {
    screen,
    timezone,
    hardwareConcurrency,
    deviceMemory: "0",
    canvas,
    lang,
    webgl,
    touch,
    battery: false,
    platform,
    audio,
    userAgent: "",
    windowSize: null,
    dnt: null,
    devices: null,
  };

  // Frequently Changing
  const getMediaDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.map((device) => ({
        kind: device.kind,
        label: device.label,
        deviceId: device.deviceId,
        groupId: device.groupId,
      }));
    } catch (e) {
      console.log(e);
      return [];
    }
  };
  const userAgent = await sha256(navigator.userAgent);
  const windowSize = await sha256(
    JSON.stringify({
      height: window.innerHeight,
      width: window.innerWidth,
    }),
  );
  const doNotTrack = navigator.doNotTrack || false;
  const rawdevices = await getMediaDevices();
  const devices = await sha256(
    rawdevices.map((device) => Object.values(device).join(":")).join(";"),
  );

  fingerprint = {
    ...fingerprint,
    userAgent,
    windowSize,
    dnt: doNotTrack,
    devices,
  };

  return fingerprint;
}
