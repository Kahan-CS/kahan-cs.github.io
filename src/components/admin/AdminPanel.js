import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles/AdminPanel.module.css";
import defaultProjects from "../../data/projectsData";
import defaultExperience from "../../data/experienceData";

const REPO_OWNER = "kahan6826conestoga";
const REPO_NAME = "kahan6826conestoga.github.io";
const BRANCH = "gh-pages";
const CONFIG_PATH = "config.json";
const API = "https://api.github.com";

// ─── GitHub helpers ────────────────────────────────────────────────────────────
async function ghGet(path, token) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub ${res.status}`);
  }
  return res.json();
}

async function ghPutFile(token, filePath, base64Content, message, sha) {
  const body = { message, content: base64Content, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await fetch(`${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub ${res.status}`);
  }
  return res.json();
}

async function getFileSha(token, filePath) {
  try {
    const data = await ghGet(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`,
      token
    );
    return data.sha;
  } catch (_) {
    return undefined;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result.split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function toBase64Utf8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// ─── Auth screen ───────────────────────────────────────────────────────────────
const AuthScreen = ({ onAuth }) => {
  const [pat, setPat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!pat.trim()) return;
    setLoading(true);
    setError("");
    try {
      const user = await ghGet("/user", pat.trim());
      onAuth(pat.trim(), user.login);
    } catch {
      setError("Authentication failed — check your PAT and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className={styles.logo}>
        <span className={styles.lockIcon}>🔐</span>
        <h1 className={styles.panelTitle}>Portfolio Admin</h1>
      </div>
      <p className={styles.panelSubtitle}>
        Enter your GitHub Personal Access Token with <code>repo</code> scope.
      </p>
      <div className={styles.formGroup}>
        <label className={styles.label}>GitHub PAT</label>
        <input
          type="password"
          className={`${styles.input} ${styles.inputPassword}`}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          value={pat}
          onChange={(e) => setPat(e.target.value)}
          autoComplete="off"
        />
        <p className={styles.helpText}>
          GitHub → Settings → Developer settings → Personal access tokens (Classic). Needs <code>repo</code> scope. Cleared when tab closes.
        </p>
      </div>
      <button type="submit" className={styles.submitBtn} disabled={loading || !pat.trim()}>
        {loading ? "Verifying…" : "Sign in"}
      </button>
      {error && <div className={`${styles.statusMsg} ${styles.statusError}`}>{error}</div>}
    </form>
  );
};

// ─── Tab: General ─────────────────────────────────────────────────────────────
const GeneralTab = ({ values, onChange }) => {
  const [picFile, setPicFile] = useState(null);

  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Resume URL</label>
        <input type="url" className={styles.input} value={values.resumeUrl} onChange={set("resumeUrl")}
          placeholder="https://drive.google.com/file/d/..." />
        <p className={styles.helpText}>Google Drive share link or any direct PDF URL.</p>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Hero Status Line</label>
        <input type="text" className={styles.input} value={values.statusLine} onChange={set("statusLine")}
          placeholder="Seeking full-time entry-level software engineering positions" />
        <p className={styles.helpText}>Shown below your name on the hero section.</p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.formGroup}>
        <label className={styles.label}>Profile Picture URL</label>
        <input type="url" className={styles.input} value={values.profilePicUrl}
          onChange={(e) => { onChange({ ...values, profilePicUrl: e.target.value }); setPicFile(null); }}
          placeholder="https://... (direct image link, or Google Drive share link)" />
        <p className={styles.helpText}>
          Google Drive share links are auto-converted. For best results, use a direct image URL or upload below.
        </p>
      </div>

      <p className={styles.orText}>— or upload a file —</p>

      <div className={styles.formGroup}>
        <div className={styles.fileInputWrap}>
          <label className={styles.fileInputLabel}>
            📷 Choose image
            <input type="file" accept="image/jpeg,image/png,image/webp" className={styles.fileInputHidden}
              onChange={(e) => { if (e.target.files[0]) { setPicFile(e.target.files[0]); onChange({ ...values, profilePicUrl: "", _picFile: e.target.files[0] }); } }} />
          </label>
          {(picFile || values._picFile) && (
            <span className={styles.fileName}>{(picFile || values._picFile).name}</span>
          )}
        </div>
        <p className={styles.helpText}>JPG / PNG / WebP — uploaded to gh-pages and served at /profile-pic.ext</p>
      </div>
    </div>
  );
};

