How to run project 

1. Install all dependency in both backend and frontend folder by running cmd $ npm install 
2. navigat into backend folder and run cmd $ npm run dev    [this will run frontend and backend server concurrently]

Databases
1. Aamazon RDS [MySQL]
2. MongoDB [ATLAS]

Git commit steps

1. Create your own seperate branch 
    $ git checkout -b branch_name
    $ git push --set-upstream origin feature/eslint
    
    Now you will have your own sub_branch called branch_name 
    you can see the branch name by simply executing cmd $ git branch

2. Navigating to branch 
    $ git checkout branch_name

*3. Before commiting changes using sub_branch pull code from master 
    $ git pull 

4. Commit your code [go to respective frontend or backend folder and commit ]
    $ git add .
    $ git commit -m "msg"
    $ git push

Git branch rules
1. When you commit your changes create new pull request on git web
2. Assign reviewers to check your changes [ Two revieweres are must]
3. Once verified and If have no merge conflict you are good to merge code else resolve conflicts.

