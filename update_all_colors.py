import os
import glob

# List of files to update
files_to_update = [
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\About.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\AboutDetail.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\Contact.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\Footer.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\LargeLogo.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\Menu.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\MenuPreview.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\Newsletter.tsx",
    r"d:\File HUGA\PROJEX HUGA\Website\Luxe Cafe Website\components\ui\feature-steps.tsx",
]

updated_count = 0

for file_path in files_to_update:
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace all instances
            new_content = content.replace('dark-blue', 'primary')
            
            # Only write if there were changes
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Updated: {os.path.basename(file_path)}")
                updated_count += 1
            else:
                print(f"⏭️  No changes needed: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"❌ Error updating {os.path.basename(file_path)}: {e}")
    else:
        print(f"⚠️  File not found: {os.path.basename(file_path)}")

print(f"\n🎉 Total files updated: {updated_count}")
