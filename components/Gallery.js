// components/Gallery.js
window.renderGallery = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'gallery-container fade-in';

    function generateId() {
        return 'gal_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
    }

    function rebuild() {
        appInstance.renderView('gallery');
    }

    // ── Open "Add / Edit Artwork" modal ──────────────────────────
    function openArtForm(existing = null) {
        const isEdit = !!existing;
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:1.5rem;">${isEdit ? '✏️ Edit Artwork' : '🖼️ Add Artwork'}</h2>
            <label>Title *</label>
            <input type="text" id="ga-title" value="${isEdit ? existing.title.replace(/"/g, '&quot;') : ''}" placeholder="Artwork title" />
            <label>Artist Name *</label>
            <input type="text" id="ga-artist" value="${isEdit ? (existing.artistName || '').replace(/"/g, '&quot;') : ''}" placeholder="Who made this?" />
            <label>Image URL *</label>
            <input type="url" id="ga-url" value="${isEdit ? (existing.imageUrl || '').replace(/"/g, '&quot;') : ''}" placeholder="https://..." />
            <label>Description <span style="font-size:0.75rem; color:var(--text-muted); text-transform:none;">(optional)</span></label>
            <textarea id="ga-desc" rows="3" placeholder="Brief description...">${isEdit ? (existing.description || '') : ''}</textarea>
            <div style="text-align:right; margin-top:0.5rem;">
                <button id="ga-save" class="btn btn-primary">💾 Save</button>
            </div>
        `, (body) => {
            body.querySelector('#ga-save').addEventListener('click', async () => {
                const title = body.querySelector('#ga-title').value.trim();
                const artistName = body.querySelector('#ga-artist').value.trim();
                const imageUrl = body.querySelector('#ga-url').value.trim();
                const description = body.querySelector('#ga-desc').value.trim();
                if (!title || !artistName || !imageUrl) {
                    alert('Title, artist name and image URL are required.');
                    return;
                }
                const artwork = isEdit
                    ? { ...existing, title, artistName, imageUrl, description }
                    : { id: generateId(), title, artistName, imageUrl, description };

                if (!isEdit) {
                    window.campaignData.gallery_art = window.campaignData.gallery_art || [];
                    window.campaignData.gallery_art.push(artwork);
                } else {
                    const idx = window.campaignData.gallery_art.findIndex(a => a.id === existing.id);
                    if (idx !== -1) window.campaignData.gallery_art[idx] = artwork;
                }
                await DB.save('gallery_art', artwork);
                appInstance.closeModal();
                rebuild();
            });
        });
    }

    // ── Open "Add / Edit Story" modal ────────────────────────────
    function openWritingForm(existing = null) {
        const isEdit = !!existing;
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:1.5rem;">${isEdit ? '✏️ Edit Story' : '📖 Add Written Work'}</h2>
            <label>Title *</label>
            <input type="text" id="gw-title" value="${isEdit ? existing.title.replace(/"/g, '&quot;') : ''}" placeholder="Story title" />
            <label>Author Name *</label>
            <input type="text" id="gw-author" value="${isEdit ? (existing.authorName || '').replace(/"/g, '&quot;') : ''}" placeholder="Who wrote this?" />
            <label>Story Text * <span style="font-size:0.75rem; color:var(--text-muted); text-transform:none;">(Markdown supported: **bold**, *italic*, headers, etc.)</span></label>
            <textarea id="gw-text" rows="10" placeholder="Write the story here...">${isEdit ? (existing.storyText || '') : ''}</textarea>
            <div style="text-align:right; margin-top:0.5rem;">
                <button id="gw-save" class="btn btn-primary">💾 Save</button>
            </div>
        `, (body) => {
            body.querySelector('#gw-save').addEventListener('click', async () => {
                const title = body.querySelector('#gw-title').value.trim();
                const authorName = body.querySelector('#gw-author').value.trim();
                const storyText = body.querySelector('#gw-text').value.trim();
                if (!title || !authorName || !storyText) {
                    alert('Title, author and story text are required.');
                    return;
                }
                const writing = isEdit
                    ? { ...existing, title, authorName, storyText }
                    : { id: generateId(), title, authorName, storyText };

                if (!isEdit) {
                    window.campaignData.gallery_writing = window.campaignData.gallery_writing || [];
                    window.campaignData.gallery_writing.push(writing);
                } else {
                    const idx = window.campaignData.gallery_writing.findIndex(w => w.id === existing.id);
                    if (idx !== -1) window.campaignData.gallery_writing[idx] = writing;
                }
                await DB.save('gallery_writing', writing);
                appInstance.closeModal();
                rebuild();
            });
        });
    }

    // ── Open "View Full Artwork" modal ──────────────────────────────────
    function openArtViewModal(art) {
        appInstance.openModal(`
            <div style="text-align:center; margin-bottom:1rem;">
                <img src="${art.imageUrl}" alt="${art.title}"
                     style="max-width:100%; max-height:65vh; object-fit:contain; border-radius:var(--radius-md); border:2px solid var(--accent-gold);"
                     onerror="this.parentElement.innerHTML='<p class=text-muted>Image could not be loaded.</p>';" />
            </div>
            <h3 style="text-align:center; margin-bottom:0.3rem;">${art.title}</h3>
            <p style="text-align:center; color:var(--text-muted); font-size:0.9rem; margin-bottom:${art.description ? '0.75rem' : '0'};">by ${art.artistName}</p>
            ${art.description ? `<p style="text-align:center; font-size:0.9rem; color:var(--text-main); line-height:1.6;">${art.description}</p>` : ''}
        `);
    }

    // ── Open "Read Story" modal ───────────────────────────────────────
    function openReadingModal(writing) {
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:0.5rem;">${writing.title}</h2>
            <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1.5rem; font-style:italic;">
                By ${writing.authorName}
            </p>
            <div class="gallery-story-content" style="line-height:1.8; font-size:0.97rem; color:var(--text-main);">
                ${typeof marked !== 'undefined' ? marked.parse(writing.storyText || '') : (writing.storyText || '').replace(/\n/g, '<br>')}
            </div>
        `);
    }

    // ── Render ────────────────────────────────────────────────────
    const artworks = window.campaignData.gallery_art || [];
    const writings = window.campaignData.gallery_writing || [];

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Gallery</h2>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                <button id="add-art-btn" class="btn btn-primary">🖼️ Add Artwork</button>
                <button id="add-story-btn" class="btn btn-primary">📖 Add Story</button>
            </div>
        </div>

        <!-- Art Section -->
        <div style="margin-bottom:2.5rem;">
            <h3 class="gallery-section-title bg-header" style="margin-bottom:1.25rem; font-size:1.4rem; letter-spacing:1.5px;">🎨 Artwork</h3>
            ${artworks.length === 0
                ? `<p class="text-muted" style="text-align:center; padding:2rem 0;">No artwork yet. Click <em>Add Artwork</em> to begin.</p>`
                : `<div class="gallery-art-grid">
                    ${artworks.map(art => `
                        <div class="card gallery-art-card" data-id="${art.id}" title="Click to view">
                            <div class="gallery-art-img-wrap">
                                <img src="${art.imageUrl || ''}" alt="${art.title}" onerror="this.src=''; this.parentElement.style.background='var(--panel-border)';" />
                                <div class="gallery-art-zoom-hint">🔍 View</div>
                            </div>
                            <div class="gallery-art-body">
                                <h4 style="margin-bottom:0.25rem; font-size:1rem;">${art.title}</h4>
                                <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:0.5rem;">by ${art.artistName}</p>
                                ${art.description ? `<p style="font-size:0.85rem; color:var(--text-main); line-height:1.5;">${art.description}</p>` : ''}
                            </div>
                            <div class="card-actions">
                                <button class="btn edit-art-btn" data-id="${art.id}" title="Edit" style="padding:0.3rem 0.6rem; font-size:0.8rem; min-width:auto;">✏️ Edit</button>
                                <button class="btn delete-art-btn" data-id="${art.id}" title="Delete" style="padding:0.3rem 0.6rem; font-size:0.8rem; min-width:auto; background:var(--danger); border-color:var(--danger); color:#fff;">🗑️ Delete</button>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>

        <!-- Writing Section -->
        <div>
            <h3 class="gallery-section-title bg-header" style="margin-bottom:1.25rem; font-size:1.4rem; letter-spacing:1.5px;">📜 Written Works</h3>
            ${writings.length === 0
                ? `<p class="text-muted" style="text-align:center; padding:2rem 0;">No written works yet. Click <em>Add Story</em> to begin.</p>`
                : `<div class="gallery-writing-grid">
                    ${writings.map(w => `
                        <div class="card gallery-writing-card" data-id="${w.id}" title="Click to read">
                            <div class="gallery-writing-inner">
                                <div class="gallery-writing-icon">📜</div>
                                <h4 style="font-size:1.05rem; text-align:center; line-height:1.4;">${w.title}</h4>
                                <p style="font-size:0.78rem; color:var(--text-muted); text-align:center; margin-top:0.3rem;">by ${w.authorName}</p>
                            </div>
                            <div class="card-actions">
                                <button class="btn edit-writing-btn" data-id="${w.id}" title="Edit" style="padding:0.3rem 0.6rem; font-size:0.8rem; min-width:auto;">✏️</button>
                                <button class="btn delete-writing-btn" data-id="${w.id}" title="Delete" style="padding:0.3rem 0.6rem; font-size:0.8rem; min-width:auto; background:var(--danger); border-color:var(--danger); color:#fff;">🗑️</button>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        </div>
    `;

    // ── Button listeners ──────────────────────────────────────────
    container.querySelector('#add-art-btn').addEventListener('click', () => openArtForm());
    container.querySelector('#add-story-btn').addEventListener('click', () => openWritingForm());

    // Art: click card to view full image
    container.querySelectorAll('.gallery-art-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.edit-art-btn') || e.target.closest('.delete-art-btn')) return;
            const id = card.dataset.id;
            const art = (window.campaignData.gallery_art || []).find(a => a.id === id);
            if (art) openArtViewModal(art);
        });
    });

    // Art: edit / delete
    container.querySelectorAll('.edit-art-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const art = (window.campaignData.gallery_art || []).find(a => a.id === id);
            if (art) openArtForm(art);
        });
    });
    container.querySelectorAll('.delete-art-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!confirm('Delete this artwork?')) return;
            const id = btn.dataset.id;
            window.campaignData.gallery_art = (window.campaignData.gallery_art || []).filter(a => a.id !== id);
            await DB.delete('gallery_art', id);
            rebuild();
        });
    });

    // Writing: read (card click) / edit / delete
    container.querySelectorAll('.gallery-writing-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.edit-writing-btn') || e.target.closest('.delete-writing-btn')) return;
            const id = card.dataset.id;
            const writing = (window.campaignData.gallery_writing || []).find(w => w.id === id);
            if (writing) openReadingModal(writing);
        });
    });
    container.querySelectorAll('.edit-writing-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const writing = (window.campaignData.gallery_writing || []).find(w => w.id === id);
            if (writing) openWritingForm(writing);
        });
    });
    container.querySelectorAll('.delete-writing-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!confirm('Delete this written work?')) return;
            const id = btn.dataset.id;
            window.campaignData.gallery_writing = (window.campaignData.gallery_writing || []).filter(w => w.id !== id);
            await DB.delete('gallery_writing', id);
            rebuild();
        });
    });

    return container;
};
