## This file is used to start mongo db server.

import os

# get directory name
dirname = os.path.dirname(os.getcwd())

# get mongod.exe full path
mongoexe = os.path.join(dirname, "thirdparties", "mongodb", "bin", "mongod.exe")

# get database name
mongodatapath = os.path.join(dirname, "database")

# Todo:Check the directory and create it.

# combine command
cmd = mongoexe + " --dbpath=" + mongodatapath

os.system(cmd)
