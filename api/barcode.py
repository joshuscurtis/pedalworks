import requests
import re
import html
import sys
from bs4 import BeautifulSoup
import json
from http.server import BaseHTTPRequestHandler

def getBarcode(part_number):
    url = "https://www.rutlandcycling.com/facetresults.aspx?Term="+part_number
    regex = "var universal_pageType = \'product\'; var universal_product =([^|]+);<"

    print(url)
    headers1 = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
        }

    raw = requests.get(url, headers=headers1)
    soup = BeautifulSoup(raw.content, "html.parser")
    title = soup.title.text
    body = raw.content.decode('utf-8')
    x = re.search(regex, body)
    data = x.group(1)
    data = json.loads(data)

    attributes = data["attributes"]

    for attribute in attributes:
        if (attribute['code'] == part_number):
            return (attribute['barcode'])


class handler(BaseHTTPRequestHandler):

    def do_GET(self):

        path = self.path
        sku = path[17:]
        barcode = "none"

        try:
            barcode = getBarcode(sku)
        except:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write("sku not found".encode())
            return

        print("SKU: " + sku)

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(barcode.encode())
        return
