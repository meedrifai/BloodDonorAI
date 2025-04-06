# src/preprocessing/preprocess.py

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

def load_data(filepath):
    """Charge le fichier CSV et renomme les colonnes."""
    df = pd.read_csv(filepath)
    df.columns = ['Recency', 'Frequency', 'Monetary', 'Time', 'Target']
    df.columns = df.columns.str.strip()
    return df

def preprocess_data(df):
    """Sépare les features et la cible, applique une standardisation."""
    X = df.drop('Target', axis=1)
    y = df['Target']
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y, scaler

def split_data(X, y, test_size=0.2, random_state=42):
    """Divise les données en ensembles d'entraînement et de test."""
    return train_test_split(X, y, test_size=test_size, stratify=y, random_state=random_state)
