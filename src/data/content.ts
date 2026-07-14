// Centralized content data for the Alexis academic portfolio.
// All text is intentionally in English (the language of the source prompt).

export type Level = "Beginner" | "Intermediate" | "Advanced" | "Research-oriented";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Areas of Expertise" },
  { id: "projects", label: "Projects" },
  { id: "resources", label: "Open Academic Resources" },
  { id: "library", label: "Technical Library" },
  { id: "teaching", label: "Teaching Portfolio" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
] as const;

export const HOME_FEATURED = [
  {
    icon: "matrix",
    title: "Structural Analysis and Computational Modeling",
    description:
      "Matrix structural analysis, finite element modeling and nonlinear procedures implemented as transparent, verifiable computational tools.",
    href: "#expertise",
  },
  {
    icon: "wave",
    title: "Earthquake Engineering and Seismic Design",
    description:
      "Seismic design of reinforced concrete and steel structures, capacity design, detailing and code-based verification.",
    href: "#expertise",
  },
  {
    icon: "shield",
    title: "Performance-Based Engineering and Seismic Risk",
    description:
      "Performance objectives, nonlinear assessment, fragility and loss estimation for resilient structural systems.",
    href: "#expertise",
  },
  {
    icon: "book",
    title: "Open Academic Resources and Engineering Education",
    description:
      "Open mini-courses, lecture notes, commented code and templates supporting engineering education and capacity building.",
    href: "#resources",
  },
] as const;

export const ABOUT_STATS = [
  { value: "8+", label: "Years of academic and technical work" },
  { value: "12", label: "Mini-courses developed" },
  { value: "30+", label: "Computational tools and templates published" },
  { value: "7", label: "Core areas of structural engineering" },
] as const;

export type Area = {
  id: string;
  number: string;
  title: string;
  description: string;
  topics: string[];
  materials: string;
  icon: string;
};

export const AREAS: Area[] = [
  {
    id: "matrix",
    number: "01",
    title: "Matrix Structural Analysis",
    description:
      "Área enfocada en la formulación matricial de estructuras, método de rigidez, ensamblaje de matrices globales, imposición de condiciones de frontera, solución de sistemas de ecuaciones y recuperación de fuerzas internas.",
    topics: [
      "Direct stiffness method",
      "Local and global coordinate systems",
      "Transformation matrices",
      "Global stiffness matrix assembly",
      "Boundary conditions",
      "Nodal displacements and support reactions",
      "Plane trusses",
      "Plane frames",
      "Grids and space frames",
      "Influence of element releases and constraints",
    ],
    materials:
      "Apuntes en PDF · Códigos MATLAB o Python · Ejemplos paso a paso · Plantillas de cálculo · Videos cortos explicativos · Mini curso gratuito de análisis matricial",
    icon: "matrix",
  },
  {
    id: "fem",
    number: "02",
    title: "Finite Element Method",
    description:
      "Área dedicada a la formulación y aplicación del método de elementos finitos en problemas de ingeniería estructural, desde elementos unidimensionales hasta modelos más generales.",
    topics: [
      "Introduction to the finite element method",
      "Shape functions",
      "Element stiffness matrices",
      "Numerical integration",
      "Beam and frame finite elements",
      "Plane stress and plane strain elements",
      "Mesh generation concepts",
      "Convergence and discretization error",
      "Verification of finite element models",
      "Comparison between analytical and numerical solutions",
    ],
    materials:
      "Códigos propios · Notebooks de Python · Scripts de MATLAB · Ejemplos comparativos · Modelos explicativos · Manuales introductorios",
    icon: "mesh",
  },
  {
    id: "nonlinear",
    number: "03",
    title: "Nonlinear Structural Analysis",
    description:
      "Área enfocada en la respuesta no lineal de estructuras, considerando no linealidad material, geométrica, histéresis, plasticidad y análisis incremental.",
    topics: [
      "Material nonlinearity",
      "Geometric nonlinearity",
      "P-Delta effects",
      "Plastic hinges",
      "Fiber models",
      "Moment-curvature analysis",
      "Hysteretic behavior",
      "Menegotto-Pinto steel model",
      "Bilinear material models",
      "Newton-Raphson method",
      "Modified Newton-Raphson method",
      "Incremental-iterative procedures",
      "Nonlinear static pushover analysis",
      "Nonlinear time-history analysis",
    ],
    materials:
      "Scripts MATLAB · Modelos OpenSees · Comparaciones entre cálculo manual y software · Ejemplos de convergencia · Manuales de análisis no lineal · Videos explicativos de algoritmos",
    icon: "curve",
  },
  {
    id: "dynamics",
    number: "04",
    title: "Structural Dynamics",
    description:
      "Área dedicada al estudio de la respuesta dinámica de sistemas estructurales, desde sistemas de un grado de libertad hasta sistemas de múltiples grados de libertad.",
    topics: [
      "Single-degree-of-freedom systems",
      "Free and forced vibration",
      "Damping models",
      "Response to harmonic loading",
      "Response spectrum",
      "Newmark method",
      "Central difference method",
      "Modal analysis",
      "Modal superposition",
      "Rayleigh damping",
      "Multi-degree-of-freedom systems",
      "Time-history analysis",
      "Frequency-domain analysis",
      "Experimental modal identification",
    ],
    materials:
      "Códigos de integración numérica · Ejemplos de respuesta sísmica · Comparación entre respuesta modal y directa · Procesamiento de señales · Videos sobre dinámica estructural · Mini curso gratuito de dinámica estructural",
    icon: "wave",
  },
  {
    id: "seismic-design",
    number: "05",
    title: "Seismic Design of Concrete and Steel Structures",
    description:
      "Área enfocada en el diseño sísmico de estructuras de concreto armado y acero estructural, considerando normativa, ductilidad, detallado sísmico, sistemas resistentes y criterios de desempeño.",
    topics: [
      "Reinforced concrete frames",
      "Structural walls",
      "Dual systems",
      "Capacity design",
      "Strong column–weak beam criterion",
      "Beam-column joints",
      "Shear design",
      "Confinement",
      "Drift control",
      "Irregularities",
      "Seismic load combinations",
      "Moment-resisting frames",
      "Concentrically braced frames",
      "Eccentrically braced frames",
      "Links in EBF systems",
      "Buckling-restrained braces",
      "Panel zone behavior",
      "Prequalified moment connections",
      "Base plates",
      "Seismic detailing",
      "Ductility and energy dissipation",
    ],
    materials:
      "Ejemplos de diseño · Plantillas de verificación · Manuales normativos · Memorias de cálculo · Videos de diseño por elementos · Casos de estudio",
    icon: "building",
  },
  {
    id: "pbee",
    number: "06",
    title: "Performance-Based Earthquake Engineering",
    description:
      "Área orientada a la evaluación del desempeño estructural frente a demandas sísmicas, considerando niveles de desempeño, daño esperado, análisis no lineal y toma de decisiones basada en riesgo.",
    topics: [
      "Performance objectives",
      "Hazard levels",
      "Serviceability, life safety and collapse prevention",
      "Nonlinear static procedures",
      "Nonlinear dynamic procedures",
      "Incremental dynamic analysis",
      "Fragility curves",
      "Damage measures",
      "Engineering demand parameters",
      "Intensity measures",
      "Collapse assessment",
      "Loss estimation",
      "Resilience-oriented design",
    ],
    materials:
      "Ejemplos de análisis por desempeño · Scripts para curvas de fragilidad · Estudios de caso · Resúmenes de documentos FEMA, ASCE o PEER · Videos introductorios · Lecturas comentadas",
    icon: "target",
  },
  {
    id: "risk",
    number: "07",
    title: "Seismic Risk Assessment of Buildings",
    description:
      "Área enfocada en la evaluación del riesgo sísmico de edificaciones, considerando amenaza, exposición, vulnerabilidad, daño esperado y pérdidas económicas.",
    topics: [
      "Probabilistic seismic hazard analysis",
      "Seismic sources",
      "Ground motion prediction equations",
      "Exposure models",
      "Building typologies",
      "Vulnerability functions",
      "Fragility functions",
      "Expected annual loss",
      "Probable maximum loss",
      "Risk maps",
      "Loss exceedance curves",
      "Seismic risk mitigation",
    ],
    materials:
      "Flujos de trabajo con CRISIS · Flujos de trabajo con CAPRA · Mapas en QGIS · Ejemplos de exposición urbana · Hojas de cálculo · Reportes técnicos · Videos paso a paso",
    icon: "globe",
  },
];

