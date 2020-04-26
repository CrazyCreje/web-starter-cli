flask = require("../src/flask.js");
process = require("process")
fs = require("fs");
shell = require("shelljs");

test("Flask test", async () => {
  var failed = false;
  shell.mkdir("-p", "./testing/flask");
  try{
    working_dir = process.cwd();
    flask.flask(`${working_dir}/testing/flask`);

    //check if we are successfull
    await fs.promises.access("./testing/flask/src/server/wsgi.py");
    await fs.promises.access("./testing/flask/flask-env/bin/activate");
    await fs.promises.access("./testing/flask/requirements.txt");

  }catch(e){

    console.error("failed to copy template file - " + e);
    failed = true;
  }

  expect(failed).toBe(false);
});
