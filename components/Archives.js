// components/Archives.js
window.renderArchives = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'archives-container fade-in';

    // Same ID generation as Gallery
    function generateId() {
        return 'doc_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
    }

    function rebuild() {
        appInstance.renderView('archives');
    }

    // ── Open "Add / Edit Document" modal ──────────────────────────
    function openDocumentForm(existing = null) {
        const isEdit = !!existing;
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:1.5rem;">${isEdit ? '✏️ Edit Document' : '📜 Add Document'}</h2>
            <label>Title *</label>
            <input type="text" id="doc-title" value="${isEdit ? existing.title.replace(/"/g, '&quot;') : ''}" placeholder="E.g., Letter from Astri" />
            
            <label>Author / Source</label>
            <input type="text" id="doc-author" value="${isEdit ? (existing.author || '').replace(/"/g, '&quot;') : ''}" placeholder="Who wrote it or where was it found?" />
            
            <label>Date Found</label>
            <input type="text" id="doc-date" value="${isEdit ? (existing.dateFound || '').replace(/"/g, '&quot;') : ''}" placeholder="E.g., Session 12, or 14th of Kythorn" />
            
            <label>Content * <span style="font-size:0.75rem; color:var(--text-muted); text-transform:none;">(Markdown supported)</span></label>
            <textarea id="doc-content" rows="12" placeholder="Write the contents of the document here...">${isEdit ? (existing.content || '') : ''}</textarea>
            
            <div style="text-align:right; margin-top:0.5rem;">
                <button id="doc-save" class="btn btn-primary">💾 Save</button>
            </div>
        `, (body) => {
            body.querySelector('#doc-save').addEventListener('click', async () => {
                const title = body.querySelector('#doc-title').value.trim();
                const author = body.querySelector('#doc-author').value.trim();
                const dateFound = body.querySelector('#doc-date').value.trim();
                const content = body.querySelector('#doc-content').value.trim();
                
                if (!title || !content) {
                    alert('Title and Content are required.');
                    return;
                }
                
                const doc = isEdit
                    ? { ...existing, title, author, dateFound, content }
                    : { id: generateId(), title, author, dateFound, content };

                if (!isEdit) {
                    window.campaignData.documents = window.campaignData.documents || [];
                    window.campaignData.documents.unshift(doc);
                } else {
                    const idx = window.campaignData.documents.findIndex(d => d.id === existing.id);
                    if (idx !== -1) window.campaignData.documents[idx] = doc;
                }
                
                await DB.save('documents', doc);
                appInstance.closeModal();
                rebuild();
            });
        });
    }

    // ── Open "Read Document" modal ───────────────────────────────────────
    function openReadingModal(doc) {
        appInstance.openModal(`
            <div style="max-width: 800px; margin: 0 auto;">
                <h2 class="text-gold" style="margin-bottom:0.25rem;">${doc.title}</h2>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--panel-border); padding-bottom: 0.5rem;">
                    <p style="color:var(--text-muted); font-size:0.85rem; font-style:italic; margin: 0;">
                        ${doc.author ? `By ${doc.author}` : 'Unknown Author'}
                    </p>
                    <p style="color:var(--text-muted); font-size:0.85rem; margin: 0;">
                        ${doc.dateFound ? `Found: ${doc.dateFound}` : ''}
                    </p>
                </div>
                <div class="document-content paper-background" style="line-height:1.8; font-size:1.05rem; color:var(--text-main); padding: 1rem 0;">
                    ${typeof marked !== 'undefined' ? marked.parse(doc.content || '') : (doc.content || '').replace(/\n/g, '<br>')}
                </div>
            </div>
        `);
    }

    // ── Render ────────────────────────────────────────────────────
    const documentsList = window.campaignData.documents || [];

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Archives</h2>
            <button id="add-doc-btn" class="btn btn-primary">📜 Add Document</button>
        </div>

        <p class="bg-header" style="margin-bottom: 2rem;">
            A collection of letters, research papers, journals, and mysterious notes discovered throughout the campaign.
        </p>

        ${documentsList.length === 0
            ? `<div style="text-align:center; padding:3rem; background:var(--panel-bg); border:1px solid var(--panel-border); border-radius:var(--radius-lg);">
                <p class="text-muted" style="font-size: 1.1rem; margin-bottom: 1rem;">The archives are empty.</p>
                <p class="text-muted" style="font-size: 0.9rem;">Click <em>Add Document</em> to record your first found note, letter, or lore piece.</p>
               </div>`
            : `<div class="archives-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:1.5rem;">
                ${documentsList.map(doc => `
                    <div class="card document-card" data-id="${doc.id}" title="Click to read" style="cursor:pointer; position:relative; overflow:hidden; display:flex; flex-direction:column; min-height: 140px; border-top: 3px solid var(--accent-gold); transition: transform 0.2s ease;">
                        <div class="document-inner" style="flex:1; padding: 1rem;">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                                <h4 style="font-size:1.15rem; line-height:1.3; margin:0; color:var(--text-main); padding-right: 2rem;">${doc.title}</h4>
                                <div style="font-size:1.5rem; opacity:0.6; position:absolute; top:1rem; right:1rem;">📜</div>
                            </div>
                            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.25rem;">
                                ${doc.author ? `By ${doc.author}` : 'Unknown Author'}
                            </p>
                            ${doc.dateFound ? `<p style="font-size:0.75rem; color:var(--text-muted); opacity:0.8; margin-top:0.5rem;">🔍 ${doc.dateFound}</p>` : ''}
                        </div>
                        <div class="card-actions" style="margin-top:auto; padding-top: 0.5rem; border-top:1px solid var(--panel-border);">
                            <button class="btn edit-doc-btn" data-id="${doc.id}" title="Edit" style="padding:0.3rem 0.6rem; font-size:0.8rem; min-width:auto;">✏️ Edit</button>
                            <button class="btn delete-doc-btn" data-id="${doc.id}" title="Delete" style="padding:0.3rem 0.6rem; font-size:0.8rem; min-width:auto; background:var(--danger); border-color:var(--danger); color:#fff;">🗑️ Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>`
        }
    `;

    // Add some styling inline for the hover effects (can be moved to styles.css later)
    const style = document.createElement('style');
    style.textContent = `
        .document-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.2), 0 0 10px rgba(212, 175, 55, 0.1);
            border-top-color: #fce899 !important;
        }
        .paper-background {
            background-color: var(--panel-bg);
            border-radius: var(--radius-md);
            padding: 1.5rem !important;
        }
    `;
    container.appendChild(style);

    // ── Button listeners ──────────────────────────────────────────
    const addBtn = container.querySelector('#add-doc-btn');
    if (addBtn) addBtn.addEventListener('click', () => openDocumentForm());

    // Reading (card click) / edit / delete
    container.querySelectorAll('.document-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.edit-doc-btn') || e.target.closest('.delete-doc-btn')) return;
            const id = card.dataset.id;
            const doc = (window.campaignData.documents || []).find(d => d.id === id);
            if (doc) openReadingModal(doc);
        });
    });

    container.querySelectorAll('.edit-doc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const doc = (window.campaignData.documents || []).find(d => d.id === id);
            if (doc) openDocumentForm(doc);
        });
    });

    container.querySelectorAll('.delete-doc-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!confirm('Delete this document?')) return;
            const id = btn.dataset.id;
            window.campaignData.documents = (window.campaignData.documents || []).filter(d => d.id !== id);
            await DB.delete('documents', id);
            rebuild();
        });
    });

    return container;
};
