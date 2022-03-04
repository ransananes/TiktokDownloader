import React, { useEffect, useState } from "react";
import "./css/homePage.css";
import axios from "axios";

function Home() {
  // refers to status element
  const [status, setStatus] = useState(null);
  // refers to link element
  const [link, setLink] = useState(null);
  // refers to button element
  const [submit, setSubmit] = useState(null);
  // refers to current video
  const [tiktokVideo, setTiktokVideo] = useState(null);

  useEffect(() => {
    setStatus(document.getElementById("status"));
    setLink(document.getElementById("__input_text"));
    setSubmit(document.getElementById("disable-bt"));
  }, []);

  async function fetchData() {
    if (link.value.startsWith("https://www.tiktok.com/")) {
      try {
        deleteVideo();
        status.textContent = "Loading...";
        submit.disabled = true;
        await axios
          .post(
            `http://localhost:5000/api/getVideo/`,
            {
              video_url: link.value,
            },
            { responseType: "blob" }
          )
          .then((res) => {
            // creates blob object and downloads to client
            const fileName = "video.mp4";
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const _link = document.createElement("a");
            _link.href = url;
            _link.setAttribute("download", `${fileName}`);
            document.body.appendChild(_link);
            _link.click();
            var video = document.createElement("video");
            document.getElementById("default-data").appendChild(video);
            video.src = url;
            video.onclick = () => {
              if (!video.paused) video.pause();
              else video.play();
            };
            setTiktokVideo(video);
            status.textContent = "Completed.";
            submit.disabled = false;
          });
      } catch (error) {
        handleError();
      }
    } else {
      handleError();
    }
  }
  // handles errors
  function handleError() {
    status.textContent = "Error, please try again later.";
    submit.disabled = false;
  }

  // deletes video from element
  function deleteVideo() {
    if (tiktokVideo != null) {
      document.getElementById("default-data").removeChild(tiktokVideo);
      setTiktokVideo(null);
    }
  }
  return (
    <div className="default-data" id="default-data">
      <h2> Tiktok Downloader</h2>
      <div className="input-hold">
        <input type="text" placeholder="place link here" id="__input_text" />
        <button id="disable-bt" className="red-bt" onClick={() => fetchData()}>
          {" "}
          Submit{" "}
        </button>
      </div>
      <span className="status_msg" id="status">Waiting for link...</span>
    </div>
  );
}

export default Home;
