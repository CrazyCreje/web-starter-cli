git = require("../src/git.js");
fs = require("fs")

test("Git Test", async () => {
  dummy = new git("dummy", "./");
  var failed = false;
  try{
    dummy.init()

    //check if we are successfull
    await fs.promises.access("./dummy/.git");


  }catch(e){

    console.error("failed to initialize git repo - " + e);
    failed = true;
  }

  expect(failed).toBe(false);
});
