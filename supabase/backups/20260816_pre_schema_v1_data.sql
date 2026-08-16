SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict wpbrrl65ZnVZHhzYMFen7Py26oaan534GltjmR5Yo8Pe7zPOFESmBzvh2WEa33I

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: jurisdictions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jurisdictions" ("id", "created_at", "name", "code", "slug") VALUES
	(1, '2026-08-07 15:21:32.501699+00', 'Netherlands', 'NL', 'netherlands'),
	(2, '2026-08-08 06:01:21.356896+00', 'Germany', 'DE', 'germany'),
	(3, '2026-08-08 06:01:21.356896+00', 'United Kingdom', 'UK', 'united-kingdom'),
	(4, '2026-08-08 06:01:21.356896+00', 'California', 'US-CA', 'california'),
	(5, '2026-08-08 06:01:21.356896+00', 'China', 'CN', 'china');


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."topics" ("id", "created_at", "name", "slug") VALUES
	(1, '2026-08-07 15:28:52.942009+00', 'Driverless deployment', 'driverless_deployment'),
	(2, '2026-08-07 16:56:36.300688+00', 'Remote driving', 'remote_driving'),
	(4, '2026-08-07 17:01:33.245709+00', 'Legal driver status', 'legal_driver_status'),
	(5, '2026-08-07 17:05:46.457061+00', 'Remote assistance', 'remote_assistance'),
	(6, '2026-08-07 17:10:04.111622+00', 'Authorization', 'authorization'),
	(7, '2026-08-07 17:13:55.50593+00', 'Insurance', 'insurance'),
	(8, '2026-08-07 17:16:54.1507+00', 'Vehicle type approval', 'vehicle_type_approval');


