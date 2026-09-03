import { useState, useEffect } from "react";

const experiences = [
  {
    company: "Meditech Innovations",
    location: "Noida West, India (Remote)",
    role: "Data Science Intern – Big Data & Analytics",
    period: "Aug 2025 – Present",
    type: "Internship",
    bullets: [
      "Built and evaluated ML/DL models (Logistic Regression, tree-based, DNN, LSTM) using cross-validation for end-to-end performance evaluation.",
      "Developed NLP systems using LLMs/SLMs, including Hybrid RAG pipelines with vector databases and Redis caching.",
      "Applied hyperparameter tuning (GridSearchCV, RandomizedSearchCV, KerasTuner) to improve model performance and generalization.",
      "Implemented reproducible and scalable workflows using Docker for consistent development environments.",
      "Built and deployed data-driven applications using Streamlit and Flask with AWS (SageMaker, S3, EC2, CodePipeline).",
    ],
  },
  {
    company: "Omdena",
    location: "Palo Alto, United States (Remote)",
    role: "Machine Learning Engineer & Collaborator",
    period: "Sep 2023 – Aug 2025",
    type: "Volunteer",
    bullets: [
      "Collaborated in a multi-disciplinary team to build a multi-agent financial chatbot with modular, agentic design.",
      "Helped lead the chatbot team; later contributed to the AI team on Insight Engine and Fraud Model integration.",
      "Used Supervisor agent to orchestrate multi-agent workflows combining RAG + LLM agents and SQL agents using GROQ API.",
      "Developed a U-Net-based deep learning model (PyTorch) for glacier segmentation using multi-band Landsat satellite imagery.",
      "Addressed class imbalance using Dice loss and evaluated performance using Dice coefficient (~0.82).",
    ],
  },
  {
    company: "Data Glacier",
    location: "Remote",
    role: "Data Scientist Intern",
    period: "Apr 2025 – May 2025",
    type: "Internship",
    bullets: [
      "Developed classification models (Logistic Regression, Random Forest, Gradient Boosting) to predict client subscription to term deposits.",
      "Improved minority-class recall using SMOTE and class weighting, achieving ROC-AUC of 0.92.",
      "Analyzed confusion matrices and classification reports to optimize precision–recall trade-offs.",
    ],
  },
  {
    company: "Viridien (formerly CGG) + S2DS",
    location: "London (Remote)",
    role: "Science to Data Science (S2DS) Fellow",
    period: "Feb 2024 – Mar 2024",
    type: "Fellowship",
    bullets: [
      "Selected for the competitive S2DS fellowship; collaborated in an Agile team of five data scientists on a project for CGG.",
      "Designed and developed an LLM-powered GitHub refactoring assistant using OpenAI API to streamline developer workflows.",
    ],
  },
  {
    company: "Universidad de Chile",
    location: "Santiago, Chile",
    role: "Doctoral Researcher",
    period: "Mar 2019 – Dec 2024",
    type: "Full-time",
    bullets: [
      "Analyzed optical variability of ~7,000 quasars using large-scale ZTF time-series data retrieved via APIs.",
      "Built custom Python pipelines with the ALeRCE ML team for stochastic light curve analysis, improving efficiency by 15%.",
      "Applied MCMC Bayesian modeling, Orthogonal Distance Regression, and bootstrapping (1000 samples) for statistical analysis.",
      "Calibrated and processed 7 mm VLBA image data for gravitational lens candidates using rPICARD and CASA.",
      "Demonstrated bending power-law models better describe stochastic quasar light curve behavior.",
    ],
  },
];

const skillCategories = [
  {
    title: "Data Science & ML",
    skills: ["Machine Learning", "Deep Learning", "Statistical Modeling", "Feature Engineering", "Time-Series Analysis", "Bayesian Methods (MCMC)"],
  },
  {
    title: "NLP & Generative AI",
    skills: ["LLMs", "LangChain", "RAG Pipelines", "Transformers", "Hybrid RAG", "Multi-Agent Systems"],
  },
  {
    title: "Programming",
    skills: ["Python", "PyTorch", "scikit-learn", "NumPy / Pandas / SciPy", "SQL", "C / C++"],
  },
  {
    title: "Cloud & Deployment",
    skills: ["AWS (S3, EC2, SageMaker)", "Docker", "FastAPI / Flask", "Streamlit", "Databricks", "CI/CD (CodePipeline)"],
  },
  {
    title: "Data Engineering",
    skills: ["PySpark", "ETL Pipelines", "Data Cleaning", "Vector Databases", "Redis", "API Integration"],
  },
  {
    title: "Visualization & Tools",
    skills: ["Matplotlib", "Seaborn", "Jupyter Notebook", "Git / GitHub", "CASA / rPICARD", "VS Code"],
  },
];

