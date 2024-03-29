import requests
import re
import html
import sys
from bs4 import BeautifulSoup
import json
from http.server import BaseHTTPRequestHandler

def verseGrab():
    url = 'https://www.bible.com/en-GB/verse-of-the-day'
    headers = {
        'User-Agent': 'My User Agent 1.0',
        'From': 'youremail@domain.com'  # This is another valid field
    }
    cookies = {'version': '111'}


    
    response = requests.get(url, headers=headers, cookies=cookies)
    title_search = re.search('<meta property=og:description content="(((.|\n)*))"><meta property=tw', str(response.content), re.IGNORECASE)
    soup = BeautifulSoup(response.content, 'html.parser')
    todaysVerseContent = soup.find_all('p', class_='yv-gray50 mt0 mb2')[0].text.replace("\n", " ")
    todaysVerse = soup.find_all('p', class_='usfm fw7 mt0 mb0 yv-gray25 f7 ttu')[0].text.replace("\n", " ")
    print(todaysVerseContent)
    print(todaysVerse)
    verse = {}
    verse['content'] = todaysVerseContent
    verse['ref'] = todaysVerse
    return verse



class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        data = verseGrab()
        jsonData = json.dumps(data)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Cache-Control', 's-maxage=5, stale-while-revalidate=2629743')
        self.end_headers()
        self.wfile.write(jsonData.encode())
        return
