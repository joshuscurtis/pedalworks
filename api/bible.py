import requests
import re

from bs4 import BeautifulSoup

url = 'https://www.bible.com/en-GB/verse-of-the-day'

headers = {
    'User-Agent': 'My User Agent 1.0',
    'From': 'youremail@domain.com'  # This is another valid field
}

response = requests.get(url, headers=headers)

title_search = re.search('<meta property=og:description content="(((.|\n)*))"><meta property=tw', str(response.content), re.IGNORECASE)

soup = BeautifulSoup(response.content, 'html.parser')

todaysVerseContent = soup.find_all('p', class_='yv-gray50 mt0 mb2')[0].text.replace("\n", " ")
todaysVerse = soup.find_all('p', class_='usfm fw7 mt0 mb0 yv-gray25 f7 ttu')[0].text.replace("\n", " ")

print(todaysVerseContent)
print(todaysVerse)

verse = {}

verse['content'] = todaysVerseContent
verse['ref'] = todaysVerse

print(verse)
