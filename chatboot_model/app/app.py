from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS  # Pour autoriser les requêtes du frontend React

# Charger le pipeline (vectorizer + modèle)
with open("app/model.pkl", "rb") as f:
    model = pickle.load(f)

intent_responses = {
    "DébutConversation":"Bienvenue ! Je suis là pour répondre à toutes vos questions concernant le don de sang. N'hésitez pas à me demander ce qui vous intéresse.",
    
    "FinConversation":"Merci d'avoir discuté avec moi aujourd'hui. N'hésitez pas à revenir si vous avez d'autres questions sur le don de sang. Bonne journée !",
    
    "DouleurDon": "Le don de sang provoque généralement une légère piqûre, mais il ne fait pas vraiment mal. La plupart des donneurs ressentent seulement un inconfort momentané lors de l'insertion de l'aiguille. Après le don, certaines personnes peuvent avoir un léger bleu ou une sensibilité au site de ponction.",
    
    "NombreDonsAnnuels": "Vous pouvez donner votre sang jusqu'à 4 fois par an pour les hommes et 3 fois pour les femmes. Cette différence s'explique par les réserves en fer, naturellement plus importantes chez les hommes.",
    
    "ConditionsDon": "Vous devez être en bonne santé, âgé de 18 à 65 ans et peser au moins 50 kg. Certaines situations peuvent entraîner un report temporaire du don : tatouage récent (4 mois), voyage dans certains pays, intervention chirurgicale, grossesse, etc. Un entretien médical préalable déterminera votre aptitude au don.",
    
    "ConduireApresDon": "Oui, vous pouvez conduire après avoir donné du sang, mais il est recommandé de se reposer au moins 15 minutes après le don et de s'hydrater correctement. Si vous vous sentez faible ou étourdi, attendez que ces sensations disparaissent avant de prendre le volant.",
    
    "PrecautionsAvantDon": "Avant de donner votre sang, assurez-vous d'être bien hydraté, d'avoir mangé normalement et d'être bien reposé. Évitez l'alcool dans les 24 heures précédant le don. Portez des vêtements confortables avec des manches faciles à relever. N'oubliez pas de vous munir d'une pièce d'identité.",
    
    "HorairesDon": "Les centres de don du sang sont généralement ouverts du lundi au vendredi de 8h à 19h et le samedi de 8h à 13h. Certains centres peuvent avoir des horaires élargis. Nous vous recommandons de vérifier les horaires exacts du centre près de chez vous sur notre site web ou en appelant directement le centre.",
    
    "AlimentationAvantDon": "Il est fortement recommandé de manger avant un don de sang. Ne venez pas à jeun, cela pourrait provoquer un malaise. Prenez un repas léger et hydratez-vous bien (eau, jus de fruits) dans les heures précédant votre don. Évitez les aliments trop gras et l'alcool.",
    
    "FrequenceDon": "Pour un don de sang total, il faut respecter un délai minimum de 8 semaines (56 jours) entre chaque don. Pour le don de plasma, l'intervalle est de 2 semaines, et pour le don de plaquettes, 4 semaines. Ces délais permettent à votre organisme de reconstituer ses réserves.",
    
    "DureeDon": "Le prélèvement sanguin lui-même dure environ 10 minutes. Cependant, le processus complet (accueil, questionnaire, entretien médical, prélèvement et repos) prend environ 45 minutes à 1 heure lors d'une première visite, et environ 30 minutes pour les donneurs réguliers.",
    
    "TestsSanguins": "Après chaque don, votre sang est systématiquement analysé pour déterminer votre groupe sanguin et rhésus, ainsi que pour détecter d'éventuelles maladies infectieuses comme l'hépatite B et C, le VIH, la syphilis et d'autres virus. Ces tests garantissent la sécurité du receveur.",
    
    "MalaiseApresDon": "Si vous ressentez un malaise après avoir donné du sang, allongez-vous immédiatement avec les jambes surélevées. Signalez-le au personnel médical présent. Hydratez-vous et mangez quelque chose de sucré. Ne quittez pas le centre avant de vous sentir complètement rétabli. En cas de malaise une fois rentré chez vous, contactez le centre de don.",
    
    "GrossesseAllaitementDon": "Le don de sang est contre-indiqué pendant la grossesse et pendant les 6 mois suivant l'accouchement. Pour les femmes qui allaitent, il est recommandé d'attendre la fin de l'allaitement avant de donner son sang. Ces précautions visent à protéger la santé de la mère et de l'enfant.",
    
    "MedicamentsDon": "Certains médicaments peuvent temporairement empêcher le don de sang, notamment les antibiotiques récents, les anticoagulants, certains traitements dermatologiques comme l'isotrétinoïne, ou des médicaments pour la prostate. Les contraceptifs, les traitements pour l'hypertension stabilisée ou les antidépresseurs sont généralement compatibles avec le don.",
    
    "ProcedureDonSang": "Le processus de don comprend : l'accueil et l'enregistrement, le remplissage d'un questionnaire de santé, un entretien médical confidentiel, le prélèvement de sang (environ 470 ml), et une collation obligatoire de 15-20 minutes. L'ensemble de la procédure dure environ 45 minutes pour un premier don.",
    
    "UtilisationSang": "Le sang collecté est utilisé pour des transfusions lors d'hémorragies (accidents, chirurgies, accouchements), pour traiter des maladies comme les cancers ou l'anémie, et pour fabriquer des médicaments dérivés du sang. Tous les groupes sanguins sont nécessaires, mais les groupes O négatif (donneur universel) et A positif sont particulièrement demandés.",
    
    "RendezVousDon": "Vous pouvez prendre rendez-vous pour un don de sang en ligne sur notre site web, via notre application mobile, par téléphone, ou directement au centre de don. Bien que le rendez-vous soit recommandé pour réduire votre temps d'attente, de nombreux centres acceptent également les donneurs sans rendez-vous.",
    
    "SportApresDon": "Il est déconseillé de pratiquer une activité physique intense dans les 24 heures suivant un don de sang. Évitez particulièrement la natation, le vélo, la course à pied intensive ou la musculation lourde. Ces précautions permettent à votre organisme de récupérer et d'éviter les vertiges ou malaises liés à la baisse temporaire du volume sanguin."
}

app = Flask(__name__)
CORS(app)  # Active le CORS


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    question = data.get("message")

    if not question:
        return jsonify({"error": "Veuillez fournir une question."}), 400

    intent = model.predict([question])[0]
    response = intent_responses.get(intent, "Je n'ai pas compris, réessayez.")

    return jsonify({
        "intent": intent,
        "response": response
    })

if __name__ == "__main__":
    app.run(debug=True)
