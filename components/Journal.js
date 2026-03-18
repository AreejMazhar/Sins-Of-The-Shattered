window.renderJournal = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'journal-container fade-in';

    // Sort history by sessionNumber descending (highest first)
    const sortedHistory = [...(data.history || [])].sort((a, b) => (b.sessionNumber || 0) - (a.sessionNumber || 0));

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Session Journal</h2>
            <button class="btn" id="new-entry-btn" style="background:var(--accent-gold); color:#fff;">+ New Entry</button>
        </div>
        
        <div style="max-width:800px; margin:0 auto; padding-left:20px; border-left:2px solid #e2d8f0; position:relative;">
            ${sortedHistory.map((entry) => `
                <div class="journal-entry" style="position:relative; margin-bottom:3rem;">
                    <!-- Timeline Dot -->
                    <div style="position:absolute; left:-29px; top:5px; width:15px; height:15px; border-radius:50%; background:var(--bg-dark); border:3px solid #e2d8f0; box-shadow:0 0 10px var(--accent-glow);"></div>
                    
                    <div class="card journal-card" data-id="${entry.id}" style="padding:2rem; cursor:pointer; transition:border-color 0.2s;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div>
                                <span class="text-gold" style="font-family:var(--font-heading); font-size:1.5rem; display:block; margin-bottom:0.25rem;">${entry.title}</span>
                                <span style="color:var(--text-muted); font-size:0.9rem; display:block; margin-bottom:1rem;">Recorded on ${entry.date_display || entry.date || 'Unknown'}</span>
                            </div>
                            <div style="display:flex; gap:0.5rem; flex-shrink:0;">
                                <button class="btn edit-journal-btn" data-id="${entry.id}" style="font-size:0.8rem; padding:0.3rem 0.6rem;">✏️ Edit</button>
                                <button class="btn delete-journal-btn" data-id="${entry.id}" style="font-size:0.8rem; padding:0.3rem 0.6rem; background:var(--danger);">🗑️</button>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-gold" style="margin-bottom:0.5rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Session Summary</h4>
                            <p style="color:var(--text-muted); line-height:1.6; margin-bottom:0.75rem;">${entry.summary || 'No summary recorded.'}</p>
                            <p style="font-size:0.8rem; color:var(--accent-gold); opacity:0.7;">📖 Click to read full notes</p>
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <div style="position:relative;">
                <div style="position:absolute; left:-29px; top:0; width:15px; height:15px; border-radius:50%; background:var(--bg-dark); border:2px solid var(--text-muted);"></div>
                <div class="bg-text" style="padding-left:1.5rem; font-style:italic;">Beginning of the Campaign</div>
            </div>
        </div>
    `;

    // --- Click to open full notes modal ---
    container.querySelectorAll('.journal-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if edit/delete button was clicked
            if (e.target.closest('.edit-journal-btn') || e.target.closest('.delete-journal-btn')) return;

            const id = card.dataset.id;
            const entry = data.history.find(h => h.id === id);
            if (!entry) return;

            appInstance.openModal(`
                <div style="border-bottom:1px solid var(--panel-border); padding-bottom:1rem; margin-bottom:1.5rem;">
                    <h2 style="color:var(--accent-gold); font-size:2rem; margin-bottom:0.25rem;">${entry.title}</h2>
                    <span style="color:var(--text-muted); font-size:0.9rem;">Recorded on ${entry.date_display || entry.date || 'Unknown'}</span>
                </div>

                <div style="margin-bottom:1.5rem; padding-bottom:1.5rem; border-bottom:1px solid var(--panel-border);">
                    <h4 class="text-gold" style="margin-bottom:0.5rem;">Session Summary</h4>
                    <p style="color:var(--text-muted); line-height:1.7;">${entry.summary || 'No summary recorded.'}</p>
                </div>

                <div>
                    <h4 class="text-gold" style="margin-bottom:0.5rem;">Full Notes</h4>
                    <div style="color:var(--text-muted); line-height:1.8; max-height:50vh; overflow-y:auto; padding-right:0.5rem;">
                        ${entry.content || "<p class='text-muted' style='font-style:italic;'>No additional notes recorded.</p>"}
                    </div>
                </div>
            `);
        });
    });

    // --- New Entry Button ---
        container.querySelector('#new-entry-btn').addEventListener('click', () => {
            const todayFormatted = new Date().toISOString().split('T')[0]; // YYYY-MM-DD for date input
            appInstance.openModal(`
                <h2 class="text-gold" style="margin-bottom:1.5rem;">📜 New Session Entry</h2>
                <div style="display:flex; gap:1rem;">
                    <div style="flex:1;">
                        <label>Session Number</label>
                        <input type="number" id="sj-number" placeholder="e.g. 12" min="1" />
                    </div>
                    <div style="flex:2;">
                        <label>Session Name / Title</label>
                        <input type="text" id="sj-title" placeholder="e.g. The Siege of Graymoor" />
                    </div>
                </div>

                <label>Date</label>
                <input type="date" id="sj-date" value="${todayFormatted}" />

                <label>Session Summary / Recap</label>
                <textarea id="sj-summary" rows="3" placeholder="A brief summary of what happened (shows on Dashboard)..."></textarea>

                <label>Full Session Notes / Details</label>
                <textarea id="sj-content" rows="6" placeholder="Detailed notes, key moments, dialogue, decisions made..."></textarea>

                <div style="text-align:right; margin-top:1rem;">
                    <button id="save-sj-btn" class="btn" style="background:var(--accent-gold); color:#fff;">Save Session</button>
                </div>
            `, (modalBody) => {
                modalBody.querySelector('#save-sj-btn').addEventListener('click', () => {
                    const num = parseInt(modalBody.querySelector('#sj-number').value) || 0;
                    const titleInput = modalBody.querySelector('#sj-title').value || 'Untitled Session';
                    const rawDate = modalBody.querySelector('#sj-date').value;
                    const summary = modalBody.querySelector('#sj-summary').value || '';
                    const content = modalBody.querySelector('#sj-content').value || '';

                    const fullTitle = `Session ${num}: ${titleInput}`;

                    if (!data.history) data.history = [];
                    const newEntry = {
                        id: 'h' + Date.now(),
                        title: fullTitle,
                        date_display: rawDate, // Save the exactly selected YYYY-MM-DD date
                        date: rawDate,         // Maintain backward compat for JS frontend
                        summary: summary,
                        content: content.replace(/\n/g, '<br>'),
                        sessionNumber: num
                    };
                    
                    data.history.push(newEntry);
                    DB.save('sessions', newEntry);

                    appInstance.closeModal();
                    appInstance.renderView('journal');
                });
            });
        });

    // --- Edit buttons ---
    container.querySelectorAll('.edit-journal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.currentTarget.dataset.id;
            const entry = data.history.find(h => h.id === id);

            appInstance.openModal(`
                <h2 class="text-gold" style="margin-bottom:1.5rem;">Edit: ${entry.title}</h2>
                <label>Session Summary / Recap</label>
                <textarea id="edit-journal-summary" rows="3">${entry.summary || ''}</textarea>
                <label>Date</label>
                <input type="date" id="edit-journal-date" value="${entry.date_display || entry.date || ''}" />
                <label>Full Notes</label>
                <textarea id="edit-journal-content" style="padding:1rem; font-family:var(--font-body); font-size:1rem; line-height:1.6; resize:vertical; min-height:200px;">${(entry.content || '').replace(/<br>/g, '\n')}</textarea>
                <div style="text-align:right; margin-top:1rem;">
                    <button id="save-journal-btn" class="btn" style="background:var(--accent-gold); color:#fff;">Save Changes</button>
                </div>
            `, (modalBody) => {
                modalBody.querySelector('#save-journal-btn').addEventListener('click', () => {
                    entry.summary = modalBody.querySelector('#edit-journal-summary').value;
                    entry.content = modalBody.querySelector('#edit-journal-content').value.replace(/\n/g, '<br>');
                    entry.date_display = modalBody.querySelector('#edit-journal-date').value;
                    entry.date = entry.date_display; // Keep backward compat
                    
                    DB.save('sessions', entry);
                    appInstance.closeModal();
                    appInstance.renderView('journal');
                });
            });
        });
    });

    // --- Delete buttons ---
    container.querySelectorAll('.delete-journal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.currentTarget.dataset.id;
            const entry = data.history.find(h => h.id === id);
            if (confirm(`Delete "${entry.title}"?`)) {
                const idx = data.history.findIndex(h => h.id === id);
                if (idx !== -1) data.history.splice(idx, 1);
                
                DB.delete('sessions', id);
                appInstance.renderView('journal');
            }
        });
    });

    return container;
}