// ─── Tab: Projects ─────────────────────────────────────────────────────────────
const EMPTY_PROJECT = {
  id: "", name: "", description: "", link: "", demoLink: "", featured: false,
  technology: [], image: "",
};

const ProjectEditor = ({ project, onSave, onCancel }) => {
  const [form, setForm] = useState({
    ...project,
    techString: (project.technology || []).map((t) => t.name).join(", "),
  });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));
  const setCheck = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.checked }));

  const handleSave = () => {
    const tags = form.techString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name, i) => ({ id: `${form.id}-t${i}`, name }));
    onSave({ ...form, technology: tags });
  };

  return (
    <div className={styles.editorBox}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input className={styles.input} value={form.name} onChange={set("name")} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea className={`${styles.input} ${styles.textarea}`} rows={3}
          value={form.description} onChange={set("description")} />
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tech tags (comma-separated)</label>
          <input className={styles.input} value={form.techString} onChange={set("techString")}
            placeholder="React, Python, AWS" />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>GitHub / Details URL</label>
          <input type="url" className={styles.input} value={form.link} onChange={set("link")} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Live Demo URL</label>
          <input type="url" className={styles.input} value={form.demoLink} onChange={set("demoLink")} />
        </div>
      </div>
      <div className={styles.checkRow}>
        <input type="checkbox" id={`feat-${form.id}`} checked={form.featured} onChange={setCheck("featured")} />
        <label htmlFor={`feat-${form.id}`} className={styles.checkLabel}>Featured project</label>
      </div>
      <div className={styles.editorActions}>
        <button className={styles.saveSmallBtn} onClick={handleSave}>Save</button>
        <button className={styles.cancelSmallBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const ProjectsTab = ({ projects, onChange }) => {
  const [editingId, setEditingId] = useState(null);

  const addProject = () => {
    const id = `p-${Date.now()}`;
    onChange([...projects, { ...EMPTY_PROJECT, id }]);
    setEditingId(id);
  };

  const updateProject = (updated) => {
    onChange(projects.map((p) => (p.id === updated.id ? updated : p)));
    setEditingId(null);
  };

  const deleteProject = (id) =>
    onChange(projects.filter((p) => p.id !== id));

  const moveProject = (id, dir) => {
    const idx = projects.findIndex((p) => p.id === id);
    const next = idx + dir;
    if (next < 0 || next >= projects.length) return;
    const arr = [...projects];
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    onChange(arr);
  };

  return (
    <div>
      {projects.map((p, i) => (
        <div key={p.id} className={styles.listItem}>
          {editingId === p.id ? (
            <ProjectEditor
              project={p}
              onSave={updateProject}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className={styles.listItemRow}>
              <div className={styles.listItemInfo}>
                <span className={styles.listItemName}>
                  {p.featured ? "★ " : ""}{p.name || "(untitled)"}
                </span>
                <span className={styles.listItemMeta}>
                  {(p.technology || []).map((t) => t.name).join(", ")}
                </span>
              </div>
              <div className={styles.listItemActions}>
                <button className={styles.moveBtn} onClick={() => moveProject(p.id, -1)} disabled={i === 0} title="Move up">↑</button>
                <button className={styles.moveBtn} onClick={() => moveProject(p.id, 1)} disabled={i === projects.length - 1} title="Move down">↓</button>
                <button className={styles.editBtn} onClick={() => setEditingId(p.id)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => deleteProject(p.id)}>✕</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button className={styles.addBtn} onClick={addProject}>+ Add Project</button>
    </div>
  );
};

// ─── Tab: Experience ──────────────────────────────────────────────────────────
const EMPTY_EXP = {
  id: "", title: "", company: "", companyUrl: "", location: "",
  dateRange: "", type: "Full-time", skills: [], highlights: [], moreDetails: [],
};

const EXP_TYPES = ["CO-OP", "Full-time", "Contract", "Part-time", "Volunteer"];

const ExperienceEditor = ({ exp, onSave, onCancel }) => {
  const [form, setForm] = useState({
    ...exp,
    skillsString: (exp.skills || []).join(", "),
    highlightsText: (exp.highlights || []).join("\n"),
    moreText: (exp.moreDetails || []).join("\n"),
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    const skills = form.skillsString.split(",").map((s) => s.trim()).filter(Boolean);
    const highlights = form.highlightsText.split("\n").map((s) => s.trim()).filter(Boolean);
    const moreDetails = form.moreText.split("\n").map((s) => s.trim()).filter(Boolean);
    onSave({ ...form, skills, highlights, moreDetails });
  };

  return (
    <div className={styles.editorBox}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Job Title</label>
          <input className={styles.input} value={form.title} onChange={set("title")} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <select className={styles.input} value={form.type} onChange={set("type")}>
            {EXP_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Company</label>
          <input className={styles.input} value={form.company} onChange={set("company")} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Company URL</label>
          <input type="url" className={styles.input} value={form.companyUrl} onChange={set("companyUrl")} />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Location</label>
          <input className={styles.input} value={form.location} onChange={set("location")} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date Range</label>
          <input className={styles.input} value={form.dateRange} onChange={set("dateRange")} placeholder="Jan 2024 – Dec 2024" />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Skills (comma-separated)</label>
        <input className={styles.input} value={form.skillsString} onChange={set("skillsString")} placeholder="Python, React, AWS" />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Highlights (one bullet per line)</label>
        <textarea className={`${styles.input} ${styles.textarea}`} rows={4}
          value={form.highlightsText} onChange={set("highlightsText")}
          placeholder="Developed X using Y&#10;Achieved Z by doing W" />
        <p className={styles.helpText}>Shown by default on the portfolio. From the 2-page resume.</p>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Know More details (one per line)</label>
        <textarea className={`${styles.input} ${styles.textarea}`} rows={3}
          value={form.moreText} onChange={set("moreText")}
          placeholder="Additional context from full resume&#10;One line per bullet" />
        <p className={styles.helpText}>Hidden behind the "Know more" toggle.</p>
      </div>
      <div className={styles.editorActions}>
        <button className={styles.saveSmallBtn} onClick={handleSave}>Save</button>
        <button className={styles.cancelSmallBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const ExperienceTab = ({ experience, onChange }) => {
  const [editingId, setEditingId] = useState(null);

  const add = () => {
    const id = `e-${Date.now()}`;
    onChange([...experience, { ...EMPTY_EXP, id }]);
    setEditingId(id);
  };

  const update = (updated) => {
    onChange(experience.map((e) => (e.id === updated.id ? updated : e)));
    setEditingId(null);
  };

  const remove = (id) => onChange(experience.filter((e) => e.id !== id));

  const move = (id, dir) => {
    const idx = experience.findIndex((e) => e.id === id);
    const next = idx + dir;
    if (next < 0 || next >= experience.length) return;
    const arr = [...experience];
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    onChange(arr);
  };

  return (
    <div>
      {experience.map((exp, i) => (
        <div key={exp.id} className={styles.listItem}>
          {editingId === exp.id ? (
            <ExperienceEditor
              exp={exp}
              onSave={update}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className={styles.listItemRow}>
              <div className={styles.listItemInfo}>
                <span className={styles.listItemName}>{exp.title || "(untitled)"}</span>
                <span className={styles.listItemMeta}>
                  {exp.company} · {exp.dateRange} · {exp.type}
                </span>
              </div>
              <div className={styles.listItemActions}>
                <button className={styles.moveBtn} onClick={() => move(exp.id, -1)} disabled={i === 0}>↑</button>
                <button className={styles.moveBtn} onClick={() => move(exp.id, 1)} disabled={i === experience.length - 1}>↓</button>
                <button className={styles.editBtn} onClick={() => setEditingId(exp.id)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => remove(exp.id)}>✕</button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button className={styles.addBtn} onClick={add}>+ Add Entry</button>
    </div>
  );
};

// ─── Edit screen (tabbed) ─────────────────────────────────────────────────────
const TABS = ["General", "Projects", "Experience"];

const stripNonSerializable = (projects) =>
  projects.map(({ _picFile, image, ...rest }) => ({
    ...rest,
    image: typeof image === "string" ? image : "",
  }));

const EditScreen = ({ pat, githubUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [general, setGeneral] = useState({ resumeUrl: "", statusLine: "", profilePicUrl: "", _picFile: null });
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  // Load current config from gh-pages (fallback to /config.json on the live site)
  useEffect(() => {
    const load = async () => {
      let config = {};
      try {
        const data = await ghGet(
          `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_PATH}?ref=${BRANCH}`,
          pat
        );
        config = JSON.parse(atob(data.content.replace(/\n/g, "")));
      } catch {
        try {
          const res = await fetch("/config.json");
          config = await res.json();
        } catch {}
      }
      setGeneral({
        resumeUrl: config.resumeUrl || "",
        statusLine: config.statusLine || "",
        profilePicUrl: config.profilePicUrl || "",
        _picFile: null,
      });
      setProjects(
        Array.isArray(config.projects) && config.projects.length > 0
          ? config.projects
          : defaultProjects.map(({ image, ...rest }) => ({ ...rest, image: "" }))
      );
      setExperience(
        Array.isArray(config.experience) && config.experience.length > 0
          ? config.experience
          : defaultExperience
      );
      setInitialLoading(false);
    };
    load();
  }, [pat]);

  const handlePublish = useCallback(async () => {
    setSaving(true);
    setStatus({ type: "info", msg: "Publishing…" });
    try {
      let finalProfilePicUrl = general.profilePicUrl;

      // Upload profile pic file if provided
      if (general._picFile) {
        setStatus({ type: "info", msg: "Uploading profile picture…" });
        const ext = general._picFile.name.split(".").pop().toLowerCase();
        const picPath = `profile-pic.${ext}`;
        const b64 = await fileToBase64(general._picFile);
        const sha = await getFileSha(pat, picPath);
        await ghPutFile(pat, picPath, b64, "Update profile picture", sha);
        finalProfilePicUrl = `/profile-pic.${ext}?t=${Date.now()}`;
      }

      const newConfig = {
        resumeUrl: general.resumeUrl,
        statusLine: general.statusLine,
        profilePicUrl: finalProfilePicUrl,
        projects: stripNonSerializable(projects),
        experience,
      };

      setStatus({ type: "info", msg: "Saving config.json to gh-pages…" });
      const sha = await getFileSha(pat, CONFIG_PATH);
      await ghPutFile(
        pat,
        CONFIG_PATH,
        toBase64Utf8(JSON.stringify(newConfig, null, 2)),
        "Update portfolio config",
        sha
      );
      setStatus({ type: "success", msg: "✓ Published! Changes are live. Reload the site to verify." });
    } catch (err) {
      setStatus({ type: "error", msg: `Error: ${err.message}` });
    } finally {
      setSaving(false);
    }
  }, [pat, general, projects, experience]);

  return (
    <div>
      <div className={styles.loggedInHeader}>
        <div>
          <h1 className={styles.panelTitle}>Portfolio Admin</h1>
          <span className={styles.userBadge}>✓ {githubUser}</span>
        </div>
        <button className={styles.logoutBtn} onClick={onLogout}>Sign out</button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {initialLoading ? (
        <p style={{ color: "#667788", fontSize: 14, padding: "20px 0" }}>Loading…</p>
      ) : (
        <div className={styles.tabContent}>
          {activeTab === "General" && (
            <GeneralTab values={general} onChange={setGeneral} />
          )}
          {activeTab === "Projects" && (
            <ProjectsTab projects={projects} onChange={setProjects} />
          )}
          {activeTab === "Experience" && (
            <ExperienceTab experience={experience} onChange={setExperience} />
          )}
        </div>
      )}

      <div className={styles.publishBar}>
        <button className={styles.submitBtn} onClick={handlePublish} disabled={saving || initialLoading}>
          {saving ? "Publishing…" : "Publish All Changes"}
        </button>
        {status && (
          <div className={`${styles.statusMsg} ${styles["status" + status.type.charAt(0).toUpperCase() + status.type.slice(1)]}`}>
            {status.msg}
          </div>
        )}
      </div>

      <div className={styles.caveatBox}>
        <strong>Sync note:</strong> Changes go directly to <code>gh-pages</code>. Running{" "}
        <code>npm run deploy</code> will automatically pull the live config first (via the{" "}
        <code>predeploy</code> script), so <strong>your edits are preserved through deploys</strong>.
      </div>
    </div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const [pat, setPat] = useState("");
  const [githubUser, setGithubUser] = useState("");
  const [authed, setAuthed] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_pat");
    if (!stored) return;
    setVerifying(true);
    ghGet("/user", stored)
      .then((u) => { setPat(stored); setGithubUser(u.login); setAuthed(true); })
      .catch(() => { sessionStorage.removeItem("admin_pat"); })
      .finally(() => setVerifying(false));
  }, []);

  const handleAuth = (token, user) => {
    sessionStorage.setItem("admin_pat", token);
    setPat(token);
    setGithubUser(user);
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pat");
    setPat(""); setGithubUser(""); setAuthed(false);
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.panel} ${authed ? styles.panelWide : ""}`}>
        {verifying
          ? <p style={{ color: "#667788", textAlign: "center" }}>Checking session…</p>
          : authed
          ? <EditScreen pat={pat} githubUser={githubUser} onLogout={handleLogout} />
          : <AuthScreen onAuth={handleAuth} />}
      </div>
    </div>
  );
};

export default AdminPanel;