export type Project = {
  id: string;
  title: string;
  abstract: string;
  area: string;
  tech: string[];
  level: Level;
  sections: { heading: string; body: string }[];
  files: string[];
  references: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "matrix-solver",
    title: "Matrix Analysis Solver",
    abstract:
      "Código para análisis de armaduras y pórticos usando el método de rigidez directa, con ensamblaje global, imposición de condiciones de frontera y recuperación de fuerzas internas.",
    area: "Matrix Structural Analysis",
    tech: ["MATLAB", "Python"],
    level: "Intermediate",
    sections: [
      { heading: "Problem statement", body: "Implementar un solver general de análisis matricial capaz de resolver armaduras 2D y pórticos planos con cualquier configuración de nodos, elementos y restricciones, devolviendo desplazamientos, reacciones y fuerzas internas." },
      { heading: "Methodology", body: "Se construyen las matrices de rigidez locales, se transforman al sistema global mediante matrices de transformación, se ensamblan en la matriz global y se resuelve el sistema tras aplicar las condiciones de frontera." },
      { heading: "Theoretical background", body: "Método de rigidez directa: K·U = F. La matriz de rigidez del elemento se obtiene a partir de propiedades geométricas y mecánicas, y se ensambla por ensamblaje directo de términos." },
      { heading: "Computational implementation", body: "Estructura modular en MATLAB/Python: módulo de elemento, módulo de ensamblaje, módulo de solución y módulo de post-procesamiento. Verificación con ejemplos analíticos de la literatura." },
      { heading: "Results", body: "Los resultados coinciden con soluciones analíticas para armaduras simples y pórticos de un piso. El solver escala a sistemas de cientos de grados de libertad sin pérdida de precisión." },
      { heading: "Discussion", body: "La implementación transparente permite extender a elementos de pórtico 3D, grillages y elementos con liberaciones. Es base para análisis no lineal posterior." },
    ],
    files: ["matrix_solver.m", "matrix_solver.py", "examples.pdf"],
    references: ["Kassimali, A. Matrix Analysis of Structures", "McGuire, Gallagher & Ziemian. Matrix Structural Analysis"],
  },
  {
    id: "fem-beam",
    title: "Finite Element Beam Models",
    abstract:
      "Formulación de elementos de viga y pórtico por elementos finitos, comparación con soluciones analíticas y verificación de convergencia.",
    area: "Finite Element Method",
    tech: ["Python", "MATLAB"],
    level: "Intermediate",
    sections: [
      { heading: "Problem statement", body: "Desarrollar elementos finitos de viga Euler-Bernoulli y Timoshenko, validar contra soluciones analíticas y estudiar la convergencia con refinamiento de malla." },
      { heading: "Methodology", body: "Implementación de funciones de forma, integración numérica (Gauss-Legendre) y ensamblaje de la matriz de rigidez del elemento. Comparación con la teoría de vigas." },
      { heading: "Theoretical background", body: "Formulación débil del problema de vigas, funciones de forma Hermitianas para Euler-Bernoulli y funciones lineales para Timoshenko con corrección de shear locking." },
      { heading: "Computational implementation", body: "Notebook de Python con verificación de convergencia h-refinement, comparación con soluciones de resistencia de materiales." },
      { heading: "Results", body: "Convergencia cuadrática para Euler-Bernoulli y lineal para Timoshenko sin corrección, validando la implementación." },
      { heading: "Discussion", body: "La base FE permite extender a elementos 2D de tensión/deformación plana para modelos más generales." },
    ],
    files: ["fem_beam.ipynb", "fem_beam.m", "validation_report.pdf"],
    references: ["Hughes, T.J.R. The Finite Element Method", "Zienkiewicz & Taylor. The Finite Element Method"],
  },
  {
    id: "nonlinear-sdof",
    title: "Nonlinear SDOF Solver",
    abstract:
      "Implementación de integración paso a paso con modelos bilineales e histéricos para sistemas de un grado de libertad sometidos a registros sísmicos.",
    area: "Nonlinear Structural Analysis",
    tech: ["MATLAB", "Python"],
    level: "Advanced",
    sections: [
      { heading: "Problem statement", body: "Resolver la respuesta de un SDOF no lineal ante cargas dinámicas arbitrarias con modelos constitutivos bilineal y Menegotto-Pinto, usando integración Newmark-β." },
      { heading: "Methodology", body: "Esquema predictor-corrector con iteración Newton-Raphson dentro de cada paso. Modelo constitutivo con reglas de cargas y descargas según el material." },
      { heading: "Theoretical background", body: "Ecuación de movimiento no lineal: m·ü + c·u̇ + f_r(u) = -m·ü_g. Integración Newmark-β con iteración tangente. Reglas histeréticas de Menegotto-Pinto." },
      { heading: "Computational implementation", body: "Solver modular en MATLAB con gráficos de histéresis, energía disipada y desplazamientos en función del tiempo." },
      { heading: "Results", body: "Comparación con resultados de OpenSees para SDOFs con mismo modelo. Energía disipada y desplazamientos máximos concuerdan." },
      { heading: "Discussion", body: "La implementación es base para análisis de fragilidad y evaluación por desempeño." },
    ],
    files: ["nonlinear_sdof.m", "newmark_integrator.py", "example_ground_motion.txt"],
    references: ["Chopra, A.K. Dynamics of Structures", "Menegotto & Pinto. Method of analysis for cyclically loaded RC frames"],
  },
  {
    id: "menegotto-pinto",
    title: "Menegotto-Pinto Model",
    abstract:
      "Implementación computacional del modelo de acero Menegotto-Pinto y comparación con OpenSees.",
    area: "Nonlinear Structural Analysis",
    tech: ["MATLAB", "OpenSees", "Python"],
    level: "Advanced",
    sections: [
      { heading: "Problem statement", body: "Implementar el modelo constitutivo de acero Menegotto-Pinto (con transición isotrópica) y validarlo frente a OpenSees Steel02." },
      { heading: "Methodology", body: "Implementación de la curva esqueleto bilineal y reglas de transición entre ramas con curva racional de Menegotto. Comparación ciclo a ciclo con Steel02." },
      { heading: "Theoretical background", body: "Curva σ-ε regida por ecuación racional con tres parámetros R0, R1, R2 que controlan la transición Bauschinger. Endurecimiento isotrópico opcional." },
      { heading: "Computational implementation", body: "Clase de material en Python/MATLAB con interfaz compatible con un solver de elementos tipo fibra. Comparación con script Tcl de OpenSees." },
      { heading: "Results", body: "Los bucles histeréticos son idénticos a Steel02 para los parámetros equivalentes. La energía disipada por ciclo coincide dentro del 1%." },
      { heading: "Discussion", body: "El modelo es base para secciones tipo fibra en análisis no lineal de pórticos de RC y acero." },
    ],
    files: ["menegotto_pinto.m", "steel02_validation.py", "opensees_model.tcl"],
    references: ["Menegotto & Pinto (1973)", "Filippou, Popov & Bertero (1983)"],
  },
  {
    id: "dynamics-toolkit",
    title: "Structural Dynamics Toolkit",
    abstract:
      "Códigos de respuesta dinámica, espectros, análisis modal y superposición modal para sistemas lineales.",
    area: "Structural Dynamics",
    tech: ["MATLAB", "Python"],
    level: "Intermediate",
    sections: [
      { heading: "Problem statement", body: "Conjunto de herramientas para análisis dinámico lineal: respuesta libre, forzada, armónica, sísmica y análisis modal de MDOF." },
      { heading: "Methodology", body: "Implementación de Newmark-β, central difference, análisis modal y superposición modal. Cálculo de espectros de respuesta para registros sísmicos." },
      { heading: "Theoretical background", body: "Descomposición modal del sistema K·U + C·U̇ + M·Ü = F. Respuesta por superposición de modos con amortiguamiento modal." },
      { heading: "Computational implementation", body: "Toolkit modular con funciones para integradores, espectros y análisis modal. Verificación con ejemplos de Chopra." },
      { heading: "Results", body: "Las respuestas modales y directas coinciden para amortiguamiento proporcional. Los espectros generados coinciden con los de software de referencia." },
      { heading: "Discussion", body: "El toolkit es base para el mini-curso de dinámica estructural." },
    ],
    files: ["dynamics_toolkit.m", "response_spectrum.py", "modal_analysis.py"],
    references: ["Chopra, A.K. Dynamics of Structures", "Clough & Penzien. Dynamics of Structures"],
  },
  {
    id: "spectrum-generator",
    title: "Seismic Spectrum Generator",
    abstract:
      "Herramienta para generación de espectros de diseño y verificación normativa.",
    area: "Earthquake Engineering",
    tech: ["Python", "Mathcad"],
    level: "Intermediate",
    sections: [
      { heading: "Problem statement", body: "Generar espectros de diseño elásticos según normativa (ej. ASCE 7, NTE E.030) y exportar para uso en análisis sísmico." },
      { heading: "Methodology", body: "Formulación por regiones espectrales (constante de aceleración, velocidad y desplazamiento) con corrección por sitio y ductilidad." },
      { heading: "Theoretical background", body: "Espectro de diseño como envolvente normalizada de espectros elásticos escalados, con factores de sitio y comportamiento." },
      { heading: "Computational implementation", body: "Interfaz de línea de comandos y plantilla Mathcad con exportación a CSV/JSON." },
      { heading: "Results", body: "Espectros reproducibles y comparables con ejemplos de normas vigentes." },
      { heading: "Discussion", body: "Útil para verificar espectros ingresados en ETABS/SAP2000 y para elaboración de memorias de cálculo." },
    ],
    files: ["spectrum_generator.py", "spectrum_template.xmcd", "design_spectrum_example.csv"],
    references: ["ASCE/SEI 7", "NTE E.030 Diseño Sismorresistente"],
  },
  {
    id: "etabs-automation",
    title: "ETABS Automation App",
    abstract:
      "Aplicación para automatizar procesos repetitivos en análisis sísmico en ETABS.",
    area: "Computational Tools",
    tech: ["Python", "PyQt", "ETABS API"],
    level: "Advanced",
    sections: [
      { heading: "Problem statement", body: "Automatizar la definición de casos sísmicos, combinaciones de carga, masas y verificación de derivas en ETABS." },
      { heading: "Methodology", body: "Interfaz gráfica en PyQt que consume la API de ETABS (CSI OAPI) para ejecutar flujos repetitivos." },
      { heading: "Theoretical background", body: "Modelado sísmico equivalente, análisis modal y verificación de derivas según normativa." },
      { heading: "Computational implementation", body: "Aplicación de escritorio con perfiles de proyecto reutilizables y reportes automáticos en Excel." },
      { heading: "Results", body: "Reducción sustancial del tiempo de modelado en proyectos de edificios con configuraciones típicas." },
      { heading: "Discussion", body: "La automatización reduce errores manuales y estandariza criterios de modelado." },
    ],
    files: ["etabs_automation.py", "pyqt_ui.py", "example_profile.json"],
    references: ["CSI ETABS API Documentation", "Wilson, E. Static & Dynamic Analysis"],
  },
  {
    id: "steel-seismic",
    title: "Steel Seismic Design Examples",
    abstract:
      "Ejemplos de pórticos, conexiones, arriostres y sistemas sísmicos de acero.",
    area: "Seismic Design of Steel Structures",
    tech: ["Python", "ETABS"],
    level: "Advanced",
    sections: [
      { heading: "Problem statement", body: "Conjunto de ejemplos de diseño sísmico de pórticos de acero: momentos, CBF, EBF y BRB." },
      { heading: "Methodology", body: "Procedimientos de AISC 341/358 con verificación de capacidad, conexiones precalificadas y detallado sísmico." },
      { heading: "Theoretical background", body: "Filosofía de diseño por capacidad, sistemas con comportamiento dúctil, disipación de energía y conexiones precalificadas." },
      { heading: "Computational implementation", body: "Memorias de cálculo en LaTeX y scripts de verificación de capacidad." },
      { heading: "Results", body: "Documentación técnica reproducible de cuatro sistemas sísmicos de acero." },
      { heading: "Discussion", body: "Los ejemplos son material docente para cursos de diseño sísmico de acero." },
    ],
    files: ["steel_smf_example.pdf", "cbf_design.pdf", "ebf_design.pdf", "brb_design.pdf"],
    references: ["AISC 341 Seismic Provisions", "AISC 358 Prequalified Connections"],
  },
  {
    id: "concrete-seismic",
    title: "Concrete Seismic Design Examples",
    abstract:
      "Ejemplos de pórticos, muros estructurales, sistemas duales y criterios de capacidad en concreto armado.",
    area: "Seismic Design of Concrete Structures",
    tech: ["Python", "ETABS"],
    level: "Advanced",
    sections: [
      { heading: "Problem statement", body: "Ejemplos de diseño sísmico de pórticos de RC, muros estructurales y sistemas duales con criterios de capacidad." },
      { heading: "Methodology", body: "Procedimientos ACI 318: capacidad de vigas y columnas, diseño a corte, confinamiento y detallado sísmico." },
      { heading: "Theoretical background", body: "Strong column-weak beam, capacidad de momento, corte confinado y diseño por desempeño." },
      { heading: "Computational implementation", body: "Memorias de cálculo en LaTeX con verificaciones automáticas en Python." },
      { heading: "Results", body: "Tres ejemplos completos: pórtico, muro y sistema dual." },
      { heading: "Discussion", body: "Material docente para cursos de concreto armado y diseño sísmico." },
    ],
    files: ["rc_frame_example.pdf", "rc_wall_example.pdf", "rc_dual_example.pdf"],
    references: ["ACI 318 Building Code", "Paulay & Priestley. Seismic Design of RC and Masonry Buildings"],
  },
  {
    id: "performance-assessment",
    title: "Performance-Based Assessment",
    abstract:
      "Ejemplos de evaluación por desempeño usando análisis no lineal estático y dinámico.",
    area: "Performance-Based Earthquake Engineering",
    tech: ["OpenSees", "Python"],
    level: "Research-oriented",
    sections: [
      { heading: "Problem statement", body: "Evaluar el desempeño de edificios existentes mediante pushover e IDA, con definición de niveles de desempeño IO, LS y CP." },
      { heading: "Methodology", body: "Modelado no lineal tipo fibra en OpenSees, pushover con control de desplazamiento, IDA con escalado de registros." },
      { heading: "Theoretical background", body: "ASCE 41, FEMA P-58: parámetros de demanda, medidas de daño, fragilidad y pérdida." },
      { heading: "Computational implementation", body: "Pipeline en Python que orquesta OpenSees, post-procesa resultados y genera curvas IDA y fragilidad." },
      { heading: "Results", body: "Curvas de fragilidad y pérdidas esperadas para tres arquetipos estructurales." },
      { heading: "Discussion", body: "El flujo es base para estudios de riesgo de portafolios de edificios." },
    ],
    files: ["opensees_model.tcl", "ida_pipeline.py", "fragility_curves.csv"],
    references: ["FEMA P-58", "ASCE 41-17 Seismic Evaluation"],
  },
  {
    id: "risk-workflow",
    title: "Seismic Risk Workflow",
    abstract:
      "Flujo de amenaza, exposición, vulnerabilidad y pérdida esperada.",
    area: "Seismic Risk Assessment",
    tech: ["Python", "QGIS", "CRISIS"],
    level: "Research-oriented",
    sections: [
      { heading: "Problem statement", body: "Implementar un flujo de riesgo sísmico probabilista: amenaza (PSHA), exposición, vulnerabilidad y pérdida anual esperada." },
      { heading: "Methodology", body: "PSHA con CRISIS, modelo de exposición urbano, funciones de vulnerabilidad por tipología y agregación de pérdidas." },
      { heading: "Theoretical background", body: "Riesgo = Amenaza × Vulnerabilidad × Exposición. Pérdida anual esperada por integración de curvas de excedencia." },
      { heading: "Computational implementation", body: "Pipeline en Python con visualización en QGIS de mapas de pérdida." },
      { heading: "Results", body: "Mapas de pérdida probable máxima y curvas de excedencia de pérdidas para un caso de estudio urbano." },
      { heading: "Discussion", body: "El flujo es transferible a otras ciudades y escalable a nivel regional." },
    ],
    files: ["crisis_model.dat", "exposure.csv", "loss_pipeline.py", "qgis_project.qgz"],
    references: ["CRISIS Manual", "CAPRA Framework Documentation"],
  },
];

