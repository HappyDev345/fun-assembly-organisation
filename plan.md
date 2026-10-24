# Muck-Up Assembly Coordination App

## Problem and proposed approach

The tech crew, performers/presenters, and teachers/organisers need one shared place to turn ideas into an organised assembly over the coming year, then use that information to run the event reliably. The app should evolve from collaborative planning into a clear show-day runbook.

## Suggested first version

- **Idea board:** collect suggestions with a short description, owner, status, and comments; allow organisers to mark ideas for follow-up or decision.
- **Shared plan and decisions:** record key choices, responsibilities, and dates so decisions and next steps do not get lost in chat.
- **Task list:** assign preparation tasks, due dates, and simple statuses; include a checklist for AV and stage preparation.
- **Draft running order:** list acts or segments, approximate duration, transition notes, and the people responsible. Keep it editable while planning.
- **AV cue notes:** associate audio, lighting, and video cues with each segment. Capture cue owner and the asset or equipment needed.
- **Change announcements:** show a visible recent-changes feed, with changes to the running order and cues clearly marked.
- **Show-day view (later MVP phase):** a simplified, ordered run sheet with cue details and a way to mark segments complete. Keep it readable on a phone and a laptop.

## Scope and considerations

- Treat the app as a shared coordination workspace for the three groups, with appropriate edit rights for organisers and contributors; do not assume every participant should be able to change the final run sheet.
- Avoid storing sensitive personal information. Use names or roles only where needed for task ownership and cue responsibility.
- Keep planning records distinct from the approved show-day version so late edits do not silently change what the crew is following.
- Build a responsive website first so it works on school laptops and phones without app-store installation. Make it installable as a PWA only if the basic site is working and there is a clear benefit.
- Advanced features such as complex approval workflows, inventory databases, and integrations can wait until the team has tested the core process.

## Recommended build and publishing approach

1. **Get school approval first.** Ask a teacher or IT contact which hosting, sign-in, and data-storage services are allowed. A public website URL can still have private, sign-in-protected content; do not make the planning board publicly readable.
2. **Prototype before coding the whole app.** Sketch the main screens and test the workflow with one example idea, task, running-order segment, and AV cue. Keep the first release small.
3. **Use a familiar web stack.** A reasonable starting point for someone with some HTML/CSS/JavaScript experience is React with TypeScript and Vite for the site. Use a managed backend such as Supabase for sign-in and database only if the school approves it; configure database row-level security so users cannot read or change records they are not permitted to access. Host the site on a static web host such as Vercel or an approved school platform. Check current terms, pricing, and age/account requirements before choosing services.
4. **Build in stages.** First implement sign-in, the idea board, decisions, and tasks. Then add the draft running order and cues, followed by organiser approval and a published show-day view. Use sample content until access rules are tested.
5. **Test permissions and usability.** Check the app on phones and school laptops. Test as an organiser and a contributor, including that unauthorised people cannot access private data and that a published run sheet remains distinct from drafts.
6. **Publish carefully.** Deploy a preview for the teacher/organisers to review, fix issues, then publish the production URL. Share it only with the intended group, use school-approved accounts, avoid sensitive personal details, and retain a printable/offline run-sheet backup. Recheck the data and access rules before real event details are entered.
7. **Maintain it through the year.** Assign an owner, document how to update the app, periodically review access, and decide when to archive or delete event information after the assembly.

The backend and hosting providers are suggestions, not assumptions: the school’s policy and account requirements take priority. Avoid putting real student names, private contact details, or sensitive material in a prototype or public repository.

## Todos

1. Confirm school approval, allowed accounts/hosting, and the minimum data the app needs.
2. Map the year-long planning workflow from ideas through decisions, tasks, and rehearsal.
3. Prototype the core screens and test the workflow with representatives of all three groups.
4. Define the data model, sign-in, roles, and access rules before entering real event information.
5. Build the idea board, decisions, and tasks; then add the running order, AV cues, and approval/publishing.
6. Test usability, permissions, and published-versus-draft behavior on school devices.
7. Deploy a preview, get organiser approval, and publish using an approved host and account setup.
8. Assign maintenance ownership and a post-event data retention/deletion plan.

## Notes

No codebase or implementation target has been selected yet. This is a build-and-publish plan, not an instruction to start coding.
