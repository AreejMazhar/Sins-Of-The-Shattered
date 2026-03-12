window.renderJournal = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'journal-container fade-in';

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Session Journal</h2>
            <button class="btn">New Entry</button>
        </div>
        
        <div style="max-width:800px; margin:0 auto; padding-left:20px; border-left:2px solid var(--accent-gold); position:relative;">
            ${(data.history || []).map((entry, index) => `
                <div class="journal-entry mb-4" style="position:relative; margin-bottom:3rem;">
                    <!-- Timeline Dot -->
                    <div style="position:absolute; left:-29px; top:5px; width:15px; height:15px; border-radius:50%; background:var(--bg-dark); border:3px solid var(--accent-gold); box-shadow:0 0 10px var(--accent-glow);"></div>
                    
                    <div class="card" style="padding:2rem;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                            <div>
                                <span class="text-gold" style="font-family:var(--font-heading); font-size:1.5rem; display:block; margin-bottom:0.5rem;">${entry.title}</span>
                                <span style="color:var(--text-muted); font-size:0.9rem; display:block; margin-bottom:1.5rem;">Recorded on ${entry.date}</span>
                            </div>
                            <button class="btn edit-journal-btn" data-id="${entry.id}" style="font-size:0.8rem; padding:0.3rem 0.6rem;">Edit</button>
                        </div>
                        
                        <div style="margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid var(--panel-border);">
                            <h4 class="text-gold" style="margin-bottom:0.5rem;">Session Summary</h4>
                            <p style="color:var(--text-muted); line-height:1.6;">${entry.summary}</p>
                        </div>
                        <div style="line-height:1.7; font-size:1rem; max-height:400px; overflow-y:auto; padding-right:1rem; margin-bottom:1rem;" class="journal-content-viewer">
                            <h4 class="text-gold" style="margin-bottom:0.5rem;">Full Notes</h4>
                            ${entry.content || "<p class='text-muted'>No additional notes.</p>"}
                        </div>
                        
                        ${index === 0 ? `
                            <div style="background:rgba(107, 76, 154, 0.1); border-left:4px solid var(--accent-magic); padding:1rem; border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                                <h5 class="text-magic" style="margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;">🧿 DM Notes</h5>
                                <p style="font-style:italic; font-size:0.9rem; color:var(--text-muted);">The party missed the hidden compartment in the Mayor's desk containing the ledger.</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
            
            <div style="position:relative;">
                <div style="position:absolute; left:-29px; top:0; width:15px; height:15px; border-radius:50%; background:var(--bg-dark); border:2px solid var(--text-muted);"></div>
                <div style="padding-left:1.5rem; color:var(--text-muted); font-style:italic;">Beginning of the Campaign</div>
            </div>
        </div>
    `;

    // Interaction
    const editBtns = container.querySelectorAll('.edit-journal-btn');
    editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const entry = data.history.find(h => h.id === id);
            
            appInstance.openModal(`
                <h2 class="text-gold" style="margin-bottom:1.5rem;">Edit ${entry.title}</h2>
                <div style="display:flex; flex-direction:column; height:60vh;">
                    <textarea id="edit-journal-content" style="flex:1; padding:1rem; font-family:var(--font-body); font-size:1rem; line-height:1.6; resize:none;">${(entry.content || entry.summary).replace(/<br>/g, '\\n')}</textarea>
                    
                    <div style="text-align:right; margin-top:1rem;">
                        <button id="save-journal-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Changes</button>
                    </div>
                </div>
            `, (modalBody) => {
                modalBody.querySelector('#save-journal-btn').addEventListener('click', () => {
                    const txt = modalBody.querySelector('#edit-journal-content').value;
                    entry.content = txt.replace(/\\n/g, '<br>'); // update array reference directly
                    appInstance.closeModal();
                    appInstance.renderView('journal');
                });
            });
        });
    });

    return container;
}
