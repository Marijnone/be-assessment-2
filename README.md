# Festimatch

App to meet new friends on your favorite festivals 🎉


![Image of Yaktocat](https://i.imgur.com/AIFn0sc.png)


# How to install

#### Windows 
I strongy recommend to use bash on windows this makes development alot easier and alows you to run linux on windows which is great check the tutorial out here http://techgenix.com/bash-on-windows-10/ 



1. create a directory for the repo ``` mkdir Festimatch ```
2. navigate to the folder
3. git clone https://github.com/Marijnone/be-assessement.git
4. inside the folder run ```npm install ```

## .env file 
create .env file
Inside the .env file you put
* DB_HOST=localhost
* DB_USER=youruser
* DB_NAME=Festimatch
* DB_PASSWORD=yourmysqlpassword
* SESSION_SECRET=your session secret

## Mysql 
 1. this webapp is using Mysql so if you do not have mysql installed run this comment in bash: ```apt-get install mysql``` configure       your account. 
 
 * Type sudo service mysql start 
 * Then login to your server using: mysql -u root -p 
 * Run the sql statement to create the DB
 ```
    CREATE TABLE `gebruiker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8,
  `email` text CHARACTER SET utf8,
  `hash` text CHARACTER SET utf8,
  `geslacht` text CHARACTER SET utf8,
  `voorkeur1` text CHARACTER SET utf8,
  `opzoeknaar` text CHARACTER SET utf8,
  `festival` varchar(45) DEFAULT NULL,
  `profileimage` varchar(50) DEFAULT NULL,
  `gebruikercol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
 
 
 ```
 3. please dont forget to add your .env file to your gitignore ‼

## How to start

* There are three command needed to start the webapp
* first inside your bash start your mysql server with ````sudo service mysql start```
* then ```run watch-css ``` this start the sass compiler
* and after that ```npm start ```

Have fun! 😁






MIT License 

Copyright (c) [2018] [Marijn]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

