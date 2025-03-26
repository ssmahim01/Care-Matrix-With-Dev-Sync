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

export const manufacturers = [
  {
    name: "ACI Limited",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-11220099",
  },
  {
    name: "Square Pharmaceuticals Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-12345678",
  },
  {
    name: "Beximco Pharmaceuticals Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-222262070",
  },
  {
    name: "Renata Limited",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-222223410",
  },
  {
    name: "Incepta Pharmaceuticals Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-55012345",
  },
  {
    name: "Eskayef Pharmaceuticals Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-222285620",
  },
  {
    name: "Opsonin Pharma Limited",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-8878687",
  },
  {
    name: "Aristopharma Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-222227490",
  },
  {
    name: "Healthcare Pharmaceuticals Limited",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-9898788",
  },
  {
    name: "Beacon Pharmaceuticals Limited",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-55568050",
  },
  {
    name: "Sanofi",
    location: "Paris, France",
    contact: "+33-1-53777000",
  },
  {
    name: "Pfizer Inc.",
    location: "New York, USA",
    contact: "+1-212-733-2323",
  },
  {
    name: "Roche",
    location: "Basel, Switzerland",
    contact: "+41-61-6881111",
  },
  {
    name: "Novartis",
    location: "Basel, Switzerland",
    contact: "+41-61-3241111",
  },
  {
    name: "GSK (GlaxoSmithKline)",
    location: "London, UK",
    contact: "+44-20-80475000",
  },
  {
    name: "Merck & Co., Inc.",
    location: "New Jersey, USA",
    contact: "+1-908-740-4000",
  },
  {
    name: "AstraZeneca",
    location: "Cambridge, UK",
    contact: "+44-20-37494000",
  },
  {
    name: "Johnson & Johnson",
    location: "New Brunswick, USA",
    contact: "+1-732-524-0400",
  },
  {
    name: "Bayer AG",
    location: "Leverkusen, Germany",
    contact: "+49-214-301",
  },
];

export const suppliers = [
  {
    name: "Biopharma Limited",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-222227368",
  },
  {
    name: "Walton Healthcare",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-222285888",
  },
  {
    name: "Globe Pharmaceuticals Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-9551581",
  },
  {
    name: "ACME Laboratories Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-9887004",
  },
  {
    name: "Nuvista Pharma Ltd.",
    location: "Dhaka, Bangladesh",
    contact: "+880-2-9820219",
  },
  {
    name: "Cardinal Health",
    location: "Ohio, USA",
    contact: "+1-614-757-5000",
  },
  {
    name: "McKesson Corporation",
    location: "Texas, USA",
    contact: "+1-415-983-8300",
  },
  {
    name: "Celesio AG",
    location: "Stuttgart, Germany",
    contact: "+49-711-50010",
  },
  {
    name: "Sinopharm",
    location: "Beijing, China",
    contact: "+86-10-64058888",
  },
  {
    name: "Zuellig Pharma",
    location: "Hong Kong",
    contact: "+852-28996388",
  },
  {
    name: "AmerisourceBergen",
    location: "Pennsylvania, USA",
    contact: "+1-610-727-7000",
  },
  {
    name: "DHL Supply Chain",
    location: "Bonn, Germany",
    contact: "+49-228-1820",
  },
  {
    name: "Mitsubishi Logistics Corporation",
    location: "Tokyo, Japan",
    contact: "+81-3-3278-6650",
  },
  {
    name: "Medipal Holdings Corporation",
    location: "Tokyo, Japan",
    contact: "+81-3-3517-5111",
  },
  {
    name: "Almac Group",
    location: "Craigavon, Northern Ireland",
    contact: "+44-28-38335000",
  },
  {
    name: "Piramal Pharma Solutions",
    location: "Mumbai, India",
    contact: "+91-22-30466400",
  },
];
