# StashIt: Your Game Asset Hub

StashIt is a game assets storage web app that leverages the power of Next.js, TailwindCSS, and Pinata. It securely stores various game assets, such as images, audio, video, and 3D models, over the IPFS network. Each file is uniquely identified by its CID, provided by Pinata, ensuring no duplicate assets. The platform also includes AI-powered features to generate character lore and images using OpenRouter API and StarryAI. Additionally, users can add metadata to their files for enhanced asset management.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Packages Used](#packages-used)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Running the Application](#running-the-application)
- [Author](#author)
- [Documentation](#documentation)

## Demo

[Click here!](https://stash-it.vercel.app)

## Features

- IPFS-based storage for game assets (images, audio, video, and 3D models)
- Unique CID for each asset to avoid duplicates
- Pinata metadata feature: Add metadata to files for better asset management
- Project management: create, update, and delete assets within projects
- Public and private project options for sharing assets globally
- Asset management: share, add, update, delete, view, and download assets
- **Pinning and Unpinning Files**: Users can pin important files to keep them available on IPFS and unpin those they no longer need.

- AI-powered character lore generation using [OpenRouter API (Llama model)](https://openrouter.ai/)
- AI character image generation using [StarryAI API](https://starryai.com/)
- OAuth authentication with Google and GitHub using Auth.js
- PostgreSQL database provided by Aiven to store user data and connect projects
- Animations powered by Framer Motion

## Technologies Used

- **Next.js**: React framework for server-side rendering and API routes.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Shadcn**: UI components library for accessible and customizable UI elements.
- **Pinata**: IPFS gateway for storing assets over a decentralized network, with support for adding metadata to files.
- **Prisma**: ORM for database management.
- **AI Features**: AI-generated character stories (OpenRouter) and images (StarryAI).
- **Framer Motion**: For creating smooth animations.
- **Auth.js**: OAuth integration for user authentication with Google and GitHub.
- **TanStack Query**: For efficient data fetching and state management.

## Packages Used

- **Authentication**: `next-auth`, `@auth/prisma-adapter`
- **UI/UX**: `@radix-ui/react-avatar`, `@radix-ui/react-dialog`, `framer-motion`, `lucide-react`
- **Forms**: `react-hook-form`, `@hookform/resolvers`
- **Database**: `@prisma/client`, `prisma`
- **Pinata**: `pinata`, `pinata-web3`
- **State Management**: `@tanstack/react-query`
- **Miscellaneous**: `clsx`, `dompurify`, `sonner`, `react-dropzone`, `tailwind-merge`, `tailwindcss-animate`, `zod`

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```bash
PINATA_JWT=                  # JWT token for authenticating with Pinata (IPFS upload)
NEXT_PUBLIC_GATEWAY_URL=      # Public IPFS gateway URL for retrieving stored assets
API_KEY=                      # Pinata API key for accessing services
API_SECRET=                   # Pinata API secret for secure interaction with Pinata
NEXTAUTH_SECRET=              # Secret key for encrypting and securing NextAuth.js sessions
NEXTAUTH_URL=                 # Base URL for the app, used by NextAuth.js for redirects
BASE_URL=                     # Base URL for API calls and app services
GOOGLE_CLIENT_ID=             # Google OAuth client ID for user login
GOOGLE_CLIENT_SECRET=         # Google OAuth client secret for secure authentication
GITHUB_ID=                    # GitHub OAuth client ID for user login
GITHUB_SECRET=                # GitHub OAuth client secret for secure authentication
DATABASE_URL=                 # PostgreSQL connection string (provided by Aiven) for storing user data and managing projects
```

Ensure that all required values are filled with the proper credentials.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stash-it.git
   cd stash-it
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file based on the [Environment Variables](#environment-variables) section.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Folder Structure

```bash
stash-it/
├── node_modules/
├── prisma/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── server/
│   ├── utils/
├── .env
├── package.json
├── tailwind.config.js
└── README.md
```

- `prisma/`: Prisma schema and migration files.
- `src/app/`: Application pages and API routes.
- `src/components/`: Reusable React components.
- `src/lib/`: Global utility functions and configurations.
- `src/server/`: Backend logic, including server-side functions and API utilities.
- `src/utils/`: Helper functions and utility modules.

## Running the Application

- Development mode: `npm run dev`
- Production build: `npm run build`
- Start production server: `npm start`
- Lint codebase: `npm run lint`

## Authors

- **Shivam Sharma**  
  [LinkedIn](https://linkedin.com/in/shivamsharma77607) | [GitHub](https://github.com/Shivam-Sharma-1)
- **Sidharth Sreejil**  
  [LinkedIn](https://linkedin.com/in/sidharth-sreejil/) | [GitHub](https://github.com/sid-js)

## Documentation

For more detailed documentation, please refer to the official docs of the tools and libraries used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Pinata Documentation](https://docs.pinata.cloud)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenRouter API Documentation](https://openrouter.ai/)
- [StarryAI API Documentation](https://starryai.com/)
