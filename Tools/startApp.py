## This file is used to start the Mytodo Sever.

import os

#get directory name
dirname = os.path.dirname(os.getcwd())

#change current working directory
os.chdir(dirname)

#install the third parties used in node
npm_install = "npm install"
os.system(npm_install)

#get app.js
app = os.path.join(dirname, "app.js")
node = "node"

#combine command
cmd = node + " " + app

os.system(cmd)
