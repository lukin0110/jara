#!/usr/bin/env python
# Upload the entire static website to s3 using fabric and boto
import os

IMAGES = [
    ('Cow-Wallpaper-cows-26941954-1680-1050.jpg', 'cow1.jpg'),
    ('cow-wallpapers_2560x1600.jpg', 'cow2.jpg'),
    ('7doev.jpg', 'steak1.jpg'),
    ('mg_4493.jpg', 'steak2.jpg'),
    ('DSCF0268[1].JPG', 'terrace1.jpg'),
    ('DSCF0342.JPG', 'terrace2.jpg'),
    ('DSCF0345.JPG', 'terrace3.jpg'),
    ('perfect_marinade_steak.jpg', 'welcome.jpg'),
    ('perfect_marinade_steak2.png', 'welcome2.jpg'),
]


def create_img(orig, target, size):
    # convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% source.jpg result.jpg
    print " - Converting %s to img/%s/%s" % (orig, size, target)
    cmd1 = 'convert img/orig/%s -resize %sx img/%s/%s' % (orig, size, size, target)

    # Compress jpg
    # http://stackoverflow.com/questions/7261855/recommendation-for-compress-jpg-files-with-image-magick
    path = 'img/%s/%s' % (size, target)
    cmd2 = 'convert -strip -interlace Plane -gaussian-blur 0.05 -quality 70%% %s %s' % (path, path)
    os.system(cmd1)
    os.system(cmd2)


def create(size):
    print "Creating images for size %s" % size

    # Ensure that the directory exists
    try:
        os.makedirs('img/%s' % size)
    except:
        pass

    for img in IMAGES:
        create_img(img[0], img[1], size)
    print "Done!"


if __name__ == "__main__":
    create(1920)

