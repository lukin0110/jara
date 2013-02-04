from google.appengine.ext import webapp
from google.appengine.ext.webapp import template

class IndexPage(webapp.RequestHandler):
    def get(self):
        values = {}
        self.response.out.write(template.render('templates/index.html', values))

