// Your JavaScript code
document.addEventListener('DOMContentLoaded', function () {
  // Attach event listener to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-row');
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();  // Prevent default form submission
      
      const rowId = button.dataset.rowId;
      confirmDelete(event, rowId);
    });
  });

  // Function to confirm delete action
  function confirmDelete(event, rowId) {
    event.stopPropagation();

    const confirmation = confirm('Are you sure you want to delete this row?');
    if (confirmation) {
      deleteRow(rowId);
    }
  }

  // Function to send AJAX request and delete row
  function deleteRow(rowId) {
    // Send AJAX request to Django server
    const url = '/delete-row/';  // Replace with your Django URL
    const csrftoken = getCookie('csrftoken');  // Get CSRF token

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ rowId: rowId }),
    })
      .then(function (response) {
        if (response.ok) {
          // Row deleted successfully, remove it from the table
          const deletedRow = document.querySelector(`button[data-row-id="${rowId}"]`).parentNode.parentNode;
          deletedRow.remove();
        } else {
          // Handle error case
          console.error('Error deleting row');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  // Function to get CSRF token from cookies
  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
});






Deploy Django on Linux


User
Set up and deploy a django application on a Linux server

ChatGPT
To set up and deploy a Django application on a Linux server, follow these steps:

Prepare the Linux server:

Choose a Linux distribution (e.g., Ubuntu, CentOS) and install it on your server.
Make sure the server is up to date by running the following commands:
sql
Copy code
sudo apt update
sudo apt upgrade
Install Python and essential packages:

Django requires Python, so install it by running:
Copy code
sudo apt install python3 python3-pip python3-venv
Install other necessary packages:
Copy code
sudo apt install build-essential libpq-dev
Set up a virtual environment:

Create a new directory for your Django project:
bash
Copy code
mkdir ~/myproject
cd ~/myproject
Create a virtual environment and activate it:
bash
Copy code
python3 -m venv myprojectenv
source myprojectenv/bin/activate
Install Django and other dependencies:

Use pip to install Django and other required packages:
php
Copy code
pip install django gunicorn psycopg2-binary
Start a new Django project:

Create a new Django project using the following command:
Copy code
django-admin startproject myproject .
Configure the Django settings:

Open the settings.py file in the project directory:
bash
Copy code
nano myproject/settings.py
Update the following settings:
ALLOWED_HOSTS - Add your server's IP or domain name.
DATABASES - Configure the database settings according to your requirements (e.g., using PostgreSQL).
STATIC_ROOT - Set a location for static files (e.g., STATIC_ROOT = '/var/www/html/static/').
Collect static files:

Run the following command to collect the static files into the specified directory:
Copy code
python manage.py collectstatic
Test the Django development server:

Start the Django development server to verify that everything is working:
Copy code
python manage.py runserver 0.0.0.0:8000
Access your server's IP or domain name followed by :8000 in a web browser. You should see the Django default page.
Set up a web server (e.g., Nginx) to serve the Django application:

Install Nginx by running:
Copy code
sudo apt install nginx
Create a new Nginx server block for your Django application:
arduino
Copy code
sudo nano /etc/nginx/sites-available/myproject
Configure the server block with the following content:
bash
Copy code
server {
    listen 80;
    server_name example.com;  # Replace with your domain or IP address

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static/ {
        alias /var/www/html/static/;  # Replace with your STATIC_ROOT path
    }
}
Enable the server block:
bash
Copy code
sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled/
Restart Nginx:

Copy code
sudo service nginx restart
Test the deployment:

Open a web browser and visit your server's IP or domain name. You should see your Django application running through Nginx.
Congratulations! You have successfully set up and deployed a Django application on a Linux server.


