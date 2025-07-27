# 🏛 AI Grievance Tracker

An **AI-powered complaint management system** built with **React (frontend)**, **Node.js + Express (backend)**, **FastAPI (ML service)**, and **MongoDB**.  
The platform automatically categorizes complaints, predicts urgency, and helps government departments resolve issues faster.

---

## 🚀 Features

- **User Authentication** (JWT-based login & registration)
- **Submit Complaints** with auto-detected department & urgency
- **NLP & ML Integration** using FastAPI for:
  - Department prediction
  - Urgency classification
  - Named Entity Recognition (NER)
  - Auto-translation of complaints
- **Admin Dashboard** to manage complaints
- **Dockerized Microservices** for easy deployment
- **MongoDB** for storing user complaints and metadata

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS

### **Backend**
- Node.js + Express
- JWT Authentication
- MongoDB with Mongoose

### **ML Service**
- FastAPI (Python)
- spaCy / scikit-learn for NLP
- Translation & entity recognition

### **Deployment**
- Docker & Docker Compose
- Nginx for reverse proxy
- Works on AWS EC2

---

## 📦 Project Structure

<img width="399" height="219" alt="image" src="https://github.com/user-attachments/assets/662f1546-5dea-4023-bc98-7426cd19f6aa" />


---

## ⚙️ Installation & Setup

### **1. Clone the repo**
```bash
git clone https://github.com/<your-username>/ai-grievance-tracker.git
cd ai-grievance-tracker
```
### **2. Add Environment Variables**

#### Create a .env file in the server/ folder:
```bash
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://mongo:27017/grievanceDB
```
### **3. Start with Docker Compose**
```bash
docker-compose up --build
```

## 🖥 Screenshots
<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/324de9f1-b921-4f87-89cb-60dbdaaf3fda" />
<img width="1919" height="1033" alt="image" src="https://github.com/user-attachments/assets/95ead597-a9d9-4877-a7b1-0dc6224ab0f5" />
<img width="1919" height="1031" alt="image" src="https://github.com/user-attachments/assets/219bd1de-07dd-4df1-968a-43463d57b389" />

## 🧠 Future Improvements

Add real-time notifications for complaint status

Use transformer-based models (BERT) for better classification

Implement role-based access for multiple departments

Add analytics dashboard for admins

## 📄 License
This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.
