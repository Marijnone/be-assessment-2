# code-elements


## Installation

1 Open terminal  
2 cd naar de map waar je het project opslaat  
3 git remote add origin https://github.com/timruiterkamp/code-elements.git  of git clone https://github.com/timruiterkamp/code-elements.git  
4 git branch -> kijk of je naam er tussen staat  
5 git checkout 'hier je naam'. Staat je naam nog niet tussen git branch, dan -> git checkout -b 'hier je naam'  
6 check even met git status of je echt in je eigen branch zit  
7 have fun :)    


## Work in the repo
Na de installatie heb je de repo op je pc staan en met git checkout 'je naam' werk je onder je eigen naam.
Je kunt nu gewoon mappen en bestanden toevoegen!

> Voor elk nieuw project dat je maakt, graag een nieuwe branch! 

**Wil je je werk pushen naar de repo om het op te slaan:**

* git add -A stages All
* git add . stages new and modified, without deleted
* git add -u stages modified and deleted, without new

Normaal gebruik je git add -A om al je bestanden te uploaden
Nadat de files zijn 'gestaged' gebruik je git commit -m 'type wat je hebt toegevoegd'. 
Nadat je files zijn gecommit voer je git push in, dit stuurt alle bestanden naar de github repo. Als je nu in github onder je eigen branch kijkt zul je je nieuwe bestanden zien staan onder commits.

**in het kort:**
* git add -A
* git commit -m 'type wat je hebt toegevoegd'
* git push
* check je github branch en vraag een pull request aan.


## Start project
* Use npm install when u are in the directory for the first time to install all the node packages
* Use npm start to open te liveserver
* under assets u can place your custom html files.
