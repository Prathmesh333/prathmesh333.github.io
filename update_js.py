# Script to update script.js to remove loading screen logic
import re

# Read the current JS
with open('d:/Portfolio/script.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Remove loading screen event listener and related code
# Replace the entire loading screen section with a comment
js_content = re.sub(
    r'// Loading Screen.*?// Navigation Toggle',
    '// Navigation Toggle',
    js_content,
    flags=re.DOTALL
)

# Write the updated JS
with open('d:/Portfolio/script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Successfully updated script.js!")
