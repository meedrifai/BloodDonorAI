import pandas as pd
import pickle
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

# Télécharger les stopwords français
nltk.download('stopwords')
stop_words_fr = stopwords.words('french')

# Chargement des données d'entraînement
df = pd.read_csv("data/faq_data.csv")  # Assure-toi que ce fichier existe

# Création du modèle pipeline
vectorizer = TfidfVectorizer(stop_words=stop_words_fr)
model = LogisticRegression()
pipeline = make_pipeline(vectorizer, model)

# Entraînement du modèle
X = df['question']
y = df['intent']
pipeline.fit(X, y)

# Sauvegarde du modèle entraîné
with open("app/model.pkl", "wb") as f:
    pickle.dump(pipeline, f)

print("✅ Modèle entraîné et sauvegardé avec succès.")
