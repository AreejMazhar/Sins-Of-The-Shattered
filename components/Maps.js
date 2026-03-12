window.renderMaps = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'maps-container fade-in';

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">World Atlas</h2>
            <select class="btn" style="width:200px; padding:0.5rem; background:var(--bg-dark); color:var(--text-main); border:1px solid var(--panel-border);">
                <option>The Continent of Elyria</option>
                <option>Oakhaven Forest (Local)</option>
                <option>Bandit Camp (Encounter)</option>
            </select>
        </div>
        
        <div style="position:relative; width:100%; height:60vh; border:2px solid var(--panel-border); border-radius:var(--radius-md); overflow:hidden; background:#2c221a; cursor:grab;" id="map-viewport">
            <!-- Simulated Map Image Background -->
            <div id="map-image" style="width:2000px; height:2000px; background:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000"><rect width="100%" height="100%" fill="%23dab98b"/><path d="M 500 500 Q 800 200 1200 600 T 1800 800" stroke="%238a6a48" stroke-width="10" fill="none"/><circle cx="600" cy="550" r="15" fill="%238b3a3a"/><circle cx="1200" cy="650" r="15" fill="%234a7c59"/></svg>') center/cover; position:absolute; top:-500px; left:-500px; transition:transform 0.1s ease;">
                
                <!-- Map Markers -->
                <div class="map-marker" style="position:absolute; top:525px; left:585px; width:30px; height:30px; background:var(--danger); border-radius:50%; border:2px solid #fff; cursor:pointer; box-shadow:0 0 15px rgba(139,58,58,0.8);" title="Oakhaven"></div>
                
                <div class="map-marker" style="position:absolute; top:625px; left:1185px; width:30px; height:30px; background:var(--success); border-radius:50%; border:2px solid #fff; cursor:pointer; box-shadow:0 0 15px rgba(74,124,89,0.8);" title="Bandit Camp"></div>

            </div>
            
            <!-- Map Controls Overlay -->
            <div style="position:absolute; bottom:20px; right:20px; display:flex; gap:10px;">
                <button class="btn" id="zoom-in" style="width:40px; height:40px; border-radius:50%; font-size:1.5rem; display:flex; align-items:center; justify-content:center;">+</button>
                <button class="btn" id="zoom-out" style="width:40px; height:40px; border-radius:50%; font-size:1.5rem; display:flex; align-items:center; justify-content:center;">-</button>
            </div>
        </div>
    `;

    // Map Interaction Logic (Basic Pan/Zoom)
    const viewport = container.querySelector('#map-viewport');
    const mapImg = container.querySelector('#map-image');
    let isDragging = false;
    let startX, startY, currentX = -500, currentY = -500;
    let scale = 1;

    // Panning
    viewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        viewport.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        updateMapTransform();
    });

    // Zooming
    const zoomIn = container.querySelector('#zoom-in');
    const zoomOut = container.querySelector('#zoom-out');

    zoomIn.addEventListener('click', () => {
        scale = Math.min(scale + 0.2, 2.5);
        updateMapTransform();
    });

    zoomOut.addEventListener('click', () => {
        scale = Math.max(scale - 0.2, 0.5);
        updateMapTransform();
    });

    function updateMapTransform() {
        mapImg.style.transform = `translate(${currentX + 500}px, ${currentY + 500}px) scale(${scale})`;
    }

    // Map Marker Modals
    const markers = container.querySelectorAll('.map-marker');
    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent panning interference
            const locationName = e.target.title;
            
            let lore = "";
            let relatedQuest = "";

            if (locationName === "Oakhaven") {
                lore = "A quiet logging town situated on the edge of the Whispering Woods. Recently plagued by mysterious disappearances.";
                relatedQuest = "The Shadow over Oakhaven";
            } else {
                lore = "A makeshift fortified camp hidden deep within a rocky ravine. Home to the Bloodband gang.";
                relatedQuest = "Retrieving the Sunstone";
            }

            appInstance.openModal(`
                <div style="text-align:center;">
                    <h2 style="font-size:3rem; color:var(--accent-gold); margin-bottom:1rem;">${locationName}</h2>
                    <div style="width:100%; height:200px; background:#1a1a1a; border:2px solid var(--panel-border); margin-bottom:2rem; display:flex; align-items:center; justify-content:center; color:var(--text-muted);">
                        [ Illustration of ${locationName} ]
                    </div>
                </div>
                
                <h3 class="text-gold" style="margin-bottom:0.5rem;">Lore & History</h3>
                <p style="margin-bottom:2rem; line-height:1.8;">${lore}</p>
                
                <div style="background:rgba(255,255,255,0.05); padding:1.5rem; border-left:4px solid var(--accent-magic); border-radius:var(--radius-sm);">
                    <h4 class="text-magic" style="margin-bottom:0.5rem;">Related Active Quests</h4>
                    <p>⚔️ ${relatedQuest}</p>
                </div>
            `);
        });
    });

    return container;
}
