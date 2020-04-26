git = require("../src/git.js");
shell = require("shelljs");
fs = require("fs");

test("Git Test", async () => {
  shell.mkdir("-p", "./testing/git");
  dummy = new git("git", "./testing/");
  var failed = false;
  try{
    dummy.init()

    //check if we are successfull
    await fs.promises.access("./testing/git/.git");


  }catch(e){

    console.error("failed to initialize git repo - " + e);
    failed = true;
  }

  expect(failed).toBe(false);
});
