# Deploying to Vercel

This guide outlines the steps to deploy your Next.js E-commerce Store to Vercel.

## Prerequisites

1.  **GitHub/GitLab/Bitbucket Account**: You need to push your code to a remote repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Cloud Database**: You strictly need a cloud-hosted MongoDB database (e.g., MongoDB Atlas) because Vercel cannot access your local database.

## Step 1: Push to GitHub

Initialize a git repository if you haven't already and push your code.

```bash
git init
git add .
git commit -m "Ready for deployment"
# Add your remote origin
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Set up MongoDB Atlas (Cloud Database)

1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a free cluster.
3.  Create a database user (username/password).
4.  Allow access from anywhere (`0.0.0.0/0`) in Network Access (or specifically Vercel IPs if you prefer).
5.  Get your Connection String. It looks like:
    `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`

## Step 3: Deploy on Vercel

1.  Go to your Vercel Dashboard and click "Add New... > Project".
2.  Import your GitHub repository.
3.  In the **Configure Project** screen:
    *   **Framework Preset**: Next.js (should detect automatically).
    *   **Root Directory**: `./` (default).
    *   **Environment Variables**: You MUST add the following:

    | Variable Name | Value |
    | :--- | :--- |
    | `MONGODB_URI` | Your MongoDB Atlas connection string (from Step 2). |
    | `NEXT_PUBLIC_BASE_URL` | Your Vercel domain (e.g., `https://your-project.vercel.app`). *Note: for the first deploy, you can leave this blank or update it after the deployment gives you a URL.* |
    | `NEXTAUTH_URL` | Your Vercel domain (same as above). |
    | `NEXTAUTH_SECRET` | A random string (generate one with `openssl rand -base64 32`). |

4.  Click **Deploy**.

## Step 4: Post-Deployment Setup

1.  Once deployed, your database will be empty.
2.  You cannot run the local `npm run setup` script against the production database easily unless you run it locally with the production `MONGODB_URI`.
    *   **Option A (Recommended)**: Run the seed script locally pointing to production.
        1.  Temporarily update your local `.env.local`'s `MONGODB_URI` to your Atlas connection string.
        2.  Run `npm run setup`.
        3.  Revert your local `.env.local` to your local database.
    *   **Option B**: Manually create the Admin user in MongoDB Atlas.

## Troubleshooting

*   **Images**: If using local images in `public/`, they should work fine.
*   **API Routes**: If your products don't load, check the **Function Logs** in Vercel.
*   **Database**: Ensure your IP whitelist in MongoDB Atlas allows Vercel (0.0.0.0/0 is easiest for starting).
