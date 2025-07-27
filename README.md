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

### Website
<img width="1919" height="1037" alt="image" src="https://github.com/user-attachments/assets/f3b2af37-0adb-4fdd-b3b5-0e8395478f5a" />
<img width="1919" height="1035" alt="image" src="https://github.com/user-attachments/assets/ee006ceb-389b-4859-bbb4-758e9c4f7e14" />
<img width="1919" height="1035" alt="image" src="https://github.com/user-attachments/assets/53ba7dfe-d730-4411-b454-1daa726c15c7" />
<img width="1919" height="1036" alt="image" src="https://github.com/user-attachments/assets/a44af243-0363-4618-8dc7-4ed5ec94a5a6" />
<img width="1919" height="1036" alt="image" src="https://github.com/user-attachments/assets/84ce6967-1059-4f74-a896-d18ad50f590f" />
<img width="1919" height="1040" alt="image" src="https://github.com/user-attachments/assets/855e80dc-d384-4dad-ba23-d54af5c1934e" />

### AWS Console
<img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/d7ee431e-ed2f-4704-9f04-fb7d84c6a8b2" />




## 🧠 Future Improvements

Add real-time notifications for complaint status

Use transformer-based models (BERT) for better classification

Implement role-based access for multiple departments

Add analytics dashboard for admins

## 📄 License
This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.
