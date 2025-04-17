const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Base de données simplifiée des régions, délégations, communes et hôpitaux
const regions = [
  {
    region: "Tanger-Tetouan-Al Hoceima",
    delegations: [
      {
        delegation: "Al Hoceima",
        communes: [
          {
            commune: "Al Hoceima (Mun.)",
            hopitaux: ["Hôpital Mohamed V"],
          },
          {
            commune: "Imzouren (Mun.)",
            hopitaux: ["Hôpital Imzouren"],
          },
        ],
      },
      {
        delegation: "Chefchaouen",
        communes: [
          {
            commune: "Chefchaouen (Mun.)",
            hopitaux: ["Hôpital Mohamed V"],
          },
        ],
      },
      {
        delegation: "Larache",
        communes: [
          {
            commune: "Ksar El Kebir (Mun.)",
            hopitaux: ["Hôpital Ksar El Kebir"],
          },
          {
            commune: "Larache (Mun.)",
            hopitaux: ["Hôpital Lalla Meriem"],
          },
        ],
      },
      {
        delegation: "Ouzzane",
        communes: [
          {
            commune: "Ouezzane (Mun.)",
            hopitaux: ["Hôpital Abou Kacem Zahraoui"],
          },
        ],
      },
      {
        delegation: "Tanger Assilah",
        communes: [
          {
            commune: "Assilah",
            hopitaux: ["Hôpital Assilah"],
          },
          {
            commune: "Bni Makada (Arrond.)",
            hopitaux: ["Hôpital Mohammed VI"],
          },
          {
            commune: "Al Madina (Arrond.)",
            hopitaux: [
              "Hôpital Mohamed V",
              "Hôpital Al Kortobi",
              "Hôpital Duc De Tovar",
            ],
          },
          {
            commune: "Gueznaia (Mun.)",
            hopitaux: ["Hôpital des spécialités Mohamed VI"],
          },
        ],
      },
      {
        delegation: "Tetouan",
        communes: [
          {
            commune: "Tétouan (Mun.)",
            hopitaux: ["Hôpital Civil"],
          },
          {
            commune: "Dar Bni Karrich",
            hopitaux: ["Hôpital Ben Karrich"],
          },
        ],
      },
      {
        delegation: "Mdiq-Fnideq",
        communes: [
          {
            commune: "Fnideq (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
          {
            commune: "M'Diq (Mun.)",
            hopitaux: ["Hôpital Mohammed VI"],
          },
        ],
      },
    ],
  },
  {
    region: "Oriental",
    delegations: [
      {
        delegation: "Berkane",
        communes: [
          {
            commune: "Berkane (Mun.)",
            hopitaux: ["Hôpital Edderak"],
          },
          {
            commune: "Saidia (Mun.)",
            hopitaux: ["Hôpital Saidia"],
          },
        ],
      },
      {
        delegation: "Driouch",
        communes: [
          {
            commune: "Driouch (Mun.)",
            hopitaux: ["Hôpital Driouch"],
          },
        ],
      },
      {
        delegation: "Figuig",
        communes: [
          {
            commune: "Bouarfa (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
        ],
      },
      {
        delegation: "Guersif",
        communes: [
          {
            commune: "Guercif (Mun.)",
            hopitaux: ["Hôpital Guercif"],
          },
        ],
      },
      {
        delegation: "Jerada",
        communes: [
          {
            commune: "Laaouinate",
            hopitaux: ["Hôpital Jrada"],
          },
        ],
      },
      {
        delegation: "Nador",
        communes: [
          {
            commune: "Al Aaroui (Mun.)",
            hopitaux: ["Hôpital Mohammed VI"],
          },
          {
            commune: "Nador (Mun.)",
            hopitaux: ["Hôpital Hassani"],
          },
          {
            commune: "Zaio (Mun.)",
            hopitaux: ["Hôpital Zaio"],
          },
        ],
      },
      {
        delegation: "Oujda Angad",
        communes: [
          {
            commune: "Oujda (Mun.)",
            hopitaux: ["Hôpital Al Farabi", "Hôpital des Spécialités"],
          },
          {
            commune: "Sidi Moussa Lemhaya",
            hopitaux: ["Centre d'oncoligie Hassan II"],
          },
        ],
      },
      {
        delegation: "Taourirt",
        communes: [
          {
            commune: "El Aioun Sidi Mellouk (Mun.)",
            hopitaux: ["Hôpital El Aioun Sidi Mellouk"],
          },
        ],
      },
    ],
  },
  {
    region: "Fès-Meknès",
    delegations: [
      {
        delegation: "Meknes",
        communes: [
          {
            commune: "Meknès (Mun.)",
            hopitaux: [
              "Hôpital Sidi Said",
              "Hôpital Mohamed V",
              "Hôpital Pagnon",
              "Hôpital Moulay Ismail",
            ],
          },
        ],
      },
      {
        delegation: "Boulemane",
        communes: [
          {
            commune: "Missour (Mun.)",
            hopitaux: ["Hôpital Marche Verte"],
          },
          {
            commune: "Outat El Haj (Mun.)",
            hopitaux: ["Hôpital S. Ahmed B. Driss Missouri"],
          },
        ],
      },
      {
        delegation: "El Hajeb",
        communes: [
          {
            commune: "El Hajeb (Mun.)",
            hopitaux: ["Hôpital Prince My Hassan"],
          },
        ],
      },
      {
        delegation: "Fes",
        communes: [
          {
            commune: "Agdal (Arrond.)",
            hopitaux: ["Hôpital Al Ghassani", "Hôpital Ibn Al Baitar"],
          },
          {
            commune: "Saiss (Arrond.)",
            hopitaux: ["Hôpital des spécialités"],
          },
          {
            commune: "Fès-Médina (Arrond.)",
            hopitaux: ["Hôpital Omar Drissi"],
          },
          {
            commune: "El Mariniyine (Arrond.)",
            hopitaux: ["Hôpital Ibn Al Hassan"],
          },
        ],
      },
      {
        delegation: "Ifrane",
        communes: [
          {
            commune: "Azrou (Mun.)",
            hopitaux: ["Hôpital 20 Aout (Azrou)"],
          },
        ],
      },
      {
        delegation: "Sefrou",
        communes: [
          {
            commune: "Sefrou (Mun.)",
            hopitaux: ["Hôpital Mohamed V"],
          },
        ],
      },
      {
        delegation: "Taounate",
        communes: [
          {
            commune: "Ghafsai (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
          {
            commune: "Taounate (Mun.)",
            hopitaux: ["Hôpital Taounate"],
          },
        ],
      },
      {
        delegation: "Taza",
        communes: [
          {
            commune: "Taza (Mun.)",
            hopitaux: ["Hôpital Ibn Baja"],
          },
        ],
      },
    ],
  },
  {
    region: "Rabat-Salé-Kénitra",
    delegations: [
      {
        delegation: "Kenitra",
        communes: [
          {
            commune: "Kénitra (Mun.)",
            hopitaux: ["Hôpital Al Idrissi"],
          },
        ],
      },
      {
        delegation: "Khemisset",
        communes: [
          {
            commune: "Khémisset (Mun.)",
            hopitaux: ["Hôpital Khémisset"],
          },
        ],
      },
      {
        delegation: "Rabat",
        communes: [
          {
            commune: "Agdal Riyad (Arrond.)",
            hopitaux: [
              "Hôpital Ibs Sina",
              "Hôpital Des Spécialités",
              "Maternité Souissi",
              "Hôpital Med Ben Abdellah",
            ],
          },
          {
            commune: "Hassan (Arrond.)",
            hopitaux: ["Hôpital Moulay Youssef"],
          },
        ],
      },
      {
        delegation: "Salé",
        communes: [
          {
            commune: "Bab Lamrissa (Arrond.)",
            hopitaux: ["Hôpital El Ayachi"],
          },
          {
            commune: "Hssaine (Arrond.)",
            hopitaux: ["Hôpital Moulay Abdellah (Hôp.préféctoral)"],
          },
          {
            commune: "Tabriquet (Arrond.)",
            hopitaux: ["Hôpital Arrazi"],
          },
        ],
      },
      {
        delegation: "Sidi kacem",
        communes: [
          {
            commune: "Sidi Kacem (Mun.)",
            hopitaux: ["Hôpital Sidi Kacem"],
          },
        ],
      },
      {
        delegation: "Sidi Slimane",
        communes: [
          {
            commune: "Sidi Slimane (Mun.)",
            hopitaux: ["Hôpital Sidi Slimane"],
          },
        ],
      },
      {
        delegation: "Skhirate-Temara",
        communes: [
          {
            commune: "Témara (Mun.)",
            hopitaux: ["Hôpital Princesse Lalla Aicha"],
          },
        ],
      },
    ],
  },
  {
    region: "Béni Mellal-Khénifra",
    delegations: [
      {
        delegation: "Azilal",
        communes: [
          {
            commune: "Azilal (Mun.)",
            hopitaux: ["Hôpital Haut Atlas Central"],
          },
        ],
      },
      {
        delegation: "Béni Mellal",
        communes: [
          {
            commune: "Béni Mellal (Mun.)",
            hopitaux: ["Hôpital Beni Mellal"],
          },
          {
            commune: "Kasba Tadla (Mun.)",
            hopitaux: ["Hôpital Moulay Ismail"],
          },
        ],
      },
      {
        delegation: "Fkih Ben Saleh",
        communes: [
          {
            commune: "Fquih Ben Salah (Mun.)",
            hopitaux: ["Hôpital Fquih Ben Salah"],
          },
        ],
      },
      {
        delegation: "Khenifra",
        communes: [
          {
            commune: "Khenifra (Mun.)",
            hopitaux: ["Hôpital Khenifra"],
          },
          {
            commune: "Bejaad (Mun.)",
            hopitaux: ["Hôpital Mohamed VI"],
          },
        ],
      },
      {
        delegation: "Khouribga",
        communes: [
          {
            commune: "Khouribga (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
          {
            commune: "Oued Zem (Mun.)",
            hopitaux: ["Hôpital Oued Zem"],
          },
        ],
      },
    ],
  },
  {
    region: "Casablanca-Settat",
    delegations: [
      {
        delegation: "Benslimane",
        communes: [
          {
            commune: "Benslimane (Mun.)",
            hopitaux: ["Hôpital Benslimane (Hassan II)"],
          },
        ],
      },
      {
        delegation: "Berrechid",
        communes: [
          {
            commune: "Berrechid (Mun.)",
            hopitaux: ["Hôpital Berrechid"],
          },
        ],
      },
      {
        delegation: "El Jadida",
        communes: [
          {
            commune: "El Jadida (Mun.)",
            hopitaux: ["Hôpital Mohamed V"],
          },
          {
            commune: "Azemmour",
            hopitaux: ["Hôpital Azemmour"],
          },
        ],
      },
      {
        delegation: "Mediouna",
        communes: [
          {
            commune: "Mediouna (Mun.)",
            hopitaux: ["Hôpital Mediouna"],
          },
        ],
      },
      {
        delegation: "Mohammedia",
        communes: [
          {
            commune: "Mohammedia (Mun.)",
            hopitaux: ["Hôpital My Abdellah"],
          },
        ],
      },
      {
        delegation: "Nouacer",
        communes: [
          {
            commune: "Bouskoura (Mun.)",
            hopitaux: ["Hôpital Bouskoura"],
          },
          {
            commune: "Dar Bouazza (Mun.)",
            hopitaux: ["Hôpital Prince My Hassan"],
          },
        ],
      },
      {
        delegation: "Settat",
        communes: [
          {
            commune: "Settat (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
        ],
      },
      {
        delegation: "Sidi Bennour",
        communes: [
          {
            commune: "Sidi Bennour (Mun.)",
            hopitaux: ["Hôpital Sidi Bennour"],
          },
          {
            commune: "Zemamra (Mun.)",
            hopitaux: ["Hôpital Zmamra"],
          },
        ],
      },
      {
        delegation: "Casablanca Anfa",
        communes: [
          {
            commune: "El Maarif (Arrond.)",
            hopitaux: ["Hôpital 20 Aout 1953", "Hôpital Ibn Rochd"],
          },
          {
            commune: "Sidi Belyout (Arrond.)",
            hopitaux: ["Hôpital My Youssef"],
          },
        ],
      },
      {
        delegation: "Al Fida-Mers Sultan",
        communes: [
          {
            commune: "Al-Fida (Arrond.)",
            hopitaux: ["Hôpital Mohamed Baouafi"],
          },
        ],
      },
      {
        delegation: "Aïn Sebaâ-Hay Mohammadi",
        communes: [
          {
            commune: "Hay Mohammadi (Arrond.)",
            hopitaux: ["Hôpital Mohamed V"],
          },
        ],
      },
      {
        delegation: "Hay Hassani",
        communes: [
          {
            commune: "Hay-Hassani (Arrond.)",
            hopitaux: ["Hôpital El Hassani"],
          },
        ],
      },
      {
        delegation: "Aïn Chok",
        communes: [
          {
            commune: "Aîn-Chock (Arrond.)",
            hopitaux: ["Hôpital Mohamed Sekkat"],
          },
        ],
      },
      {
        delegation: "Sidi Bernoussi",
        communes: [
          {
            commune: "Sidi Bernoussi (Arrond.)",
            hopitaux: ["Hôpital Al Mansour"],
          },
        ],
      },
      {
        delegation: "Ben Msick",
        communes: [
          {
            commune: "Ben M'Sick (Arrond.)",
            hopitaux: ["Hôpital Ben M'Sick"],
          },
        ],
      },
      {
        delegation: "Moulay Rachid",
        communes: [
          {
            commune: "Sidi Othmane (Arrond.)",
            hopitaux: ["Hôpital Sidi Othmane"],
          },
        ],
      },
    ],
  },
  {
    region: "Marrakech-Safi",
    delegations: [
      {
        delegation: "Al Haouz",
        communes: [
          {
            commune: "Tahannaout (Mun.)",
            hopitaux: ["Hôpital Mohammed VI"],
          },
        ],
      },
      {
        delegation: "Chichaoua",
        communes: [
          {
            commune: "Chichaoua (Mun.)",
            hopitaux: ["Hôpital Mohammed VI"],
          },
        ],
      },
      {
        delegation: "El Kelaa Des Sraghna",
        communes: [
          {
            commune: "El Kelaâ des Sraghna (Mun.)",
            hopitaux: ["Hôpital Assalama"],
          },
        ],
      },
      {
        delegation: "Essaouira",
        communes: [
          {
            commune: "Essaouira (Mun.)",
            hopitaux: ["Hôpital Sidi Med Ben Abdellah"],
          },
        ],
      },
      {
        delegation: "Marrakech",
        communes: [
          {
            commune: "Gueliz (Arrond.)",
            hopitaux: [
              "Hôpital Ibn Tofeil",
              "Hôpital Ibn Nafis",
              "Hôpital Arrazi",
            ],
          },
          {
            commune: "Marrakech-Médina (Arrond.)",
            hopitaux: ["Hôpital Ibn Zohr", "Hôpital El Antaki"],
          },
          {
            commune: "Ménara (Arrond.)",
            hopitaux: ["Hôpital Mhamid"],
          },
          {
            commune: "Sidi Youssef Ben Ali (Arrond.)",
            hopitaux: ["Hôpital Charifa"],
          },
          {
            commune: "Saada",
            hopitaux: ["Hôpital Saada"],
          },
        ],
      },
      {
        delegation: "Rehamena",
        communes: [
          {
            commune: "Ben Guerir (Mun.)",
            hopitaux: ["Hôpital Ben Guerir"],
          },
        ],
      },
      {
        delegation: "Safi",
        communes: [
          {
            commune: "Safi (Mun.)",
            hopitaux: ["Hôpital Mohamed V"],
          },
        ],
      },
      {
        delegation: "Youssoufia",
        communes: [
          {
            commune: "Youssoufia (Mun.)",
            hopitaux: ["Hôpital Lalla Hasna"],
          },
        ],
      },
    ],
  },
  {
    region: "Drâa-Tafilalet",
    delegations: [
      {
        delegation: "Errachidia",
        communes: [
          {
            commune: "Arfoud (Mun.)",
            hopitaux: ["Hôpital Sghiri Houmman I Ben Maati"],
          },
          {
            commune: "Errachidia (Mun.)",
            hopitaux: [
              "Hôpital My Ali Cherif",
              "Hôpital Amir Soultan Ibn Abdelaziz",
            ],
          },
        ],
      },
      {
        delegation: "Midelt",
        communes: [
          {
            commune: "Midelt (Mun.)",
            hopitaux: ["Hôpital Midelt"],
          },
        ],
      },
      {
        delegation: "Ouarzazate",
        communes: [
          {
            commune: "Ouarzazate (Mun.)",
            hopitaux: ["Hôpital Sidi Hssain Bencer", "Hôpital Bougafer"],
          },
        ],
      },
      {
        delegation: "Tinghir",
        communes: [
          {
            commune: "Kalaat M'Gouna (Mun.)",
            hopitaux: ["Hôpital HPr Kalaat M'gouna"],
          },
          {
            commune: "Tinghir (Mun.)",
            hopitaux: ["Hôpital Tinghir"],
          },
        ],
      },
      {
        delegation: "Zagora",
        communes: [
          {
            commune: "Zagora (Mun.)",
            hopitaux: ["Hôpital Ed-Derrak"],
          },
        ],
      },
    ],
  },
  {
    region: "Souss-Massa",
    delegations: [
      {
        delegation: "Agadir Ida Ou Tanane",
        communes: [
          {
            commune: "Agadir (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
        ],
      },
      {
        delegation: "Chtouka Ait Baha",
        communes: [
          {
            commune: "Biougra (Mun.)",
            hopitaux: ["Hôpital Mokhtar Soussi"],
          },
        ],
      },
      {
        delegation: "Inezgane Ait Melloul",
        communes: [
          {
            commune: "Inezgane (Mun.)",
            hopitaux: ["Hôpital Inezgane"],
          },
        ],
      },
      {
        delegation: "Taroudant",
        communes: [
          {
            commune: "Oulad Teima (Mun.)",
            hopitaux: ["Hôpital Oulad Teima"],
          },
          {
            commune: "Taroudannt (Mun.)",
            hopitaux: ["Hôpital Mokhtar Es-Soussi"],
          },
        ],
      },
      {
        delegation: "Tata",
        communes: [
          {
            commune: "Tata (Mun.)",
            hopitaux: ["Hôpital Tata"],
          },
        ],
      },
      {
        delegation: "Tiznit",
        communes: [
          {
            commune: "Tiznit (Mun.)",
            hopitaux: ["Hôpital Houmman El Fatouaki", "Hôpital Hassan 1er"],
          },
        ],
      },
    ],
  },
  {
    region: "Guelmim-Oued Noun",
    delegations: [
      {
        delegation: "Assa-zag",
        communes: [
          {
            commune: "Assa (Mun.)",
            hopitaux: ["Hôpital Assa"],
          },
        ],
      },
      {
        delegation: "Guelmim",
        communes: [
          {
            commune: "Bouizakarne (Mun.)",
            hopitaux: ["Hôpital Bouizakaren"],
          },
          {
            commune: "Guelmim (Mun.)",
            hopitaux: ["Hôpital Guelmim"],
          },
        ],
      },
      {
        delegation: "Sidi Ifni",
        communes: [
          {
            commune: "Sidi Ifni (Mun.)",
            hopitaux: ["Hôpital Sidi Ifni"],
          },
        ],
      },
      {
        delegation: "Tan Tan",
        communes: [
          {
            commune: "Tan Tan (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
        ],
      },
    ],
  },
  {
    region: "Laayoune-Sakia El Hamra",
    delegations: [
      {
        delegation: "Boujdour",
        communes: [
          {
            commune: "Boujdour (Mun.)",
            hopitaux: ["Hôpital Boujdour"],
          },
        ],
      },
      {
        delegation: "Es Semara",
        communes: [
          {
            commune: "Es-semara (Mun.)",
            hopitaux: ["Hôpital Es-Smara"],
          },
        ],
      },
      {
        delegation: "Laayoune",
        communes: [
          {
            commune: "Laayoune (Mun.)",
            hopitaux: [
              "Hôpital My Hassan Ben El Mehdi",
              "Hôpital Hassan II",
              "Hôpital Laayoune",
            ],
          },
        ],
      },
    ],
  },
  {
    region: "Eddakhla-Oued Eddahab",
    delegations: [
      {
        delegation: "Oued Ed-Dahab",
        communes: [
          {
            commune: "Dakhla (Mun.)",
            hopitaux: ["Hôpital Hassan II"],
          },
        ],
      },
      {
        delegation: "Aousserd",
        communes: [
          {
            commune: "Aousserd (Mun.)",
            hopitaux: ["Hôpital Aousserd"],
          },
        ],
      },
    ],
  },
];

// Fonction utilitaire pour extraire les paramètres des contextes
function getParametersFromContexts(contexts, paramName) {
  if (!contexts || !Array.isArray(contexts)) return null;

  for (const context of contexts) {
    if (context.parameters && context.parameters[paramName]) {
      return context.parameters[paramName];
    }
  }
  return null;
}

// Fonction utilitaire pour extraire tous les paramètres pertinents des contextes
function getAllParametersFromContexts(contexts) {
  const params = {};

  if (!contexts || !Array.isArray(contexts)) return params;

  for (const context of contexts) {
    if (context.parameters) {
      // Utiliser le dernier paramètre trouvé (le plus récent)
      if (context.parameters.region) params.region = context.parameters.region;
      if (context.parameters.delegation)
        params.delegation = context.parameters.delegation;
      if (context.parameters.commune)
        params.commune = context.parameters.commune;
    }
  }

  return params;
}

// Fonction pour mettre à jour ou créer un contexte
function setOutputContext(res, name, lifespan, parameters = {}) {
  // Vérifier si la réponse a déjà un tableau outputContexts
  if (!res.body) res.body = {};
  if (!res.body.outputContexts) res.body.outputContexts = [];

  // Nom complet du contexte avec le projet et la session
  const contextName = `projects/${process.env.DIALOGFLOW_PROJECT_ID}/agent/sessions/${process.env.DIALOGFLOW_SESSION_ID}/contexts/${name}`;

  // Vérifier si le contexte existe déjà
  const existingContextIndex = res.body.outputContexts.findIndex(
    (ctx) => ctx.name === contextName
  );

  if (existingContextIndex !== -1) {
    // Mettre à jour le contexte existant
    res.body.outputContexts[existingContextIndex].lifespanCount = lifespan;
    res.body.outputContexts[existingContextIndex].parameters = {
      ...res.body.outputContexts[existingContextIndex].parameters,
      ...parameters,
    };
  } else {
    // Créer un nouveau contexte
    res.body.outputContexts.push({
      name: contextName,
      lifespanCount: lifespan,
      parameters: parameters,
    });
  }
}

// Fonction pour afficher les résultats des hôpitaux
function afficherResultatsHopitaux(res, region, delegation, commune) {
  console.log(
    `Recherche d'hôpitaux pour: ${region.region} > ${delegation.delegation} > ${commune.commune}`
  );

  const hopitaux = commune.hopitaux || [];

  let messageReponse;
  if (hopitaux.length > 0) {
    messageReponse = `Voici les centres de don de sang disponibles à ${commune.commune} :\n\n`;
    hopitaux.forEach((hopital, index) => {
      messageReponse += `${index + 1}. ${hopital.nom}\n   Adresse: ${
        hopital.adresse
      }\n   Tél: ${hopital.telephone}\n\n`;
    });
    messageReponse +=
      "Avez-vous besoin d'autres informations sur le don de sang?";
  } else {
    // Pas d'hôpitaux trouvés dans cette commune
    messageReponse = `Désolé, nous n'avons pas trouvé de centres de don de sang à ${commune.commune}. Voulez-vous chercher dans une autre commune de la délégation ${delegation.delegation}?`;
  }

  // Mettre à jour le contexte utilisateur avec toutes les informations
  const userParams = {
    region: region.region,
    delegation: delegation.delegation,
    commune: commune.commune,
  };

  // Conserver ces informations pour une future utilisation
  setOutputContext(res, "donnees-utilisateur", 10, userParams);

  return res.json({
    fulfillmentText: messageReponse,
  });
}

// Endpoint pour le webhook de Dialogflow
app.post("/webhook", (req, res) => {
  console.log("Requête reçue:", JSON.stringify(req.body));

  // Initialiser la réponse
  res.body = {};

  // Vérifications de sécurité
  if (!req.body) {
    console.error("Le corps de la requête est vide");
    return res.status(400).json({ error: "Corps de la requête vide" });
  }

  if (!req.body.queryResult) {
    console.error("queryResult n'est pas présent dans le corps de la requête");
    console.error("Corps reçu:", req.body);
    return res.status(400).json({ error: "Format de requête invalide" });
  }

  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;
  const contexts = req.body.queryResult.outputContexts || [];

  console.log("Intent:", intent);
  console.log("Parameters:", parameters);
  console.log("Query Text:", req.body.queryResult.queryText);
  console.log("Output Contexts:", contexts);

  // Extraire les paramètres existants pour éviter les questions répétées
  const savedParams = getAllParametersFromContexts(contexts);
  console.log("Paramètres existants:", savedParams);

  // Gestion de l'intent principal de recherche d'hôpitaux
  if (intent === "RechercheHopitaux") {
    // Vérifier si nous avons déjà des informations de localisation

    // Si nous avons déjà la région, délégation ET commune, afficher directement les résultats
    if (savedParams.region && savedParams.delegation && savedParams.commune) {
      const region = regions.find((r) =>
        r.region.toLowerCase().includes(savedParams.region.toLowerCase())
      );
      if (region) {
        const delegation = region.delegations.find((d) =>
          d.delegation
            .toLowerCase()
            .includes(savedParams.delegation.toLowerCase())
        );
        if (delegation) {
          const commune = delegation.communes.find((c) =>
            c.commune.toLowerCase().includes(savedParams.commune.toLowerCase())
          );
          if (commune) {
            return afficherResultatsHopitaux(res, region, delegation, commune);
          }
        }
      }
    }

    // Si nous avons déjà la région ET délégation, passer directement à la commune
    if (savedParams.region && savedParams.delegation) {
      const region = regions.find((r) =>
        r.region.toLowerCase().includes(savedParams.region.toLowerCase())
      );
      if (region) {
        const delegation = region.delegations.find((d) =>
          d.delegation
            .toLowerCase()
            .includes(savedParams.delegation.toLowerCase())
        );
        if (delegation) {
          const communes = delegation.communes.map((c) => c.commune).join("\n");

          // Sauvegarder les informations connues
          setOutputContext(res, "donnees-utilisateur", 10, {
            region: region.region,
            delegation: delegation.delegation,
          });

          return res.json({
            fulfillmentText: `Pour le don de sang dans ${delegation.delegation}, dans quelle commune êtes-vous? Choisissez parmi:\n\n${communes}`,
          });
        }
      }
    }

    // Si nous avons déjà la région, passer directement à la délégation
    if (savedParams.region) {
      const region = regions.find((r) =>
        r.region.toLowerCase().includes(savedParams.region.toLowerCase())
      );
      if (region) {
        const delegations = region.delegations
          .map((d) => d.delegation)
          .join("\n");

        // Sauvegarder la région connue
        setOutputContext(res, "donnees-utilisateur", 10, {
          region: region.region,
        });

        return res.json({
          fulfillmentText: `Pour le don de sang dans la région ${region.region}, dans quelle délégation êtes-vous? Choisissez parmi:\n\n${delegations}`,
        });
      }
    }

    // Sinon, commencer par demander la région
    setOutputContext(res, "attente-region", 5);
    return res.json({
      fulfillmentText:
        "Pour vous indiquer les centres de don de sang, j'ai besoin de quelques informations. Dans quelle région du Maroc êtes-vous situé? Choisissez parmi les régions suivantes:\n\n" +
        regions.map((r) => r.region).join("\n"),
    });
  }

  // Gestion de la sélection de région
  if (intent === "RechercheHopitaux-region") {
    // Récupérer le nom de la région depuis les paramètres
    const regionNom = parameters.region;

    // Rechercher la région dans notre base de données
    const region = regions.find((r) =>
      r.region.toLowerCase().includes(regionNom.toLowerCase())
    );

    if (!region) {
      return res.json({
        fulfillmentText:
          "Je ne reconnais pas cette région. Veuillez choisir parmi les régions officielles du Maroc.",
      });
    }

    // Sauvegarder la région dans le contexte utilisateur
    setOutputContext(res, "donnees-utilisateur", 10, {
      region: region.region,
    });

    // Définir le contexte pour l'étape suivante
    setOutputContext(res, "attente-delegation", 5);

    // Vérifier si nous avons déjà des informations de délégation dans les contextes
    if (savedParams.delegation) {
      const delegation = region.delegations.find((d) =>
        d.delegation
          .toLowerCase()
          .includes(savedParams.delegation.toLowerCase())
      );
      if (delegation) {
        // Mettre à jour le contexte avec la région et la délégation
        setOutputContext(res, "donnees-utilisateur", 10, {
          region: region.region,
          delegation: delegation.delegation,
        });

        // Si nous avons aussi la commune, passer directement aux résultats
        if (savedParams.commune) {
          const commune = delegation.communes.find((c) =>
            c.commune.toLowerCase().includes(savedParams.commune.toLowerCase())
          );
          if (commune) {
            return afficherResultatsHopitaux(res, region, delegation, commune);
          }
        }

        // Sinon, demander la commune
        const communes = delegation.communes.map((c) => c.commune).join("\n");
        return res.json({
          fulfillmentText: `Dans quelle commune de la délégation ${delegation.delegation} êtes-vous? Choisissez parmi:\n\n${communes}`,
        });
      }
    }

    const delegations = region.delegations.map((d) => d.delegation).join("\n");

    return res.json({
      fulfillmentText: `Dans quelle délégation de ${region.region} êtes-vous? Choisissez parmi:\n\n${delegations}`,
    });
  }

  // Gestion de la sélection de délégation
  if (intent === "RechercheHopitaux-region-delegation") {
    // Utiliser la région des contextes ou des paramètres actuels
    const regionNom = savedParams.region || parameters.region;
    const delegationNom = parameters.delegation;

    console.log("Région trouvée dans contexte:", regionNom);
    console.log("Délégation de la requête:", delegationNom);

    // Vérifier si la région est valide
    if (!regionNom) {
      setOutputContext(res, "attente-region", 5);
      return res.json({
        fulfillmentText:
          "Je n'ai pas d'information sur votre région. Veuillez d'abord indiquer dans quelle région vous vous trouvez.",
      });
    }

    // Trouver la région
    const region = regions.find((r) =>
      r.region.toLowerCase().includes(regionNom.toLowerCase())
    );
    if (!region) {
      setOutputContext(res, "attente-region", 5);
      return res.json({
        fulfillmentText:
          "Je ne trouve pas cette région. Pourriez-vous indiquer à nouveau votre région parmi les suivantes:\n\n" +
          regions.map((r) => r.region).join("\n"),
      });
    }

    // Trouver la délégation
    const delegation = region.delegations.find((d) =>
      d.delegation.toLowerCase().includes(delegationNom.toLowerCase())
    );
    if (!delegation) {
      // Conserver la région mais demander à nouveau la délégation
      setOutputContext(res, "donnees-utilisateur", 10, {
        region: region.region,
      });
      setOutputContext(res, "attente-delegation", 5);

      return res.json({
        fulfillmentText: `Je ne trouve pas cette délégation dans la région ${
          region.region
        }. Veuillez choisir parmi:\n\n${region.delegations
          .map((d) => d.delegation)
          .join("\n")}`,
      });
    }

    // Mettre à jour le contexte avec la région et la délégation
    setOutputContext(res, "donnees-utilisateur", 10, {
      region: region.region,
      delegation: delegation.delegation,
    });

    // Définir le contexte pour l'étape suivante
    setOutputContext(res, "attente-commune", 5);

    // Vérifier si nous avons déjà des informations de commune dans les contextes
    if (savedParams.commune) {
      const commune = delegation.communes.find((c) =>
        c.commune.toLowerCase().includes(savedParams.commune.toLowerCase())
      );
      if (commune) {
        // Passer directement aux résultats
        return afficherResultatsHopitaux(res, region, delegation, commune);
      }
    }

    const communes = delegation.communes.map((c) => c.commune).join("\n");

    return res.json({
      fulfillmentText: `Dans quelle commune de la délégation ${delegation.delegation} êtes-vous? Choisissez parmi:\n\n${communes}`,
    });
  }

  // Gestion de la sélection de commune
  if (intent === "RechercheHopitaux-region-delegation-commune") {
    // Extraire tous les paramètres nécessaires
    const regionNom = savedParams.region || parameters.region;
    const delegationNom = savedParams.delegation || parameters.delegation;
    const communeNom = parameters.commune;

    console.log("Région trouvée dans contexte:", regionNom);
    console.log("Délégation trouvée dans contexte:", delegationNom);
    console.log("Commune de la requête:", communeNom);

    // Vérifier si nous avons toutes les informations nécessaires
    if (!regionNom || !delegationNom) {
      // Recommencer depuis le début
      setOutputContext(res, "attente-region", 5);
      return res.json({
        fulfillmentText:
          "Je n'ai pas toutes les informations nécessaires. Recommençons. Dans quelle région êtes-vous situé?",
      });
    }

    // Trouver la région
    const region = regions.find((r) =>
      r.region.toLowerCase().includes(regionNom.toLowerCase())
    );
    if (!region) {
      setOutputContext(res, "attente-region", 5);
      return res.json({
        fulfillmentText: "Je ne trouve pas cette région. Veuillez réessayer.",
      });
    }

    // Trouver la délégation
    const delegation = region.delegations.find((d) =>
      d.delegation.toLowerCase().includes(delegationNom.toLowerCase())
    );
    if (!delegation) {
      // Conserver la région mais demander à nouveau la délégation
      setOutputContext(res, "donnees-utilisateur", 10, {
        region: region.region,
      });
      setOutputContext(res, "attente-delegation", 5);

      return res.json({
        fulfillmentText:
          "Je ne trouve pas cette délégation. Veuillez choisir parmi:\n\n" +
          region.delegations.map((d) => d.delegation).join("\n"),
      });
    }

    // Trouver la commune
    const commune = delegation.communes.find((c) =>
      c.commune.toLowerCase().includes(communeNom.toLowerCase())
    );
    if (!commune) {
      // Conserver la région et la délégation mais demander à nouveau la commune
      setOutputContext(res, "donnees-utilisateur", 10, {
        region: region.region,
        delegation: delegation.delegation,
      });
      setOutputContext(res, "attente-commune", 5);

      return res.json({
        fulfillmentText: `Je ne trouve pas cette commune dans la délégation ${
          delegation.delegation
        }. Veuillez choisir parmi:\n\n${delegation.communes
          .map((c) => c.commune)
          .join("\n")}`,
      });
    }

    // Mettre à jour le contexte complet
    setOutputContext(res, "donnees-utilisateur", 10, {
      region: region.region,
      delegation: delegation.delegation,
      commune: commune.commune,
    });

    // Afficher les résultats
    return afficherResultatsHopitaux(res, region, delegation, commune);
  }

  // Gestion de la demande d'information sur le don de sang
  if (intent === "InformationDonSang") {
    return res.json({
      fulfillmentText:
        "Le don de sang est un geste simple qui sauve des vies. Voici quelques informations importantes :\n\n" +
        "- Vous devez avoir entre 18 et 65 ans\n" +
        "- Peser au moins 50 kg\n" +
        "- Être en bonne santé\n" +
        "- Ne pas être à jeun\n" +
        "- Le don dure environ 45 minutes au total\n\n" +
        "Voulez-vous trouver un centre de don près de chez vous?",
    });
  }

  // Gestion des questions sur les procédures de don
  if (intent === "ProcedureDonSang") {
    return res.json({
      fulfillmentText:
        "Pour le don de sang au Maroc, voici la procédure:\n1. Accueil et enregistrement (pièce d'identité nécessaire)\n2. Questionnaire médical confidentiel\n3. Entretien avec un médecin pour confirmer l'aptitude au don\n4. Prélèvement sanguin (environ 450 ml, dure 8-10 minutes)\n5. Repos et collation (15-20 minutes minimum)\n6. Vous recevrez les résultats de votre groupe sanguin\n\nLe processus complet prend environ 45 minutes à 1 heure.",
    });
  }

  // Gestion des questions sur les conditions pour donner
  if (intent === "ConditionsDon") {
    return res.json({
      fulfillmentText:
        "Pour donner votre sang au Maroc, vous devez:\n- Être âgé de 18 à 65 ans\n- Peser au moins 50 kg\n- Être en bonne santé\n- Ne pas être à jeun\n- Ne pas avoir d'infection en cours\n- Ne pas avoir eu de comportement à risque\n- Respecter les délais entre deux dons (minimum 2 mois)\n\nCertaines situations peuvent entraîner un report temporaire ou permanent du don, comme une grossesse récente, certains voyages, certains traitements médicaux, etc.",
    });
  }

  // Gestion des questions sur la fréquence des dons
  if (intent === "FrequenceDon") {
    return res.json({
      fulfillmentText:
        "Au Maroc, vous devez respecter un délai minimum de 2 mois (8 semaines) entre deux dons de sang total. Les hommes peuvent donner jusqu'à 6 fois par an, et les femmes jusqu'à 4 fois par an.",
    });
  }

  // Gestion des questions sur l'âge pour donner
  if (intent === "AgeDon") {
    return res.json({
      fulfillmentText:
        "Au Maroc, vous pouvez donner votre sang si vous avez entre 18 et 65 ans. Pour un premier don, la limite est généralement fixée à 60 ans.",
    });
  }

  // Gestion des questions sur la douleur du don
  if (intent === "DouleurDon") {
    return res.json({
      fulfillmentText:
        "Le don de sang n'est généralement pas douloureux. Vous pourriez ressentir une légère piqûre au moment de l'insertion de l'aiguille, similaire à une prise de sang classique. L'équipe médicale est formée pour rendre l'expérience aussi confortable que possible.",
    });
  }

  // Gestion des questions sur la durée du don
  if (intent === "DureeDon") {
    return res.json({
      fulfillmentText:
        "Le prélèvement sanguin lui-même dure environ 8 à 10 minutes. Cependant, il faut prévoir entre 45 minutes et 1 heure pour l'ensemble du processus, incluant l'accueil, l'entretien médical, le don et le temps de repos obligatoire avec collation.",
    });
  }

  // Gestion des questions sur les rendez-vous
  if (intent === "RendezVousDon") {
    return res.json({
      fulfillmentText:
        "Au Maroc, il n'est généralement pas nécessaire de prendre rendez-vous pour un don de sang dans les centres fixes. Vous pouvez vous présenter directement pendant les heures d'ouverture. Cependant, pour les collectes mobiles ou certains centres, un rendez-vous peut parfois être recommandé. N'hésitez pas à appeler le centre avant de vous déplacer pour vérifier.",
    });
  }

  // Gestion des questions sur les horaires
  if (intent === "HorairesDon") {
    return res.json({
      fulfillmentText:
        "Les horaires des dons de sang varient selon les hôpitaux et centres de transfusion. En général, les centres de transfusion sanguine au Maroc sont ouverts du lundi au vendredi de 8h30 à 16h30, et parfois le samedi matin. Pour connaître les horaires précis d'un établissement spécifique, il est recommandé de contacter directement le centre ou l'hôpital concerné.",
    });
  }

  // Gestion des questions sur les précautions avant le don
  if (intent === "PrecautionsAvantDon") {
    return res.json({
      fulfillmentText:
        "Avant un don de sang, voici quelques précautions à prendre:\n\n- Mangez normalement dans les heures précédant le don\n- Hydratez-vous bien (buvez au moins 500 ml d'eau)\n- Évitez les repas trop gras\n- Évitez l'effort physique intense avant le don\n- Assurez-vous d'avoir bien dormi\n- N'oubliez pas votre pièce d'identité\n- Si vous prenez des médicaments, signalez-le au médecin lors de l'entretien",
    });
  }

  // Gestion des questions sur les précautions après le don
  if (intent === "PrecautionsApresDon") {
    return res.json({
      fulfillmentText:
        "Après votre don de sang:\n\n- Reposez-vous pendant 15-20 minutes minimum\n- Hydratez-vous bien tout au long de la journée\n- Évitez l'alcool pendant 24h\n- Évitez les efforts physiques intenses pendant 24h\n- Ne fumez pas immédiatement après le don (attendez au moins 2h)\n- Gardez le pansement au moins 2 heures\n- En cas de saignement, appuyez sur le point de ponction et levez le bras\n- Si vous vous sentez mal, allongez-vous et signalez-le",
    });
  }

  // Gestion des questions sur l'alimentation avant le don
  if (intent === "AlimentationAvantDon") {
    return res.json({
      fulfillmentText:
        "Avant de donner votre sang, il est important de ne pas être à jeun. Prenez un repas équilibré dans les heures qui précèdent, en évitant les aliments trop gras. Privilégiez les aliments riches en fer comme les légumes verts, les fruits secs, ou les viandes rouges. Hydratez-vous bien en buvant au moins 500 ml d'eau. Évitez l'alcool dans les 24 heures précédant le don.",
    });
  }

  // Gestion des questions sur le sport après le don
  if (intent === "SportApresDon") {
    return res.json({
      fulfillmentText:
        "Il est recommandé d'éviter les efforts physiques intenses et le sport pendant au moins 24 heures après un don de sang. Votre corps a besoin de temps pour reconstituer le volume sanguin. Des activités légères comme la marche sont possibles, mais évitez les sports intensifs, l'haltérophilie, la natation ou les activités en altitude. Écoutez votre corps et reposez-vous si vous ressentez de la fatigue.",
    });
  }

  // Gestion des questions sur la conduite après le don
  if (intent === "ConduireApresDon") {
    return res.json({
      fulfillmentText:
        "Oui, vous pouvez généralement conduire après un don de sang, à condition de vous sentir bien et d'avoir respecté le temps de repos recommandé (15-20 minutes minimum). Si vous ressentez des vertiges ou une faiblesse, attendez que ces symptômes disparaissent complètement avant de prendre le volant. En cas de doute, demandez conseil au personnel médical présent.",
    });
  }

  // Gestion des questions sur les tests sanguins après le don
  if (intent === "TestsSanguins") {
    return res.json({
      fulfillmentText:
        "Oui, votre sang est systématiquement testé après le don. Les analyses comprennent:\n\n- La détermination de votre groupe sanguin et rhésus\n- Le dépistage des maladies infectieuses transmissibles (VIH, hépatites B et C, syphilis)\n- D'autres tests selon les besoins médicaux\n\nSi une anomalie est détectée, vous serez contacté directement par le centre de transfusion.",
    });
  }

  // Gestion des questions sur les médicaments et le don
  if (intent === "MedicamentsDon") {
    return res.json({
      fulfillmentText:
        "La prise de médicaments n'est pas automatiquement un obstacle au don de sang. Tout dépend du médicament et de la condition traitée. Certains médicaments comme le paracétamol ou les antihistaminiques sont généralement acceptés. D'autres nécessitent un délai d'attente. Il est essentiel de signaler tous vos traitements lors de l'entretien médical pré-don. Le médecin évaluera au cas par cas si vous pouvez donner votre sang.",
    });
  }

  // Gestion des questions sur la COVID et le don
  if (intent === "CovidDon") {
    return res.json({
      fulfillmentText:
        "Si vous avez eu le COVID-19, vous devez attendre au moins 14 jours après la disparition complète des symptômes avant de donner votre sang. Concernant la vaccination COVID, il n'y a généralement pas de délai d'attente pour les vaccins à ARNm ou à vecteur viral. Pour les vaccins vivants atténués, un délai de 4 semaines peut être nécessaire. Dans tous les cas, vous devez vous sentir en bonne santé le jour du don.",
    });
  }

  // Gestion des questions sur grossesse/allaitement et don
  if (intent === "GrossesseAllaitementDon") {
    return res.json({
      fulfillmentText:
        "Si vous êtes enceinte, vous ne pouvez pas donner votre sang pendant toute la durée de la grossesse. Après un accouchement, il faut attendre au moins 6 mois avant de pouvoir donner à nouveau. Si vous allaitez, il est généralement recommandé d'attendre la fin de l'allaitement exclusif avant de donner son sang, car le don pourrait affecter la production de lait. Consultez le médecin du centre de don pour une évaluation personnalisée.",
    });
  }

  // Gestion des questions sur le malaise après don
  if (intent === "MalaiseApresDon") {
    return res.json({
      fulfillmentText:
        "Si vous vous sentez mal après un don de sang:\n\n1. Allongez-vous immédiatement, jambes surélevées si possible\n2. Signalez-le au personnel médical si vous êtes encore au centre\n3. Hydratez-vous et mangez quelque chose de sucré\n4. Reposez-vous et évitez de conduire tant que les symptômes persistent\n\nSi les symptômes sont sévères ou persistent plus de quelques heures, contactez le centre de don ou consultez un médecin.",
    });
  }

  // Gestion des questions sur l'utilisation du sang
  if (intent === "UtilisationSang") {
    return res.json({
      fulfillmentText:
        "Après votre don, votre sang est utilisé pour:\n\n- Les transfusions lors d'opérations chirurgicales ou d'accidents graves\n- Le traitement de maladies comme les leucémies, les hémophilies ou les thalassémies\n- Les besoins en produits sanguins pour les patients atteints de cancer\n- Le soutien aux femmes lors d'accouchements compliqués\n\nVotre don peut également être séparé en différents composants (globules rouges, plasma, plaquettes) pour aider plusieurs patients.",
    });
  }

  // Gestion des questions sur l'attestation/carte de donneur
  if (intent === "AttestationCartedonneur") {
    return res.json({
      fulfillmentText:
        "Oui, vous pouvez recevoir une attestation de don après avoir donné votre sang. Au Maroc, une carte de donneur vous est généralement remise lors de votre premier don, indiquant votre groupe sanguin. Cette carte est mise à jour à chaque nouveau don. N'hésitez pas à la demander au personnel du centre si elle ne vous est pas proposée automatiquement.",
    });
  }

  // Gestion des questions sur l'annulation de rendez-vous
  if (intent === "AnnulationRendezVous") {
    return res.json({
      fulfillmentText:
        "Si vous avez pris rendez-vous pour un don de sang et que vous ne pouvez pas vous y rendre, il est recommandé de contacter le centre pour annuler. Cela permet de libérer le créneau pour un autre donneur potentiel. La plupart des centres apprécient d'être prévenus au moins 24 heures à l'avance. Vous pourrez reprogrammer votre don pour une date ultérieure qui vous conviendra mieux.",
    });
  }

  // Gestion des questions sur le nombre de dons par an
  if (intent === "NombreDonsAnnuels") {
    return res.json({
      fulfillmentText:
        "Au Maroc, vous pouvez donner du sang total:\n- Pour les hommes: jusqu'à 6 fois par an (en respectant un intervalle d'au moins 8 semaines entre chaque don)\n- Pour les femmes: jusqu'à 4 fois par an (toujours avec un intervalle minimum de 8 semaines)\n\nCes limites sont établies pour protéger la santé des donneurs et permettre à l'organisme de reconstituer complètement ses réserves de fer.",
    });
  }

  // Gestion des questions sur les autres types de dons
  if (intent === "AutresTypesDons") {
    return res.json({
      fulfillmentText:
        "En plus du don de sang total, il existe d'autres types de dons:\n\n- Don de plaquettes (thrombaphérèse): essentiel pour les patients cancéreux ou les maladies hémorragiques\n- Don de plasma (plasmaphérèse): utilisé pour les grands brûlés, les hémophiles, ou la fabrication de médicaments\n- Don de globules rouges\n\nCes dons spécifiques sont réalisés à l'aide d'un appareil d'aphérèse qui prélève uniquement le composant sanguin nécessaire. Ils sont moins fréquents au Maroc que le don de sang total et pratiqués dans certains centres spécialisés.",
    });
  }

  // Gestion du fallback pour récupérer la conversation si l'utilisateur s'écarte du scénario
  if (intent === "Default Fallback Intent") {
    // Vérifier où en est l'utilisateur dans le processus de localisation
    const savedParams = getAllParametersFromContexts(contexts);

    // Si nous avons déjà une région mais pas de délégation
    if (savedParams.region && !savedParams.delegation) {
      const region = regions.find((r) =>
        r.region.toLowerCase().includes(savedParams.region.toLowerCase())
      );
      if (region) {
        const delegations = region.delegations
          .map((d) => d.delegation)
          .join("\n");
        return res.json({
          fulfillmentText: `Je n'ai pas compris votre demande. Reprenons: vous êtes dans la région ${region.region}. Dans quelle délégation êtes-vous? Choisissez parmi:\n\n${delegations}`,
        });
      }
    }

    // Si nous avons déjà une région et une délégation mais pas de commune
    if (savedParams.region && savedParams.delegation && !savedParams.commune) {
      const region = regions.find((r) =>
        r.region.toLowerCase().includes(savedParams.region.toLowerCase())
      );
      if (region) {
        const delegation = region.delegations.find((d) =>
          d.delegation
            .toLowerCase()
            .includes(savedParams.delegation.toLowerCase())
        );
        if (delegation) {
          const communes = delegation.communes.map((c) => c.commune).join("\n");
          return res.json({
            fulfillmentText: `Je n'ai pas compris votre demande. Reprenons: vous êtes dans la délégation ${delegation.delegation}. Dans quelle commune êtes-vous? Choisissez parmi:\n\n${communes}`,
          });
        }
      }
    }

    // Si nous n'avons aucune information ou ne pouvons pas déterminer l'étape actuelle
    return res.json({
      fulfillmentText:
        "Je n'ai pas compris votre demande. Je suis là pour vous aider à trouver un centre de don de sang, ou vous renseigner sur le don de sang au Maroc. Puis-je vous aider à trouver un centre de don près de chez vous?",
    });
  }

  // Réponse par défaut si aucun intent ne correspond
  return res.json({
    fulfillmentText:
      "Bonjour! Je suis le chatbot de BloodAI Donation. Je peux vous renseigner sur le don de sang, les conditions de don, les lieux où donner, et plus encore. Comment puis-je vous aider aujourd'hui?",
  });
});

// Fonction pour afficher les résultats des hôpitaux
function afficherResultatsHopitaux(res, region, delegation, commune) {
  // Afficher les hôpitaux
  if (commune.hopitaux && commune.hopitaux.length > 0) {
    let reponse = `Voici les hôpitaux où vous pouvez donner votre sang à ${commune.commune}:\n\n`;
    commune.hopitaux.forEach((hopital, index) => {
      reponse += `${index + 1}. ${hopital}\n`;
    });

    reponse +=
      "\nPour en savoir plus sur les horaires des dons, vous pouvez poser la question 'Quels sont les horaires des dons de sang?'";

    return res.json({
      fulfillmentText: reponse,
    });
  } else {
    return res.json({
      fulfillmentText: `Désolé, nous n'avons pas d'hôpitaux enregistrés pour la commune de ${commune.commune}. Veuillez essayer une autre commune ou contactez directement le Centre National de Transfusion Sanguine pour plus d'informations.`,
    });
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});