import os
import requests

def photo_to_name_url(photo): 
  return (
    "%s-%s" % (photo["id"], photo["secret"]),
    "https://farm%d.staticflickr.com/%s/%s_%s_n.jpg" % (photo["farm"], photo["server"], photo["id"], photo["secret"]),
    "https://farm%d.staticflickr.com/%s/%s_%s_h.jpg" % (photo["farm"], photo["server"], photo["id"], photo["secret"])
  )

def get_photo_urls():
  r = requests.get("https://api.flickr.com/services/rest/", params={
    "api_key": os.getenv("FLICKR_API_KEY"),
    "method": "flickr.people.getPublicPhotos",
    "format": "json",
    "user_id": "28315761@N06",
    "per_page": 500,
    "nojsoncallback": True
  })
  data = r.json()
  if "photos" in data:
    return list(map(photo_to_name_url, data["photos"]["photo"]))
  return []

def download_and_save(url, name, size):
  filename = "./img/photography/%s-%s.jpg" % (name, size)
  r = requests.get(url, stream=True)
  with open(filename, 'wb') as fd:
    for chunk in r.iter_content(chunk_size=128):
      fd.write(chunk)

def save_photos(names_urls):
  for (name, thumb, large) in names_urls:
    download_and_save(thumb, name, "thumb")
    download_and_save(large, name, "large")

def build_html(names_urls):
  list_html = []
  for (name, _, _) in names_urls:
    list_html.append("<div class=\"grid-item\"><a href=\"/img/photography/%s-large.jpg\" data-lity data-lity-desc=\"%s\"><img src=\"/img/photography/%s-thumb.jpg\" alt=\"%s\" /></a></div>" % (name, name, name, name))
  return "<div class=\"grid\">\n  <div class=\"grid-sizer\"></div>\n  " + "\n  ".join(list_html) + "\n</div>\n"

def write_html(html):
  f = open("./_includes/gallery.html", "w")
  f.write("---\nlayout: wide_page\ntitle: Photography\nslug: photography\nscripts:\n  - https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js\n  - https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js\n  - /js/lity.min.js\n  - /js/photography.js\n---\n\n")
  f.write(html)
  f.close()

names_urls = get_photo_urls()
save_photos(names_urls)
html = build_html(names_urls)
write_html(html)
