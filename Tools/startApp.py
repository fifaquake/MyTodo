## This file is used to start the Mytodo Sever.

import os

#get directory name
dirname = os.path.dirname(os.getcwd())

#get app.js
app = os.path.join(dirname, "app.js");
node = "node"

#combine command
cmd = node + " " + app

os.system(cmd);
