# Assembly Desk

Assembly Desk is a responsive prototype for planning a school assembly. It uses fictional sample content and runs entirely in your browser; there is no sign-in, shared workspace, or backend.

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

## What the prototype includes

- **Overview:** a snapshot of the sample event, ideas, tasks, and draft running time.
- **Ideas & decisions:** add ideas, comment on them, and move them between discussion, shortlist, and plan statuses. The displayed decision log is sample content.
- **To-do list:** mark sample preparation tasks complete.
- **Running order:** add segments and durations, with sample leads and AV cue notes. The draft order is not yet editable beyond adding segments.
- **Show-day sheet:** review the separate published sample, mark segments complete, and print the sheet or save it as a PDF.

Ideas, comments, task checkboxes, draft segments, and show-day completion marks are saved in this browser only. They persist across refreshes in the same browser profile and device. Use **Reset demo** in the top bar to restore the original sample data; this removes local demo edits.

## Important limitations

- This is a single-device demo, not a shared team workspace. Changes are not synced or backed up.
- The editable draft running order does not update the fixed published sample show-day sheet.
- Browser-local data is not appropriate for confidential or real event information. Clearing browser site data also removes it.
- Use fictional information only. Authentication, permissions, school-approved hosting, collaboration, and real event data are out of scope until approved by the school.

## Project plan

See [plan.md](./plan.md) for the current implementation status, proposed next phases, and decisions to make before using real event information.
