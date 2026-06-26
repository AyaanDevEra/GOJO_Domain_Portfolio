-- Seed initial curated content (matches src/lib/data/fallback.ts)
insert into site_settings (display_name, username, real_name, socials, audio_enabled, master_volume)
values ('GOJO SATORU', 'gojo_satoru.tho', 'Gojo Khan',
  '{"discord":"","instagram":"","github":"","email":""}', false, 0.6)
on conflict do nothing;

insert into domain_lore (key,name,description,theme,animation_preset,audio_preset,accent_colors,background_assets,section_key,sort_order) values
 ('infinite_void','Infinite Void','An endless expanse of information.','void','void_collapse','infinite_void_ambient','{"primary":"72 177 255","secondary":"20 30 60","glow":"143 212 255"}','["intro.bg"]','intro',1),
 ('six_eyes','Six Eyes','Perfect clarity and control.','sixeyes','six_eyes_pulse','six_eyes_ambient','{"primary":"72 177 255","secondary":"10 18 40","glow":"143 212 255"}','[]','dashboard',2),
 ('hollow_purple','Hollow Purple','Imaginary technique of destruction.','hollow','hollow_charge','hollow_purple_theme','{"primary":"123 47 247","secondary":"40 12 80","glow":"181 139 255"}','["projects.bg"]','projects',3),
 ('mahoraga','Mahoraga Adaptation','Adapts to all phenomena.','mahoraga','mahoraga_wheel','mahoraga_theme','{"primary":"180 180 200","secondary":"30 30 40","glow":"220 220 235"}','[]','mahoraga',4),
 ('domain_clash','Domain Clash','Gojo vs Sukuna.','clash','clash_impact','clash_theme','{"primary":"226 59 59","secondary":"72 30 30","glow":"255 122 122"}','["contact.bg"]','contact',5)
on conflict (key) do nothing;

insert into skills (name,percentage,category,sort_order) values
 ('Java',80,'Programming',1),('C Language',70,'Programming',2),('Python',85,'Programming',3),
 ('HTML',90,'Web',4),('Discord Bot Development',88,'Bots',5);

insert into communities (name,role,member_count,sort_order) values
 ('Soulflares','Owner',1000,1),('Mohgs','Assistant Manager',3000,2),
 ('Anime Re Rangers X','Tester',400000,3);

insert into achievements (title,description,category,priority,is_showcase,is_featured,related_section,sort_order) values
 ('Soulflares Owner','Founder & owner of Soulflares.','Community',1,true,true,'communities',1),
 ('Mohgs Assistant Manager','Assistant manager at Mohgs.','Community',2,true,false,'communities',2),
 ('ARRX Tester','Tester for Anime Re Rangers X.','Community',3,true,false,'communities',3),
 ('Top 25 Anime Vanguard Guild Leader','Ranked Top 25 guild leadership.','Gaming',0,true,true,'leadership',4);

insert into project_categories (name,slug,sort_order) values
 ('Discord','discord',1),('Programming','programming',2),
 ('Community Management','community',3),('Design','design',4),('Future Projects','future',5)
on conflict (slug) do nothing;

insert into statistics (label,value,display_format,icon,source,derived_key,sort_order) values
 ('Servers Managed',3,'{value}','server','manual',null,1),
 ('Members Reached',404000,'{k}K+','users','derived','total_members',2),
 ('Programming Skills',5,'{value}','code','manual',null,3),
 ('Guild Ranking',25,'Top {value}','trophy','manual',null,4),
 ('Projects Created',0,'{value}','rocket','manual',null,5);

insert into audio_assets (key,name,category,default_volume,loop) values
 ('infinite_void_ambient','Infinite Void Ambient','domain_theme',0.4,true),
 ('six_eyes_ambient','Six Eyes Ambient','domain_theme',0.35,true),
 ('hollow_purple_theme','Hollow Purple Theme','domain_theme',0.45,true),
 ('mahoraga_theme','Mahoraga Theme','domain_theme',0.4,true),
 ('clash_theme','Domain Clash Theme','domain_theme',0.45,true),
 ('ui_click','UI Click','ui',0.5,false),
 ('domain_expansion_sfx','Domain Expansion SFX','domain_expansion',0.8,false)
on conflict (key) do nothing;
