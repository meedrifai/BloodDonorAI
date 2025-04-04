# 🩸 BloodPredictAI

> Predict blood donation behavior using Machine Learning and empower health services to optimize donation campaigns.  
> 🔬 Built with Python + Flask (API) and ReactJS (UI) — for the OpportunAI Hackathon 2025.

## 🚀 Project Overview

**BloodPredictAI** is an intelligent system that predicts whether a donor will give blood, based on their historical behavior.  
It provides a web interface for health workers to input donor data and receive predictions instantly.

## 🧠 Architecture

 🖥️ **Frontend** (ReactJS): Input form for donor details  
- 🔙 **API** (Flask/FastAPI): Receives data, sends it to ML model  
- 🧠 **ML Model** (Scikit-learn): Predicts donation likelihood  
- 📂 **Dataset** (CSV): Historical donation records

## 📦 Features

- 📊 Data exploration and visualization
- 🤖 Machine Learning training and evaluation
- 🌐 REST API for real-time prediction
- 🖥️ Clean and simple ReactJS web UI
- 🔒 Scalable and modular codebase

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| 🧠 ML Model | scikit-learn, pandas |
| 🔙 API | Flask or FastAPI |
| 🖥️ UI Frontend | ReactJS, TailwindCSS |
| 📦 Packaging | Docker (optional), GitHub |

## 🧪 Getting Started

1. Clone the repo
```bash
git clone https://github.com/yourusername/BloodPredictAI.git
cd BloodPredictAI
```

2. Backend Setup (Flask)
```bash
cd api
pip install -r requirements.txt
python app.py  # runs on http://localhost:5000
```

3. Frontend Setup (ReactJS)
```bash
cd ui
npm install
npm run dev  # runs on http://localhost:5173 (Vite)
```

## 🧱 Folder Structure

```
BloodPredictAI/
├── api/                # Flask/FastAPI backend
│   ├── app.py
│   ├── model/
│   └── utils/
├── ui/                 # ReactJS frontend
│   ├── src/
│   └── public/
├── notebooks/          # Jupyter exploration
├── data/               # Raw dataset
├── README.md
└── requirements.txt
```

## 🧠 Machine Learning Model

- **Input**: Donor behavior features (recency, frequency, volume, time)
- **Output**: Binary prediction (Will Donate / Will Not Donate)
- **Models tested**: Logistic Regression, Random Forest, XGBoost

## 📊 UI Snapshot
*Coming Soon*: A clean interface for quick predictions and usability by health agents.

## 📈 Roadmap

- [x] Dataset exploration & preprocessing
- [x] Model training & evaluation
- [x] Build & test API with Flask
- [x] Build UI in ReactJS
- [ ] Connect frontend ↔ backend
- [ ] Final polish & deployment

## 📜 License
MIT — For educational and hackathon purposes only.

---

🩸 Let's use AI to support donation centers and save lives.  
— Made with ❤️ by khaliha 3ala lah.