--
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."claims" ("id", "created_at", "claim_text", "operational_impact", "jurisdiction_id", "topic_id", "normalized_status", "confidence", "reviewed_at") VALUES
	(1, '2026-08-07 16:02:17.144775+00', 'Driverless public-road testing is possible under a permit-based experimental framework, including experiments where the driver is located outside the vehicle.', 'Driverless operation is not generally unrestricted: an AV company must use the specific experimental authorization pathway and operate within the conditions of the permit.', 1, 1, 'Permit-dependent', 'High', '2026-08-07'),
	(2, '2026-08-07 16:57:54.73644+00', 'Public-road experiments may be authorised where the driver is located outside the vehicle.', 'A remote-driving setup is possible only within the experimental permit framework. The application must specify the location of the driver and the number of vehicles driven by that driver.', 1, 2, 'Permit-dependent', 'High', '2026-08-07'),
	(3, '2026-08-07 17:03:40.820862+00', 'A person remotely controlling the vehicle may remain the legal driver even when physically located outside the vehicle, provided that the person retains control and can intervene immediately.', 'Removing the human from the vehicle does not necessarily remove the legal driver. Under the Dutch experimental model, traditional driver-related duties may continue to attach to the remote human rather than being transferred to the ADS.', 1, 4, 'Remote human may remain driver', 'High', '2026-08-07'),
	(4, '2026-08-07 17:06:59.660774+00', 'The Dutch experimental framework does not establish remote assistance as a separate legal role distinct from remote driving or driver supervision. It instead regulates the external driver, monitoring of the driving task and remote-control arrangements.', 'An AV company should not assume that non-driving remote assistance has an independent legal status under the experimental framework. The functions performed by a remote human need to be characterised and addressed within the permit and safety assessment, particularly where they may amount to supervision or remote control.', 1, 5, 'Not specifically regulated', 'Medium', '2026-08-07'),
	(5, '2026-08-07 17:11:17.462253+00', 'public-road experiment in which the driver is located outside the vehicle requires a permit, with the application submitted to the RDW for preparation of the ministerial decision.
operational_impact → An AV company cannot launch this form of driverless testing solely on the basis of vehicle approval. It must obtain a specific experimental permit and provide the technical, operational and safety information required for the authorization process.', NULL, 1, 6, 'Permit required', 'High', '2026-08-07'),
	(6, '2026-08-07 17:15:06.939224+00', 'The experimental permit application must include evidence of adequate insurance, in addition to the mandatory motor insurance applicable to the vehicle.', 'An AV company must address both the ordinary motor insurance layer and the additional insurance evidence expected for the experiment. Experimental authorization does not replace conventional compulsory vehicle insurance.', 1, 7, 'Additional insurance evidence required', 'High', '2026-08-07'),
	(7, '2026-08-07 17:19:00.187216+00', 'EU type-approval rules are available for the automated driving systems of fully automated M and N category vehicles, including vehicles designed to operate within a predefined area or on a predefined hub-to-hub route.', 'An AV company may use the EU ADS type-approval framework for qualifying fully automated vehicles, but type approval does not by itself establish a right to conduct unrestricted driverless operations on Dutch public roads. National road-use and operational authorization requirements must be assessed separately.', 1, 8, 'EU type approval available', 'High', '2026-08-07');


--
-- Data for Name: sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."sources" ("id", "created_at", "title", "official_url", "authority", "source_type", "status", "effective_at", "last_checked") VALUES
	(1, '2026-08-07 16:10:23.799233+00', 'Experimenteerwet zelfrijdende auto', 'https://zoek.officielebekendmakingen.nl/stb-2018-347.html', 'Government of the Netherlands', 'legislation', 'in_force', '2019-07-01', '2026-08-07'),
	(2, '2026-08-07 16:50:09.887863+00', 'Regeling vergunningverlening experimenten zelfrijdende auto', 'https://zoek.officielebekendmakingen.nl/stcrt-2019-34245.html', 'Ministry of Infrastructure and Water Management', 'regulation', 'in_force', '2019-07-01', '2026-08-07'),
	(3, '2026-08-07 17:02:23.707508+00', 'Kamerstuk 34838, nr. 4', 'https://zoek.officielebekendmakingen.nl/kst-34838-4.html', 'Council of State / Dutch Parliament', 'legislative_materials', 'official', NULL, '2026-08-07'),
	(4, '2026-08-07 17:17:59.818558+00', 'Commission Implementing Regulation (EU) 2022/1426', 'https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32022R1426', 'European Commission', 'regulation', 'in_force', '2022-09-15', '2026-08-07');


--
-- Data for Name: claim_sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."claim_sources" ("id", "created_at", "claim_id", "source_id", "support_type", "provision") VALUES
	(1, '2026-08-07 16:39:10.554286+00', 1, 1, 'direct', NULL),
	(2, '2026-08-07 16:53:50.298084+00', 1, 2, 'direct', 'Article 2; Article 4; explanatory notes'),
	(3, '2026-08-07 16:58:52.828382+00', 2, 2, 'direct', 'Articles 2 and 4(1)(a)(5)'),
	(4, '2026-08-07 17:04:37.557951+00', 3, 3, 'direct', 'Section 1 — De “bestuurder”'),
	(5, '2026-08-07 17:08:20.003732+00', 4, 2, 'interpretation', 'Article 1(2)(a)-(c); Article 4(1)(i); explanatory notes to Articles 1 and 4'),
	(6, '2026-08-07 17:12:19.848442+00', 5, 2, 'direct', 'Article 2; explanatory notes — Inleiding'),
	(7, '2026-08-07 17:15:52.697715+00', 6, 2, 'direct', 'Article 4(1)(f); explanatory notes to Article 4'),
	(8, '2026-08-07 17:19:45.339333+00', 7, 4, 'direct', 'Article 1');


--
-- Name: claim_sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."claim_sources_id_seq"', 8, true);


--
-- Name: claims_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."claims_id_seq"', 7, true);


--
-- Name: jurisdictions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."jurisdictions_id_seq"', 5, true);


--
-- Name: sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."sources_id_seq"', 4, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."topics_id_seq"', 8, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict wpbrrl65ZnVZHhzYMFen7Py26oaan534GltjmR5Yo8Pe7zPOFESmBzvh2WEa33I

RESET ALL;
