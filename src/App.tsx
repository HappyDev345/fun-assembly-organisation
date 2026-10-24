import { useState, type Dispatch, type FormEvent, type ReactNode, type SetStateAction } from "react";

type View = "overview" | "ideas" | "tasks" | "running-order" | "show-day";
type Idea = {
  id: number;
  title: string;
  description: string;
  author: string;
  status: "For discussion" | "Shortlisted" | "In the plan";
  comments: string[];
};
type Task = {
  id: number;
  title: string;
  owner: string;
  due: string;
  done: boolean;
  group: "Stage" | "AV" | "Program";
};
type Segment = {
  id: number;
  title: string;
  lead: string;
  minutes: number;
  cue: string;
  cueOwner: string;
};

const navItems: { id: View; label: string; mark: string }[] = [
  { id: "overview", label: "Overview", mark: "OV" },
  { id: "ideas", label: "Ideas & decisions", mark: "ID" },
  { id: "tasks", label: "To-do list", mark: "TD" },
  { id: "running-order", label: "Running order", mark: "RO" },
  { id: "show-day", label: "Show-day sheet", mark: "SD" },
];

const initialIdeas: Idea[] = [
  {
    id: 1,
    title: "A year in moments",
    description: "A quick photo-and-voice montage celebrating the little wins.",
    author: "Creative crew",
    status: "Shortlisted",
    comments: ["Could use photos from each group."],
  },
  {
    id: 2,
    title: "Student band opener",
    description: "Kick things off with a short, high-energy live performance.",
    author: "Performers",
    status: "For discussion",
    comments: [],
  },
  {
    id: 3,
    title: "Community shout-outs",
    description: "Recognise the people who helped our community this term.",
    author: "Organisers",
    status: "In the plan",
    comments: ["Keep the segment under eight minutes."],
  },
];

const initialTasks: Task[] = [
  { id: 1, title: "Confirm stage layout and access", owner: "Stage crew", due: "Thu, 12 Nov", done: false, group: "Stage" },
  { id: 2, title: "Collect final audio files", owner: "AV crew", due: "Fri, 13 Nov", done: false, group: "AV" },
  { id: 3, title: "Draft presenter introductions", owner: "Program team", due: "Mon, 16 Nov", done: true, group: "Program" },
  { id: 4, title: "Test projector and presentation deck", owner: "AV crew", due: "Wed, 18 Nov", done: false, group: "AV" },
];

const initialSegments: Segment[] = [
  { id: 1, title: "Welcome & Acknowledgement", lead: "Assembly hosts", minutes: 4, cue: "Mic 1 on · welcome slide", cueOwner: "AV crew" },
  { id: 2, title: "Student band", lead: "Performers", minutes: 6, cue: "Track: opening_mix.wav · stage wash", cueOwner: "Sound lead" },
  { id: 3, title: "A year in moments", lead: "Creative crew", minutes: 5, cue: "Video: year_recap.mp4 · lights down", cueOwner: "Projection lead" },
  { id: 4, title: "Community shout-outs", lead: "Organisers", minutes: 8, cue: "Mic 2 on · recognition slides", cueOwner: "AV crew" },
];

const publishedSegments = [
  { title: "Welcome & Acknowledgement", lead: "Assembly hosts", time: "9:00", cue: "Mic 1 on · welcome slide" },
  { title: "Student band", lead: "Performers", time: "9:04", cue: "Opening mix · stage wash" },
  { title: "A year in moments", lead: "Creative crew", time: "9:10", cue: "Year recap video · lights down" },
  { title: "Community shout-outs", lead: "Organisers", time: "9:15", cue: "Mic 2 on · recognition slides" },
  { title: "Thank you & dismissal", lead: "Assembly hosts", time: "9:23", cue: "Closing slide · house lights up" },
];

function isIdeaStatus(value: string): value is Idea["status"] {
  return value === "For discussion" || value === "Shortlisted" || value === "In the plan";
}

