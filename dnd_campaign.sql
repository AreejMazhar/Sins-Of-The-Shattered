-- =============================================================
-- Sins of the Shattered — D&D Campaign Database
-- Import this file into PHPMyAdmin once via:
--   Database: dnd_campaign → Import → dnd_campaign.sql
-- =============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- QUESTS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quests` (
  `id`          VARCHAR(50)  NOT NULL,
  `title`       TEXT         NOT NULL,
  `status`      VARCHAR(20)  NOT NULL DEFAULT 'active',
  `isMainQuest` TINYINT(1)   NOT NULL DEFAULT 1,
  `level`       INT          NOT NULL DEFAULT 1,
  `description` TEXT,
  `tasks`       LONGTEXT,
  `objectives`  LONGTEXT,
  `rewards`     TEXT,
  `location`    TEXT,
  `npc`         VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `quests` VALUES
('q9','Investigate Astri\'s Note and Relationships','completed',0,1,'Astri died leaving behind a cryptic apologetic note, love letters, and a poem. Suspicions of affairs with Emily, Louis, or a \'S\'. Investigate her connections.','[{"text":"Find love letters","completed":true},{"text":"Read tavern staff book","completed":true},{"text":"Discover Emily\'s grave connection","completed":true}]','["Find Astri\'s true motive","Investigate Emily and Erendor"]','Information on Flaming Fist inner workings','Baldur\'s Gate','Astri'),
('q10','Aid Lily and Find Her Mother','completed',0,1,'Lily is a traumatized orphaned child holding a fey creature. Find her mother and get Lily to safety.','[{"text":"Find mother\'s body","completed":true},{"text":"Give mother\'s necklace to Lily","completed":true},{"text":"Use Speak with Dead on mother","completed":true},{"text":"Leave Lily with Azuriel","completed":true}]','["Find Lily\'s mother","Escort Lily to safety"]','Goodwill','Wyrm\'s Rock','Lily'),
('q11','Investigate the Shard of Loyalty','active',1,3,'The Shard of Loyalty was revealed after defeating Titania. It is connected to the party\'s life force. The Duke warned of its history and danger.','[{"text":"Defend against hooded figure theft","completed":true},{"text":"Find an infernal/primordial expert in Waterdeep","completed":false}]','["Protect the shard","Research its origins"]','Unknown artifact power','Waterdeep (Target)','Duke of Baldur\'s Gate'),
('q12','Travel via Trollclaws Route','completed',1,3,'Take the fast, dangerous path through the Field of the Dead and Trollclaws to reach Erendor Norris in Waterdeep for contract translation.','[{"text":"Navigate the Field of the Dead","completed":true},{"text":"Fight off undead and trolls","completed":true},{"text":"Enter Waterdeep portal","completed":true}]','["Survive the Trollclaws","Reach Waterdeep"]','Safe passage to Waterdeep','Trollclaws','Boris'),
('q1','The Shadow over Oakhaven','active',1,3,'Investigate the disappearance of the local blacksmith.','[{"text":"Speak to Mayor Thorne","completed":true},{"text":"Find footprint trails","completed":false},{"text":"Locate Gob-hole cave","completed":false}]','["Find the blacksmith","Defeat the goblin raiding party"]','500 gp, 1x Minor Health Potion','Oakhaven Forest','Mayor Thorne'),
('q3','Investigate the Staining and Great Stag Cult','active',1,4,'Found research on "Blood of the Ancient" (stag blood), phases of Staining; 400+ facilities; connection to Watch; Vale exposed but resisted.','[{"text":"Investigate basement lab","completed":true},{"text":"Rescue trapped tiefling children","completed":true},{"text":"Find Sophia and warn her","completed":false},{"text":"Track Great Stag Cult origins","completed":false}]','["Investigate the Staining","Find the 400+ facilities","Contact Sophia"]','Unknown - The fate of Faerûn','Baldur\'s Gate, South Ward','Violet'),
('q4','Find Dominique the Translator','active',1,4,'Dominique is a missing translator hiding in the southern sewage canal. They know Ancient Infernal and may hold key information about the grimoire and the Revolution.','[{"text":"Get lead from Violet","completed":true},{"text":"Navigate southern sewage canal","completed":false},{"text":"Meet Dominique","completed":false}]','["Find Dominique in the sewers","Learn what they know"]','Information on the Revolution Army and Staining','Southern Sewage Canal, Baldur\'s Gate','Violet'),
('q5','Liberate Children from Underground Facility','completed',0,3,'Agreed to assist Violet the tracer in eliminating 4 individuals assaulting children in exchange for leads on Dominique the translator.','[{"text":"Locate facility behind tavern bartender\'s house","completed":true},{"text":"Defeat 4 masked cultists","completed":true},{"text":"Rescue 5 scribing children","completed":true},{"text":"Store children safely in pocket dimension","completed":true}]','["Find underground facility","Rescue children"]','Lead on Dominique\'s location, mana-contact card from Violet','Underground facility, Baldur\'s Gate','Violet'),
('q6','Uncover the People of the Antler','active',1,4,'Visions in the cursed door revealed masked cultists with antler symbols matching the heirlooms and grimoire. A burning village, a stag skull leader, and a shadowy figure who hid the grimoire. The cult must be found.','[{"text":"Witness the visions","completed":true},{"text":"Research antler cult connections","completed":false},{"text":"Find the shard mentioned by Duke","completed":false},{"text":"Track down the cloaked drow mentor from Alenia\'s vision","completed":false}]','["Follow the antler symbol trail","Find the burning village","Identify the stag skull leader"]','Truth about Durnehviir\'s and Alenia\'s origins','Unknown — linked to Waterdeep and Baldur\'s Gate','Duke of Baldur\'s Gate'),
('q7','Warn Sophia','active',0,3,'Sophia survived the black substance longer than expected. She and a swordsman companion need to be located and warned about the Staining and the cult.','[{"text":"Revive Sophia from abomination form","completed":true},{"text":"Locate Sophia and swordsman after separation","completed":false},{"text":"Brief her on the cult\'s operations","completed":false}]','["Find Sophia","Warn her about the Staining"]','An ally with unique knowledge of the Staining\'s effects','Unknown — last seen near the village','Malachi'),
('q8','Infiltrate the Revolution Army','active',0,3,'The Revolution Army is led by Veldrin at the Sorcerer\'s Guild. They plan to infiltrate the government using Veldrin and his brother. Their weapons include overthrowing the City Watch.','[{"text":"Visit Moose\'s Gauntlet and overhear plans","completed":true},{"text":"Locate the Sorcerer\'s Guild past End Shift Haven","completed":false},{"text":"Confront Veldrin about his background","completed":false}]','["Find Veldrin at the Sorcerer\'s Guild","Assess the threat level"]','Information on Nyloth\'s brother and revolutionary activity','Sorcerer\'s Guild, Baldur\'s Gate','Veldrin');

-- -------------------------------------------------------------
-- CHARACTERS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `characters` (
  `id`          VARCHAR(50)  NOT NULL,
  `name`        VARCHAR(255) NOT NULL,
  `class`       VARCHAR(255),
  `race`        VARCHAR(255),
  `level`       INT          DEFAULT 1,
  `hp`          INT          DEFAULT 10,
  `ac`          INT          DEFAULT 10,
  `gold`        INT          DEFAULT 0,
  `image`       TEXT,
  `bio`         LONGTEXT,
  `appearance`  LONGTEXT,
  `personality` LONGTEXT,
  `quirks`      LONGTEXT,
  `goals`       LONGTEXT,
  `skills`      LONGTEXT,
  `quotes`      LONGTEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `characters` (`id`,`name`,`class`,`race`,`level`,`hp`,`ac`,`gold`,`image`,`bio`,`appearance`,`personality`,`quirks`,`goals`,`skills`,`quotes`) VALUES
('c1','Alenia Blackfrost','Sorcerer','Elf (Drow)',4,32,15,0,'https://api.dicebear.com/7.x/adventurer/svg?seed=Alenia','An ancient Drow elf sorcerer who has been living alone since she was young. She had a \"Master\" not long ago who helped her hone her powers, but she cannot recall their name. Her first 100 years are a blur to her.','Hair: White. Eyes: White (blind). Skin: Deep purple. Build: Skinny and tall. Height: 6\'2\".','On the outside: Rarely speaks, but when she does it\'s stern and to the point. Very observant and judgemental.','Can "see" without eyes through sound, wind, warmth and cold — even the slightest changes around her create vivid pictures in her mind.','Short-term: Get out of prison. Survive without being hunted. Long-term: Find out who her family is.','Sharp non-visual perception. Magical object identification. Insight and people-reading at first contact.','["I don\'t hate you. This is just my face.","I see more with my eyes closed than you ever will with yours open.","They call it a curse. I call it a different kind of sight.","Trust no memory, including your own.","My parents\' sins are not mine — but I still carry them."]'),
('c2','Vale Corvane','Illusionist Wizard','Tiefling',4,28,14,0,'https://api.dicebear.com/7.x/adventurer/svg?seed=Vale','Vale grew up in the Lower City of Baldur\'s Gate, marked from birth by his Tiefling heritage. He taught himself to survive by becoming invisible — through silence, shadow, and eventually illusion magic.','Hair: Long, black, slightly unkempt. Usually tied back. Eyes: Pure white, faintly glowing in dim light. Skin: Purplish hue with black stains creeping from nails to elbows.','On the outside: Speaks in a measured, monotone voice. Rarely smiles or shows emotion. Watches more than he speaks but will engage if prompted.','Tail twitches when anxious or excited — always denies it. Fiddles with parchment scraps, sketching patterns when lost in thought.','Short-term: Protect the grimoire at all costs. Long-term: Uncover the grimoire\'s origins.','Master illusionist. Stealth, deception, misdirection. Deep knowledge of arcane theory from the grimoire.','["Illusions are not lies. They\'re truths wearing different clothes.","Silence is safer.","Everyone\'s wearing a mask. Mine is just honest about it.","Don\'t touch the grimoire. I won\'t ask twice.","Trust is a luxury. I deal in certainties."]'),
('c3','Durnehviir','Warlock (Pact of the Spirit Lake)','Tiefling',4,36,16,0,'https://api.dicebear.com/7.x/adventurer/svg?seed=Durnehviir','Durnehviir knows nothing of their origins before age six, when they woke up under the care of two seldarine drow brothers in Waterdeep: Nyloth, a stern wizard-father, and Veldrin.','Hair: Black short curls with crimson edges. Eyes: Molten gold with vertical pupils and black sclera. Skin: Magenta-purple tone.','On the outside: Charming, flamboyant, and prone to sarcasm as a defense mechanism. Reckless and impulsive, especially when bored.','Talks to their patron mentally or mutters when frustrated. Loves pranking arrogant nobles. Uses Mage Hand to "poke" people when bored.','Short-term: Survive. Befriend their Spirit patron. Long-term: Uncover the truth about the masked attackers and the burning village.','Performance and deception. Mage Hand tricks and sleight of hand. Eldritch Blast combat.','["I\'m not reckless. I\'m enthusiastically spontaneous.","The Spirit and I have an understanding. Mostly. Usually.","I grew up in a city that looks down on people like me. I learned to look them in the eye anyway.","I can\'t help it — my hands just gravitate toward shinies. It\'s basically a medical condition.","They took everything from me once. Not again."]'),
('c4','Liora Ashveil','Sorcerer (Wild Magic — Graviturgy)','Shadar-kai',4,34,15,0,'https://api.dicebear.com/7.x/adventurer/svg?seed=Liora','Liora Ashveil was born in the Shadowfell, raised by a loving mother Lumira and an abusive, absent father Malrek — a sworn commander of the Raven Queen who regarded her as nothing.','Hair: Silvery-white with a dark streak falling over one side. Eyes: Pale, ghostly gray. Skin: Smooth ash-gray with an icy undertone.','On the outside: Calm and composed — gives the impression nothing can rattle her. Strong and capable, projecting confidence and resilience.','Talks to Niblet as if it\'s a confidant — joking, arguing, giving it orders. Observes people silently for patterns before interacting.','Short-term: Gain control over her Wild Graviturgy surge. Long-term: Understand the full capabilities of her magic.','Wild Magic Graviturgy Sorcery. Emotional resilience from survival. Niblet communication.','["Chaos is not my enemy. It is my inheritance.","Niblet understands me better than most people do. This says more about people than about Niblet.","I have walked the Shadowfell alone. I do not fear the dark.","Control is not about suppression. It is about knowing when to let go.","My mother said: even in the darkest place, you can choose your light."]');

-- -------------------------------------------------------------
-- ITEMS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `items` (
  `id`                VARCHAR(50)  NOT NULL,
  `name`              VARCHAR(255) NOT NULL,
  `rarity`            VARCHAR(50),
  `type`              VARCHAR(100),
  `category`          VARCHAR(100),
  `description`       TEXT,
  `history`           TEXT,
  `emoji`             VARCHAR(10),
  `image`             TEXT,
  `inPocketDimension` TINYINT(1)   DEFAULT 0,
  `count`             INT          DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `items` VALUES
('i1','Sword of Light','rare','weapon','Weapons','Glows dimly in the presence of undead.','Forged in the sun-drenched forges of Elsweyr.','🗡️',NULL,0,1),
('i2','Potion of Healing','common','consumable','Consumables','Restores 2d4+2 HP.','Brewed by the local alchemist.','🧪',NULL,0,1),
('i3','Dragon Scale Shield','epic','armor','Armour','Grants resistance to fire damage.','Crafted from the scales of the fallen red dragon, Ignis.','🛡️',NULL,0,1),
('i4','Regal Greataxe','uncommon','weapon','Weapons','A heavy greataxe with a diamond-encrusted handle.','Looted from a fey creature during the Wyrm\'s Rock invasion.','🪓',NULL,0,1),
('i5','Magic Orb','rare','arcane focus','Artifacts','A humming orb of unknown origin from the fey incursion.','Recovered from a fey construct after the prison battle.','🔮',NULL,0,1),
('i6','Mana-Contact Card','uncommon','consumable','Consumables','A card infused with magical energy that allows contact with its creator.','Given by Violet the tracer after rescuing the children.','📇',NULL,0,1),
('i7','Sleight of Hand Bracelet','uncommon','jewelry','Jewelry','+3 to Sleight of Hand checks.','Found in Veldren\'s room in Nyloth\'s tower.','💍',NULL,0,1),
('i8','Vale\'s Grimoire','legendary','arcane tome','Artifacts','Shifting diagrams on the cover. Seems to teach magic of its own accord. Possibly linked to the antler cult.','Found abandoned in Baldur\'s Gate Lower City. Origin unknown.','📖',NULL,0,1),
('i9','Worm\'s Eye Amulet','rare','jewelry','Jewelry','An amulet recovered from the hag coven\'s defeat. Its properties are yet unknown.','Taken from the three hags in Session 10.','🪬',NULL,0,1),
('i10','Memory Lantern','rare','arcane item','Artifacts','A lantern that can display or absorb memories. Given by the hags as a reward for defeating them.','Reward from defeating the hag coven.','🏮',NULL,0,1),
('i11','Grimoire Page','uncommon','arcane item','Scrolls','A single page from a mysterious tome, featuring unfamiliar script.','Recovered from the hags — matches Vale\'s grimoire style.','📜',NULL,0,1),
('i12','Golden Crescent Key','uncommon','key','Misc','A golden crescent-shaped key. Opens the hidden hatch in the Crawling Spider.','Found in the ruins of the Crawling Spider (Impenders) in Session 13.','🗝️',NULL,0,1);

-- -------------------------------------------------------------
-- NPCS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `npcs` (
  `id`       VARCHAR(50)  NOT NULL,
  `name`     VARCHAR(255) NOT NULL,
  `role`     TEXT,
  `attitude` VARCHAR(20)  DEFAULT 'Neutral',
  `location` TEXT,
  `trait`    TEXT,
  `secret`   TEXT,
  `image`    TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `npcs` VALUES
('n1','Albert','Suspicious Prisoner','Friendly','Wyrm\'s Rock Prison','Suspiciously friendly — reenacted the party\'s capture and helped from inside','Cell is charmed shut. Insight reveals a "forgotten" status. He may be far more than a simple prisoner.','https://api.dicebear.com/7.x/adventurer/svg?seed=Albert'),
('n2','Valtor','Flaming Fist Gauntlet','Friendly','Lower City, Baldur\'s Gate','Stern, grief-stricken. Released the party himself during the fey attack. Grieves Astri.','Astri\'s grave journal revealed she refused Valtor\'s marriage proposal, confessing love to Emily instead.','https://api.dicebear.com/7.x/adventurer/svg?seed=Valtor'),
('n3','Lily','Rescued Child','Friendly','Wyrm\'s Rock Prison (rescued)','Traumatized but brave. Was grappling a fey construct when found, mourning her slain mother.','Was using a spell against the fey before the party arrived. Hidden potential.','https://api.dicebear.com/7.x/adventurer/svg?seed=Lily'),
('n4','Boris Borealis','Druid Ally (White Stag)','Friendly','Wyrm\'s Rock / Baldur\'s Gate','Wild and nature-aligned. Shifts from white stag form. Vouched for the party.','Declined joining the party, citing duty. Has knowledge of Faerûn travel routes and maps.','https://api.dicebear.com/7.x/adventurer/svg?seed=Boris'),
('n5','Sir Kassadin','Flaming Fist Leader','Friendly','Wyrm\'s Rock / Crossing','Elegant, organized fighter. Led the group against the fey.','Pursued fey toward the crossing with Glinda and Boris after the prison battle.','https://api.dicebear.com/7.x/adventurer/svg?seed=Kassadin'),
('n6','Glinda','Fighter Ally','Friendly','Baldur\'s Gate','Stays in Baldur\'s Gate. Offered help and a warm farewell to the party.','Fought fey dancers alongside the party during the prison escape.','https://api.dicebear.com/7.x/adventurer/svg?seed=Glinda'),
('n7','Emily','Poet / Astri\'s Love','Friendly','Baldur\'s Gate','Poetry writer. Was protected by Azuriel. Overdosed on ink after learning of Astri\'s death.','Astri\'s grave journal named Emily as her true love, not Valtor.','https://api.dicebear.com/7.x/adventurer/svg?seed=Emily'),
('n8','Azuriel','Flaming Fist Tiefling','Friendly','Baldur\'s Gate','Has a nip piercing. Guards Emily and Lily. Informed Emily about Astri.','Looking after Liliana (Lily). Part of the Flaming Fist but shows genuine care for civilians.','https://api.dicebear.com/7.x/adventurer/svg?seed=Azuriel'),
('n9','Erendor','Flaming Fist Lieutenant','Friendly','Baldur\'s Gate','Third rank. Acts as mentor. Keeps a journal of students.','Knows about a critical shard. Cares deeply for Emily\'s wellbeing.','https://api.dicebear.com/7.x/adventurer/svg?seed=Erendor'),
('n10','Minerva','Non-Binary Investigator / Fighter','Friendly','Traveling with party','They/them. Carries a void dagger and wields black flames. Joined the party\'s quest.','Was investigating a concubine in connection with the death of a noble father.','https://api.dicebear.com/7.x/adventurer/svg?seed=Minerva'),
('n11','Arundon','Poet Master / Scholar','Friendly','Baldur\'s Gate / Waterdeep (contact)','Identified the Ancient Infernal contract from the party\'s findings.','Has a decoder contact in Waterdeep who can translate the contract.','https://api.dicebear.com/7.x/adventurer/svg?seed=Arundon'),
('n12','Malachi (Swordsman)','Survivor / Bounty Hunter','Friendly','Underground dungeon / Village','Suspicious but eventually cooperative. Had Jeffrey and Sophia with him.','Was sent unconscious in a cave after killing ghouls in response to the village bounty.','https://api.dicebear.com/7.x/adventurer/svg?seed=Malachi'),
('n13','Sophia','Jeffrey\'s Daughter / Staining Survivor','Friendly','Unknown — last seen near village','White hair, red eyes. Succumbed to and was revived from an abomination form.','Survived exposure to the black staining substance longer than expected. Must be found and warned.','https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia'),
('n14','Rovina','Thieves\' Guild Vampire Scout','Friendly','Dark Ward, Waterdeep','Calculating, survival-focused. Planning to flee the city due to the new Watch.','Led the party through monster-infested sewage tunnels. Knows about Dominique\'s possible location.','https://api.dicebear.com/7.x/adventurer/svg?seed=Rovina'),
('n15','Monerva','Vampire Patrol Leader','Friendly','Waterdeep Dark Ward','Sold the party citizen passes for 300 gold. Knows Veldrin from childhood.','Directed the party to the sewers guild for further passage.','https://api.dicebear.com/7.x/adventurer/svg?seed=Monerva'),
('n16','Mama J','Crawling Spider Figure','Friendly','Crawling Spider (now Impenders)','Left a note holding items for the party. Her room was intact with fabulous paintings.','Note expressed hope that "Tachiko" is safe — an unknown figure.','https://api.dicebear.com/7.x/adventurer/svg?seed=MamaJ'),
('n17','Nyloth','Adoptive Father / Wizard','Friendly','Waterdeep (tower) — left the city','Stern, overprotective father figure to Durnehviir. Renowned wizard.','Hid Durnehviir\'s origins for years. Has an unsigned devil cat resurrection contract for his daughter Amelia.','https://api.dicebear.com/7.x/adventurer/svg?seed=Nyloth'),
('n18','Violet','Tracer','Friendly','Baldur\'s Gate, Tavern','Hooded, calculating. Constantly sharpening a dagger. Locates missing people for a living.','Gave the party a mana-contact card. Knows where Dominique hides in the sewer.','https://api.dicebear.com/7.x/adventurer/svg?seed=Violet'),
('n19','Thea','Sorcerer','Friendly','Tymora\'s Blessing Tavern, South Ward','Informative, curious. Has knowledge of the grimoire aura and its transformative properties.','Discussed Dominique\'s disappearance — they were described as a prankster who\'s been missing two years.','https://api.dicebear.com/7.x/adventurer/svg?seed=Thea'),
('n20','Gem Lady','Cryptic Observer','Neutral','Multiple taverns','Stares at a gem across taverns. Offers help if the party is "playing with fate."','Hints at knowing Dominique. May have prophetic or divine knowledge.','https://api.dicebear.com/7.x/adventurer/svg?seed=GemLady'),
('n21','Serana','Surviving Twin Performer','Neutral','Unknown — left the city','Grief-stricken. Blamed Durnehviir for Sylvia\'s death with her eyes alone.','Left Baldur\'s Gate without a word. Her notebook with song lyrics and a sketch was found in the ruins of the Crawling Spider.','https://api.dicebear.com/7.x/adventurer/svg?seed=Serana'),
('n22','Lilia','Revolution Recruit','Neutral','Second Tavern, Baldur\'s Gate','Eager, new recruit. Has a butterfly companion.','Recruitment ends in 10 days. She knows Veldrin personally through the army.','https://api.dicebear.com/7.x/adventurer/svg?seed=Lilia'),
('n23','Jeffrey','Village Chief','Neutral','Village near Waterdeep','Traumatized, sunken eyes. Was hoarding food while villagers starved.','Had a secret underground base with food suppliers. Daughter Sophia turned into an abomination and had to be revived.','https://api.dicebear.com/7.x/adventurer/svg?seed=Jeffrey'),
('n24','Belial','Incubus-like Entity','Neutral','Crypt near river','Winged, dark-haired, wears a loincloth. Was found kissing corpses. Seductive.','Minerva was indifferent to his seductive abilities. His motives in the crypt are unknown.','https://api.dicebear.com/7.x/adventurer/svg?seed=Belial'),
('n25','Josephine','Sentient Painting','Neutral','Abandoned manor / Pocket Dimension','An evasive woman in a moving portrait by Sir Saint George. Changes from white to black dress.','Appears to lie. Requested to be released from the painting. May be imprisoned intentionally.','https://api.dicebear.com/7.x/adventurer/svg?seed=Josephine'),
('n26','Dunder Dunder','Familiar Cat','Neutral','With Durnehviir','A Siamese cat with black eyes, released from a marble.','Clings to Durnehviir exclusively. Origin and purpose unknown.','https://api.dicebear.com/7.x/adventurer/svg?seed=DunderDunder'),
('n27','Duke of Baldur\'s Gate','Leader of Baldur\'s Gate (Will\'s Father)','Neutral','Baldur\'s Gate','Elder Raven Guard. Delivered a public speech ordering increased surveillance.','Knows about the shards — key objects tied to the overarching mystery.','https://api.dicebear.com/7.x/adventurer/svg?seed=Duke'),
('n28','Simon','Mentioned Figure','Neutral','Unknown','Name cried out by the dying tiefling child in the Staining facility.','His connection to the Staining and the tiefling children is completely unknown.','https://api.dicebear.com/7.x/adventurer/svg?seed=Simon'),
('n29','Veldrin (Veldren)','Revolution Leader / Nyloth\'s Brother','Hostile','Sorcerer\'s Guild, Baldur\'s Gate','Charismatic, dangerous. Leads an uprising against the City Watch.','He is Nyloth\'s brother — someone Durnehviir knows as family. His revolution plan involves infiltrating government.','https://api.dicebear.com/7.x/adventurer/svg?seed=Veldrin'),
('n30','The Masked Hunters','Unknown Pursuers','Hostile','Waterdeep (Crawling Spider) / Spirit Lake','Ruthless, precise. Targeted Durnehviir specifically.','Know something about Durnehviir\'s true origins. Their antler symbol matches the cult in the visions.','https://api.dicebear.com/7.x/adventurer/svg?seed=MaskedHunters'),
('n31','The Great Stag Cult','Great Stag Cult Servants','Hostile','Underground facility, Baldur\'s Gate','Fanatical, powerful. Oversaw 5 tranced children scribing forbidden knowledge.','Part of the Staining cult using Blood of the Ancient stag. 400+ facilities across Faerûn.','https://api.dicebear.com/7.x/adventurer/svg?seed=MaskedCult'),
('n32','Titania (Fae Boss)','Fae Boss','Hostile','Wyrm\'s Rock (outer) — Defeated','Corrupted by a devil sigil. Controlled fey creatures and corrupted beasts.','Showed the party a vision of betrayal before dissipating. The sigil that cursed her may be connected to the cult.','https://api.dicebear.com/7.x/adventurer/svg?seed=Titania'),
('n33','Nightwing','Castle Boss','Hostile','Wyrm\'s Rock — Defeated','Boss-class enemy encountered and defeated in the castle area above the prison.','No further details known about their allegiances or motives.','https://api.dicebear.com/7.x/adventurer/svg?seed=Nightwing'),
('n34','The Hag Coven','Night Hag, Sea Hag, Green Hag','Hostile','Village near Waterdeep — Defeated','Shape-shifted into village women (Aubrey, Valentine, Madeline) to deceive the party.','Created an abomination from Sophia\'s body. Offered the party shards in exchange for boons but were refused and defeated.','https://api.dicebear.com/7.x/adventurer/svg?seed=HagCoven'),
('n35','Malrek Ashveil (Deceased)','Liora\'s Father','Hostile','Deceased — Baldur\'s Gate','Sworn commander in the Raven Queen\'s service. Cruel and absent.','Struck Liora down as a child in public: "You are nothing." Was killed by Liora\'s Wild Magic surge.','https://api.dicebear.com/7.x/adventurer/svg?seed=Malrek'),
('n36','Cloaked Drow Mentor','Sorcery Teacher (Alenia\'s Past)','Hostile','Unknown','White hair, unfamiliar symbol on cloak. Dosed young Alenia with River Lethe water causing her amnesia.','Was present at the moment of Alenia\'s mother\'s abduction. Directly responsible for Alenia losing her memories.','https://api.dicebear.com/7.x/adventurer/svg?seed=CloackedDrow');

-- -------------------------------------------------------------
-- SESSIONS
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sessions` (
  `id`            VARCHAR(50)  NOT NULL,
  `title`         VARCHAR(255) NOT NULL,
  `date_display`  VARCHAR(100),
  `summary`       TEXT,
  `content`       LONGTEXT,
  `sessionNumber` INT          DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sessions are added by the DM via the UI — no seed data needed.

-- -------------------------------------------------------------
-- DISCOVERIES
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `discoveries` (
  `id`         VARCHAR(50) NOT NULL,
  `date_label` VARCHAR(100),
  `text`       TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `discoveries` VALUES
('d1','Session 1','Discovered a secret cavern beneath Wyrm\'s Rock Prison, opened by the "frosted lions" riddle.'),
('d2','Session 1','Albert the prisoner\'s cell remains charmed shut — insight reveals his "forgotten" status. He may not be what he seems.'),
('d3','Session 2','Nightwing was defeated as the boss inside the castle section above Wyrm\'s Rock.'),
('d4','Session 4','Titania — the fae boss — was cursed with a devil sigil and showed a frightening vision of betrayal before dissipating.'),
('d5','Session 5','Arundon identified the Ancient Infernal contract. A decoder in Waterdeep may be able to translate it.'),
('d6','Session 7','Belial the incubus was found in a crypt kissing corpses. Astri\'s grave revealed a journal refusing marriage to Valtor, confessing love to Emily.'),
('d7','Session 8','Jeffrey the village chief was hoarding food in an underground base, starving villagers. Josephine is a sentient, possibly lying painting.'),
('d8','Session 9','Trance-visions revealed masked cultists with antler symbols matching both Durnehviir\'s emblem and Vale\'s grimoire. A shadowy figure deliberately hid the grimoire for Vale to find.'),
('d9','Session 10','Three hags (Night, Green, Sea) were concealed as village women. They offered shards for boons but were rejected and defeated. Net rewards: Worm\'s Eye Amulet, Memory Lantern, grimoire page, memory vial.'),
('d10','Session 10','Alenia\'s vision: her mother was abducted on Alenia\'s 10th birthday. A cloaked Drow Mentor later dosed young Alenia with River Lethe water — causing her amnesia.'),
('d11','Session 13','The Crawling Spider is now "Impenders" — seized after the masked hunter raid. Inside: a golden crescent key, bloodied mask, Mama J\'s note, Serana\'s notebook with song lyrics.'),
('d12','Session 14','Nyloth\'s tower contains memory-puzzles voiced by Nyloth and Veldrin. A bypass device creates illusory ID papers.'),
('d13','Session 15','Hidden attic compartment in the tower has devil cat contracts offering resurrection of Nyloth\'s daughter Amelia — unsigned. Piano lullaby revealed hidden text.'),
('d14','Session 17','The Staining is a 40-year-old ritual involving Blood of the Ancient stag, turning tiefling victims into scribes for the Great Stag entity. 400+ facilities exist across Faerûn.'),
('d15','Session 17','Vale was exposed to the Staining\'s black substance but resisted. Sophia also survived. They must be warned — and her location found.');

SET FOREIGN_KEY_CHECKS = 1;
