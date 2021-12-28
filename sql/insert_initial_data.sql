-- Adminer 4.7.7 PostgreSQL dump

\connect "rent";

INSERT INTO "tariffs" ("name", "price_per_day", "id", "max_rent_sessions_days") VALUES
('Базовый',	1000.00,	1,	30);


INSERT INTO "tariff_rules" ("tariff_id", "start_day", "end_day", "discount", "id") VALUES
(1,	1,	4,	0,	1),
(1,	5,	9,	5,	2),
(1,	10,	17,	10,	3),
(1,	18,	29,	15,	4);

-- 2021-12-28 15:14:44.111882+00