function App() {
  const [view, setView] = useState<View>("overview");
  const [ideas, setIdeas] = useState(initialIdeas);
  const [tasks, setTasks] = useState(initialTasks);
  const [segments, setSegments] = useState(initialSegments);
  const [completedShowItems, setCompletedShowItems] = useState<number[]>([]);
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [segmentTitle, setSegmentTitle] = useState("");
  const [segmentMinutes, setSegmentMinutes] = useState("5");

  const completedTasks = tasks.filter((task) => task.done).length;
  const totalMinutes = segments.reduce((total, segment) => total + segment.minutes, 0);

  function addIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = ideaTitle.trim();
    const description = ideaDescription.trim();
    if (!title || !description) return;
    setIdeas((current) => [
      { id: Date.now(), title, description, author: "You", status: "For discussion", comments: [] },
      ...current,
    ]);
    setIdeaTitle("");
    setIdeaDescription("");
  }

  function addComment(event: FormEvent<HTMLFormElement>, ideaId: number) {
    event.preventDefault();
    const comment = (commentDrafts[ideaId] ?? "").trim();
    if (!comment) return;
    setIdeas((current) => current.map((idea) => idea.id === ideaId
      ? { ...idea, comments: [...idea.comments, comment] }
      : idea));
    setCommentDrafts((current) => ({ ...current, [ideaId]: "" }));
  }

  function updateIdeaStatus(ideaId: number, status: Idea["status"]) {
    setIdeas((current) => current.map((idea) => idea.id === ideaId ? { ...idea, status } : idea));
  }

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  function addSegment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = segmentTitle.trim();
    const minutes = Number(segmentMinutes);
    if (!title || !Number.isInteger(minutes) || minutes < 1 || minutes > 60) return;
    setSegments((current) => [
      ...current,
      { id: Date.now(), title, lead: "To be assigned", minutes, cue: "Cue to confirm", cueOwner: "AV crew" },
    ]);
    setSegmentTitle("");
    setSegmentMinutes("5");
  }

  function toggleShowItem(index: number) {
    setCompletedShowItems((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index]);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setView("overview"); }}>
          <span className="brand-mark">a.</span>
          <span><strong>Assembly</strong><small>COORDINATION DESK</small></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <div className="event-switcher">
          <span className="event-dot" />
          <span><strong>End of year assembly</strong><small>Term 4 · 2026</small></span>
          <span className="switcher-chevron">⌄</span>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              className={`nav-item ${view === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => setView(item.id)}
              aria-current={view === item.id ? "page" : undefined}
            >
              <span className="nav-mark">{item.mark}</span>{item.label}
              {item.id === "tasks" && <span className="nav-count">{tasks.filter((task) => !task.done).length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="team-card">
            <div className="team-avatars"><span>TC</span><span>PR</span><span>OR</span><b>+4</b></div>
            <strong>One team, one show.</strong>
            <p>Tech crew, performers &amp; organisers, all in sync.</p>
          </div>
          <div className="profile-row"><span className="profile-avatar">Y</span><span><strong>Your workspace</strong><small>Prototype mode</small></span><span className="profile-more">···</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">End of year assembly <span>/</span> {navItems.find((item) => item.id === view)?.label}</div>
          <div className="topbar-actions"><span className="prototype-badge"><span /> DEMO DATA</span><button className="avatar-button" aria-label="Your profile">Y</button></div>
        </header>
        <div className="page-content">
          {view === "overview" && <Overview completedTasks={completedTasks} taskCount={tasks.length} ideas={ideas} segments={segments} setView={setView} />}
          {view === "ideas" && (
            <IdeasPage ideas={ideas} title={ideaTitle} description={ideaDescription} commentDrafts={commentDrafts} setTitle={setIdeaTitle} setDescription={setIdeaDescription} setCommentDrafts={setCommentDrafts} onSubmit={addIdea} onComment={addComment} onStatusChange={updateIdeaStatus} />
          )}
          {view === "tasks" && <TasksPage tasks={tasks} onToggle={toggleTask} />}
          {view === "running-order" && <RunningOrderPage segments={segments} totalMinutes={totalMinutes} title={segmentTitle} minutes={segmentMinutes} setTitle={setSegmentTitle} setMinutes={setSegmentMinutes} onSubmit={addSegment} />}
          {view === "show-day" && <ShowDayPage completed={completedShowItems} onToggle={toggleShowItem} />}
          <footer className="page-footer"><span>Assembly Desk <span className="footer-dot">·</span> Local prototype</span><span>Sample content only <span className="footer-dot">·</span> Nothing is saved</span></footer>
        </div>
      </main>
    </div>
  );
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: ReactNode; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function Overview({ completedTasks, taskCount, ideas, segments, setView }: { completedTasks: number; taskCount: number; ideas: Idea[]; segments: Segment[]; setView: (view: View) => void }) {
  const openTasks = taskCount - completedTasks;
  return (
    <>
      <PageHeading eyebrow="SATURDAY, 24 OCTOBER 2026" title={<>Let’s make this <em>memorable.</em></>} description="The big day is getting closer. Here’s where the team is up to." action={<button className="button button-dark" onClick={() => setView("running-order")}>↗ <span>Open running order</span></button>} />
      <section className="event-banner">
        <div className="event-banner-copy"><span className="banner-label"><span /> NEXT UP</span><h2>End of year assembly</h2><p>Friday, 20 November <span>·</span> 9:00 – 9:30 am <span>·</span> Main hall</p></div>
        <div className="countdown"><strong>27</strong><span>DAYS TO GO</span></div>
        <div className="banner-decoration"><span>✳</span><i /><b /></div>
      </section>
      <div className="section-heading"><div><h2>The whole picture</h2><p>A quick pulse-check across the planning.</p></div><button className="text-button" onClick={() => setView("tasks")}>View all tasks <span>→</span></button></div>
      <section className="stat-grid">
        <button className="stat-card" onClick={() => setView("ideas")}><span className="stat-icon lilac">✳</span><span className="stat-label">IDEAS ON THE BOARD</span><strong>{ideas.length.toString().padStart(2, "0")}</strong><small><span className="status-dot purple" /> {ideas.filter((idea) => idea.status === "Shortlisted").length} shortlisted for the show</small><span className="card-arrow">↗</span></button>
        <button className="stat-card" onClick={() => setView("tasks")}><span className="stat-icon peach">✓</span><span className="stat-label">TASKS IN PROGRESS</span><strong>{openTasks.toString().padStart(2, "0")}<small className="stat-total"> / {taskCount.toString().padStart(2, "0")}</small></strong><small><span className="status-dot orange" /> {completedTasks} ready for the day</small><span className="card-arrow">↗</span></button>
        <button className="stat-card" onClick={() => setView("running-order")}><span className="stat-icon mint">◷</span><span className="stat-label">RUNNING ORDER</span><strong>{segments.length.toString().padStart(2, "0")}<small className="stat-total"> segments</small></strong><small><span className="status-dot green" /> Draft · ready for a review</small><span className="card-arrow">↗</span></button>
      </section>
      <div className="dashboard-grid">
        <section className="panel agenda-panel">
          <div className="panel-heading"><div><h2>On the run sheet</h2><p>The current draft, at a glance.</p></div><button className="icon-link" aria-label="Open running order" onClick={() => setView("running-order")}>↗</button></div>
          <div className="agenda-list">{segments.slice(0, 3).map((segment, index) => <div className="agenda-row" key={segment.id}><span className={`agenda-index tone-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span><span className="agenda-info"><strong>{segment.title}</strong><small>{segment.lead}</small></span><span className="agenda-duration">{segment.minutes} min</span></div>)}</div>
          <button className="panel-link" onClick={() => setView("running-order")}>See full running order <span>→</span></button>
        </section>
        <section className="panel activity-panel">
          <div className="panel-heading"><div><h2>Little things moving</h2><p>A few recent team updates.</p></div>          <span className="live-mark"><i /> TEAM PULSE</span></div>
          <div className="activity-list">
            <div className="activity-row"><span className="activity-avatar activity-purple">CC</span><span><strong>Creative crew</strong><small>Shortlisted “A year in moments”</small></span><time>2h</time></div>
            <div className="activity-row"><span className="activity-avatar activity-yellow">AV</span><span><strong>AV crew</strong><small>Added a projector test to the list</small></span><time>5h</time></div>
            <div className="activity-row"><span className="activity-avatar activity-green">OR</span><span><strong>Organisers</strong><small>Confirmed the main hall</small></span><time>1d</time></div>
          </div>
          <div className="activity-note"><span>✦</span> Small steps make a great show. Keep it up!</div>
        </section>
      </div>
      <div className="showday-callout"><span className="callout-icon">◷</span><span><strong>When the doors open, you’re ready.</strong><small>The show-day sheet is a separate, published version for the crew to follow.</small></span><button onClick={() => setView("show-day")}>Preview show-day sheet <span>→</span></button></div>
    </>
  );
}