export type Tool = {
  id: string;
  name: string;
  problem: string;
  area: string;
  tech: string;
  files: string[];
  level: Level;
  video: boolean;
  manual: boolean;
  category: string;
};

export const TOOL_CATEGORIES = [
  "MATLAB scripts",
  "Python scripts",
  "OpenSees models",
  "ETABS API tools",
  "Mathcad templates",
  "LaTeX report templates",
  "Excel calculation sheets",
  "Interactive notebooks",
] as const;

export const TOOLS: Tool[] = [
  {
    id: "matrix-solver-tool",
    name: "Matrix Structural Analysis Solver",
    problem: "Resolver armaduras y pórticos mediante el método de rigidez",
    area: "Matrix Structural Analysis",
    tech: "MATLAB / Python",
    files: ["matrix_solver.m", "matrix_solver.py"],
    level: "Intermediate",
    video: true,
    manual: true,
    category: "MATLAB scripts",
  },
  {
    id: "newmark-tool",
    name: "Newmark Time Integration Tool",
    problem: "Calcular respuesta dinámica paso a paso",
    area: "Structural Dynamics",
    tech: "MATLAB",
    files: ["newmark_beta.m"],
    level: "Intermediate",
    video: true,
    manual: true,
    category: "MATLAB scripts",
  },
  {
    id: "nonlinear-sdof-tool",
    name: "Nonlinear Hysteretic SDOF Model",
    problem: "Evaluar respuesta no lineal ante registros sísmicos",
    area: "Nonlinear Structural Analysis",
    tech: "MATLAB / OpenSees",
    files: ["hysteretic_sdof.m", "opensees_sdof.tcl"],
    level: "Advanced",
    video: true,
    manual: true,
    category: "OpenSees models",
  },
  {
    id: "spectrum-tool",
    name: "Seismic Spectrum Generator",
    problem: "Generar espectros de diseño y memorias técnicas",
    area: "Earthquake Engineering",
    tech: "Mathcad / Python",
    files: ["spectrum.xmcd", "spectrum.py"],
    level: "Beginner",
    video: true,
    manual: true,
    category: "Mathcad templates",
  },
  {
    id: "etabs-tool",
    name: "ETABS Automation Interface",
    problem: "Automatizar definición de casos sísmicos y combinaciones",
    area: "Computational Tools",
    tech: "Python / PyQt / ETABS API",
    files: ["etabs_automation.py", "ui.py"],
    level: "Advanced",
    video: true,
    manual: true,
    category: "ETABS API tools",
  },
  {
    id: "latex-tool",
    name: "LaTeX Calculation Report Template",
    problem: "Generar memorias de cálculo profesionales",
    area: "Technical Writing",
    tech: "LaTeX",
    files: ["report_template.tex", "memoria.cls"],
    level: "Beginner",
    video: false,
    manual: true,
    category: "LaTeX report templates",
  },
  {
    id: "fem-notebook",
    name: "FEM Notebook — Beam & Frame Elements",
    problem: "Aprender formulación FE con ejemplos ejecutables",
    area: "Finite Element Method",
    tech: "Python (Jupyter)",
    files: ["fem_notebook.ipynb"],
    level: "Intermediate",
    video: true,
    manual: true,
    category: "Interactive notebooks",
  },
  {
    id: "excel-drift",
    name: "Drift & Irregularity Checker (Excel)",
    problem: "Verificar derivas e irregularidades en edificios",
    area: "Seismic Design",
    tech: "Excel",
    files: ["drift_checker.xlsx"],
    level: "Beginner",
    video: false,
    manual: true,
    category: "Excel calculation sheets",
  },
];

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: Level;
  duration: string;
  type: string;
  prerequisites: string;
  objectives: string;
};

