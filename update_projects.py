# Script to update Projects section with user-provided projects
import re

# Read the current HTML
with open('d:/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Define the new projects HTML
new_projects_html = '''
                <div class="projects-grid">
                    <!-- Project 1: Social Network Analysis -->
                    <div class="project-card" data-project="1">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <!-- Placeholder image, eventually needs custom one -->
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
                                Applied Social Network Analysis to model VCT 2023 esports data, identifying key players and team dynamics.
                                Revealed significant correlations between team cohesion and win rates using Python and Graph Theory.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Project 2: Multi-Modal Data Curation -->
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
                                Engineered an automated system to process audio, video, and images.
                                Extracts text via Whisper and Google Vision OCR, translates it, and curates a multi-lingual dataset for benchmark design.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Project 3: AI Audio & Text Summarization -->
                    <div class="project-card" data-project="3">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <!-- Using known custom image if available, else placeholder -->
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
                                Developed a web application to transcribe audio using OpenAI’s Whisper and summarize text with locally-served LLMs.
                                Features an intuitive Gradio interface for seamless user interaction.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Project 4: Treasure Hunting AR App -->
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
                                Interactive AR game that searches a database when an image is scanned and projects results/3D assets onto the visual marker.
                                Built using Unity3D, Vuforia AR Engine, and Android plugins.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Project 5: Web Technology Project -->
                    <div class="project-card" data-project="5">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80" alt="E-learning Platform">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">PHP</span>
                                <span class="tag">MySQL</span>
                                <span class="tag">HTML/CSS</span>
                                <span class="tag">Web App</span>
                            </div>
                            <h3 class="project-title">Web Technology Project (E-learning Platform)</h3>
                            <p class="project-desc">
                                Developed and managed a comprehensive E-learning Platform.
                                robust backend using PHP and MySQL, featuring user management and course delivery systems.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
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
                                A dynamic 3D top-view shooting game created using Unreal Engine V.
                                Implemented complex game mechanics using C++ and Blueprints.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Project 7: Virtual Mouse -->
                    <div class="project-card" data-project="7">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80" alt="Virtual Mouse">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">Computer Vision</span>
                                <span class="tag">Autopy</span>
                                <span class="tag">HCI</span>
                            </div>
                            <h3 class="project-title">Virtual Mouse using Hand Gesture Recognition</h3>
                            <p class="project-desc">
                                Created a virtual mouse system using Machine Learning and Computer Vision tools.
                                Controls cursor movement and clicks via hand gestures using Python, Numpy, and Autopy.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
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
                                <span class="tag">Android</span>
                                <span class="tag">Kotlin</span>
                                <span class="tag">Java</span>
                                <span class="tag">Speech API</span>
                            </div>
                            <h3 class="project-title">Speech Recognition App</h3>
                            <p class="project-desc">
                                Native Android application utilizing voice recognition modules to convert speech to text.
                                Features real-time display and seamless user interface built with Kotlin and Java.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>'''

# Replace the entire projects grid
# Locate <div class="projects-grid"> ... right before closing </div> of container or section
pattern = r'(<div class="projects-grid">)(.*?)(</div>\s*</div>\s*<div class="section-bg-text")'
# Note: Regex might be tricky with newlines. Let's find the start and end of the projects grid div manually or use DOTALL

# Let's try to match from <div class="projects-grid"> to the next <div class="section-bg-text"
match = re.search(r'<div class="projects-grid">.*?(?=<div class="section-bg-text")', html_content, re.DOTALL)
if match:
    # We need to preserve the closing div of the container which is just before section-bg-text
    # The structure is:
    # <div class="container">
    #    ... header
    #    <div class="projects-grid"> ... </div>
    # </div>
    # <div class="section-bg-text">
    
    # So we replace the content between <div class="projects-grid"> and the last </div> before section-bg-text
    pass # logic is getting complicated, let's use a simpler marker approach

# Simpler replace: replace the whole <div class="projects-grid">...</div> block
# We know it start with <div class="projects-grid"> and ends before the closing </div> of container
start_marker = '<div class="projects-grid">'
end_marker = '<div class="section-bg-text" data-parallax="0.15">PROJECTS</div>'

start_idx = html_content.find(start_marker)
# Find the section bg text which is after the projects grid
bg_text_idx = html_content.find(end_marker)

if start_idx != -1 and bg_text_idx != -1:
    # We need to find the closing div of the projects grid. 
    # Just replacing the content between start_marker and (bg_text_idx - length of closing container div)
    # The structure is:
    # <div class="projects-grid"> ... </div> </div> <div class="section-bg-text"...
    
    # Let's verify the content structure around bg_text_idx
    # We expect </div>\n</div>\n<div class="section-bg-text"
    
    # Let's just construct the full section replacement to be safe
    old_projects_section = html_content[start_idx : bg_text_idx]
    
    # We need to match the closing divs.
    # The old content likely ends with </div>\n</div> (one for grid, one for container)
    # So we should be careful.
    
    # Let's regex replace the whole <div class="projects-grid"> ... </div> block
    # We assume standard indentation
    html_content = re.sub(
        r'<div class="projects-grid">.*?(?=</div>\s*</div>\s*<div class="section-bg-text" data-parallax="0.15">PROJECTS</div>)', 
        new_projects_html, 
        html_content, 
        flags=re.DOTALL
    )

# Write the updated HTML
with open('d:/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Successfully updated Projects section!")
