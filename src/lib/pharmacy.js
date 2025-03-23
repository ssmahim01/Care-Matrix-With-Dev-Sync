export const medicine_categories = [
  { category_name: "All Medicines" },
  { category_name: "Antimicrobial" },
  { category_name: "Cardiovascular System" },
  { category_name: "Respiratory System" },
  { category_name: "Gastrointestinal System" },
  { category_name: "Central Nervous System" },
  { category_name: "Analgesic & Antipyretic" },
  { category_name: "Endocrine & Metabolic" },
  { category_name: "Allergy & Immune System" },
  { category_name: "Musculoskeletal Systems" },
  { category_name: "Vitamins & Supplements" },
];

export const dosageForms = [
  {
    category: "🌡️ Oral Dosage Forms",
    forms: [
      "Tablets",
      "Capsules",
      "Pills",
      "Syrups",
      "Suspensions",
      "Emulsions",
      "Elixirs",
      "Granules",
      "Lozenges",
      "Troches",
    ],
  },
  {
    category: "💉 Parenteral Dosage Forms",
    forms: ["Injections", "Infusions", "Implants"],
  },
  {
    category: "🌬️ Inhalation Dosage Forms",
    forms: ["Aerosols", "Inhalers", "Nebulizer Solutions"],
  },
  {
    category: "🧴 Topical Dosage Forms",
    forms: ["Creams", "Ointments", "Gels", "Lotions", "Patches (Transdermal)"],
  },
  {
    category: "👁️ Ophthalmic (Eye) Dosage Forms",
    forms: ["Eye Drops", "Ophthalmic Ointments", "Ophthalmic Gels"],
  },
  {
    category: "👂 Otic (Ear) Dosage Forms",
    forms: ["Ear Drops"],
  },
  {
    category: "👃 Nasal Dosage Forms",
    forms: ["Nasal Sprays", "Nasal Drops"],
  },
  {
    category: "🚽 Rectal/Vaginal Dosage Forms",
    forms: [
      "Suppositories",
      "Enemas",
      "Pessaries",
      "Vaginal Foams",
      "Vaginal Gels",
    ],
  },
  {
    category: "🧪 Special Dosage Forms",
    forms: [
      "Sublingual Tablets",
      "Buccal Tablets",
      "Medicated Chewing Gums",
      "Powders",
      "Sprays",
    ],
  },
];

export const medicineStrengths = {
  // 🧊 Tablets and Capsules
  "Tablets/Capsules": [
    "0.25 mg",
    "0.5 mg",
    "1 mg",
    "2 mg",
    "2.5 mg",
    "5 mg",
    "7.5 mg",
    "10 mg",
    "12.5 mg",
    "15 mg",
    "20 mg",
    "25 mg",
    "30 mg",
    "35 mg",
    "40 mg",
    "50 mg",
    "60 mg",
    "70 mg",
    "75 mg",
    "80 mg",
    "90 mg",
    "100 mg",
    "120 mg",
    "150 mg",
    "200 mg",
    "250 mg",
    "300 mg",
    "350 mg",
    "400 mg",
    "500 mg",
    "600 mg",
    "750 mg",
    "800 mg",
    "900 mg",
    "1000 mg",
    "1 g",
    "1.5 g",
    "2 g",
    "2.5 g",
    "3 g",
    "5 g",
    "10 g",
  ],

  // 💧 Liquids and Injections
  "Liquids/Injections": [
    "0.1 mg/mL",
    "0.5 mg/mL",
    "1 mg/mL",
    "2 mg/mL",
    "5 mg/mL",
    "10 mg/mL",
    "20 mg/mL",
    "50 mg/mL",
    "100 mg/mL",
    "250 mg/mL",
    "500 mg/mL",
    "1 g/mL",
    "5 g/mL",
    "0.9% NaCl",
    "5% Dextrose",
    "20% Albumin",
  ],

  // 🧪 Syrups and Suspensions
  "Syrups/Suspensions": [
    "100 mg/5 mL",
    "200 mg/5 mL",
    "250 mg/5 mL",
    "500 mg/5 mL",
    "1000 mg/5 mL",
    "5 mg/1 mL",
    "10 mg/1 mL",
  ],

  // 🌡️ Drops and Sprays
  "Drops/Sprays": [
    "0.01%",
    "0.1%",
    "1 mg/drop",
    "2 mg/drop",
    "5 mg/drop",
    "10 mg/drop",
    "1 mg/spray",
    "2 mg/spray",
    "5 mg/spray",
    "10 mg/spray",
  ],

  // 🌬️ Inhalers and Nebulizers
  "Inhalers/Nebulizers": [
    "100 mcg",
    "200 mcg",
    "250 mcg",
    "400 mcg",
    "500 mcg",
    "600 mcg",
    "800 mcg",
    "1000 mcg",
  ],

  // 🔬 Insulin and Hormones
  "Insulin/Hormones": [
    "10 IU",
    "20 IU",
    "40 IU",
    "100 IU",
    "200 IU",
    "300 IU",
    "500 IU",
    "1000 IU",
    "6.25 mcg",
    "25 mcg",
    "50 mcg",
    "75 mcg",
    "100 mcg",
  ],

  // 🏥 Vaccines and Biologics
  "Vaccines/Biologics": [
    "0.25 mL",
    "0.5 mL",
    "1 mL",
    "1.5 mL",
    "2 mL",
    "5 mL",
    "10 mL",
    "15 mL",
    "20 mL",
  ],

  // ⚗️ Topical and Creams
  "Topical/Creams": [
    "0.01%",
    "0.025%",
    "0.05%",
    "0.1%",
    "1%",
    "2%",
    "5%",
    "10%",
  ],

  // 🏗️ Suppositories and Implants
  "Suppositories/Implants": [
    "10 mg",
    "25 mg",
    "50 mg",
    "100 mg",
    "200 mg",
    "500 mg",
    "1 g",
  ],

  // 🛡️ Specialized Dosages
  "Specialized Dosages": [
    "5 mcg",
    "10 mcg",
    "50 mcg",
    "100 mcg",
    "0.1 IU",
    "1 IU",
    "10 IU",
    "0.01%",
    "0.05%",
    "0.5%",
    "2.5%",
    "7.5%",
  ],
};
