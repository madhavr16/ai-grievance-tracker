FROM python:3.11-slim

WORKDIR /app
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python -m spacy download en_core_web_sm

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
