#!\Python27\python
# enable debugging
import cgitb

cgitb.enable()
import sys, json
from bs4 import BeautifulSoup as Soup
import urllib2

baseHTML = 'http://forums.macrumors.com/showthread.php?p=3850337'

user_agent = "Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)"  # Or any valid user agent from a real browser
headers = {"User-Agent": user_agent}
req = urllib2.Request(baseHTML, headers=headers)

forumHTML = urllib2.urlopen(req)

page = Soup(forumHTML)

for e in page.findAll('script'):
    e.extract()

print 'Content-Type: text/plain\r'
print '\r'
print page