##loads trained .pkl models and defines a function to predict department + urgency
import pickle
from preprocessing import TextPreprocessor

def load_models():
    with open("models/dept_pipeline.pkl", "rb") as f:
        dept_model = pickle.load(f)
    with open("models/urgency_pipeline.pkl", "rb") as f:
        urgency_model = pickle.load(f)
    return dept_model, urgency_model

def predict(text, dept_model, urgency_model):
    dept = dept_model.predict([text])[0]
    urgency = urgency_model.predict([text])[0]
    return {"department": dept, "urgency": urgency}