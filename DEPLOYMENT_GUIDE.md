# GitHub Pages Deployment Guide

This guide will walk you through the process of deploying your portfolio website to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Basic knowledge of Git commands

## Step 1: Create a GitHub Repository

1. Log in to your GitHub account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository exactly as: `tanvir-newaz.github.io`
   - This specific naming format is required for GitHub Pages user sites
   - The repository name must match your GitHub username followed by `.github.io`
4. Set the repository to "Public"
5. Click "Create repository"

## Step 2: Initialize Git in Your Local Project

1. Open a terminal/command prompt
2. Navigate to your project directory:
   ```
   cd path/to/tanvir-newaz.github.io
   ```
3. Initialize Git:
   ```
   git init
   ```
4. Add all files to Git:
   ```
   git add .
   ```
5. Commit the files:
   ```
   git commit -m "Initial commit - Portfolio website"
   ```

## Step 3: Connect and Push to GitHub

1. Connect your local repository to the GitHub repository:
   ```
   git remote add origin https://github.com/tanvir-newaz/tanvir-newaz.github.io.git
   ```
2. Push your code to GitHub:
   ```
   git push -u origin main
   ```
   - Note: If your default branch is named "master" instead of "main", use:
     ```
     git push -u origin master
     ```

## Step 4: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the branch you pushed to (main or master)
5. Click "Save"
6. GitHub will provide you with a URL where your site is published (usually https://tanvir-newaz.github.io)

## Step 5: Verify Your Deployment

1. Wait a few minutes for GitHub to build and deploy your site
2. Visit the provided URL to ensure your site is working correctly
3. Test all links and functionality

## Making Updates

To update your website in the future:

1. Make changes to your local files
2. Add the changes to Git:
   ```
   git add .
   ```
3. Commit the changes:
   ```
   git commit -m "Description of changes"
   ```
4. Push to GitHub:
   ```
   git push
   ```
5. GitHub will automatically rebuild and deploy your site

## Custom Domain (Optional)

If you want to use a custom domain instead of tanvir-newaz.github.io:

1. Go to your repository settings
2. Scroll down to the "GitHub Pages" section
3. Under "Custom domain", enter your domain name
4. Click "Save"
5. Configure your domain's DNS settings:
   - For an apex domain (example.com), create A records pointing to GitHub's IP addresses
   - For a subdomain (www.example.com), create a CNAME record pointing to your GitHub Pages URL
6. Create a file named `CNAME` in the root of your repository containing your custom domain

## Troubleshooting

- If your site doesn't appear, check the GitHub Pages section in repository settings for any error messages
- Ensure all file paths are correct (case-sensitive)
- Check that all links use relative paths correctly
- Verify that your repository is public

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
