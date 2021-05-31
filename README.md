# W2STask
# README


This README would normally documents whatever steps necessary to get your application up and running in development.

## How do I set up?

* ### Dependencies:

	#### Angular:
			-> sudo apt-get update
			-> sudo apt-get install build-essential checkinstall libssl-dev
			-> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
			-> nvm install 12.10.0
			-> nvm use 12.10.0
			-> nvm alias default 12.10.0
			-> npm install -g @angular/cli

	#### Django:
    		-> sudo apt-get install python3-pip python3-dev
    		-> sudo apt-get install language-pack-en libmysqlclient-dev
    		-> pip3 install virtualenv
    		-> pip3 install --upgrade pip

			//for centos mysqlclient error.
			-> yum install -y python36-devel mysql-devel gcc

	#### Mysql:
    		-> (install mysql version 8)

* ### Project checkout:
            -> git clone https://github.com/vallikannu96/W2STask.git

* ### Project setup:

	#### Angular:
			-> (go into angular directory)
			-> npm install

	#### Django:
            -> (go into dreamcart directory)
            -> virtualenv -p python3 dreamcart_env
            -> source dreamcart_env/bin/activate
            -> pip install -r requirements.txt
	        -> create a new database as "w2stask" in mysql
            -> configure database user, password in w2s/settings.py
                DATABASES = {
                    'default': {
                        'NAME': 'w2stask',
                        'USER': 'your database username',
                        'PASSWORD': 'your database password',
                    }
                }
            -> python manage.py makemigrations
            -> python manage.py migrate
            -> python manage.py createsuperuser

* ### Run development server:

	#### Angular:
			-> (go into angular directory)
			-> ./node_modules/.bin/ng serve
	#### Django:
			-> (go into w2s directory)
			-> python manage.py runserver
