#!/bin/bash
#this file is needed  because I need to execute the pip commands while I am
#still in the same terminal session, which each call to exec in js most likely
#is creating new sessions each time so we lose the env after we activate it.
source $1'/flask-env/bin/activate'

whereIsPip=$(which pip)
if [ $whereIsPip == "$1/flask-venv/bin/pip" ]; then
  echo "Error: pip is not in the environment where it should be"
  exit 1
fi

pip install flask
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
deactivate
exit 0
