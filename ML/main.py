##fast api app with endpoint /predict to accept and respond to user complaints
from fastapi.middleware.cors import CORSMiddleware
import pickle 
from fastapi import FastAPI
from pydantic import BaseModel, Field
from utils.model_utils import load_models, predict

dept_model, urgency_model = load_models()

##creating fastapi app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-grievance-tracker.vercel.app/"],  # or specify ["http://localhost:3000"] for frontend dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Complaint(BaseModel):
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r'^\d{10}$')
    description: str
    location: str

# @app.post("/predict")
# def classify_complaint(data: Complaint):
#     result = predict(data.description, dept_model, urgency_model)
#     return {
#         "complaint_text": data.description,
#         "predicted_department": result["department"],
#         "predicted_urgency": result["urgency"]
#     }

from utils.translator_utils import translate_to_english
from utils.ner_utils import extract_entities

@app.post("/predict")
def get_prediction(data: Complaint):
    translated_description = translate_to_english(data.description)
    result = predict(translated_description, dept_model, urgency_model)

    entities = extract_entities(translated_description)

    result.update({
        "name": data.name,
        "phone": data.phone,
        "location": data.location,
        "original_description": data.description,
        "translated_description": translated_description,
        "predicted_department": result["department"],
        "predicted_urgency": result["urgency"],
        "entities": entities
    })
    return result

