import os
import md5
from PIL import Image

photos_dir = os.path.expanduser("~/Dropbox/John/Film Scans")

def get_photo_paths():
  out_paths = []
  folders = os.listdir(photos_dir)
  for folder in folders:
    if folder[0] != '.':
      folder_path = os.path.join(photos_dir, folder)
      year = int(folder[0:2])
      month = int(folder[2:4])
      caption = folder[5:].replace("_", " ")
      photos = os.listdir(folder_path)
      for photo in photos:
        photo_path = os.path.join(folder_path, photo)
        m = md5.new()
        m.update(photo_path)
        hashed_name = m.hexdigest()
        out_paths.append((photo_path, year, month, caption, hashed_name))
  out_paths.sort(key=lambda tup: (-tup[1], -tup[2], tup[0]))
  return out_paths

def build_html(photos):
  list_html = []
  for (_, _, _, caption, hashed_name) in photos:
    list_html.append("<div class=\"grid-item\"><a href=\"/img/photography/%s.jpg\" data-lity data-lity-desc=\"%s\"><img src=\"/img/photography/%s_thumb.jpg\" alt=\"%s\" /></a></div>" % (hashed_name, caption, hashed_name, caption))
  return "<div class=\"grid\">\n  <div class=\"grid-sizer\"></div>\n  " + "\n  ".join(list_html) + "\n</div>\n"

def write_html(html):
  f = open("../photography.html", "w")
  f.write("---\nlayout: wide_page\ntitle: Photography\nslug: photography\nscripts:\n  - https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js\n  - https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js\n  - /js/lity.min.js\n  - /js/photography.js\n---\n\n")
  f.write(html)
  f.close()

def process_images(photos):
  thumb_out_width = 400
  higres_out_width = 2000
  for (path, _, _, _, hashed_name) in photos:
    im = Image.open(path)
    thumb_out_height = int((float(thumb_out_width) / float(im.size[0])) * im.size[1])
    higres_out_height = int((float(higres_out_width) / float(im.size[0])) * im.size[1])
    thumb = im.resize((thumb_out_width, thumb_out_height))
    thumb.save("../img/photography/%s_thumb.jpg" % hashed_name, "JPEG")
    highres = im.resize((higres_out_width, higres_out_height))
    highres.save("../img/photography/%s.jpg" % hashed_name, "JPEG")

photos = get_photo_paths()
html = build_html(photos)
write_html(html)
process_images(photos)