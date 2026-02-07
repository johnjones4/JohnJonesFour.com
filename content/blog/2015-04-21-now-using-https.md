---

title:  "JohnJonesFour Now Using HTTPS"
description: "Using a free SSL certificate from StartSSL, I've updated this site to default to HTTPS."
---

Using a free Class 1 SSL certificate from [StartSSL](https://www.startssl.com/) and a great tutorial provided by Bryce Fisher-Fleig called [Setting Up SSL on AWS CloudFront and S3](https://bryce.fisher-fleig.org/blog/setting-up-ssl-on-aws-cloudfront-and-s3/), I was able to update JohnJonesFour to support HTTPS as the default protocol. While my site does not directly collect or share any private data, I wanted give both StartSSL and CloudFront's SSL support a try.

From StartSSL's site, here're the details on what a free Class 1 SSL certificate get's you:

> The StartSSL™ Free (Class 1) certificates are domain or email validated and mostly referred to as the free certificates. Because the checks are performed mostly by electronic means, they require only minimal human intervention from our side. The validations are here to make sure, that the subscriber is the owner of the domain name, resp. email account. You may find additional information on this subject in our CA policy. 

> The StartSSL™ Free certificates are intended for web sites which require protection of privacy and prevent eavesdropping. However information presented within these certificates, except the domain name and email address, are not verified. Should you need higher validated certification, please check out our StartSSL™ Verified (Class 2) certificates. 

> 100% Free The StartCom Certification Authority, provides the StartSSL™ Free certificates instantly, without limitations and free of charge under the condition, that the subscriber provides his/her complete, correct personal details and accepts the Subscriber Obligations of the StartCom CA Policy. Secure your web server and mail traffic now by using the Certificate Control Panel.

[Source: https://www.startssl.com/?app=1](https://www.startssl.com/?app=1)
