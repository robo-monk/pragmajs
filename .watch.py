import os
import time

def ls_files(dir):
    files = list()
    for item in os.listdir(dir):
        abspath = os.path.join(dir, item)
        try:
            if os.path.isdir(abspath):
                files = files + ls_files(abspath)
            else:
                files.append(abspath)
        except FileNotFoundError as err:
            print('invalid directory\n', 'Error: ', err)
    return files


filename = "./src/index.js"
directory = "./src"
lastmodif = 0
while (True):
    for filename in ls_files("./src"):
        statbuf = os.stat(filename)
        if lastmodif < statbuf.st_mtime:
            lastmodif = statbuf.st_mtime
            os.system("browserify docs/lector.js -t babelify --outfile docs/bundle.js")
            print("File " + filename + " was modifed!")
    time.sleep(1)