const education = [
  {
    degree: "Ph.D. in Astrophysics",
    institution: "Universidad de Chile",
    location: "Santiago, Chile",
    period: "Mar 2019 – Dec 2024",
    note: "ANID PhD Fellowship Recipient",
  },
  {
    degree: "M.Sc. in Physics",
    institution: "Pt. Ravishankar Shukla University",
    location: "Raipur, India",
    period: "Jul 2015 – Jul 2017",
  },
  {
    degree: "B.Sc. – Physics, Computer Science, Mathematics",
    institution: "St. Thomas College",
    location: "Bhilai, India",
    period: "Jun 2012 – Jul 2015",
  },
];

const publications = [
  {
    title: "Probing the rest-frame wavelength dependence of quasar variability",
    authors: "P. Patel et al.",
    journal: "Astronomy & Astrophysics, 695, A162",
    year: "2025",
    publisher: "EDP Sciences",
  },
  {
    title: "Optical variability in quasars: scalings with black hole mass and Eddington ratio depend on the observed time-scales",
    authors: "P. Arévalo et al.",
    journal: "MNRAS, 526, 6078",
    year: "2023",
    publisher: "Oxford University Press",
  },
  {
    title: "The universal power spectrum of quasars in optical wavelengths",
    authors: "P. Arévalo et al.",
    journal: "Astronomy & Astrophysics, 684, A133",
    year: "2024",
    publisher: "EDP Sciences",
  },
];

const SCHOLAR_URL = "https://scholar.google.com/citations?user=Ola1DfwAAAAJ";

