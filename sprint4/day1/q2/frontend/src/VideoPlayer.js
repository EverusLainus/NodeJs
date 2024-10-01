import { useEffect, useRef } from "react";
import Hls from "hls.js";

// eslint-disable-next-line react/prop-types
export const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
      videoRef.current.addEventListener("canplay", function () {
        videoRef.current.play();
      });
    }
  }, [src]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: "100%" }} />
    </div>
  );
};
