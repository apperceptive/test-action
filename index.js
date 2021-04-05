const core = require("@actions/core");
const github = require("@actions/github");
const artifact = require("@actions/artifact");
const fs = require("fs/promises");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  (async () => {
    // Creat a directory and a file within it.
    await fs.mkdir("foobar");
    await fs.writeFileSync("foobar/batshit", "test file");

    const uploadResponse = await artifact.uploadArtifact("my-artifact", ["foobar/batshit"], {});
  })();
} catch (error) {
  core.setFailed(error.message);
}
