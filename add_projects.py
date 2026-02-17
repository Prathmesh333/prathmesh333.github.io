# Script to add 4 additional projects to the portfolio
import re

# Read the current HTML
with open('d:/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Define the 4 new projects HTML
new_projects = '''
                    <div class="project-card" data-project="7">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="File Compressor">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">Huffman</span>
                                <span class="tag">Data Structures</span>
                            </div>
                            <h3 class="project-title">File Compressor Using Huffman Encoding</h3>
                            <p class="project-desc">
                                Efficient data compression tool implementing Huffman encoding algorithm.
                                Reduces file sizes while maintaining data integrity through optimal binary tree construction.
                            </p>
                            <div class="project-link">
                                <span>View on GitHub</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="project-card" data-project="8">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80" alt="Voice to Text">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Kotlin</span>
                                <span class="tag">Android</span>
                                <span class="tag">Speech Recognition</span>
                            </div>
                            <h3 class="project-title">Voice to Text Application</h3>
                            <p class="project-desc">
                                Android application with voice recognition module and text display system.
                                Real-time speech-to-text conversion with high accuracy and seamless user experience.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="project-card" data-project="9">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" alt="3D Shooter Game">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Kotlin</span>
                                <span class="tag">Android</span>
                                <span class="tag">Game Dev</span>
                                <span class="tag">3D</span>
                            </div>
                            <h3 class="project-title">3D Top View Shooter Game</h3>
                            <p class="project-desc">
                                Immersive 3D shooter game for Android with smooth gameplay mechanics.
                                Features dynamic environments, responsive controls, and engaging user experience.
                            </p>
                            <div class="project-link">
                                <span>View Project</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="project-card" data-project="10">
                        <div class="project-image">
                            <div class="project-overlay"></div>
                            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" alt="Deep Learning">
                        </div>
                        <div class="project-content">
                            <div class="project-tags">
                                <span class="tag">Python</span>
                                <span class="tag">TensorFlow</span>
                                <span class="tag">Deep Learning</span>
                                <span class="tag">Neural Networks</span>
                            </div>
                            <h3 class="project-title">Hello World of Deep Learning</h3>
                            <p class="project-desc">
                                Introduction to neural networks and deep learning fundamentals.
                                Implements basic neural network architectures for image classification tasks.
                            </p>
                            <div class="project-link">
                                <span>View on GitHub</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>
'''

# Find the closing </div> of the projects-grid and insert before it
# Look for the pattern: last project card closing div, then projects-grid closing div
pattern = r'(data-project="6".*?</div>\s*</div>\s*</div>)(\s*</div>)'
replacement = r'\1' + new_projects + r'\2'

html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)

# Write the updated HTML
with open('d:/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Successfully added 4 new projects!")
