# Assembly Desk project plan

Assembly Desk is a prototype for coordinating a school assembly, from gathering ideas through preparing a running order and following a show-day sheet. This plan reflects the current codebase; the app is not yet a shared or production-ready service.

## Current status

The current Vite + React + TypeScript prototype includes:

- An overview of the fictional sample event and planning progress.
- An idea board where users can add ideas, comment, and change idea status.
- A grouped preparation task list with completion checkboxes.
- A draft running order with sample cue notes and the ability to add segments and durations.
- A separate, fixed sample show-day sheet with completion checkboxes and print support.
- Browser-local persistence for demo edits and a reset control.

All saved state is limited to the current browser profile and device. There are no accounts, roles, shared data, server-side storage, or approval/publishing workflow. The show-day sheet is not generated from the editable draft.

## Proposed next phases

### 1. Review the workflow and constraints

- Ask a teacher or school IT contact what hosting, accounts, and data storage are permitted before selecting a backend or publishing the app.
- Confirm who will use the app, who can edit planning information, and who approves the final run sheet.
- Validate the planning workflow with representatives of organisers, performers/presenters, and the tech crew.
- Keep using fictional data while the prototype is being evaluated.

### 2. Improve the planning prototype

- Make the draft running order easier to manage, including editing, removing, and reordering segments.
- Capture and update segment leads, cue details, and cue owners rather than using sample/default values.
- Add task creation and editing if the team needs tasks to be maintained in the app.
- Make decisions and change history clearly distinguishable from sample content.
- Keep draft planning data separate from any approved show-day version.

### 3. Agree on secure collaboration before implementation

- Choose school-approved sign-in, hosting, and data storage only after the school confirms requirements.
- Define roles and access rules for contributors, organisers, and people responsible for show-day operation.
- Design the data model and test that users can only access and change the information they are permitted to.
- Decide what information is necessary, how long it should be retained, and how it will be removed after the event.

### 4. Build and verify a shared version

- Add approved authentication and shared persistence.
- Implement collaboration, task ownership, and an organiser review/approval flow.
- Generate the published show-day sheet from an approved draft, with a clear way to identify the published version.
- Test permissions, draft-versus-published behavior, printing, and responsive layouts on school devices.
- Keep an offline or printed run-sheet backup for event day.

### 5. Pilot, publish, and maintain

- Deploy a private preview using an approved host and account setup.
- Have organisers review the workflow and access controls before entering real event information.
- Publish only to the intended audience; do not make planning information publicly readable.
- Assign an owner for maintenance, access reviews, and post-event archiving or deletion.

## Out of scope for now

- Real student or staff information, confidential details, or other real event data in this local demo.
- Public hosting or use as a shared planning tool without school approval and appropriate access controls.
- Complex approval workflows, inventory management, external integrations, and a PWA until the core shared workflow is validated.
