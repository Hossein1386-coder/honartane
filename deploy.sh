#!/bin/bash

# Deploy script for Honar Taneh website
# This script helps deploy the website to GitHub Pages

echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit: Honar Taneh website with admin panel"
    echo "✅ Git repository initialized"
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Deployment completed successfully!"
echo "🌍 Your website should be available at: https://yourusername.github.io/honartaneh"
echo "🔧 Admin panel: https://yourusername.github.io/honartaneh/admin/"
echo "🔑 Admin password: admin123 (Please change this!)"
