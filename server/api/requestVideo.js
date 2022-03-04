const express = require("express");

const router = express.Router();

const { spawn } = require("child_process");

const fs = require("fs");

const path = require("path");

//you can use error handling to see if there are any errors

router.post("/", async (req, res) => {
  var video_id = req.body.video_url.split("?")[0];
  var file_id = video_id.split("/").slice(-1);
  
  // checks if file exists
  var file_location =
    process.cwd() + "\\tiktokapi\\videos\\video_" + file_id + ".mp4";

  if (!fs.existsSync(file_location)) {
    //   spawns child process
    const child_process_python = spawn("python", [
      "./tiktokapi/get_video.py",
      video_id,
    ]);
    // std to console log :D
    child_process_python.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child_process_python.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child_process_python.on("close", (code) => {
      if (code != 0) {
        res.sendStatus(400);
      } else {
        res.download(
          process.cwd() + "\\tiktokapi\\videos\\video_" + file_id + ".mp4"
        );
      }
    });
  } else {
    res.download(file_location);
  }
});
module.exports = router;
