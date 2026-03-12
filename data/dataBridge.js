/**
 * dataBridge.js
 * Handles all communication between the frontend and api.php.
 * Usage:
 *   await DB.load('quests')        → returns array from DB
 *   await DB.save('quests', obj)   → upserts a single object
 *   await DB.delete('quests', id)  → deletes by id
 */
window.DB = (() => {
    const API = 'api.php';

    async function load(entity) {
        if (window.location.protocol === 'file:') {
            alert("CRITICAL ERROR: You opened index.html directly from your folders. PHP cannot run this way! Please move the folder into XAMPP's 'htdocs' folder and open it in your browser via 'http://localhost/Sins-Of-The-Shattered/index.html'");
            return null;
        }
        try {
            const res = await fetch(`${API}?entity=${entity}`);
            const text = await res.text();
            
            // Check if Apache failed to parse PHP and returned raw code
            if (text.trim().startsWith('<?php')) {
                alert("CRITICAL ERROR: PHP is not running! Your web server is returning raw PHP code instead of executing it. Make sure Apache is running in XAMPP and you are accessing the site via localhost.");
                return null;
            }
            
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
            return JSON.parse(text);
        } catch (err) {
            console.warn(`[DB] load('${entity}') failed:`, err);
            return null; // caller handles fallback
        }
    }

    async function save(entity, obj) {
        try {
            const res = await fetch(`${API}?entity=${entity}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            });
            if (!res.ok) {
                const err = await res.json();
                console.error(`[DB] save('${entity}') error:`, err);
            }
        } catch (err) {
            console.warn(`[DB] save('${entity}') failed:`, err);
        }
    }

    async function del(entity, id) {
        try {
            const res = await fetch(`${API}?entity=${entity}&id=${encodeURIComponent(id)}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                const err = await res.json();
                console.error(`[DB] delete('${entity}', '${id}') error:`, err);
            }
        } catch (err) {
            console.warn(`[DB] delete('${entity}', '${id}') failed:`, err);
        }
    }

    return { load, save, delete: del };
})();
