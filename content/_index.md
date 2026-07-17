+++
title = "Benjamin Darnell"
template = "pages/home.html"

# ---------------------------------------------------------------------------
# Page content lives here, separate from the Strata design (templates/home.html
# + templates/base.html). Edit freely — this does not have to mirror resume.json.
# ---------------------------------------------------------------------------
[extra]

# Sidebar identity (rendered by templates/base.html). It lives here so the
# About/home page owns it; other pages fall back to just the avatar + social.
name = "Benjamin Darnell"
headline = [
  # &nbsp; keeps "Computer Science" together; &#8209; is a non-breaking hyphen for "Urbana-Champaign"
  # — so when the sidebar is narrow, each line wraps before the last unit instead of splitting it.
  "M.S., Computer&nbsp;Science",
  "University of Illinois Urbana&#8209;Champaign",
]
email = "ben@bdarnell.com"

about = [
  "I recently earned my M.S. in Computer Science from the University of Illinois Urbana-Champaign, where my research focused on programming languages and compilers, including compiler optimization, code generation, and machine learning for programming-language problems. Lately I've been building <a href='https://openmander.org' target='_blank' rel='noopener noreferrer'>OpenMander</a>, an interactive tool that brings state-of-the-art optimization algorithms to congressional redistricting.",
  "Before Illinois, I attended UC Santa Barbara's College of Creative Studies, where I researched programming languages with Prof. Ben Hardekopf and computer architecture with Prof. Jonathan Balkind, and spent a semester as an exchange student at the Technion in Haifa, Israel. Outside of research, I enjoy making maps, gardening, playing bridge, and spending time with my cat, <a href='/assets/images/barbara-sm.jpeg' target='_blank' rel='noopener noreferrer'>Barbara</a>.",
]

[[extra.education]]
logo = "/assets/images/logos/illinois.jpg"
degree = "M.S., Computer Science"
institution = "University of Illinois Urbana-Champaign"
# dates = "2022 – 2026"
# note = "<i>Specialization: Programming Languages & Compilers</i>"

[[extra.education]]
logo = "/assets/images/logos/ucsb.jpg"
degree = "B.S., Computing, with Highest Honors"
institution = "University of California, Santa Barbara — College of Creative Studies"
# dates = "2018 – 2022"

[[extra.education]]
logo = "/assets/images/logos/technion.jpg"
degree = "Exchange Student"
institution = "Technion — Israel Institute of Technology"
# dates = "Spring 2022"

[[extra.experience]]
role = "Graduate Research Assistant"
org = "University of Illinois Urbana-Champaign"
dates = "2022 – 2026"
# highlights = [
#   "Built a high-performance graph-partitioning engine in Rust for multi-objective partitioning via heuristic local search.",
#   "Led research on LLM-based code generation for low-resource programming languages (Ansible).",
# ]
logo = "/assets/images/logos/illinois.jpg"

[[extra.experience]]
role = "Graduate Teaching Assistant — CS 421, Compiler Construction"
org = "University of Illinois Urbana-Champaign"
dates = "2023"
logo = "/assets/images/logos/illinois.jpg"

[[extra.experience]]
role = "Undergraduate Research Assistant — ArchLab"
org = "University of California, Santa Barbara"
dates = "2021 – 2022"
# highlights = [
#   "Created Sootty, an open-source terminal VCD waveform viewer; mentored students on the project.",
#   "Designed a pipelined RISC-V core and extended an HDL with holes for sketch-based program synthesis. Advised by Prof. Jonathan Balkind.",
# ]
logo = "/assets/images/logos/ucsb.jpg"

[[extra.experience]]
role = "Undergraduate Research Assistant — Programming Languages Lab"
org = "University of California, Santa Barbara"
dates = "2020 – 2021"
# highlights = [
#   "Extended MOSEL (monadic second-order logic on strings) and built a C++ tool to auto-generate Formal Languages problems. Advised by Prof. Ben Hardekopf.",
# ]
logo = "/assets/images/logos/ucsb.jpg"

[[extra.experience]]
role = "Undergraduate Teaching Assistant"
org = "University of California, Santa Barbara"
dates = "2020 – 2021"
# highlights = [
#   "Mentored students in upper-division Data Structures & Algorithms and Object-Oriented Programming over five quarters; led technical review sessions and evaluated complex assignments.",
# ]
logo = "/assets/images/logos/ucsb.jpg"

[[extra.experience]]
role = "Software Engineering Intern"
org = "Jobvite, Inc."
dates = "Summer 2019"
logo = "/assets/images/logos/jobvite-logo.jpg"

[[extra.experience]]
role = "VR Engineering Intern"
org = "Baobab Studios"
dates = "Summer 2018"
logo = "/assets/images/logos/baobab-logo.jpg"

[[extra.experience]]
role = "Laboratory Assistant"
org = "Los Alamos National Laboratory"
dates = "Summer 2017"
logo = "/assets/images/logos/lanl-logo.png"

[[extra.publications]]
name = "An Empirical Comparison of Code Generation Approaches for Ansible"
authors = "<b>Benjamin Darnell</b>, Hetarth Chopra, Aaron Councilman, David Grove, Yu-Xiong Wang, and Vikram Adve"
venue = "InteNSE (ACM/IEEE), 2024"
url = "https://dl.acm.org/doi/10.1145/3643661.3643951"

[[extra.publications]]
name = "Control Logic Synthesis: Drawing the Rest of the OWL"
authors = "Zachary D. Sisco, Andrew David Alex, Zechen Ma, Yeganeh Aghamohammadi, Boming Kong, <b>Benjamin Darnell</b>, Timothy Sherwood, Ben Hardekopf, and Jonathan Balkind"
venue = "ASPLOS (ACM), 2024"
url = "https://doi.org/10.1145/3622781.3674170"

[[extra.publications]]
name = "Automatic Problem Creation"
authors = "<b>Benjamin Darnell</b> and Ben Hardekopf"
venue = "RACA-CON, 2020"
url = "https://raca-con.ccs.ucsb.edu/projects/automatic-problem-creation"
link_label = "Poster"

[[extra.awards]]
title = "UCEAP Memorial Scholar, in Memory of John Marcum"
date = "2021"

[[extra.awards]]
title = "CCS Summer Undergraduate Research Fellow"
date = "2020"

[[extra.awards]]
title = "UC Regents Scholar"
date = "2018"
# note = "Awarded to the top 1% of admitted students"

[[extra.awards]]
title = "National Merit Commended Scholar"
date = "2018"
+++
