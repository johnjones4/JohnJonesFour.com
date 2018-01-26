---
layout: project
title: "Jekyll AddThis"
github: "AdferoInteractive/jekyll-addthis"
description: "This simple Jekyll plugin generates links to AddThis' sharing endpoint service."
type: minor
---

This simple Jekyll plugin generates links to [AddThis' sharing endpoint service](http://support.addthis.com/customer/portal/articles/381265-addthis-sharing-endpoints#.UsxoUGRDtDI). The module does not introduce any Javascript functionality or CSS styling to the share links; it simply generates the HTML markup leaving styling and Javascript functionality to site builders.

### Installation and Usage

1. Place addthis.rb in your `<root>/_plugins` directory so that Jekyll can load it
2. In `_config.yml`, add the sample config shown below.
1. To create AddThis links in markup, use the following liquid tag: `{{ "{%" }} share_link service %}` where
    - `service` is the one of the [AddThis destinations](http://www.addthis.com/services/list).
    
### Sample _config.yml

```
addthis:
  pubid: XZY-ID
  image: /path/to/share/img
```
