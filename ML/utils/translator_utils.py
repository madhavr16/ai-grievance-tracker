from langdetect import detect
from googletrans import Translator

translator = Translator()

def detect_language(text):
    try:
        return detect(text)
    except:
        return "unknown"
    
def translate_to_english(text):
    lang = detect_language(text)
    if lang != "en":
        try:    
            translated = translator.translate(text, src=lang, dest='en')
            return translated.text
        except:
            return text
    return text