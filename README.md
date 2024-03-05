# Collaborative Whiteboard

This repository is an application built with React, Next.js, and TypeScript.

![Preview image](/public/preview/preview.png)

- In this application, people can sign in with Google, create organizations, invite members to them, create organization whiteboards, and collaborate in real time with other members.

- In whiteboard mode, members can insert layers, draw, and write text. Layers can be styled, translated, and resized. A layer's position can be changed: moved backward or forward. The whiteboard has a zoom option and is infinite.

- Users can move the camera when the wheel is pressed or with the scroll. Shortcuts are also available. Each button has hints indicating what it does, and many buttons have shortcuts.

Additional technologies used: Clerk - authentication, shadcn/ui - components, Convex - backend, Liveblocks - real-time blocks in the whiteboard, Tailwind, Zustand, etc.

- [Click here to see an app and all its features showcased on YouTube](https://youtu.be/43_2mJxDjWY)

## Running application locally

To run the application on your local machine, follow these steps:

- Clone this repository.
- Install dependencies by running `npm install`.
- Add .env.local with these values:
  - CONVEX_DEPLOYMENT,
  - NEXT_PUBLIC_CONVEX_URL,
  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  - CLERK_SECRET_KEY,
  - NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY,
  - LIVEBLOCKS_SECRET_KEY
- Connect backend server with `npx convex dev`.
- Start the development server with `npm run dev`.

## Documentation

Here are some useful scripts you can run:

- `npm run dev`: Builds development version.
- `npx convex dev`: Connects to backend server.
- `npm run format:fix`: Runs Prettier to format the code.

