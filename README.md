# Code-elements
With code-elements we want to have a developer playground where students can create there own small projects and build prebuild UI components to use in the future.

## Installation
```
1 Open terminal  
2 cd to the map where you will save the project 
3 git remote add origin https://github.com/timruiterkamp/code-elements.git  or git clone https://github.com/timruiterkamp/code-elements.git  
4 git branch -> check if your name already exists  
5 git checkout 'your name'. if your name doesn't exist yet use: git checkout -b 'your name'  
6 check with git status if you are really in the right branch.
7 have fun :)    
```

## Work in the repo
After the installation the repo will be on your computer. To use the repo just 'cd' to your folder and make sure to use git checkout 'your name' to work in your personal folder. You can just add as many files as you want as long it's under your personal branch.

> Please make a new branch for each project 

**Want to push your work to the repo?**
```
* git add -A stages All
* git add . stages new and modified, without deleted
* git add -u stages modified and deleted, without new
```
In the most cases you use git add -A to upload all the changed files.
after the files are 'staged' use git commit -m 'your message' to commit the files. 
after the files are commited use git push, this will send all the files to your personal branch on github. If you would go to the github repo and look at your branch, the new created or changed files will be visible.

**Short story:**
```
* git status (to check if ur on the right branch)
* git add -A
* git commit -m 'your message'
* git push
* check github and ask for a pull request
```

## Start project
1 Use npm install when u are in the directory for the first time to install all the node packages  
2 Use npm start to open te liveserver  
3 Open a new terminal tab and type: npm run watch-css  
4 Keep the terminals open and simply add another terminal tab for your git actions  
5 And off you go!  

## Project setup
* under assets u can place your custom html files.
* under scss u can make your own scss file
