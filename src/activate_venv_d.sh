source $1'/venv/bin/activate'

whereIsPip=$(which pip)
if [ $whereIsPip == "$1/venv/bin/pip" ]; then
  echo "Error: pip is not in the environment where it should be"
  exit 1
fi

python -m pip install Django
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