export const RESOURCE_CATEGORIES = [
  "Matrix Structural Analysis",
  "Finite Element Method",
  "Nonlinear Structural Analysis",
  "Structural Dynamics",
  "Earthquake Engineering",
  "Seismic Design of Concrete Structures",
  "Seismic Design of Steel Structures",
  "Performance-Based Earthquake Engineering",
  "Seismic Risk Assessment",
  "Computational Tools",
  "Technical Writing and LaTeX",
  "Engineering Software Tutorials",
] as const;

export const RESOURCE_TYPES = ["video", "PDF", "code", "template", "manual", "example"] as const;

export const RESOURCES: Resource[] = [
  { id: "r1", title: "Direct Stiffness Method — Step by Step", description: "Notas y ejemplo paso a paso para ensamblar la matriz global de un pórtico plano.", category: "Matrix Structural Analysis", level: "Beginner", duration: "1.5 h", type: "PDF", prerequisites: "Álgebra lineal, estática", objectives: "Entender ensamblaje global y resolución de un pórtico 2D." },
  { id: "r2", title: "Shape Functions and Element Stiffness", description: "Notebook con derivación de funciones de forma y matriz de rigidez de elementos 1D.", category: "Finite Element Method", level: "Intermediate", duration: "2 h", type: "code", prerequisites: "Cálculo vectorial", objectives: "Construir elemento FE básico desde cero." },
  { id: "r3", title: "Plastic Hinges and Pushover", description: "Manual introductorio al análisis pushover con bisagras plásticas.", category: "Nonlinear Structural Analysis", level: "Advanced", duration: "3 h", type: "manual", prerequisites: "Análisis estructural lineal", objectives: "Realizar un pushover de un pórtico de RC." },
  { id: "r4", title: "Newmark-β Integration Code", description: "Código comentado del integrador Newmark para SDOF.", category: "Structural Dynamics", level: "Intermediate", duration: "1 h", type: "code", prerequisites: "Ecuaciones diferenciales", objectives: "Implementar y validar Newmark-β." },
  { id: "r5", title: "Response Spectrum for Beginners", description: "Video explicativo del concepto y construcción del espectro de respuesta.", category: "Earthquake Engineering", level: "Beginner", duration: "45 min", type: "video", prerequisites: "Dinámica de SDOF", objectives: "Interpretar un espectro elástico de diseño." },
  { id: "r6", title: "RC Wall Seismic Detailing", description: "Plantilla de detallado sísmico de muros estructurales.", category: "Seismic Design of Concrete Structures", level: "Intermediate", duration: "1.5 h", type: "template", prerequisites: "Concreto armado I", objectives: "Detallar muros según ACI 318." },
  { id: "r7", title: "Concentrically Braced Frames — Worked Example", description: "Ejemplo resuelto de diseño sísmico de un CBF.", category: "Seismic Design of Steel Structures", level: "Advanced", duration: "2 h", type: "example", prerequisites: "Diseño de acero I", objectives: "Diseñar un CBF según AISC 341." },
  { id: "r8", title: "IDA — Incremental Dynamic Analysis", description: "Manual de procedimiento IDA con script de post-procesamiento.", category: "Performance-Based Earthquake Engineering", level: "Research-oriented", duration: "4 h", type: "manual", prerequisites: "Análisis no lineal", objectives: "Construir curvas IDA y fragilidad." },
  { id: "r9", title: "PSHA with CRISIS", description: "Guía paso a paso para PSHA con el software CRISIS.", category: "Seismic Risk Assessment", level: "Research-oriented", duration: "5 h", type: "manual", prerequisites: "Sismología básica", objectives: "Construir curvas de amenaza sísmica." },
  { id: "r10", title: "ETABS API — First Steps", description: "Tutorial para iniciar la automatización de ETABS con Python.", category: "Computational Tools", level: "Intermediate", duration: "2 h", type: "video", prerequisites: "Python básico", objectives: "Conectar y leer un modelo ETABS desde Python." },
  { id: "r11", title: "LaTeX for Calculation Reports", description: "Manual introductorio de LaTeX aplicado a memorias de cálculo.", category: "Technical Writing and LaTeX", level: "Beginner", duration: "1.5 h", type: "manual", prerequisites: "Ninguno", objectives: "Producir una memoria de cálculo en LaTeX." },
  { id: "r12", title: "OpenSees — First Model", description: "Video tutorial para crear un primer modelo de pórtico en OpenSees.", category: "Engineering Software Tutorials", level: "Beginner", duration: "1 h", type: "video", prerequisites: "Análisis estructural", objectives: "Definir y resolver un modelo lineal en OpenSees." },
];

