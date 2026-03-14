// components/Monsters.js
window.renderMonsters = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'monsters-container fade-in';

    function generateId() {
        return 'mon_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
    }

    function rebuild() {
        appInstance.renderView('monsters');
    }

    // ── Add / Edit Monster modal ──────────────────────────────────
    function openMonsterForm(existing = null) {
        const isEdit = !!existing;
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:1.5rem;">${isEdit ? '✏️ Edit Monster' : '+ Add Monster'}</h2>
            <label>Name *</label>
            <input type="text" id="mn-name" value="${isEdit ? existing.name.replace(/"/g, '&quot;') : ''}" placeholder="Monster name" />
            <label>Image URL</label>
            <input type="url" id="mn-img" value="${isEdit ? (existing.imageUrl || '').replace(/"/g, '&quot;') : ''}" placeholder="https://... (optional)" />
            <label>Description</label>
            <textarea id="mn-desc" rows="4" placeholder="Describe the monster...">${isEdit ? (existing.description || '') : ''}</textarea>
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem;">
                <input type="checkbox" id="mn-boss" style="width:auto; margin:0; accent-color:var(--danger); transform:scale(1.3);" ${isEdit && existing.isBoss ? 'checked' : ''} />
                <label for="mn-boss" style="margin:0; cursor:pointer; text-transform:none; font-size:0.95rem; letter-spacing:0;">
                    👑 Boss Monster
                </label>
            </div>
            <div style="text-align:right;">
                <button id="mn-save" class="btn btn-primary">💾 Save</button>
            </div>
        `, (body) => {
            body.querySelector('#mn-save').addEventListener('click', async () => {
                const name = body.querySelector('#mn-name').value.trim();
                const imageUrl = body.querySelector('#mn-img').value.trim();
                const description = body.querySelector('#mn-desc').value.trim();
                const isBoss = body.querySelector('#mn-boss').checked;
                if (!name) { alert('Monster name is required.'); return; }

                const monster = isEdit
                    ? { ...existing, name, imageUrl, description, isBoss }
                    : { id: generateId(), name, imageUrl, description, isBoss };

                if (!isEdit) {
                    window.campaignData.monsters = window.campaignData.monsters || [];
                    window.campaignData.monsters.push(monster);
                } else {
                    const idx = window.campaignData.monsters.findIndex(m => m.id === existing.id);
                    if (idx !== -1) window.campaignData.monsters[idx] = monster;
                }
                await DB.save('monsters', monster);
                appInstance.closeModal();
                rebuild();
            });
        });
    }

    // ── View Monster Detail modal ─────────────────────────────────
    function openMonsterDetail(monster) {
        appInstance.openModal(`
            ${monster.imageUrl ? `
            <div style="text-align:center; margin-bottom:1.5rem;">
                <img src="${monster.imageUrl}" alt="${monster.name}"
                     style="max-width:100%; max-height:300px; width:auto; object-fit:contain; border-radius:var(--radius-md); border:2px solid var(--accent-gold);"
                     onerror="this.parentElement.style.display='none';" />
            </div>` : ''}
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap;">
                <h2 style="margin:0;">${monster.name}</h2>
                ${monster.isBoss ? `<span class="monster-boss-badge">👑 Boss</span>` : `<span class="monster-minion-badge">⚔️ Minion</span>`}
            </div>
            <p style="color:var(--text-muted); line-height:1.8; white-space:pre-wrap; font-size:0.95rem; text-align:left;">${(monster.description || 'No description recorded.').trim()}</p>
        `);
    }

    // ── Render ────────────────────────────────────────────────────
    const monsters = window.campaignData.monsters || [];

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Monsters</h2>
            <button id="add-monster-btn" class="btn btn-primary">👹 Add Monster</button>
        </div>

        ${monsters.length === 0
            ? `<div style="text-align:center; padding:4rem 0; color:var(--text-muted);">
                <div style="font-size:4rem; margin-bottom:1rem;">🐉</div>
                <p>No monsters recorded yet. Click <em>Add Monster</em> to begin.</p>
               </div>`
            : `<div class="grid-cards">
                ${monsters.map(m => `
                    <div class="card monster-card" data-id="${m.id}">
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            ${m.imageUrl
                                ? `<div style="flex:0 0 80px;">
                                    <img src="${m.imageUrl}" alt="${m.name}"
                                        style="width:80px; height:80px; object-fit:cover; border-radius:var(--radius-md); border:2px solid ${m.isBoss ? 'var(--danger)' : 'var(--panel-border)'};"
                                        onerror="this.parentElement.style.display='none';" />
                                   </div>`
                                : `<div style="flex:0 0 80px; width:80px; height:80px; display:flex; align-items:center; justify-content:center; font-size:2.5rem; background:var(--panel-border); border-radius:var(--radius-md);">
                                    ${m.isBoss ? '👑' : '⚔️'}
                                   </div>`
                            }
                            <div style="flex:1; min-width:0;">
                                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.3rem;">
                                    <h3 style="font-size:1.05rem; margin:0;">${m.name}</h3>
                                    ${m.isBoss ? `<span class="monster-boss-badge">👑 Boss</span>` : `<span class="monster-minion-badge">⚔️ Minion</span>`}
                                </div>
                                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">
                                    ${m.description || 'No description.'}
                                </p>
                            </div>
                        </div>
                        <div class="card-actions" style="margin-top:0.75rem;">
                            <button class="btn edit-monster-btn" data-id="${m.id}" title="Edit" style="padding:0.3rem 0.7rem; font-size:0.8rem; min-width:auto;">✏️ Edit</button>
                            <button class="btn delete-monster-btn" data-id="${m.id}" title="Delete" style="padding:0.3rem 0.7rem; font-size:0.8rem; min-width:auto; background:var(--danger); border-color:var(--danger); color:#fff;">🗑️ Delete</button>
                        </div>
                    </div>
                `).join('')}
               </div>`
        }
    `;

    container.querySelector('#add-monster-btn').addEventListener('click', () => openMonsterForm());

    // Card click → detail modal
    container.querySelectorAll('.monster-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.edit-monster-btn') || e.target.closest('.delete-monster-btn')) return;
            const id = card.dataset.id;
            const monster = (window.campaignData.monsters || []).find(m => m.id === id);
            if (monster) openMonsterDetail(monster);
        });
    });

    container.querySelectorAll('.edit-monster-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const monster = (window.campaignData.monsters || []).find(m => m.id === id);
            if (monster) openMonsterForm(monster);
        });
    });

    container.querySelectorAll('.delete-monster-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!confirm(`Delete "${btn.closest('.monster-card').querySelector('h3').textContent}"?`)) return;
            const id = btn.dataset.id;
            window.campaignData.monsters = (window.campaignData.monsters || []).filter(m => m.id !== id);
            await DB.delete('monsters', id);
            rebuild();
        });
    });

    return container;
};
