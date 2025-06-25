import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
from preprocessing import TextPreprocessor  

df = pd.read_csv("grievance_data.csv")  

# Features
X = df['complaint_text']

# --------------------------
# Train department model
# --------------------------
y_dept = df['department']
X_train, X_test, y_train, y_test = train_test_split(X, y_dept, test_size=0.2, random_state=42)

dept_pipeline = Pipeline([
    ('preprocess', TextPreprocessor()),
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
    ('clf', LogisticRegression(max_iter=1000))
])

dept_pipeline.fit(X_train, y_train)

# Save department pipeline
with open("models/dept_pipeline.pkl", "wb") as f:
    pickle.dump(dept_pipeline, f)

print("Department model saved.")

# --------------------------
# Train urgency model
# --------------------------
y_urgency = df['urgency']
X_train, X_test, y_train, y_test = train_test_split(X, y_urgency, test_size=0.2, random_state=42)

urgency_pipeline = Pipeline([
    ('preprocess', TextPreprocessor()),
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2))),
    ('clf', LogisticRegression(max_iter=1000))
])

urgency_pipeline.fit(X_train, y_train)

# Save urgency pipeline
with open("models/urgency_pipeline.pkl", "wb") as f:
    pickle.dump(urgency_pipeline, f)

print("Urgency model saved.")
