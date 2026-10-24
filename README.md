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

- Ideas, comments, task checkboxes, draft segments, and show-day completion marks are saved in this browser only. They persist across refreshes on the same browser profile and device.
- Use **Reset demo** in the top bar to restore the original sample data. Resetting removes your local demo edits.
- The editable draft running order is separate from the fixed published sample show-day sheet.
- Open **Show-day sheet** and choose **Print sheet** to print or save a PDF. The print view hides navigation and controls.
- Browser-local data is not shared, backed up, or appropriate for confidential or real event information. Clearing browser site data also removes it.
- Use fictional information only. Authentication, permissions, school-approved hosting, and real event data are deliberately out of scope until approved by the school.
