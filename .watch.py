import os
import time
from threading import Thread

def ls_files(dir, ext="js"):
    files = list()
    for item in os.listdir(dir):
        abspath = os.path.join(dir, item)
        try:
            if os.path.isdir(abspath):
                files = files + ls_files(abspath)
            else:
                # if "bundle.js" in abspath: continue
                # print("bundle.js" in abspath)
                # print(abspath)
                # print(abspath.split("/")[-1].split(".")[-1])
                files.append(abspath)
        except FileNotFoundError as err:
            print('invalid directory\n', 'Error: ', err)
    return files


class Watcher:
    def __init__(self):
        self.exc = []
        self.inc = []
        self.last = 0
        self.run = True 
        self.threads = []

    def watch(self, dirr, description, do):
        thread = Thread(target = self.watch_thread, args = (dirr, description, do))
        self.threads.append(thread)
        thread.start()
        return self

    def watch_thread(self, dirr, description, do):
        while True:
            if self.modified_dir(dirr):
                print(description)
                os.system(do)
                time.sleep(3)
            time.sleep(3)

    def include(self, inc):
        self.inc = inc.split(", ")
        return self

    def exclude(self, exc):
        self.exc = exc.split(", ")
        return self

    def isOkFile(self, filename):
        i = True
        e = True
        i = any(ii in filename for ii in self.inc)
        e = all(ii not in filename for ii in self.exc)
        return i and e
        # return (("bundle.js" not in filename) and
               # ("tail.css" not in filename) and
               # (("js" in filename) or 
               # ("css" in filename)) and
               # "DS" not in filename)

    def modified_dir(self, dir, ext="js"):
        for file in ls_files(dir, ext):
            m = self.modified_since(file, self.last)
            # print(self.isOkFile(file))
            if m and self.isOkFile(file):
                self.last = m + 5
                cp = self.last
                print("modified at " + str(cp))
                print("-----")
                return True
        return False

    def modified_since(self, filename, since):
        statbuf = os.stat(filename)
        if (since < statbuf.st_mtime):
            # print(since)
            return statbuf.st_mtime
        else:
            return False

browserify = "browserify docs/demo.js -t babelify --outfile docs/bundle.js"
tailwind_file = "docs/makeitlit"
a = " && "
tailwind = "npx tailwindcss build " + tailwind_file + ".css -o " + tailwind_file + ".tail.css"

watcher = Watcher().include(".js").exclude("tmp, bundle.js")
watcher.watch("./src", "BUNDLING SOURCE", browserify)
watcher.watch("./docs", "BUNDLING SOURCE", browserify)

# watcher2 = Watcher().include(".js, .css").exclude("tmp, .tail.css, bundle.js")
# watcher2.watch("./docs", "BUNDLING DOCS & TAILWIND", (browserify + a + tailwind))
# watcher2.watch("./docs", "BUNDLING DOCS", (browserify + a + tailwind))


# package_directories = [ "./src", "./docs" ]
# lastmodif = 0
# lastmodif2 = 0

# watch = True
# while (watch):
    # check1 = modified_since(tailwind+".css", lastmodif2)
    # if (check1):
        # lastmodif2 = check1
        # os.system("npx tailwindcss build " +tailwind+ ".css -o " +tailwind+ ".tail.css")

    # check = False
    # for directory in package_directories:
        # for filename in ls_files(directory, "js"):
            # check = check or modified_since(filename, lastmodif)

    # if check:
        # lastmodif = check
        # bundle()

    # time.sleep(3)
