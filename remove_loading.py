# Script to remove loading screen and fix resume data
import re

# Read the current HTML
with open('d:/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 1. Remove loading screen HTML
html_content = re.sub(
    r'<!-- Loading Screen -->.*?<!-- Navigation -->',
    '<!-- Navigation -->',
    html_content,
    flags=re.DOTALL
)

# 2. Remove loading screen CSS class from body (if it exists in inline styles)
# The CSS file handles the loading screen, so we need to ensure body doesn't have loading class

# 3. Update the main content to not be hidden initially
# Remove any opacity:0 or display:none from main-content
html_content = html_content.replace('class="main-content"', 'class="main-content" style="opacity: 1; pointer-events: auto;"')

# Write the updated HTML
with open('d:/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Successfully removed loading screen!")
