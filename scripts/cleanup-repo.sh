#!/bin/bash

# GrowthWave Web Repository Cleanup Script
# Purpose: Archive unnecessary development files before deployment
# Date: January 2026

# Create archive directory with timestamp
ARCHIVE_DIR="_archive_$(date +%Y%m%d_%H%M%S)"

echo "🧹 GrowthWave Web Repository Cleanup"
echo "====================================="
echo ""
echo "Creating archive directory: $ARCHIVE_DIR"
mkdir -p "$ARCHIVE_DIR"

# Counter for moved files
moved_count=0

# Function to move file if it exists
move_if_exists() {
    if [ -e "$1" ]; then
        mv "$1" "$ARCHIVE_DIR/"
        echo "  ✓ Moved: $1"
        ((moved_count++))
    fi
}

echo ""
echo "📁 Archiving test/development HTML files..."
move_if_exists "test-components.html"
move_if_exists "header-footer-test.html"
move_if_exists "header-test.html"
move_if_exists "wireframe-viewer.html"

echo ""
echo "📁 Archiving one-time shell scripts..."
move_if_exists "fix-header-v2.sh"
move_if_exists "fix-components.sh"

echo ""
echo "📁 Archiving zip files..."
move_if_exists "updated-properties-pages.zip"
move_if_exists "wireframe-accurate-build.zip"
move_if_exists "logo-size-fix.zip"
move_if_exists "batch1-foundation.zip"
move_if_exists "batch2-files.zip"

echo ""
echo "📁 Archiving generated reference/listing files..."
move_if_exists "image-directories.txt"
move_if_exists "web-directories.txt"
move_if_exists "directory-structure.txt"
move_if_exists "growthwave-web-stuff.txt"

echo ""
echo "====================================="
echo "✅ Cleanup complete!"
echo "   Files archived: $moved_count"
echo "   Archive location: $ARCHIVE_DIR/"
echo ""
echo "📋 Next steps:"
echo "   1. Review archived files: ls -la $ARCHIVE_DIR/"
echo "   2. If satisfied, add archive to .gitignore:"
echo "      echo '_archive*/' >> .gitignore"
echo "   3. Commit the cleanup:"
echo "      git add -A"
echo "      git commit -m 'chore: cleanup development artifacts before deployment'"
echo ""
echo "   Or, if you want to permanently delete the archive:"
echo "      rm -rf $ARCHIVE_DIR"
echo ""