export type Course = {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: string[];
  level: Level;
  duration: string;
};

export const COURSES: Course[] = [
  {
    id: "c1",
    title: "Introduction to Matrix Structural Analysis",
    description: "Fundamentos del método de rigidez directa aplicado a armaduras y pórticos.",
    objectives: ["Ensamblar matrices globales", "Resolver sistemas estructurales", "Recuperar fuerzas internas"],
    lessons: ["Direct stiffness method", "Coordinate transformation", "Assembly", "Boundary conditions", "Truss examples", "Frame examples", "MATLAB implementation", "Final example: 2D frame"],
    level: "Beginner",
    duration: "8 h",
  },
  {
    id: "c2",
    title: "Fundamentals of the Finite Element Method",
    description: "Introducción al MEF desde elementos 1D hasta elementos 2D.",
    objectives: ["Construir elementos FE", "Integrar numéricamente", "Verificar convergencia"],
    lessons: ["Strong vs weak form", "Shape functions", "Element stiffness", "Numerical integration", "Beam elements", "Plane stress", "Mesh convergence", "Final example: cantilever beam"],
    level: "Intermediate",
    duration: "10 h",
  },
  {
    id: "c3",
    title: "Introduction to Structural Dynamics",
    description: "Respuesta dinámica de SDOF y MDOF.",
    objectives: ["Resolver SDOF libre y forzado", "Construir espectros", "Aplicar análisis modal"],
    lessons: ["Single-degree-of-freedom systems", "Free vibration", "Damping", "Harmonic excitation", "Numerical integration", "Response spectrum", "MATLAB implementation", "Final example: seismic response of an SDOF system"],
    level: "Intermediate",
    duration: "10 h",
  },
  {
    id: "c4",
    title: "Newmark Method for Dynamic Response Analysis",
    description: "Implementación y aplicación del método de Newmark-β.",
    objectives: ["Implementar Newmark-β", "Validar con ejemplos", "Comparar con integradores explícitos"],
    lessons: ["Time integration fundamentals", "Newmark-β derivation", "Stability and accuracy", "Implementation in MATLAB", "Comparison with central difference", "Application to seismic response", "Final example: MDOF response"],
    level: "Intermediate",
    duration: "6 h",
  },
  {
    id: "c5",
    title: "Introduction to Nonlinear Structural Analysis",
    description: "Modelado no lineal material y geométrico con esquemas iterativos.",
    objectives: ["Modelar no linealidad material", "Aplicar Newton-Raphson", "Realizar análisis pushover"],
    lessons: ["Sources of nonlinearity", "Bilinear models", "Menegotto-Pinto", "Newton-Raphson", "Modified Newton-Raphson", "Pushover analysis", "Final example: RC frame pushover"],
    level: "Advanced",
    duration: "12 h",
  },
  {
    id: "c6",
    title: "Seismic Design Philosophy for Concrete Structures",
    description: "Filosofía de diseño sísmico y detallado de elementos de RC.",
    objectives: ["Aplicar capacity design", "Detallar vigas y columnas", "Verificar derivas"],
    lessons: ["Seismic design philosophy", "Capacity design", "Strong column-weak beam", "Beam-column joints", "Confinement", "Drift control", "Final example: RC frame design"],
    level: "Advanced",
    duration: "10 h",
  },
  {
    id: "c7",
    title: "Seismic Design Philosophy for Steel Structures",
    description: "Sistemas sísmicos de acero: SMF, CBF, EBF, BRB.",
    objectives: ["Diseñar SMF", "Diseñar CBF y EBF", "Seleccionar BRB"],
    lessons: ["Steel seismic systems", "Moment-resisting frames", "Concentrically braced frames", "Eccentrically braced frames", "Buckling-restrained braces", "Prequalified connections", "Final example: CBF design"],
    level: "Advanced",
    duration: "10 h",
  },
  {
    id: "c8",
    title: "Introduction to Performance-Based Earthquake Engineering",
    description: "Conceptos de desempeño, daño, fragilidad y pérdida.",
    objectives: ["Definir niveles de desempeño", "Construir fragilidad", "Estimar pérdidas"],
    lessons: ["Performance objectives", "Hazard levels", "Nonlinear procedures", "IDA", "Fragility curves", "Loss estimation", "Final example: performance assessment"],
    level: "Research-oriented",
    duration: "10 h",
  },
  {
    id: "c9",
    title: "Introduction to Seismic Risk Assessment",
    description: "Flujo de riesgo sísmico: amenaza, exposición, vulnerabilidad, pérdida.",
    objectives: ["Realizar PSHA básica", "Modelar exposición", "Estimar pérdidas"],
    lessons: ["PSHA concepts", "Seismic sources", "GMPEs", "Exposure models", "Vulnerability functions", "Loss curves", "Final example: urban portfolio"],
    level: "Research-oriented",
    duration: "12 h",
  },
  {
    id: "c10",
    title: "MATLAB for Structural Engineering",
    description: "Programación en MATLAB aplicada al análisis estructural.",
    objectives: ["Escribir scripts claros", "Implementar análisis matricial", "Visualizar resultados"],
    lessons: ["MATLAB basics", "Matrices and linear algebra", "Functions and scripts", "Plotting", "Structural analysis example", "Optimization basics", "Final example: matrix solver"],
    level: "Beginner",
    duration: "8 h",
  },
  {
    id: "c11",
    title: "Python for Structural Engineering Automation",
    description: "Python para automatización estructural y análisis.",
    objectives: ["Automatizar tareas", "Manipular modelos", "Construir pipelines"],
    lessons: ["Python basics", "NumPy & Pandas", "File I/O", "APIs (ETABS)", "Plotting with Matplotlib", "Building a pipeline", "Final example: ETABS automation"],
    level: "Intermediate",
    duration: "10 h",
  },
  {
    id: "c12",
    title: "LaTeX for Engineering Reports",
    description: "Producción de memorias de cálculo profesionales en LaTeX.",
    objectives: ["Escribir memorias", "Incluir figuras y tablas", "Gestionar referencias"],
    lessons: ["LaTeX basics", "Document classes", "Math typesetting", "Tables and figures", "Bibliography with BibTeX", "Templates", "Final example: calculation report"],
    level: "Beginner",
    duration: "6 h",
  },
];

