# Assembly Desk

A responsive, local-only prototype for coordinating a school assembly. It uses fictional sample content and has no sign-in, backend, network data storage, or deployment setup.

## Run locally

Requires Node.js 18 or later.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production build:

```sh
npm run build
```

## Prototype notes

- Ideas, task checkboxes, draft segments, and show-day completion marks are held in memory. Refreshing the page restores the sample content.
- The editable draft running order is separate from the fixed published sample show-day sheet.
- Use fictional information only. Authentication, permissions, school-approved hosting, and real event data are deliberately out of scope until approved by the school.
