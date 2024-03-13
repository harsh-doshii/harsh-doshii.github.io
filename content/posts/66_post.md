+++
title = "66.  S3 is files but not a filesystem"
date = 2024-03-08

+++

My highlights from this amazing [blog](https://calpaterson.com/s3.html)

UNIX file--system has 5 basic function calls:

1. open a file
2. read from the file
3. write to the file
4. move the position to a specific byte
5. close the file

However S3 has only 2 basic calls:

1. GetObject: Read an object
2. PutObject: Write an object

However, the only constraint is that you *cant overwrite partially* Overwrites have to be the whole file.

Databases need a place to put their data. That place generally is files on a filesystem. Crucially, these databases overwhelmingly rely on the ability to do partial overwrites. They store data in "pages" (eg 4 or 8 kilobytes long) in "heap" files where writes are done page by page. There might be thousands of pages in a single file. Pages are overwritten as necessary to store whatever data is required. That means partial overwrites are absolutely essential.
