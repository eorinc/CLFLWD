/*in the create view gui/dialog */
CREATE MATERIALIZED VIEW minnesota.gssurgo_soilsgrp AS
select minnesota.ssurgo_mupolygon.mukey as polygon_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey as table_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.hydrolgrp_dcd as hydrolgrp,
       minnesota.ssurgo_mupolygon.geom as geom,
       minnesota.ssurgo_mupolygon.id as id
from minnesota.ssurgo_mupolygon
   join minnesota.ssurgo_sdv_hydrolgrp_dcd
      on minnesota.ssurgo_mupolygon.mukey = minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey;
      
/*Then need to alter the view to add unique index so can add layer to qgis */

CREATE UNIQUE INDEX ON minnesota.gssurgo_soilsgrp (id);

Select * 
FROM minnesota."Altered_Watercourse" 
WHERE awevttype = 1 OR awevttype = 2 OR awevttype = 3 OR awevttype = 4

SELECT *
FROM minnesota.nwi_2009_to_2014
WHERE wetland_type = 'Freshwater Emergent Wetland' OR wetland_type = 'Freshwater Forested/Shrub Wetland'


SELECT *
FROM minnesota.impaired_2020_draft_streams
WHERE NOT affected_u = 'AQC'

SELECT *
FROM minnesota.impaired_2020_draft_lakes
WHERE NOT affected_u = 'AQC'


/* HAVE to do this command after the views are made so you can add/see them */
REFRESH MATERIALIZED VIEW minnesota.fema_flood_view;

/************************************************/
/********** NON WORKING CODE ********************/
/************************************************/
/*Created table but no geometry */
select minnesota.ssurgo_mupolygon.mukey as polygon_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey as table_key,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.hydrolgrp_dcd as hydrolgrp,
       minnesota.ssurgo_sdv_hydrolgrp_dcd.id as table_id, 
       minnesota.ssurgo_mupolygon.id as polygon_id
from minnesota.ssurgo_mupolygon
   join minnesota.ssurgo_sdv_hydrolgrp_dcd
      on minnesota.ssurgo_mupolygon.mukey = minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey;

/*can't do it this way because both have id column */
select *
from minnesota.ssurgo_mupolygon
   join minnesota.ssurgo_sdv_hydrolgrp_dcd
      on minnesota.ssurgo_mupolygon.mukey = minnesota.ssurgo_sdv_hydrolgrp_dcd.mukey;



/*example code from Mike */
create or replace view testing_list_view as 
select c.id as student_id,
       a.subject_id as subject_uid,
       c.full_name, 
       c.email_id,  
       c.created_at, 
       p.score, 
       s.application_status,
       a.verified,
       a.application_response
from students c
   inner join scores p
      on p.student_id=c.id
   inner join applications a
      on a.student_id = c.id and a.subject_id = p.subject_id
   inner join applicationstatus s 
      on s.id = a.status_id;