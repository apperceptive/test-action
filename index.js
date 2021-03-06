const core = require("@actions/core");
const github = require("@actions/github");
const artifact = require("@actions/artifact");
const fs = require("fs").promises;

async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    const config = core.getInput("config");
    console.log("config is", config);

    const configFile = await fs.readFile(config);
    console.log(configFile.toString());

    const nameToGreet = core.getInput("who-to-greet");
    console.log(`Hello ${nameToGreet}!`);
    const time = new Date().toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);

    // Creat a directory and a file within it.
    await fs.mkdir("foobar");
    await fs.writeFile("foobar/batshit", "test file");

    const artifactClient = artifact.create();

    const uploadResponse = await artifactClient.uploadArtifact(
      "my-artifact",
      ["foobar/batshit"],
      ".",
      {}
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
