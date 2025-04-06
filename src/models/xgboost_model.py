# src/models/xgboost_model.py

import xgboost as xgb
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

def train_xgboost(X_train, y_train):
    """Entraîne un modèle XGBoost sur les données."""
    model = xgb.XGBClassifier(
        objective='binary:logistic',
        eval_metric='logloss',
        use_label_encoder=False,
        random_state=42
    )
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    """Affiche les métriques d'évaluation."""
    y_pred = model.predict(X_test)
    print("✅ Accuracy:", accuracy_score(y_test, y_pred))
    print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))
    print("\n🧱 Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

def save_model(model, path="xgboost_model.pkl"):
    """Sauvegarde le modèle XGBoost entraîné."""
    joblib.dump(model, path)
    print(f"💾 Modèle XGBoost sauvegardé dans : {path}")

def load_model(path="xgboost_model.pkl"):
    """Charge un modèle XGBoost sauvegardé."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"Modèle introuvable à l’emplacement : {path}")
    return joblib.load(path)
