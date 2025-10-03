## Backend Pipeline script

#!/bin/bash
set -e
cd /home/ubuntu/flask_app
echo "=== Pulling latest code ==="
git config --global --add safe.directory /home/ubuntu/flask_app
git pull origin master
cd /home/ubuntu/flask_app/backend/
pip3 install -r requirements.txt

sudo systemctl restart flask.service

## Frontend Pipeline script

#!/bin/bash
set -e
cd /home/ubuntu/flask_app
echo "=== Pulling latest code ==="
git config --global --add safe.directory /home/ubuntu/flask_app
git pull origin master
cd /home/ubuntu/flask_app/backend/
pip3 install -r requirements.txt

sudo systemctl restart flask.service