export type LibraryDoc = {
  id: string;
  title: string;
  type: string;
  area: string;
  level: Level;
  software: string;
  language: string;
  date: string;
};

export const LIBRARY_DOCS: LibraryDoc[] = [
  { id: "l1", title: "Lecture Notes — Matrix Structural Analysis", type: "Lecture notes", area: "Matrix Structural Analysis", level: "Beginner", software: "—", language: "English", date: "2024-03-12" },
  { id: "l2", title: "Lecture Notes — Finite Element Method", type: "Lecture notes", area: "Finite Element Method", level: "Intermediate", software: "Python", language: "English", date: "2024-04-05" },
  { id: "l3", title: "Nonlinear Analysis Manual", type: "Software manuals", area: "Nonlinear Structural Analysis", level: "Advanced", software: "OpenSees", language: "English", date: "2024-06-21" },
  { id: "l4", title: "Design Example — RC Moment Frame", type: "Design examples", area: "Seismic Design of Concrete Structures", level: "Advanced", software: "ETABS", language: "Spanish", date: "2023-11-10" },
  { id: "l5", title: "Design Example — Steel CBF", type: "Design examples", area: "Seismic Design of Steel Structures", level: "Advanced", software: "ETABS", language: "Spanish", date: "2023-12-02" },
  { id: "l6", title: "Technical Report — IDA Workflow", type: "Technical reports", area: "Performance-Based Earthquake Engineering", level: "Research-oriented", software: "OpenSees", language: "English", date: "2024-08-18" },
  { id: "l7", title: "Technical Report — Urban Seismic Risk", type: "Technical reports", area: "Seismic Risk Assessment", level: "Research-oriented", software: "CRISIS", language: "Spanish", date: "2024-09-30" },
  { id: "l8", title: "Calculation Report — 5-Story Building", type: "Calculation reports", area: "Seismic Design of Concrete Structures", level: "Intermediate", software: "ETABS", language: "Spanish", date: "2024-01-22" },
  { id: "l9", title: "Literature Summary — PBEE Frameworks", type: "Literature summaries", area: "Performance-Based Earthquake Engineering", level: "Research-oriented", software: "—", language: "English", date: "2024-05-14" },
  { id: "l10", title: "Code Documentation — Matrix Solver", type: "Code documentation", area: "Matrix Structural Analysis", level: "Intermediate", software: "MATLAB", language: "English", date: "2024-02-09" },
  { id: "l11", title: "Research Notes — Modal Identification", type: "Research notes", area: "Structural Dynamics", level: "Research-oriented", software: "Python", language: "English", date: "2024-07-07" },
  { id: "l12", title: "Lecture Notes — Structural Dynamics", type: "Lecture notes", area: "Structural Dynamics", level: "Intermediate", software: "MATLAB", language: "English", date: "2024-04-28" },
];

