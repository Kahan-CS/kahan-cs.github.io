/**
 * Runs before every `npm run deploy`.
 * Fetches the latest config.json (and profile pic if present) from the live
 * gh-pages branch so that a fresh deploy never overwrites admin-panel changes.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const RAW_BASE =
  "https://raw.githubusercontent.com/kahan6826conestoga/kahan6826conestoga.github.io/gh-pages";

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function fetchBuffer(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume(); // drain so the socket closes — without this Node hangs
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("Request timed out"));
    });
  });
}

async function syncConfig() {
  try {
    const buf = await fetchBuffer(`${RAW_BASE}/config.json`);
    JSON.parse(buf.toString()); // validate — throws if malformed
    fs.writeFileSync(path.join(PUBLIC_DIR, "config.json"), buf);
    console.log("✓ Synced config.json from gh-pages");
  } catch (e) {
    console.log(`⚠  Could not sync config.json (${e.message}) — using existing public/config.json`);
  }
}

async function syncProfilePic() {
  // Try common extensions in order
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    try {
      const buf = await fetchBuffer(`${RAW_BASE}/profile-pic.${ext}`);
      // Remove stale pics with other extensions first
      for (const other of ["jpg", "jpeg", "png", "webp"]) {
        const stale = path.join(PUBLIC_DIR, `profile-pic.${other}`);
        if (other !== ext && fs.existsSync(stale)) fs.unlinkSync(stale);
      }
      fs.writeFileSync(path.join(PUBLIC_DIR, `profile-pic.${ext}`), buf);
      console.log(`✓ Synced profile-pic.${ext} from gh-pages`);
      return;
    } catch (_) {
      // try next extension
    }
  }
  console.log("⚠  No profile-pic found on gh-pages — using existing public/profile-pic.*");
}

(async () => {
  await syncConfig();
  await syncProfilePic();
})();
