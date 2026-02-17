# Script to update navigation and add Internships/Academics sections
import re

# Read the current HTML
with open('d:/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 1. Update navigation menu
old_nav = r'''            <div class="menu-links">
                <a href="#about" class="menu-link" data-section="about">
                    <span class="link-number">01</span>
                    <span class="link-text">About</span>
                </a>
                <a href="#projects" class="menu-link" data-section="projects">
                    <span class="link-number">02</span>
                    <span class="link-text">Projects</span>
                </a>
                <a href="#skills" class="menu-link" data-section="skills">
                    <span class="link-number">03</span>
                    <span class="link-text">Skills</span>
                </a>
                <a href="#experience" class="menu-link" data-section="experience">
                    <span class="link-number">04</span>
                    <span class="link-text">Experience</span>
                </a>
                <a href="#contact" class="menu-link" data-section="contact">
                    <span class="link-number">05</span>
                    <span class="link-text">Contact</span>
                </a>
            </div>'''

new_nav = '''            <div class="menu-links">
                <a href="#about" class="menu-link" data-section="about">
                    <span class="link-number">01</span>
                    <span class="link-text">About</span>
                </a>
                <a href="#hackathons" class="menu-link" data-section="hackathons">
                    <span class="link-number">02</span>
                    <span class="link-text">Hackathons</span>
                </a>
                <a href="#projects" class="menu-link" data-section="projects">
                    <span class="link-number">03</span>
                    <span class="link-text">Projects</span>
                </a>
                <a href="#internships" class="menu-link" data-section="internships">
                    <span class="link-number">04</span>
                    <span class="link-text">Internships</span>
                </a>
                <a href="#skills" class="menu-link" data-section="skills">
                    <span class="link-number">05</span>
                    <span class="link-text">Skills</span>
                </a>
                <a href="#academics" class="menu-link" data-section="academics">
                    <span class="link-number">06</span>
                    <span class="link-text">Academics</span>
                </a>
                <a href="#contact" class="menu-link" data-section="contact">
                    <span class="link-number">07</span>
                    <span class="link-text">Contact</span>
                </a>
            </div>'''

html_content = html_content.replace(old_nav, new_nav)

# 2. Update section numbers
html_content = re.sub(r'(<section class="projects".*?<span class="section-number">)02(</span>)', r'\g<1>03\2', html_content, flags=re.DOTALL)
html_content = re.sub(r'(<section class="skills".*?<span class="section-number">)03(</span>)', r'\g<1>05\2', html_content, flags=re.DOTALL)

# 3. Add Internships section (after Projects, before Skills)
internships_section = '''
        <!-- Internships Section -->
        <section class="internships" id="internships">
            <div class="container">
                <div class="section-header">
                    <span class="section-number">04</span>
                    <h2 class="section-title">Internships & Experience</h2>
                </div>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-date">August 2021 - Present</div>
                            <h3 class="timeline-title">Android Developer</h3>
                            <p class="timeline-desc">
                                Developed and maintained Android applications using Kotlin and modern Android architecture components.
                                Implemented voice recognition modules, text display systems, and built 3D top-view shooter game with smooth gameplay mechanics.
                                Optimized performance and ensured seamless user experiences.
                            </p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-date">2020 - 2021</div>
                            <h3 class="timeline-title">ML Engineer & Developer</h3>
                            <p class="timeline-desc">
                                Built machine learning models for text and audio processing with focus on NLP and data analysis.
                                Developed AI-powered applications and implemented quantum-inspired algorithms for ensemble learning.
                                Published open-source ML framework (HQDE) on PyPI achieving 86.1% accuracy on CIFAR-10.
                            </p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-date">2019 - 2020</div>
                            <h3 class="timeline-title">Full Stack Developer</h3>
                            <p class="timeline-desc">
                                Created web applications using modern frameworks and technologies.
                                Worked on both frontend and backend development with focus on user experience and responsive design.
                                Implemented real-time features and data visualization components.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-bg-text" data-parallax="0.08">INTERNSHIPS</div>
        </section>

'''

# Insert Internships section before Skills section
html_content = re.sub(r'(</section>\s*<!-- Skills Section -->)', internships_section + r'\1', html_content)

# 4. Add Academics section (after Skills, before old Experience which we'll remove)
academics_section = '''
        <!-- Academics Section -->
        <section class="academics" id="academics">
            <div class="container">
                <div class="section-header">
                    <span class="section-number">06</span>
                    <h2 class="section-title">Education & Academics</h2>
                </div>
                <div class="about-grid">
                    <div class="about-text">
                        <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 1rem;">Bachelor of Engineering in Computer Engineering</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">
                            <strong>Institution:</strong> Shri Guru Gobind Singh College of Engineering, Parbhani
                        </p>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                            <strong>Focus Areas:</strong> Machine Learning, Artificial Intelligence, Distributed Systems
                        </p>
                        
                        <h4 style="color: var(--primary); font-size: 1.2rem; margin-bottom: 1rem;">Relevant Coursework</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;">
                            <div style="color: var(--text-secondary);">• Data Structures & Algorithms</div>
                            <div style="color: var(--text-secondary);">• Machine Learning</div>
                            <div style="color: var(--text-secondary);">• Artificial Intelligence</div>
                            <div style="color: var(--text-secondary);">• Distributed Systems</div>
                            <div style="color: var(--text-secondary);">• Computer Graphics & AR/VR</div>
                            <div style="color: var(--text-secondary);">• Mobile App Development</div>
                            <div style="color: var(--text-secondary);">• Database Management</div>
                            <div style="color: var(--text-secondary);">• Operating Systems</div>
                        </div>
                    </div>
                    <div class="about-info">
                        <div class="info-card">
                            <div class="info-label">Degree</div>
                            <div class="info-value">B.E. Computer Engineering</div>
                        </div>
                        <div class="info-card">
                            <div class="info-label">Institution</div>
                            <div class="info-value">SGGS College, Parbhani</div>
                        </div>
                        <div class="info-card">
                            <div class="info-label">Specialization</div>
                            <div class="info-value">ML/AI & Distributed Systems</div>
                        </div>
                        <div class="info-card">
                            <div class="info-label">Key Achievement</div>
                            <div class="info-value">Published HQDE on PyPI</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-bg-text" data-parallax="0.1">ACADEMICS</div>
        </section>

'''

# Insert Academics section before old Experience section
html_content = re.sub(r'(</section>\s*<!-- Experience Section -->)', academics_section + r'\1', html_content)

# 5. Remove old Experience section (we replaced it with Internships)
html_content = re.sub(
    r'<!-- Experience Section -->.*?</section>\s*<!-- Contact Section -->',
    '<!-- Contact Section -->',
    html_content,
    flags=re.DOTALL
)

# 6. Update Contact section number
html_content = re.sub(r'(<section class="contact".*?<span class="section-number">)05(</span>)', r'\g<1>07\2', html_content, flags=re.DOTALL)

# Write the updated HTML
with open('d:/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Successfully updated navigation and added Internships and Academics sections!")
