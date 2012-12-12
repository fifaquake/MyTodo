## This file is used to start mongo db server.

import os
import ZipUtil
import urllib.request
import shutil

def DownCall(count, size, total_filesize):
    global lastPer
    per = int(100.0 * count * size / total_filesize)
    if per > 100:
        per = 100
    if lastPer < per:
        print("Already download %d KB(%d" % (count * size / 1024, per) + "%)")
        lastPer = per

# get directory name
dirname = os.path.dirname(os.getcwd())
thirdParties = os.path.join(dirname, 'ThirdParties', 'mongodb')

# if there is not thirdparites directory, that means we need to download mongodb
if not os.path.isdir(thirdParties):

    #download mongodb
    lastPer = 0
    url = r'http://downloads.mongodb.org/win32/mongodb-win32-x86_64-2.2.1.zip'
    localfilepath = os.path.join(dirname, 'mongodb.zip')
    urllib.request.urlretrieve(url, localfilepath, DownCall)

    #unzip the downloaded file
    print('begin to unzip file')
    zipUtil.unzipFile(localfilepath, dirname)
    print('Unzip Finished')

    #copy the unzipped file to thirdparties 
    zipMongoFolder = os.path.join(dirname, r'mongodb-win32-x86_64-2.2.1')
    shutil.copytree(zipMongoFolder, thirdParties)

    #remove the unneeded folder and downloaded file.
    shutil.rmtree(zipMongoFolder)
    os.remove(localfilepath)

# get mongod.exe full path
mongoexe = os.path.join(dirname, "thirdparties",
    "mongodb", "bin", "mongod.exe")

# get database name
mongodatapath = os.path.join(dirname, "database")

# Check the directory and create it if it is not exists.
if (not os.path.exists(mongodatapath)):
    os.mkdir(mongodatapath)
# combine command
cmd = mongoexe + " --dbpath=" + mongodatapath

os.system(cmd)


