import React, { useState, useEffect } from "react";
import styles from "../../styles/AdminPanel.module.css";

const REPO_OWNER = "kahan6826conestoga";
const REPO_NAME = "kahan6826conestoga.github.io";
const BRANCH = "gh-pages";
const CONFIG_PATH = "config.json";

const API = "https://api.github.com";

async function ghGet(path, token) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error ${res.status}`);
  }
  return res.json();
}

async function ghPut(path, token, body) {
  const res = await fetch(`${API}${path}`, {
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
    throw new Error(err.message || `GitHub API error ${res.status}`);
  }
  return res.json();
}

async function uploadFileToBranch(token, filePath, base64Content, message, existingSha) {
  const body = {
    message,
    content: base64Content,
    branch: BRANCH,
  };
  if (existingSha) body.sha = existingSha;
  return ghPut(
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
    token,
    body
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Auth Screen ──────────────────────────────────────────────────────────────
const AuthScreen = ({ onAuth }) => {
  const [pat, setPat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!pat.trim()) return;
    setLoading(true);
    setError("");
    try {
      const user = await ghGet("/user", pat.trim());
      sessionStorage.setItem("admin_pat", pat.trim());
      onAuth(pat.trim(), user.login);
    } catch (err) {
      setError("Authentication failed. Check your PAT and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <div className={styles.logo}>
        <span className={styles.lockIcon}>🔐</span>
        <h1 className={styles.panelTitle}>Portfolio Admin</h1>
      </div>
      <p className={styles.panelSubtitle}>
        Enter your GitHub Personal Access Token (PAT) with <strong>repo</strong> scope to manage your portfolio content.
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
          Generate at GitHub → Settings → Developer settings → Personal access tokens (Classic). Needs <code>repo</code> scope. Stored in sessionStorage — cleared on tab close.
        </p>
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading || !pat.trim()}>
        {loading ? "Verifying…" : "Sign in"}
      </button>

      {error && <div className={`${styles.statusMsg} ${styles.statusError}`}>{error}</div>}
    </form>
  );
};

// ── Edit Screen ───────────────────────────────────────────────────────────────
const EditScreen = ({ pat, githubUser, onLogout }) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [statusLine, setStatusLine] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [status, setStatus] = useState(null); // {type, msg}
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Load current config from gh-pages branch
    ghGet(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_PATH}?ref=${BRANCH}`,
      pat
    )
      .then((data) => {
        const json = JSON.parse(atob(data.content.replace(/\n/g, "")));
        setResumeUrl(json.resumeUrl || "");
        setStatusLine(json.statusLine || "");
        setProfilePicUrl(json.profilePicUrl || "");
      })
      .catch(() => {
        // File may not exist yet on gh-pages, use defaults from public/config.json
        fetch("/config.json")
          .then((r) => r.json())
          .then((json) => {
            setResumeUrl(json.resumeUrl || "");
            setStatusLine(json.statusLine || "");
            setProfilePicUrl(json.profilePicUrl || "");
          })
          .catch(() => {});
      })
      .finally(() => setInitialLoading(false));
  }, [pat]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "info", msg: "Saving changes to GitHub…" });

    try {
      let finalProfilePicUrl = profilePicUrl;

      // If a file was selected, upload it to gh-pages as profile-pic.jpg
      if (profilePicFile) {
        setStatus({ type: "info", msg: "Uploading profile picture…" });
        const b64 = await fileToBase64(profilePicFile);
        const ext = profilePicFile.name.split(".").pop().toLowerCase();
        const picPath = `assets/profile-pic.${ext}`;

        // Check if file exists to get SHA
        let existingSha;
        try {
          const existing = await ghGet(
            `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${picPath}?ref=${BRANCH}`,
            pat
          );
          existingSha = existing.sha;
        } catch (_) {}

        await uploadFileToBranch(pat, picPath, b64, "Update profile picture", existingSha);
        finalProfilePicUrl = `https://${REPO_OWNER.replace("conestoga", "")}.github.io/${picPath}?t=${Date.now()}`;
        // Use the custom domain if set
        finalProfilePicUrl = `/assets/profile-pic.${ext}?t=${Date.now()}`;
      }

      // Build new config
      const newConfig = {
        resumeUrl,
        statusLine,
        profilePicUrl: finalProfilePicUrl,
      };
      const newConfigB64 = btoa(unescape(encodeURIComponent(JSON.stringify(newConfig, null, 2))));

      // Get current config SHA for update
      let configSha;
      try {
        const existing = await ghGet(
          `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONFIG_PATH}?ref=${BRANCH}`,
          pat
        );
        configSha = existing.sha;
      } catch (_) {}

      setStatus({ type: "info", msg: "Updating config.json on gh-pages…" });
      await uploadFileToBranch(pat, CONFIG_PATH, newConfigB64, "Update portfolio config", configSha);

      setStatus({
        type: "success",
        msg: "✓ Changes saved! The live site will reflect updates within a few seconds. Reload the site to verify.",
      });
      setProfilePicFile(null);
    } catch (err) {
      setStatus({ type: "error", msg: `Error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className={styles.loggedInHeader}>
        <div>
          <h1 className={styles.panelTitle}>Portfolio Admin</h1>
          <span className={styles.userBadge}>✓ Signed in as {githubUser}</span>
        </div>
        <button type="button" className={styles.logoutBtn} onClick={onLogout}>
          Sign out
        </button>
      </div>

      {initialLoading ? (
        <p style={{ color: "#667788", fontSize: 14 }}>Loading current config…</p>
      ) : (
        <>
          {/* Resume URL */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Resume URL</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://drive.google.com/file/d/..."
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
            <p className={styles.helpText}>
              Google Drive share link or any direct PDF URL. This is what the "Resume" button in the navbar opens.
            </p>
          </div>

          {/* Status line */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Hero Status Line</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Seeking full-time entry-level software engineering positions"
              value={statusLine}
              onChange={(e) => setStatusLine(e.target.value)}
            />
            <p className={styles.helpText}>
              Shown below your name on the landing hero section.
            </p>
          </div>

          <hr className={styles.divider} />

          {/* Profile pic — URL */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Profile Picture URL</label>
            <input
              type="url"
              className={styles.input}
              placeholder="https://... (leave blank to use uploaded file)"
              value={profilePicUrl}
              onChange={(e) => { setProfilePicUrl(e.target.value); setProfilePicFile(null); }}
            />
          </div>

          <p className={styles.orText}>— or upload a file —</p>

          {/* Profile pic — file upload */}
          <div className={styles.formGroup}>
            <div className={styles.fileInputWrap}>
              <label className={styles.fileInputLabel}>
                📷 Choose image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={styles.fileInputHidden}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setProfilePicFile(e.target.files[0]);
                      setProfilePicUrl("");
                    }
                  }}
                />
              </label>
              {profilePicFile && (
                <span className={styles.fileName}>{profilePicFile.name}</span>
              )}
            </div>
            <p className={styles.helpText}>
              Upload directly to the gh-pages branch. JPG/PNG/WebP, max ~5MB.
            </p>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Saving…" : "Save & Publish"}
          </button>

          {status && (
            <div className={`${styles.statusMsg} ${styles["status" + status.type.charAt(0).toUpperCase() + status.type.slice(1)]}`}>
              {status.msg}
            </div>
          )}

          <div className={styles.caveatBox}>
            <strong>Note:</strong> Changes are written directly to the <code>gh-pages</code> branch and are live immediately. If you run <code>npm run deploy</code> later, those changes may be overwritten by the build — re-save via this panel after deploying.
          </div>
        </>
      )}
    </form>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const [pat, setPat] = useState(() => sessionStorage.getItem("admin_pat") || "");
  const [githubUser, setGithubUser] = useState(() => sessionStorage.getItem("admin_user") || "");
  const [authed, setAuthed] = useState(false);
  const [verifying, setVerifying] = useState(!!sessionStorage.getItem("admin_pat"));

  useEffect(() => {
    const storedPat = sessionStorage.getItem("admin_pat");
    if (!storedPat) return;
    // Re-verify stored PAT silently
    ghGet("/user", storedPat)
      .then((user) => {
        setPat(storedPat);
        setGithubUser(user.login);
        setAuthed(true);
      })
      .catch(() => {
        sessionStorage.removeItem("admin_pat");
        sessionStorage.removeItem("admin_user");
      })
      .finally(() => setVerifying(false));
  }, []);

  const handleAuth = (token, user) => {
    setPat(token);
    setGithubUser(user);
    sessionStorage.setItem("admin_pat", token);
    sessionStorage.setItem("admin_user", user);
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pat");
    sessionStorage.removeItem("admin_user");
    setPat("");
    setGithubUser("");
    setAuthed(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        {verifying ? (
          <p style={{ color: "#667788", fontSize: 14, textAlign: "center" }}>Checking session…</p>
        ) : authed ? (
          <EditScreen pat={pat} githubUser={githubUser} onLogout={handleLogout} />
        ) : (
          <AuthScreen onAuth={handleAuth} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
