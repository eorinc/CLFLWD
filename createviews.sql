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


/* view for each index, needed to do views because if added the same layer multiple times the callback would be the same therefore removing or adding layers that aren't correct. At least I think it would */
CREATE MATERIALIZED VIEW minnesota.majorscores_bio_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.b_i_mean as b_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);


CREATE MATERIALIZED VIEW minnesota.majorscores_hyd_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.h_i_mean as h_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);
      
CREATE MATERIALIZED VIEW minnesota.majorscores_geo_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.g_i_mean as g_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);   
      
CREATE MATERIALIZED VIEW minnesota.majorscores_con_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.c_i_mean as c_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int); 
      
CREATE MATERIALIZED VIEW minnesota.majorscores_wq_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.w_i_mean as w_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int); 
      
CREATE MATERIALIZED VIEW minnesota.majorscores_comb_index_mv AS
select minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major as huc_major,
       minnesota.major_scores.major as table_major,
       minnesota.major_scores.a_i_mean as a_i_mean,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.geom as geom,
       minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.id as id
from minnesota.dnr_watersheds_dnr_level_04_huc_08_majors
   join minnesota.major_scores
      on minnesota.dnr_watersheds_dnr_level_04_huc_08_majors.major = CAST(minnesota.major_scores.major as int);      



/*Then need to alter the view to add unique index so can add layer to qgis */

CREATE UNIQUE INDEX ON minnesota.gssurgo_soilsgrp (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_bio_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_hyd_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_geo_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_con_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_wq_index_mv (id);
CREATE UNIQUE INDEX ON minnesota.majorscores_comb_index_mv (id);

Select * 
FROM minnesota."Altered_Watercourse" 
WHERE awevttype = 1 OR awevttype = 2 OR awevttype = 3 OR awevttype = 4

SELECT *
FROM minnesota.nwi_2009_to_2014
WHERE wetland_type = 'Freshwater Emergent Wetland' OR wetland_type = 'Freshwater Forested/Shrub Wetland'

SELECT *
FROM clflwd.nwi_clp_clflwd
WHERE wetland_ty = 'Freshwater Emergent Wetland' OR wetland_ty = 'Freshwater Forested/Shrub Wetland'

SELECT *
FROM minnesota.impaired_2020_draft_streams
WHERE NOT affected_u = 'AQC'

SELECT *
FROM minnesota.impaired_2020_draft_lakes
WHERE NOT affected_u = 'AQC'

CREATE MATERIALIZED VIEW minnesota.pwi_basins_mv
AS
SELECT *
FROM minnesota.pwi_basins
WHERE pwi_class = 'P'

CREATE MATERIALIZED VIEW minnesota.pwi_basins_wetlnd_mv
AS
SELECT *
FROM minnesota.pwi_basins
WHERE pwi_class = 'W'

SELECT *
FROM minnesota.cities_townships_unorg
WHERE ctu_class = 'TOWNSHIP'

SELECT *
FROM minnesota.cities_townships_unorg
WHERE ctu_class = 'CITY'

SELECT *
FROM minnesota.cities_townships_unorg
WHERE ctu_class = 'CITY' AND (feature_na = 'Chisago City' OR feature_na = 'Chisago Lake' OR feature_na = 'Forest Lake' OR feature_na = 'Franconia' OR feature_na = 'Scandia' OR feature_na = 'Wyoming');



CREATE MATERIALIZED VIEW sev_2020.parcels_mv_sc1
AS
SELECT *
FROM sev_2020.parcels
WHERE sc_num = 1

CREATE MATERIALIZED VIEW sev_2020.studyarea_mv_sc1
AS
SELECT *
FROM sev_2020.study_areas
WHERE sc_num = 1

/* example for county bounds */
CREATE MATERIALIZED VIEW clflwd.cntybnds_clfl_mv
AS
select *
from minnesota.county_boundaries
WHERE minnesota.county_boundaries.county_nam = 'Anoka' OR minnesota.county_boundaries.county_nam = 'Washington' OR minnesota.county_boundaries.county_nam = 'Chisago'
WITH NO DATA;

ALTER TABLE clflwd.cntybnds_clfl_mv
    OWNER TO sgrandstrand;

/* HAVE to do this command after the views are made so you can add/see them 
Need to do this on joins too */
REFRESH MATERIALIZED VIEW clflwd.nwi_clp_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_hyd_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_geo_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_con_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_wq_index_mv;
REFRESH MATERIALIZED VIEW minnesota.majorscores_comb_index_mv;
REFRESH MATERIALIZED VIEW minnesota.pwi_basins_mv;
REFRESH MATERIALIZED VIEW minnesota.pwi_basins_wetlnd_mv;

REFRESH MATERIALIZED VIEW minnesota.townships_mv;
/************************************************/
/********** NON WORKING CODE ********************/
/************************************************/

/*Need to alter the table of ID so it has not null constraint. Could cause issues otherwise. I think I should do this before creating unique index but it might not matter - THIS DOESN"T WORK. It doesn't sound like you should be changing materialized views to be not null... */
ALTER TABLE minnesota.majorscores_bio_index_mv
ALTER COLUMN id SET NOT NULL;

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