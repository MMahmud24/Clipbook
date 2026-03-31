# Clipbook
YHack 2026 — Transforms instruction manual photos into animated video tutorials.

# Devpost Link

https://devpost.com/software/clipbook-xars14?ref_content=user-portfolio&ref_feature=in_progress

## Setup

**Requirements:** Node.js 20+, npm

```bash
# 1. Clone the repo
git clone <repo-url>
cd Clipbook

# 2. Install all dependencies (installs client, server, and renderer)
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your keys in .env (ask a teammate for the values)

# 4. Run the server (Terminal 1)
npm run dev --workspace=server

# 5. Run the client (Terminal 2)
npm run dev --workspace=client
```

Client runs at `http://localhost:5173`
Server runs at `http://localhost:4000`