function IdeasPage({ ideas, title, description, commentDrafts, setTitle, setDescription, setCommentDrafts, onSubmit, onComment, onStatusChange }: { ideas: Idea[]; title: string; description: string; commentDrafts: Record<number, string>; setTitle: (value: string) => void; setDescription: (value: string) => void; setCommentDrafts: Dispatch<SetStateAction<Record<number, string>>>; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onComment: (event: FormEvent<HTMLFormElement>, ideaId: number) => void; onStatusChange: (ideaId: number, status: Idea["status"]) => void }) {
  const statusClass: Record<Idea["status"], string> = { "For discussion": "tag-discuss", Shortlisted: "tag-shortlist", "In the plan": "tag-plan" };
  return (
    <>
      <PageHeading eyebrow="THE IDEAS BOARD" title={<>Good ideas start <em>here.</em></>} description="A shared space for every spark, big or small. The team can shape them together." />
      <section className="page-layout">
        <div className="panel content-panel"><div className="panel-heading"><div><h2>All ideas <span className="inline-count">{ideas.length}</span></h2><p>Every great assembly begins with a thought.</p></div><span className="filter-label">SORTED BY RECENT</span></div>
          <div className="idea-list">{ideas.map((idea) => <article className="idea-card" key={idea.id}><div className="idea-card-top"><span className="idea-bullet">✳</span><label className={`status-tag ${statusClass[idea.status]}`}><span className="sr-only">Status for {idea.title}</span><select value={idea.status} aria-label={`Status for ${idea.title}`} onChange={(event) => { if (isIdeaStatus(event.target.value)) onStatusChange(idea.id, event.target.value); }}><option>For discussion</option><option>Shortlisted</option><option>In the plan</option></select></label></div><h3>{idea.title}</h3><p>{idea.description}</p><div className="idea-meta"><span className="mini-avatar">{idea.author.slice(0, 1)}</span><span>{idea.author}</span><span className="meta-separator">·</span><span>Shared with the team</span></div>{idea.comments.length > 0 && <div className="comment-list">{idea.comments.map((comment, index) => <p className="comment-item" key={`${idea.id}-${index}`}><span className="comment-avatar">T</span><span>{comment}</span></p>)}</div>}<form className="comment-form" onSubmit={(event) => onComment(event, idea.id)}><input aria-label={`Add a comment on ${idea.title}`} maxLength={180} placeholder="Add a thought…" value={commentDrafts[idea.id] ?? ""} onChange={(event) => setCommentDrafts((current) => ({ ...current, [idea.id]: event.target.value }))} /><button type="submit" aria-label={`Post comment on ${idea.title}`}>↵</button></form></article>)}</div>
          <div className="decision-log"><div className="eyebrow">DECISIONS SO FAR</div><div><span className="decision-check">✓</span><span><strong>Main hall confirmed</strong><small>Organisers · Venue booked for 20 Nov</small></span></div><div><span className="decision-check">✓</span><span><strong>Keep the show to 30 minutes</strong><small>Planning team · Agreed at kickoff</small></span></div></div>
        </div>
        <aside className="panel form-panel"><span className="form-spark">✳</span><div className="eyebrow">ADD TO THE BOARD</div><h2>Got a good one?</h2><p>Drop your idea in. The team will take it from there.</p>
          <form onSubmit={onSubmit}><label htmlFor="idea-title">Idea name</label><input id="idea-title" required maxLength={70} placeholder="e.g. An unexpected opening act" value={title} onChange={(event) => setTitle(event.target.value)} /><label htmlFor="idea-description">A little more about it</label><textarea id="idea-description" required maxLength={240} placeholder="What would it look or sound like?" value={description} onChange={(event) => setDescription(event.target.value)} /><button className="button button-dark full-width" type="submit">Add your idea <span>→</span></button></form>
          <div className="form-tip"><span>✦</span> Rough ideas welcome. They don’t have to be perfect.</div>
        </aside>
      </section>
    </>
  );
}

