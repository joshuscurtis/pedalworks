import requests
import re
import html
import sys
from bs4 import BeautifulSoup
import json
from http.server import BaseHTTPRequestHandler


def finder(pn):
    try:
        pn = pn
        url = "https://www.trekbikes.com/gb/en_GB/search/?text="+pn
        print(url)
        headers1 = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}

        raw = requests.get(url, headers=headers1)
        soup = BeautifulSoup(raw.content, "html.parser")
        print(soup.title.text)
        title = soup.title.text.split('|')
        print()
        print("----------INTRO----------------")

        s = raw.text
        matches = re.findall('copy-positioning-statement="(.+)"', s)
        print(html.unescape(matches[0]))
        print()

        print("----------MAIN----------------")

        para1 = soup.select_one('#overview > div:nth-child(1) > p')
        print(para1.text)
        print()

        para2 = soup.select_one('#overview > div:nth-child(2) > p')
        print(para2.text)
        print()

        para3 = soup.select_one('#overview > div:nth-child(3) > p')
        print(para3.text)
        print()

        print("----------FEATURES----------------")
        features = soup.find_all('li', class_='mb-1 pl-4')

        for feature in features:
            print(feature.text)
            print("<li>"+feature.text+"</li>"+"\n")
            print()
        print("</ul>"+"\n")
        print("<p>"+para2.text+"</p>"+"\n")
        print("<p>"+para3.text+"</p>"+"\n")
    except:
        print('not a bike')
    try:
        access = soup.select_one(
            '#overview > div.cell.small-12.medium-6.mb-2 > div')
        print("<p>" + access.text + "</p>")
        a_features = soup.find_all(
            'li', class_='prod-overview__key-features__orderedlist-items')
        print("<h3>" + title[0] + "Best Features</h3>")
        for feature in a_features:
            print(feature.text)
            print("<li>"+feature.text+"</li>"+"\n")
            print()

    except:
        print('not a accessorey!')
        print("Unexpected error:", sys.exc_info())




class handler(BaseHTTPRequestHandler):

    def do_GET(self):

        finder(123)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Cache-Control', 's-maxage=5, stale-while-revalidate=2629743')
        self.end_headers()
        self.wfile.write("hello".encode())
        return