export const FORUM_CATEGORIES = [
  "Matrix Structural Analysis",
  "Finite Element Method",
  "Nonlinear Analysis",
  "Structural Dynamics",
  "Concrete Seismic Design",
  "Steel Seismic Design",
  "Performance-Based Engineering",
  "Seismic Risk",
  "MATLAB/Python/OpenSees",
  "ETABS/SAP2000",
  "Technical Writing and LaTeX",
] as const;

export const FORUM_THREADS = [
  { id: "t1", category: "Matrix Structural Analysis", title: "How to handle releases in beam elements?", author: "student_eng", replies: 7, votes: 14, last: "2h ago" },
  { id: "t2", category: "Structural Dynamics", title: "Choosing Rayleigh damping coefficients", author: "lucia_r", replies: 4, votes: 9, last: "1d ago" },
  { id: "t3", category: "Nonlinear Analysis", title: "Menegotto-Pinto vs bilinear for SDOF", author: "mike_eng", replies: 12, votes: 22, last: "3h ago" },
  { id: "t4", category: "ETABS/SAP2000", title: "Automating load combinations via API", author: "ana_dev", replies: 5, votes: 11, last: "5h ago" },
  { id: "t5", category: "Performance-Based Engineering", title: "Defining IO/LS/CP limits for RC walls", author: "paul_r", replies: 8, votes: 17, last: "8h ago" },
  { id: "t6", category: "Technical Writing and LaTeX", title: "Best class for calculation reports?", author: "karen_w", replies: 6, votes: 13, last: "2d ago" },
  { id: "t7", category: "MATLAB/Python/OpenSees", title: "Newton-Raphson convergence issues", author: "diego_m", replies: 9, votes: 19, last: "30m ago" },
  { id: "t8", category: "Seismic Risk", title: "Building exposure model from census data", author: "sofia_p", replies: 3, votes: 6, last: "6h ago" },
];