function TasksPage({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
  const groups: Task["group"][] = ["Stage", "AV", "Program"];
  return (
    <>
      <PageHeading eyebrow="THE PREP LIST" title={<>Little jobs, <em>big impact.</em></>} description="All the moving parts that help the day run smoothly. Tick one off when it’s done." />
      <div className="task-summary"><span><strong>{tasks.filter((task) => task.done).length}</strong> of {tasks.length} tasks complete</span><div className="progress-track"><span style={{ width: `${tasks.length ? (tasks.filter((task) => task.done).length / tasks.length) * 100 : 0}%` }} /></div><span className="summary-remaining">{tasks.filter((task) => !task.done).length} left to do</span></div>
      <section className="panel task-panel">{groups.map((group) => <div className="task-group" key={group}><div className="task-group-title"><span>{group}</span><span>{tasks.filter((task) => task.group === group).length}</span></div>{tasks.filter((task) => task.group === group).map((task) => <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} /><span className="custom-checkbox">{task.done ? "✓" : ""}</span><span className="task-text"><strong>{task.title}</strong><small>{task.owner}</small></span><span className={`task-due ${task.done ? "due-done" : ""}`}>{task.done ? "Done" : task.due}</span></label>)}</div>)}</section>
      <div className="soft-note"><span>✦</span> A quick check-in with each other can make a tricky task feel easy.</div>
    </>
  );
}

