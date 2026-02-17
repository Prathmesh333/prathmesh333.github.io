# Script to update Projects section with GitHub links and correct Resume content
import re

# Read the current HTML
with open('d:/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Mapping of Resume Titles to GitHub Repositories (based on user context and search)
# User GitHub: https://github.com/Prathmesh333
project_mappings = {
    # 1. Social Network Analysis of VCT Esports Data
    'Social Network Analysis of VCT Esports Data': {
        'github_link': 'https://github.com/Prathmesh333/Valorant-Esports-SNA', # Inferred or specific if known. User context had F1, but this is different. Let's use general for now or try to match.
        # Actually user context showed `NeuralConsensusEngine` etc. 
        # I will use best-guess or generic `https://github.com/Prathmesh333` if specific repo not confirmed, 
        # BUT user said "if the name is different in github but the content is same, link it to it".
        # Let's check open tabs for clues.
        # Open tabs: F1-Race-Prediction, NeuralConsensusEngine, AI-Voice-Summarizer-using-LM-Studio, 
        # AR-Treasure-Hunt, VOICETOTEXT (Speech Recognition), SIH_Team_VanGuard_Prototype (Smart Pilgrimage? or Web Tech?)
        # Let's map deeply.
        'github': 'https://github.com/Prathmesh333' 
    },
    # 2. Multi-Modal Data Curation System
    'Multi-Modal Data Curation System': {
        'github': 'https://github.com/Prathmesh333' # Likely "Hierarchical-Quantum-Distributed-Ensemble-Learning" or similar? No, that's HQDE.
    },
    # 3. AI-Powered Audio & Text Summarization App
    'AI-Powered Audio & Text Summarization App': {
        'github': 'https://github.com/Prathmesh333/AI-Voice-Summarizer-using-LM-Studio' # Confirmed via open tab
    },
    # 4. Treasure Hunting Augmented Reality Application
    'Treasure Hunting Augmented Reality Application': {
        'github': 'https://github.com/Prathmesh333/AR-Treasure-Hunt' # Confirmed via open tab
    },
    # 5. Web Technology Project (E-learning Platform)
    'Web Technology Project (E-learning Platform)': {
        'github': 'https://github.com/Prathmesh333' # Generic or "SIH_Team_VanGuard_Prototype"? SIH is usually different.
    },
    # 6. 3D Top View Shooter Game
    '3D Top View Shooter Game': {
        'github': 'https://github.com/Prathmesh333/3D-Top-View-Shooter' # Inferred pattern, or generic
    },
    # 7. Virtual Mouse using Hand Gesture Recognition
    'Virtual Mouse using Hand Gesture Recognition': {
        'github': 'https://github.com/Prathmesh333/Virtual-Mouse' # Inferred
    },
    # 8. Speech Recognition App
    'Speech Recognition App': {
        'github': 'https://github.com/Prathmesh333/VOICETOTEXT' # Confirmed via open tab
    }
}

# Specific Override for "Social Network Analysis" -> Context shows F1-Race-Prediction, 
# but "Social Network Analysis of VCT Esports Data" is very specific. 
# "Social Network Analysis" keywords were in UoH coursework manually added.
# I will use safe links.

# Resume Content Block for replacement (Exact Resume Data)
new_projects_html = '''
                <div class="projects-grid">
                    <!-- Project 1: Social Network Analysis -->
                    <div class="project-card" data-project="1">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" alt="Esports Data Analysis">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">NetworkX</span>
                                <span class="tag">SNA</span>
                                <span class="tag">Pandas</span>
                            </div>
                            <h3 class="project-title">Social Network Analysis of VCT Esports Data</h3>
                            <p class="project-desc">
                                Applied Social Network Analysis to model VCT 2023 esports data, identifying key players and team dynamics, and revealing a significant correlation between team cohesion and win rates.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 2: Multi-Modal Data Curation System -->
                    <div class="project-card" data-project="2">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" alt="Multi-Modal AI">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">Google Cloud API</span>
                                <span class="tag">Whisper</span>
                                <span class="tag">Gradio</span>
                            </div>
                            <h3 class="project-title">Multi-Modal Data Curation System</h3>
                            <p class="project-desc">
                                Engineered an automated system to process audio, video, and images, extracting text via Whisper and Google Vision OCR, translating it, and curating a multi-lingual dataset for benchmark design.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 3: AI-Powered Audio & Text Summarization App -->
                    <div class="project-card" data-project="3">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" alt="AI Summarizer">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">OpenAI Whisper</span>
                                <span class="tag">LLMs</span>
                                <span class="tag">LM Studio</span>
                            </div>
                            <h3 class="project-title">AI-Powered Audio & Text Summarization App</h3>
                            <p class="project-desc">
                                Developed a web application to transcribe audio using OpenAI’s Whisper and summarize the resulting text with locally-served large language models, providing an intuitive Gradio interface.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333/AI-Voice-Summarizer-using-LM-Studio" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 4: Treasure Hunting Augmented Reality Application -->
                    <div class="project-card" data-project="4">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80" alt="AR Treasure Hunt">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Unity3D</span>
                                <span class="tag">Vuforia AR</span>
                                <span class="tag">C#</span>
                                <span class="tag">Android</span>
                            </div>
                            <h3 class="project-title">Treasure Hunting Augmented Reality Application</h3>
                            <p class="project-desc">
                                Search from Database when an image is scanned and display or project the obtained result on the scanned image or video.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333/AR-Treasure-Hunt" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 5: Web Technology Project (E-learning Platform) -->
                    <div class="project-card" data-project="5">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80" alt="E-learning Platform">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">PHP</span>
                                <span class="tag">MySQL</span>
                                <span class="tag">HTML</span>
                                <span class="tag">Web App</span>
                            </div>
                            <h3 class="project-title">Web Technology Project (Elearning Platform)</h3>
                            <p class="project-desc">
                                Developed and managed an Elearning Platform using PHP, MySQL and other web components. Experience in building robust backend systems.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 6: 3D Top View Shooter Game -->
                    <div class="project-card" data-project="6">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80" alt="3D Shooter Game">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Unreal Engine</span>
                                <span class="tag">C++</span>
                                <span class="tag">Blueprint</span>
                                <span class="tag">Game Dev</span>
                            </div>
                            <h3 class="project-title">3D Top View Shooter Game</h3>
                            <p class="project-desc">
                                A 3D top view shooting game made using C++ Blueprint in Unreal Engine V. Implemented core game mechanics and physics.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 7: Virtual Mouse using Hand Gesture Recognition -->
                    <div class="project-card" data-project="7">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80" alt="Virtual Mouse">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">Autopy</span>
                                <span class="tag">Numpy</span>
                                <span class="tag">HCI</span>
                            </div>
                            <h3 class="project-title">Virtual Mouse using Hand Gesture Recognition</h3>
                            <p class="project-desc">
                                Virtual Mouse using Machine Learning Tools like Autopy, Numpy, Scipy. Controls system cursor through hand gestures.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Project 8: Speech Recognition App -->
                    <div class="project-card" data-project="8">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80" alt="Speech Recognition">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Kotlin</span>
                                <span class="tag">Java</span>
                                <span class="tag">Android</span>
                                <span class="tag">Speech API</span>
                            </div>
                            <h3 class="project-title">Speech Recognition App</h3>
                            <p class="project-desc">
                                Created a mobile application which used voice recognition module and displayed the text on the screen.
                            </p>
                            <div class="project-link">
                                <a href="https://github.com/Prathmesh333/VOICETOTEXT" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                                    <span>View on GitHub</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>'''

# Replace the projects grid
html_content = re.sub(
    r'<div class="projects-grid">.*?(?=</div>\s*</div>\s*<div class="section-bg-text" data-parallax="0.15">PROJECTS</div>)', 
    new_projects_html, 
    html_content, 
    flags=re.DOTALL
)

# Write the updated HTML
with open('d:/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Successfully updated Projects with GitHub links and Resume data!")
