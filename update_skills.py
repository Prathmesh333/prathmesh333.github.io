# Script to update Skills section to be ML/AI focused
import re

# Read the current HTML
with open('d:/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Find and replace the entire skills grid
old_skills_pattern = r'(<section class="skills".*?<div class="skills-grid">)(.*?)(</div>\s*</div>\s*<div class="section-bg-text")'

new_skills_grid = r'''\1
                    <div class="skill-category">
                        <h3 class="category-title">Machine Learning & AI</h3>
                        <div class="skill-items">
                            <div class="skill-item">
                                <span class="skill-name">Python</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="95"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Deep Learning (TensorFlow, PyTorch)</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="88"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">NLP & LLMs (Whisper, GPT, Deepseek)</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="90"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Quantum ML & HQDE</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="85"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Computer Vision</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="82"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category">
                        <h3 class="category-title">Data Science & Analytics</h3>
                        <div class="skill-items">
                            <div class="skill-item">
                                <span class="skill-name">Scikit-learn & XGBoost</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="90"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Pandas & NumPy</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="92"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Data Visualization</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="85"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Sports Analytics</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="80"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category">
                        <h3 class="category-title">Distributed & Cloud Computing</h3>
                        <div class="skill-items">
                            <div class="skill-item">
                                <span class="skill-name">Ray (Distributed ML)</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="85"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">CUDA & GPU Programming</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="78"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Firebase & Cloud Services</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="82"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">REST APIs</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="88"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category">
                        <h3 class="category-title">Mobile & Game Development</h3>
                        <div class="skill-items">
                            <div class="skill-item">
                                <span class="skill-name">Kotlin & Android</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="88"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Unity & C#</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="80"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">AR/VR (Vuforia)</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="75"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Game Design</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="78"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category">
                        <h3 class="category-title">Development Tools & Frameworks</h3>
                        <div class="skill-items">
                            <div class="skill-item">
                                <span class="skill-name">Git & GitHub</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="92"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Jupyter & Google Colab</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="90"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">React & TypeScript</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="75"></div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <span class="skill-name">Docker & CI/CD</span>
                                <div class="skill-bar">
                                    <div class="skill-fill" data-skill="70"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                \3'''

html_content = re.sub(old_skills_pattern, new_skills_grid, html_content, flags=re.DOTALL)

# Write the updated HTML
with open('d:/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Successfully updated Skills section to ML/AI focus!")