function RunningOrderPage({ segments, totalMinutes, title, minutes, setTitle, setMinutes, onSubmit }: { segments: Segment[]; totalMinutes: number; title: string; minutes: string; setTitle: (value: string) => void; setMinutes: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <>
      <PageHeading eyebrow="THE DRAFT PLAN" title={<>A great show has <em>a rhythm.</em></>} description="Shape the flow, add the practical bits, and make sure every hand-off feels easy." action={<span className="draft-tag"><span /> DRAFT · NOT PUBLISHED</span>} />
      <div className="run-order-meta"><span className="run-time-icon">◷</span><span><strong>Target: 30 minutes</strong><small>Estimated running time: {totalMinutes} minutes</small></span><span className={`time-status ${totalMinutes > 30 ? "over-time" : ""}`}>{totalMinutes > 30 ? `${totalMinutes - 30} min over` : `${30 - totalMinutes} min spare`}</span></div>
      <section className="panel run-order-panel"><div className="panel-heading"><div><h2>Segments &amp; cues</h2><p>Drag-and-drop ordering is a future step. This draft is for conversation.</p></div><span className="filter-label">{segments.length} SEGMENTS</span></div>
        <div className="segment-list">{segments.map((segment, index) => <article className="segment-card" key={segment.id}><span className={`segment-number tone-${(index % 4) + 1}`}>{String(index + 1).padStart(2, "0")}</span><div className="segment-main"><strong>{segment.title}</strong><span>{segment.lead}</span><div className="cue-line"><span className="cue-mark">↳</span><span>{segment.cue} <span className="cue-owner">· {segment.cueOwner}</span></span></div></div><span className="segment-duration">{segment.minutes} <small>min</small></span><span className="segment-more" aria-hidden="true">⠿</span></article>)}</div>
        <form className="add-segment-form" onSubmit={onSubmit}><div><label htmlFor="segment-title">Add a segment</label><input id="segment-title" required maxLength={70} placeholder="e.g. Closing thank-you" value={title} onChange={(event) => setTitle(event.target.value)} /></div><div className="minutes-field"><label htmlFor="segment-minutes">Minutes</label><input id="segment-minutes" type="number" min="1" max="60" required value={minutes} onChange={(event) => setMinutes(event.target.value)} /></div><button className="button button-dark" type="submit">Add segment <span>+</span></button></form>
      </section>
      <div className="publish-reminder"><span>◎</span><span><strong>Keeping everyone in sync</strong><small>Changes here stay in draft. The show-day sheet above is a separate sample of what a published plan could look like.</small></span></div>
    </>
  );
}

function ShowDayPage({ completed, onToggle }: { completed: number[]; onToggle: (index: number) => void }) {
  const doneCount = completed.length;
  return (
    <>
      <PageHeading eyebrow="PUBLISHED · SHOW DAY" title={<>You’ve got <em>this.</em></>} description="The agreed running order, ready for the crew. Clear cues, one step at a time." action={<span className="published-tag"><span /> PUBLISHED SAMPLE</span>} />
      <section className="showday-banner"><div><span className="banner-label"><span /> FRIDAY, 20 NOVEMBER</span><h2>End of year assembly</h2><p>Main hall <span>·</span> Crew call 8:30 am <span>·</span> Doors 8:55 am</p></div><div className="showday-ready"><span>{doneCount}/{publishedSegments.length}</span><small>SEGMENTS DONE</small></div></section>
      <div className="showday-note"><span>ℹ</span><span><strong>This is a published sample.</strong> Draft changes do not update this run sheet.</span></div>
      <section className="panel published-panel"><div className="panel-heading"><div><h2>Today’s running order</h2><p>Tap a segment to mark it complete during the show.</p></div><span className="filter-label">9:00 – 9:30 AM</span></div>
        <div className="published-list">{publishedSegments.map((segment, index) => <button className={`published-row ${completed.includes(index) ? "published-done" : ""}`} key={segment.title} onClick={() => onToggle(index)}><span className="published-check">{completed.includes(index) ? "✓" : ""}</span><span className="published-time">{segment.time}</span><span className="published-info"><strong>{segment.title}</strong><small>{segment.lead}<span> · </span><i>{segment.cue}</i></small></span><span className="published-row-arrow">{completed.includes(index) ? "Done" : "○"}</span></button>)}</div>
      </section>
      <div className="print-note"><span>⌁</span> Keep a printed copy nearby as a backup. This prototype does not save progress.</div>
    </>
  );
}

export default App;
