django = require("../src/django.js");
process = require("process")
fs = require("fs");
shell = require("shelljs");

test("Flask test", async () => {
  var failed = false;
  shell.mkdir("-p", "./testing/django");
  try{
    working_dir = process.cwd();
    django.django(`${working_dir}/testing/django`, django);

    //check if we are successfull
    await fs.promises.access(`${working_dir}/testing/django/venv/bin/activate`);
    await fs.promises.access(`${working_dir}/testing/django/djangoServer`);


  }catch(e){

    console.error("failed to copy template file - " + e);
    failed = true;
  }

  expect(failed).toBe(false);
});
