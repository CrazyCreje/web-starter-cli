source "$1/venv/bin/activate"
echo "$1"
whereIsPip=$(which python)
echo "$whereIsPip"
if [ $whereIsPip != "$1/venv/bin/python" ]; then
  echo "Error: pip is not in the environment where it should be"
  exit 1
fi

pip install Django django-cors-headers
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


cd "$1"
if [ "$?" -ne "0" ]; then
  echo "Error: cant cd to project dir";
  deactivate
  exit 1
fi

django-admin startproject djangoServer
if [ "$?" -ne "0" ]; then
  echo "Error: failed to create django directory";
  deactivate
  exit 1
fi

cd "$1"/djangoServer
if [ "$?" -ne "0" ]; then
  echo "Error: cant cd to project dir";
  deactivate
  exit 1
fi


python manage.py startapp hello_world
if [ "$?" -ne "0" ]; then
  echo "Error: failed call to manage.py";
  deactivate
  exit 1
fi


#cleanup
deactivate
exit 0
