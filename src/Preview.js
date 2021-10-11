import React, { useEffect, useRef } from "react";
import { createLocalTracks } from "twilio-video";

const Preview = ({
  setPreviewAudioTrack,
  previewVideoTrack,
  setPreviewVideoTrack,
}) => {
  const videoRef = useRef();
  const handlePreviewTracks = async () => {
    try {
      const tracks = await createLocalTracks({ audio: true, video: true });
      tracks.forEach((track) => {
        if (track.kind === "video") {
          setPreviewVideoTrack(track);
        } else if (track.kind === "audio") {
          setPreviewAudioTrack(track);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (previewVideoTrack) {
      previewVideoTrack.attach(videoRef.current);
    }
  }, [previewVideoTrack]);

  const previewButton = (
    <button onClick={handlePreviewTracks}>Preview tracks</button>
  );

  const preview = (
    <div>
      <video ref={videoRef}></video>
    </div>
  );

  return <div>{previewVideoTrack ? preview : previewButton}</div>;
};

export default Preview;
