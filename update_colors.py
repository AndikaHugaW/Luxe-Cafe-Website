import re

# Read the file
file_path = r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\ui\membership-pricing.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all instances of dark-blue with primary
content = content.replace('dark-blue', 'primary')

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Updated membership-pricing.tsx")
