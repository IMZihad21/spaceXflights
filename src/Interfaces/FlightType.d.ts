// Generated interfaces from https://api.spacexdata.com/v3/launches (2020-07-01)

export interface FlightType {
  flight_number: number;
  mission_name: string;
  mission_id?: null[] | null;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number;
  rocket: Rocket;
  ships?: string[] | null;
  telemetry: Telemetry;
  launch_site: LaunchSite;
  launch_success: boolean;
  links: Links;
  details: string;
  upcoming: boolean;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  timeline: Timeline;
  crew?: null;
}
export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: FirstStage;
  second_stage: SecondStage;
  fairings: Fairings;
}
export interface FirstStage {
  cores?: CoresEntity[] | null;
}
export interface CoresEntity {
  core_serial: string;
  flight: number;
  block: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  land_success: boolean;
  landing_intent: boolean;
  landing_type: string;
  landing_vehicle?: null;
}
export interface SecondStage {
  block: number;
  payloads?: PayloadsEntity[] | null;
}
export interface PayloadsEntity {
  payload_id: string;
  norad_id?: number[] | null;
  reused: boolean;
  customers?: string[] | null;
  nationality: string;
  manufacturer: string;
  payload_type: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
  orbit: string;
  orbit_params: OrbitParams;
}
export interface OrbitParams {
  reference_system: string;
  regime: string;
  longitude?: null;
  semi_major_axis_km?: null;
  eccentricity?: null;
  periapsis_km?: null;
  apoapsis_km?: null;
  inclination_deg?: null;
  period_min?: null;
  lifespan_years: number;
  epoch?: null;
  mean_motion?: null;
  raan?: null;
  arg_of_pericenter?: null;
  mean_anomaly?: null;
}
export interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ship?: null;
}
export interface Telemetry {
  flight_club?: null;
}
export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}
export interface Links {
  mission_patch: string;
  mission_patch_small: string;
  reddit_campaign?: null;
  reddit_launch: string;
  reddit_recovery?: null;
  reddit_media?: null;
  presskit: string;
  article_link: string;
  wikipedia: string;
  video_link: string;
  youtube_id: string;
  flickr_images?: string[] | null;
}
export interface Timeline {
  webcast_launch: number;
}
