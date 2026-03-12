window.renderNPCs = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'npcs-container fade-in';

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">NPC Database</h2>
            <div style="display:flex; justify-content:space-between; align-items:center; width:65%; gap:1rem;">
                <input type="text" placeholder="Search NPCs..." style="flex:1; padding:0.5rem; background:var(--bg-dark); border:1px solid var(--panel-border); color:var(--text-main); border-radius:var(--radius-sm); margin:0;" />
                <button id="add-npc-btn" class="btn" style="white-space:nowrap;">+ Add NPC</button>
            </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:2rem; margin-top:2rem;">
            <!-- Friendly Column -->
            <div>
                <h3 style="color:var(--success); border-bottom:2px solid var(--success); padding-bottom:0.5rem; margin-bottom:1rem;">Friendly</h3>
                <div class="npc-group" id="npc-friendly">
                    ${renderNPCList(data.npcs.filter(n => n.attitude === 'Friendly'))}
                </div>
            </div>

            <!-- Neutral Column -->
            <div>
                <h3 style="color:var(--accent-gold); border-bottom:2px solid var(--accent-gold); padding-bottom:0.5rem; margin-bottom:1rem;">Neutral</h3>
                <div class="npc-group" id="npc-neutral">
                    ${renderNPCList(data.npcs.filter(n => n.attitude === 'Neutral'))}
                </div>
            </div>

            <!-- Hostile Column -->
            <div>
                <h3 style="color:var(--danger); border-bottom:2px solid var(--danger); padding-bottom:0.5rem; margin-bottom:1rem;">Hostile</h3>
                <div class="npc-group" id="npc-hostile">
                    ${renderNPCList(data.npcs.filter(n => n.attitude === 'Hostile'))}
                </div>
            </div>
        </div>
    `;

    function renderNPCList(npclist) {
        if(npclist.length === 0) return '<p class="text-muted" style="font-size:0.9rem;">No characters.</p>';
        return npclist.map(npc => `
            <div class="card npc-card" data-id="${npc.id}" style="margin-bottom:1rem; padding:1rem;">
                <div style="display:flex; gap:1rem; align-items:center;">
                    <img src="${npc.image}" alt="${npc.name}" style="width:60px; height:60px; border-radius:10px; border:1px solid var(--panel-border);">
                    <div>
                        <h4 style="margin-bottom:0.1rem; font-size:1.1rem;">${npc.name}</h4>
                        <p style="color:var(--text-muted); font-size:0.85rem;">${npc.role}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
        


    // Interaction
    const cards = container.querySelectorAll('.npc-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const npc = data.npcs.find(n => n.id === id);
            
            appInstance.openModal(`
                <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;">
                    <button id="edit-npc-btn" class="btn" style="background:var(--panel-border);">✏️ Edit NPC</button>
                </div>
                <div style="display:flex; gap:2rem;">
                    <div style="flex:1; text-align:center;">
                        <img src="${npc.image}" style="width:100%; max-width:250px; border-radius:10px; border:2px solid var(--panel-border); box-shadow:0 10px 20px rgba(0,0,0,0.5);">
                    </div>
                    <div style="flex:2;">
                        <h2 style="font-size:2.5rem; color:var(--text-main); border-bottom:1px solid var(--panel-border); margin-bottom:1rem; padding-bottom:0.5rem;">${npc.name}</h2>
                        
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:2rem;">
                            <div>
                                <h4 class="text-gold" style="margin-bottom:0.3rem;">Role</h4>
                                <p>${npc.role}</p>
                            </div>
                            <div>
                                <h4 class="text-gold" style="margin-bottom:0.3rem;">Location</h4>
                                <p>${npc.location}</p>
                            </div>
                            <div>
                                <h4 class="text-gold" style="margin-bottom:0.3rem;">Trait</h4>
                                <p>${npc.trait}</p>
                            </div>
                        </div>

                        <div style="background:rgba(139, 58, 58, 0.1); border:1px solid var(--danger); padding:1.5rem; border-radius:var(--radius-md);">
                            <h4 class="text-danger" style="margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;">👁️ DM Secret</h4>
                            <p style="font-style:italic; color:var(--text-muted);">${npc.secret}</p>
                        </div>
                    </div>
                </div>
            `, (modalBody) => {
                modalBody.querySelector('#edit-npc-btn').addEventListener('click', () => {
                    appInstance.openModal(`
                        <h2 class="text-gold" style="margin-bottom:1.5rem;">Edit NPC: ${npc.name}</h2>
                        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                            <div style="flex:1; min-width:200px;">
                                <label>NPC Name</label>
                                <input type="text" id="edit-npc-name" value="${npc.name.replace(/"/g, '&quot;')}" />
                                
                                <label>Role / Title</label>
                                <input type="text" id="edit-npc-role" value="${npc.role.replace(/"/g, '&quot;')}" />
                                
                                <label>Attitude</label>
                                <select id="edit-npc-attitude">
                                    <option value="Friendly" ${npc.attitude === 'Friendly' ? 'selected' : ''}>Friendly</option>
                                    <option value="Neutral" ${npc.attitude === 'Neutral' ? 'selected' : ''}>Neutral</option>
                                    <option value="Hostile" ${npc.attitude === 'Hostile' ? 'selected' : ''}>Hostile</option>
                                </select>
                            </div>
                            <div style="flex:1; min-width:200px;">
                                <label>Location</label>
                                <input type="text" id="edit-npc-location" value="${npc.location.replace(/"/g, '&quot;')}" />
                                
                                <label>Defining Trait</label>
                                <input type="text" id="edit-npc-trait" value="${npc.trait.replace(/"/g, '&quot;')}" />
                                
                                <label>Profile Image URL</label>
                                <input type="text" id="edit-npc-image" value="${npc.image}" />
                            </div>
                        </div>
                        
                        <label>DM Secret Notes</label>
                        <textarea id="edit-npc-secret" rows="3">${npc.secret}</textarea>
                        
                        <div style="text-align:right; margin-top:1rem;">
                            <button id="save-edit-npc-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Changes</button>
                        </div>
                    `, (editBody) => {
                        editBody.querySelector('#save-edit-npc-btn').addEventListener('click', () => {
                            npc.name = editBody.querySelector('#edit-npc-name').value;
                            npc.role = editBody.querySelector('#edit-npc-role').value;
                            npc.attitude = editBody.querySelector('#edit-npc-attitude').value;
                            npc.location = editBody.querySelector('#edit-npc-location').value;
                            npc.trait = editBody.querySelector('#edit-npc-trait').value;
                            npc.image = editBody.querySelector('#edit-npc-image').value;
                            npc.secret = editBody.querySelector('#edit-npc-secret').value;
                            
                            appInstance.closeModal();
                            appInstance.renderView('npcs');
                            setTimeout(() => {
                                // Re-open the details modal to show changes
                                const newCards = document.querySelectorAll('.npc-card');
                                const targetCard = Array.from(newCards).find(c => c.dataset.id === id);
                                if(targetCard) targetCard.click();
                            }, 350);
                        });
                    });
                });
            });
        });
    });

    // Add NPC Logic
    const addBtn = container.querySelector('#add-npc-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            appInstance.openModal(`
                <h2 class="text-gold" style="margin-bottom:1.5rem;">Add New NPC</h2>
                <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                    <div style="flex:1; min-width:200px;">
                        <label>NPC Name</label>
                        <input type="text" id="new-npc-name" placeholder="E.g. Captain Vane" />
                        
                        <label>Role / Title</label>
                        <input type="text" id="new-npc-role" placeholder="E.g. City Guard Commander" />
                        
                        <label>Attitude</label>
                        <select id="new-npc-attitude">
                            <option value="Friendly">Friendly</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Hostile">Hostile</option>
                        </select>
                    </div>
                    <div style="flex:1; min-width:200px;">
                        <label>Location</label>
                        <input type="text" id="new-npc-location" placeholder="E.g. The Drowned Rat Tavern" />
                        
                        <label>Defining Trait</label>
                        <input type="text" id="new-npc-trait" placeholder="E.g. Paranoia, Missing an eye" />
                    </div>
                </div>
                
                <label>DM Secret Notes</label>
                <textarea id="new-npc-secret" rows="3" placeholder="What secrets does this NPC hide?"></textarea>
                
                <div style="text-align:right; margin-top:1rem;">
                    <button id="save-npc-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save NPC</button>
                </div>
            `, (modalBody) => {
                modalBody.querySelector('#save-npc-btn').addEventListener('click', () => {
                    const name = modalBody.querySelector('#new-npc-name').value || 'Unknown NPC';
                    const role = modalBody.querySelector('#new-npc-role').value;
                    const attitude = modalBody.querySelector('#new-npc-attitude').value;
                    const location = modalBody.querySelector('#new-npc-location').value;
                    const trait = modalBody.querySelector('#new-npc-trait').value;
                    const secret = modalBody.querySelector('#new-npc-secret').value;
                    
                    data.npcs.push({
                        id: 'n' + Date.now(),
                        name: name,
                        role: role,
                        attitude: attitude,
                        location: location,
                        trait: trait,
                        secret: secret,
                        image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + encodeURIComponent(name)
                    });
                    
                    appInstance.closeModal();
                    appInstance.renderView('npcs');
                });
            });
        });
    }

    return container;
}
