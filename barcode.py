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


print(getBarcode("YQBY7I55SB"))

