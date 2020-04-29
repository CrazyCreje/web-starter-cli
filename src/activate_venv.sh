#!/bin/bash
#this file is needed  because I need to execute the pip commands while I am
#still in the same terminal session, which each call to exec in js most likely
#is creating new sessions each time so we lose the env after we activate it.
. $1'/flask-env/bin/activate'

whereIsPip=$(which python)
echo "$whereIsPip"
if [ $whereIsPip != "$1/flask-env/bin/python" ]; then
  echo "Error: pip is not tin the environment where it should be"
  exit 1
fi

pip3 install flask flask-cors
if [ "$?" -ne "0" ]; then
  echo "Error: pip install failed"
  deactivate
  exit 1
fi

pip freeze > requirements.txt
if [ "$?" -ne "0" ]; then
  echo "Error: pip install failed";
  deactivate
  exit 1
fi

#cleanup
exit 0