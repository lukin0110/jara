#!/usr/bin/env python
# Upload the entire static website to s3 using fabric and boto
import os
from datetime import datetime, timedelta
from ConfigParser import SafeConfigParser, ConfigParser, DEFAULTSECT

IMAGES = [
    ('Cow-Wallpaper-cows-26941954-1680-1050.jpg', 'cow1.jpg', True),
    ('cow-wallpapers_2560x1600.jpg', 'cow2.jpg', True),
    ('cow.jpg', 'cow3.jpg', True),
    ('7doev.jpg', 'steak1.jpg', True),
    ('steak.jpeg', 'steak2.jpg', True),
    ('DSCF0268[1].JPG', 'terrace1.jpg', True),
    ('DSCF0342.JPG', 'terrace2.jpg', True),
    ('DSCF0345.JPG', 'terrace3.jpg', True),
    ('perfect_marinade_steak.jpg', 'welcome2.jpg', True),

    ('perfect_marinade_steak2.png', 'welcome1.jpg', False),
    ('mg_4493.jpg', 'welcome2.jpg', False),
    ('Strip_House_Signature_Steak.jpg', 'welcome3.jpg', False),
    ('steak-1.jpg', 'welcome4.jpg', False),
]

EXCLUDES = [
    '/img/orig',
    '/img/1366',
    '/img/1024',
    '.aws',
    '.sass',
    '.git',
    '.gitignore',
    '.idea', 
]

def create_img(orig, target, size, compress):
    # convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% source.jpg result.jpg
    print " - Converting %s to img/%s/%s" % (orig, size, target)
    cmd1 = 'convert img/orig/%s -resize %sx img/%s/%s' % (orig, size, size, target)
    os.system(cmd1)

    if compress:	
        # Compress jpg
        # http://stackoverflow.com/questions/7261855/recommendation-for-compress-jpg-files-with-image-magick
        path = 'img/%s/%s' % (size, target)
        cmd2 = 'convert -strip -interlace Plane -gaussian-blur 0.05 -quality 70%% %s %s' % (path, path)
        os.system(cmd2)


def create(size):
    print "Creating images for size %s" % size

    # Ensure that the directory exists
    try:
        os.makedirs('img/%s' % size)
    except:
        pass

    for img in IMAGES:
        create_img(img[0], img[1], size, img[2])
    print "Done!"


def uglify():
    SCRIPTS = [
        ('js/jquery.scrollTo-1.4.3.1-min.js', False),
        ('js/jquery.parallax-1.1.3.js', True),
        ('js/slides.min.jquery-1.2.0.js', False),
        ('js/jara.js', True)
    ]

    result = '.build/jara.min.js'
    if not os.path.exists('.build/js'):
        os.makedirs('.build/js')

    for s in SCRIPTS:
        print "Processing: ", s[0]
        os.system('uglifyjs -nc %(scripts)s > .build/%(scripts)s-min' % {'scripts':s[0]})
        os.system('cat .build/%s-min >> %s && echo "" >> %s' % (s[0], result, result))

    os.system('cp %s js/jara.min.js' % result)
    os.system('rm -Rf .build')


def upload(dir_local): 
    """
    Uploading the shebang
    """
    from boto.s3.connection import S3Connection
    from boto.s3.key import Key
    
    parser = SafeConfigParser()
    parser.read(['.aws'])
    access_key = parser.get('main', 'access_key')
    secret_key = parser.get('main', 'secret_key')

    conn = S3Connection(access_key, secret_key)
    bucket = conn.lookup('steakhousejara.be')

    # Expires in 42 years
    expires = datetime.utcnow() + timedelta(days=(42 * 365))
    expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")

    def is_exclude(stripped):
        for e in EXCLUDES:
            if e in stripped:
                return True
        return False

    def is_in_diff(stripped):
        files = diff()
        for f in files:
            if f in stripped:
                return True
        return False

    for path, dir, files in os.walk(dir_local):
        for file in files:
            filename = path + "/" + file
            stripped = filename.replace(dir_local + '/', '/')

            if not is_exclude(stripped) and is_in_diff(stripped): 
                print " - ", stripped
                fileHandle = open(filename)
                headers = {}

                # Handle ACL, headers: content-type & vary
                if '/img' in stripped:
                    headers["Expires"] = expires

                upload = Key(bucket)
                upload.key = stripped
                upload.set_contents_from_file(fileHandle, headers, replace=True)
                upload.set_acl('public-read')

    print "Upload '" + dir_local + "' done..."


def diff():
    from git import *
    repo = Repo('.')
    h = repo.head.commit
    loop = h.diff('HEAD~1')
    files = []

    for l in loop:
        files.append(l.a_blob.path)
        #pprint(help(l))
    return files

if __name__ == "__main__":
    #create(1920)
    upload('.')
    #uglify()