+++
title = "60. pip install vs brew install"
date = 2023-12-29

+++

Recently I was installing localstack which is also a python-package. I initially did it with pip install but faced a lot of difficulties. Then installing it with brew actually solved the problem really quick. This prompted the question, what is the difference between the two? pip and homebrew?

pip is a packager for the python world - you should only ever be able to install python-things with it; homebrew is a package manager targetted at OSX; it doesn't impose any restrictions onto what software you can install with it - since python is a subset of software.

installing things with brew will install them into /usr/local/;

installing things with pip will fetch packages from the Python Package Index, and it will install them in a place where your python interpreter will find them: either into your home directory (e.g. ~/.local/lib/python2.7/site-packages/) or in some global search-path of your python interpreter (e.g. /usr/local/lib/python2.7/dist-packages/)

some handy commands:

1. `pip show <package-name>` will show where the package is installed.
2. `pip list -v` will list all packages with their installation locations shared.
