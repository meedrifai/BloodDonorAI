# api.py
from flask import Flask, request, jsonify
from flask import render_template
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import os
import sys
sys.path.append(os.path.abspath('.'))

app = Flask(__name__)

# Charger le modèle et le scaler
try:
    model = joblib.load("data/xgboost_model.pkl")
    scaler = joblib.load("data/scaler.pkl")
    print("Modèle et scaler chargés avec succès!")
except Exception as e:
    print(f"Erreur lors du chargement du modèle ou du scaler: {e}")
    model = None
    scaler = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Modèle ou scaler non chargé correctement'}), 500
    
    try:
        # Récupérer les données JSON de la requête
        data = request.get_json()
        
        # Vérifier que toutes les caractéristiques nécessaires sont présentes
        required_features = ['Recency', 'Frequency', 'Monetary', 'Time']
        for feature in required_features:
            if feature not in data:
                return jsonify({'error': f'Le champ {feature} est manquant'}), 400
        
        # Convertir les données en DataFrame
        input_df = pd.DataFrame([data])
        
        # Prétraiter les données (normalisation)
        input_scaled = scaler.transform(input_df)
        
        # Faire la prédiction
        prediction = model.predict(input_scaled)[0]
        prediction_proba = model.predict_proba(input_scaled)[0]
        
        # Retourner le résultat
        result = {
            'prediction': int(prediction),
            'prediction_text': 'Donneur probable' if prediction == 1 else 'Non donneur probable',
            'probability': float(prediction_proba[1])  # Probabilité de la classe positive (1)
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Modèle ou scaler non chargé correctement'}), 500
    
    try:
        # Récupérer les données JSON de la requête
        data = request.get_json()
        
        if not isinstance(data, list):
            return jsonify({'error': 'Les données doivent être une liste d\'objets'}), 400
        
        # Convertir les données en DataFrame
        input_df = pd.DataFrame(data)
        
        # Vérifier que toutes les caractéristiques nécessaires sont présentes
        required_features = ['Recency', 'Frequency', 'Monetary', 'Time']
        for feature in required_features:
            if feature not in input_df.columns:
                return jsonify({'error': f'Le champ {feature} est manquant'}), 400
        
        # Prétraiter les données (normalisation)
        input_scaled = scaler.transform(input_df)
        
        # Faire les prédictions
        predictions = model.predict(input_scaled).tolist()
        prediction_proba = model.predict_proba(input_scaled).tolist()
        
        # Préparer les résultats
        results = []
        for i, pred in enumerate(predictions):
            results.append({
                'prediction': int(pred),
                'prediction_text': 'Donneur probable' if pred == 1 else 'Non donneur probable',
                'probability': float(prediction_proba[i][1])  # Probabilité de la classe positive (1)
            })
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)