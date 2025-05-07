
#!/bin/bash

# Build the project
npm run build

# Move to the dist directory
cd dist

# Create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
touch .nojekyll

# Initialize git repo if it doesn't exist
if [ ! -d ".git" ]; then
  git init
  git checkout -b main
  git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
fi

# Add all files
git add -A

# Commit changes
git commit -m "Deploy website"

# Push to the gh-pages branch
git push -f origin main:gh-pages

# Navigate back to the root of the project
cd ..

echo "Deployed successfully!"