export const RESEARCH_TOPICS = [
  "Modal identification using ambient vibration data",
  "Nonlinear dynamic analysis of structural systems",
  "Seismic risk assessment of building portfolios",
  "Computational tools for seismic design",
  "Performance-based assessment of structural systems",
];

export const RESEARCH_CATEGORIES = [
  "Manuscripts in preparation",
  "Technical reports",
  "Research notes",
  "Literature reviews",
  "Data processing studies",
  "Numerical simulation studies",
];

export const CV_SECTIONS = [
  {
    title: "Education",
    items: ["B.Sc. Civil Engineering", "Continuing education in structural dynamics and earthquake engineering"],
  },
  {
    title: "Research interests",
    items: ["Structural dynamics", "Nonlinear analysis", "Performance-based earthquake engineering", "Seismic risk assessment", "Computational tools for engineering education"],
  },
  {
    title: "Teaching experience",
    items: ["Structural analysis (undergraduate)", "Earthquake engineering (undergraduate/graduate)", "Computational tools workshops", "LaTeX & technical writing seminars"],
  },
  {
    title: "Technical projects",
    items: ["Matrix structural analysis solver", "OpenSees nonlinear pipeline", "ETABS automation app", "Seismic risk workflow for urban portfolios"],
  },
  {
    title: "Computational tools",
    items: ["MATLAB scripts", "Python automation", "OpenSees models", "Mathcad templates", "LaTeX report templates"],
  },
  {
    title: "Publications or manuscripts",
    items: ["(In preparation) Modal identification case study", "(In preparation) PBEE workflow for RC walls"],
  },
  {
    title: "Academic training",
    items: ["Short courses on nonlinear analysis", "Workshops on performance-based design", "OpenSees training"],
  },
  {
    title: "Software skills",
    items: ["MATLAB", "Python", "OpenSees", "ETABS / SAP2000", "Mathcad", "LaTeX", "QGIS", "CRISIS"],
  },
  {
    title: "Languages",
    items: ["Spanish (native)", "English (professional)"],
  },
  {
    title: "References",
    items: ["Available upon request"],
  },
];

export const CONTACT_LINKS = [
  { label: "Email", value: "alexis@example.com", href: "mailto:alexis@example.com", icon: "mail" },
  { label: "LinkedIn", value: "linkedin.com/in/alexis", href: "https://www.linkedin.com", icon: "linkedin" },
  { label: "GitHub", value: "github.com/alexis", href: "https://github.com", icon: "github" },
  { label: "Google Scholar", value: "Coming soon", href: "#", icon: "scholar" },
  { label: "ResearchGate", value: "Coming soon", href: "#", icon: "research" },
];