function GitHubIcon() {
  return (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ScholarIcon() {
  return (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const bankImages = [
    "/projects/ROC_Log_Reg_Bal.png",
    "/projects/Logistic_Regression.png",
    "/projects/correlation_with_target.png",
    "/projects/conversion_by_age_group.png",
  ];
  const [imgIndex, setImgIndex] = useState(0);

  // Generated by actually running glacier-segmentation-unet's own pipeline
  // (train.py + evaluate.py) on its bundled synthetic demo data.
  const glacierImages = [
    "/projects/glacier_unet_predictions.png",
    "/projects/glacier_unet_dice_curve.png",
  ];
  const [glacierIndex, setGlacierIndex] = useState(0);

  const quasarImages = [
    "/projects/Quasar_1.jpg",
    "/projects/Quasar_2.jpg",
    "/projects/Quasar_3.jpg",
  ];
  const [quasarIndex, setQuasarIndex] = useState(0);

  const chatbotImages = [
    "/projects/public_safety_chatbot.png",
    "/projects/public_safety_chatbot2.png",
    "/projects/public_safety_chatbot3.png",
  ];
  const [chatbotIndex, setChatbotIndex] = useState(0);

  const washTradingImages = [
    "/projects/top_wallets_uncertainty.png",
    "/projects/wash_trading_crosscheck.png",
    "/projects/wallet_risk_breakdown.png",
    "/projects/reciprocal_ratio_distribution.png",
  ];
  const [washTradingIndex, setWashTradingIndex] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setImgIndex(p => (p + 1) % bankImages.length), 2500);
    const t2 = setInterval(() => setGlacierIndex(p => (p + 1) % glacierImages.length), 2500);
    const t3 = setInterval(() => setQuasarIndex(p => (p + 1) % quasarImages.length), 2500);
    const t4 = setInterval(() => setChatbotIndex(p => (p + 1) % chatbotImages.length), 2500);
    const t5 = setInterval(() => setWashTradingIndex(p => (p + 1) % washTradingImages.length), 2500);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); clearInterval(t4); clearInterval(t5); };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#050816] text-white min-h-screen">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full bg-[#050816]/90 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <button
            onClick={() => scrollTo("hero")}
            className="text-xl font-bold text-purple-400 hover:text-purple-300 transition"
          >
            Priyanjali Patel
          </button>

          <ul className="hidden md:flex gap-8 text-gray-300 text-sm">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="hover:text-purple-400 transition"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-gray-300 hover:text-white transition"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#050816] border-t border-gray-800 px-6 py-4">
            <ul className="flex flex-col gap-4 text-gray-300">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="hover:text-purple-400 transition">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>


      {/* ── Hero ── */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <p className="text-purple-400 text-lg mb-4">Hello, I&apos;m</p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">Priyanjali Patel</h1>

        <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
          PhD Astrophysicist &amp; Data Scientist
        </h2>

        <p className="max-w-2xl text-gray-400 text-lg leading-relaxed mb-10">
          PhD-trained Data Scientist specializing in NLP, LLMs, and Generative AI. Experienced in
          building end-to-end AI pipelines, RAG systems, and production-ready ML models for real-world impact.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-12">
          <a href="/Priyanjali_Patel_Resume.pdf" download="Priyanjali_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded-xl font-medium">
              Download Resume
            </button>
          </a>
          <button
            onClick={() => scrollTo("projects")}
            className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-medium"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="border border-white hover:bg-white hover:text-black transition px-6 py-3 rounded-xl font-medium"
          >
            Contact Me
          </button>
        </div>

        <div className="flex gap-6 text-gray-400">
          <a href="https://github.com/priyanjalipatel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/priyanjalipatel" target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="Google Scholar">
            <ScholarIcon />
          </a>
          <a href="mailto:priyanjalipatel@gmail.com" className="hover:text-white transition" aria-label="Email">
            <EmailIcon />
          </a>
        </div>
      </section>


      {/* ── About ── */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-10">About Me</h2>
        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            PhD-trained Data Scientist with hands-on experience in Python-based AI development,
            specializing in NLP, LLMs, and Generative AI applications. Skilled in building end-to-end AI
            workflows including RAG pipelines, chatbots, and automation systems using LangChain and API
            integrations. Proficient in developing scalable backend services using FastAPI/Flask, and creating
            intelligent data pipelines integrating databases and third-party APIs. Experienced in deploying
            applications using Docker and working with AWS (S3, EC2, SageMaker, CI/CD). Strong in designing
            automation-driven solutions and translating business needs into production-ready AI systems, with
            a focus on scalability, efficiency, and real-world impact.
          </p>
        </div>
      </section>


      {/* ── Experience ── */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-12">Work Experience</h2>
        <div className="relative border-l-2 border-gray-800 ml-4">
          {experiences.map((exp, i) => (
            <div key={i} className="mb-10 pl-8 relative">
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-purple-500 border-2 border-[#050816]" />
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                  <span className="text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full shrink-0">
                    {exp.type}
                  </span>
                </div>
                <p className="text-purple-400 font-medium mb-1">{exp.role}</p>
                <p className="text-gray-500 text-sm mb-4">{exp.period} · {exp.location}</p>
                <ul className="list-disc ml-5 text-gray-400 text-sm space-y-1.5">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── Projects ── */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center">Featured Projects</h2>
        <div className="flex flex-col items-center gap-12">

          {/* Wash-Trading Risk Scoring */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500 transition w-full max-w-5xl">
            <div className="w-full h-[450px] flex items-center justify-center bg-black/20">
              <img
                src={washTradingImages[washTradingIndex]}
                alt="Wash-Trading Risk Scoring"
                className="max-h-full max-w-full object-contain transition-all duration-700"
              />
            </div>
            <div className="p-8">
              <p className="text-xs text-purple-400 mb-2">Personal Project · Web3 / Crypto Analytics · Uncertainty Quantification</p>
              <h3 className="text-3xl font-bold mb-4">Wash-Trading Risk Scoring</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                An NFT wash-trading risk-scoring model built entirely on public on-chain data (Dune Analytics, free tier).
                Flags wallets likely engaged in wash trading on an NFT collection — reciprocal trades, tight timing,
                concentrated counterparties — from trade history alone.
                <br /><br />
                <span className="text-gray-300">
                  Unlike a typical anomaly-detection portfolio project, it never reports a single confident score. There's no
                  ground-truth label for "this wallet is washing trades" — only a heuristic one — so every wallet gets a
                  bootstrap mean probability with a 90% interval (200 XGBoost resamples) plus a separate label-free Isolation
                  Forest score as a cross-check. A wallet is only <span className="text-purple-300 font-semibold">high-confidence</span> if
                  the pessimistic end of its interval still clears 0.5.
                </span>
              </p>

              <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-5 mb-6 text-sm text-gray-300">
                <p className="text-purple-400 mb-3">Results (synthetic demo, 412 wallets):</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="text-gray-500 border-b border-gray-700">
                        <th className="pb-2 pr-4">Metric</th>
                        <th className="pb-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800">
                        <td className="py-1.5 pr-4">High-confidence wallets flagged</td>
                        <td className="py-1.5">10 / 412</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-1.5 pr-4">Flagged-uncertain (needs human look)</td>
                        <td className="py-1.5">2 / 412</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-1.5 pr-4">Recall on injected wash rings (known ground truth)</td>
                        <td className="py-1.5 text-purple-300 font-semibold">83.3% high-confidence</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-4 text-white font-semibold">Avg. precision vs. weak labels</td>
                        <td className="py-1.5 text-white font-semibold">1.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-5 mb-6 text-sm text-gray-300">
                <p className="text-purple-400 mb-2">Key Contributions:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Full Dune SQL → feature engineering → model pipeline on public on-chain trade data</li>
                  <li>Per-wallet uncertainty via 200 bootstrap XGBoost resamples, not a single point score</li>
                  <li>Label-free Isolation Forest cross-check against the supervised, weak-labeled model</li>
                  <li>Weak label (reciprocal ratio) deliberately excluded from model features to avoid circularity</li>
                  <li>Optional Bayesian logistic regression (PyMC) for a proper per-wallet posterior + coefficient effects</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["XGBoost", "Isolation Forest", "Bootstrap Uncertainty", "PyMC / Bayesian", "Dune Analytics", "On-Chain Data", "NFT / Web3"].map(t => (
                  <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
                ))}
              </div>

              <a href="https://github.com/priyanjalipatel/wash-trading-risk-scoring" target="_blank" rel="noopener noreferrer">
                <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                  GitHub Repository
                </button>
              </a>
            </div>
          </div>

          {/* BankEase AI Platform */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500 transition w-full max-w-5xl">
            <video
              src="/projects/chatbotdemo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[420px] object-cover"
            />
            <div className="p-8">
              <p className="text-xs text-purple-400 mb-2">Industry Project (Confidential)</p>
              <h3 className="text-3xl font-bold mb-3">BankEase AI Platform</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                AI-powered financial analytics platform enabling intelligent exploration of transaction data
                through RAG-based chatbot systems, natural language SQL querying, and fraud detection.
                <br /><br />
                <span className="text-gray-300">
                  Contributed to a multi-agent architecture integrating RAG, LLM, and SQL agents using a
                  supervisor framework. Built components for query routing, insight generation, and fraud
                  risk scoring for automated alerts and decision support.
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["LLM", "Multi-Agent", "RAG", "LangChain", "SQL", "GROQ API"].map(t => (
                  <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
                ))}
              </div>
              <button className="border border-gray-700 text-gray-500 px-4 py-2 rounded-xl cursor-not-allowed text-sm">
                Private Repository
              </button>
            </div>
          </div>

          {/* Secure Public Safety Chatbot */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500 transition w-full max-w-5xl">
            <div className="w-full h-[450px] flex items-center justify-center bg-black/20">
              <img
                src={chatbotImages[chatbotIndex]}
                alt="Public Safety Chatbot Screenshots"
                className="max-h-full max-w-full object-contain transition-all duration-700"
              />
            </div>
            <div className="p-8">
            <p className="text-xs text-purple-400 mb-2">Personal Project · Jan 2026 – Present</p>
            <h3 className="text-3xl font-bold mb-4">Secure Public Safety Chatbot Platform</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A role-based, secure chatbot platform built with FastAPI, JWT authentication, and strict
              role-based access control for public safety scenarios — enabling controlled information
              sharing between the public and authorities.
              <br /><br />
              <span className="text-gray-300">
                Credentials secured using bcrypt with backend authorization checks. Includes scenario-based
                workflows, audit logging, and access monitoring to reduce security risks.
              </span>
            </p>
            <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-5 mb-6 text-sm text-gray-300">
              <p className="text-purple-400 mb-2">Key Features:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Role-based chatbot using GROQ API with JWT authentication and strict access control</li>
                <li>Credentials secured with bcrypt and backend authorization checks</li>
                <li>Scenario-based workflows for controlled information sharing</li>
                <li>Audit logging and access monitoring</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {["FastAPI", "JWT", "Role-Based Access", "GROQ API", "Python", "bcrypt"].map(t => (
                <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
              ))}
            </div>
            <a href="https://github.com/priyanjalipatel/Public-Safety-Chatbot" target="_blank" rel="noopener noreferrer">
              <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                GitHub Repository
              </button>
            </a>
            </div>
          </div>

          {/* Fraud Detection */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition w-full max-w-5xl">
            <p className="text-xs text-purple-400 mb-2">Collaborative Project · Nov 2025 – Jan 2026</p>
            <h3 className="text-3xl font-bold mb-4">Machine Learning–Based Fraud Detection</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Binary classification model for fraud detection on an imbalanced dataset using XGBoost,
              with careful hyperparameter tuning and evaluation optimized for fraud use cases.
              <br /><br />
              <span className="text-gray-300">
                Applied hyperparameter tuning (learning rate, tree depth, subsampling) and evaluated using
                precision–recall AUC (AUC-PR) and classification metrics. Analyzed confusion matrices to
                optimize precision–recall trade-offs.
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["XGBoost", "Python", "Imbalanced Data", "AUC-PR", "Classification", "Hyperparameter Tuning"].map(t => (
                <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
              ))}
            </div>
            <a href="https://github.com/LuisMancio/fraud_detection/tree/main" target="_blank" rel="noopener noreferrer">
              <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                GitHub Repository
              </button>
            </a>
          </div>

          {/* Bank Marketing */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500 transition w-full max-w-5xl">
            <div className="w-full h-[450px] flex items-center justify-center bg-black/20">
              <img
                src={bankImages[imgIndex]}
                alt="Bank Marketing Visualizations"
                className="max-h-full max-w-full object-contain transition-all duration-700"
              />
            </div>
            <div className="p-8">
              <p className="text-xs text-purple-400 mb-2">Machine Learning Project</p>
              <h3 className="text-3xl font-bold mb-4">Bank Marketing Campaign – Term Deposit Prediction</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                ML models to predict whether a client subscribes to a term deposit using direct marketing
                campaign data from a Portuguese bank (45,000+ records, 16 features).
                <br /><br />
                <span className="text-gray-300">
                  Implemented Logistic Regression, Random Forest, and Gradient Boosting. Handled class
                  imbalance using SMOTE and class weighting. Achieved ROC-AUC of 0.92.
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Python", "Scikit-learn", "SMOTE", "Imbalanced Data", "ROC-AUC 0.92", "Classification"].map(t => (
                  <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
                ))}
              </div>
              <a href="https://github.com/priyanjalipatel/Data_Glacier_Final_Project" target="_blank" rel="noopener noreferrer">
                <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                  GitHub Repository
                </button>
              </a>
            </div>
          </div>

          {/* Glacier Segmentation */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500 transition w-full max-w-5xl">
            <div className="w-full h-[450px] flex items-center justify-center bg-black/20">
              <img
                src={glacierImages[glacierIndex]}
                alt="Glacier Segmentation Results"
                className="max-h-full max-w-full object-contain transition-all duration-700"
              />
            </div>
            <div className="p-8">
              <p className="text-xs text-purple-400 mb-2">Deep Learning · Computer Vision · Remote Sensing</p>
              <h3 className="text-3xl font-bold mb-4">Glacier Segmentation with U-Net (Synthetic Multi-Band Imagery)</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                To go deeper into the U-Net architecture I worked on during my time at Omdena, I built a
                standalone segmentation pipeline trained on synthetic multi-band imagery in PyTorch —
                letting me practice the full pipeline independently, end to end.
                <br /><br />
                <span className="text-gray-300">
                  Implemented patch-based dataset generation (256×256 with overlap), multi-band
                  preprocessing, and training with Dice loss to handle severe class imbalance. The
                  bundled synthetic demo trains to a validation Dice score of ~0.99 within a few epochs
                  (synthetic patterns are far simpler than real satellite imagery); on real Landsat
                  imagery during the original Omdena project, this same architecture reached a
                  validation Dice score of ~0.82.
                </span>
              </p>
              <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-5 mb-6 text-sm text-gray-300">
                <p className="text-purple-400 mb-2">Key Contributions:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>U-Net architecture built from scratch for pixel-wise glacier segmentation</li>
                  <li>Patch-based dataset generation (256×256 with overlap strategy) on synthetic multi-band imagery</li>
                  <li>Dice loss for handling severe class imbalance</li>
                  <li>~0.99 validation Dice on synthetic demo data; ~0.82 on real Landsat imagery (Omdena)</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {["PyTorch", "U-Net", "Computer Vision", "Synthetic Data", "Semantic Segmentation", "Dice Loss"].map(t => (
                  <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
                ))}
              </div>
              <a href="https://github.com/priyanjalipatel/glacier-segmentation-unet" target="_blank" rel="noopener noreferrer">
                <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                  View Project Repository
                </button>
              </a>
            </div>
          </div>

          {/* Quasar Research */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden hover:border-purple-500 transition w-full max-w-5xl">
            <div className="w-full h-[400px] flex items-center justify-center bg-black/20">
              <img
                src={quasarImages[quasarIndex]}
                alt="Quasar Variability Analysis"
                className="max-h-full max-w-full object-contain transition-all duration-700"
              />
            </div>
            <div className="p-8">
              <p className="text-xs text-purple-400 mb-2">PhD Research · Time-Domain Astronomy · Statistical Modeling</p>
              <h3 className="text-3xl font-bold mb-4">Quasar Optical Variability Analysis (ZTF Survey)</h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Doctoral research on optical variability of ~7,000 quasars using large-scale time-series
                data from the Zwicky Transient Facility (ZTF). Resulted in 3 peer-reviewed publications.
                <br /><br />
                <span className="text-gray-300">
                  Built reproducible data pipelines for API-based ingestion and preprocessing. Applied
                  bootstrapping (1000 samples), ODR regression, and MCMC Bayesian modeling. Demonstrated
                  bending power-law models better describe stochastic quasar light curve behavior.
                </span>
              </p>
              <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-5 mb-6 text-sm text-gray-300">
                <p className="text-purple-400 mb-2">Key Contributions:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Extracted ~7,000 quasar light curves from ZTF survey via APIs</li>
                  <li>Bootstrapping (1000 samples) for uncertainty estimation</li>
                  <li>ODR-based regression and MCMC Bayesian modeling (SciPy)</li>
                  <li>3 peer-reviewed publications in A&A and MNRAS</li>
                </ul>
              </div>
              <div className="flex gap-4 flex-wrap">
                <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
                  <button className="border border-purple-500 text-purple-400 px-5 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                    Google Scholar
                  </button>
                </a>
                <button className="border border-gray-700 text-gray-500 px-5 py-2 rounded-xl cursor-not-allowed text-sm">
                  Private Research Code
                </button>
              </div>
            </div>
          </div>

          {/* S2DS Fellowship */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition w-full max-w-5xl">
            <p className="text-xs text-purple-400 mb-2">Industry Fellowship · LLM Systems · Data Engineering</p>
            <h3 className="text-3xl font-bold mb-4">LLM-Powered Code Refactoring Assistant (S2DS – Viridien/CGG)</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Selected for the competitive Science to Data Science (S2DS) London fellowship, working in an
              Agile team with Viridien (formerly CGG), a global leader in HPC and geoscience technology.
              <br /><br />
              <span className="text-gray-300">
                Developed an LLM-powered assistant to automate code refactoring workflows in Jupyter notebooks
                using OpenAI API and LangChain orchestration to detect code smells, improve maintainability,
                and generate unit tests — reducing manual engineering effort.
              </span>
            </p>
            <div className="bg-[#0b1220] border border-gray-800 rounded-2xl p-5 mb-6 text-sm text-gray-300">
              <p className="text-purple-400 mb-2">Key Contributions:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>LLM-based code refactoring pipeline for Jupyter notebooks</li>
                <li>LangChain + OpenAI API for multi-step reasoning workflows</li>
                <li>Automated code smell detection and unit test generation</li>
                <li>Agile collaboration with industry stakeholders at Viridien/CGG</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {["LLMs", "LangChain", "OpenAI API", "Python", "Agile", "Data Engineering"].map(t => (
                <span key={t} className="bg-purple-600/20 px-3 py-1 text-sm rounded-full">{t}</span>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ── Skills ── */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(cat => (
            <div
              key={cat.title}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition"
            >
              <h3 className="text-purple-400 font-semibold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(s => (
                  <span
                    key={s}
                    className="bg-[#0b1220] border border-gray-700 px-3 py-1 text-sm text-gray-300 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── Education ── */}
      <section id="education" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-12">Education</h2>
        <div className="flex flex-col gap-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-purple-500/50 transition"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                <p className="text-purple-400">{edu.institution}</p>
                <p className="text-gray-500 text-sm">{edu.location}</p>
                {edu.note && (
                  <p className="text-yellow-400/80 text-sm mt-1">{edu.note}</p>
                )}
              </div>
              <p className="text-gray-400 text-sm shrink-0">{edu.period}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ── Publications ── */}
      <section id="publications" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-4">Publications</h2>
        <p className="text-gray-500 text-sm mb-12">
          <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition">
            View all on Google Scholar
          </a>
        </p>
        <div className="flex flex-col gap-6">
          {publications.map((pub, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition"
            >
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{pub.authors}</p>
                  <p className="text-purple-400 text-sm mt-1">
                    {pub.journal} &middot; {pub.year}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">{pub.publisher}</p>
                </div>
                <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <button className="border border-purple-500 text-purple-400 px-4 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition text-sm">
                    View Paper
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── Contact ── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-purple-400 mb-4">Contact</h2>
        <p className="text-gray-400 mb-12">
          Open to data science and AI roles. Feel free to reach out.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="mailto:priyanjalipatel@gmail.com"
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition group"
          >
            <div className="text-purple-400 mb-3"><EmailIcon /></div>
            <p className="text-white font-medium mb-1">Email</p>
            <p className="text-gray-400 text-sm group-hover:text-purple-400 transition break-all">
              priyanjalipatel@gmail.com
            </p>
          </a>

          <a
            href="https://linkedin.com/in/priyanjalipatel"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition group"
          >
            <div className="text-purple-400 mb-3"><LinkedInIcon /></div>
            <p className="text-white font-medium mb-1">LinkedIn</p>
            <p className="text-gray-400 text-sm group-hover:text-purple-400 transition">priyanjalipatel</p>
          </a>

          <a
            href="https://github.com/priyanjalipatel"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition group"
          >
            <div className="text-purple-400 mb-3"><GitHubIcon /></div>
            <p className="text-white font-medium mb-1">GitHub</p>
            <p className="text-gray-400 text-sm group-hover:text-purple-400 transition">priyanjalipatel</p>
          </a>

          <a
            href={SCHOLAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition group"
          >
            <div className="text-purple-400 mb-3"><ScholarIcon /></div>
            <p className="text-white font-medium mb-1">Google Scholar</p>
            <p className="text-gray-400 text-sm group-hover:text-purple-400 transition">Research Publications</p>
          </a>
        </div>
      </section>


      {/* ── Footer ── */}
      <footer className="border-t border-gray-800 py-10 text-center">
        <p className="text-gray-500 text-sm">Priyanjali Patel &middot; Data Scientist | PhD in Astrophysics &middot; Raipur, India</p>
        <div className="flex justify-center gap-6 mt-4 text-gray-600">
          <a href="https://github.com/priyanjalipatel" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/priyanjalipatel" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition" aria-label="Google Scholar">
            <ScholarIcon />
          </a>
        </div>
      </footer>

    </div>
  );
}

export default App;
