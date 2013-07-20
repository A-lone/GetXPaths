#!\Python27\python

import json, sys
from bs4 import BeautifulSoup as Soup
import urllib2, re
from bottle import route, run, default_app, request, template
from bottle import static_file
result = {'success': 'true'}
from bottle import SimpleTemplate
application = default_app()
SimpleTemplate.defaults["get_url"] = application.get_url

# get url and post back the html, if not posted return the default
@application.post('/a')
def build_page():
    if request.json is not None and request.json["newURL"] != "":
        baseHTML = request.json["newURL"]
    elif request.json is not None and request.json["site_link"] != "":
        pass  # decide what to do next, and also save the data from request.json
    else:
        baseHTML = 'http://forums.macrumors.com/showthread.php?p=3850337'

    user_agent = "Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)"  # Or any valid user agent from a real browser
    headers = {"User-Agent": user_agent}
    req = urllib2.Request(baseHTML, headers=headers)

    forumHTML = urllib2.urlopen(req)

    page = Soup(forumHTML)

    for e in page.findAll('script'):
        e.extract()

    return str(page)

@route('/static/<filename>', name='static')
def send_static(filename):
    return static_file(filename, root='static')

#  get dic and save its
@route('/')
def index():
    output = template('C:\\xampp\\htdocs\\GetXPathsProject\\views\\GetTags.tpl')
    return output

run(application, host='localhost', port=8080, debug=True)
