create table if not exists movies(
    id serial primary key,
    title varchar(255),
    relase_date integer,
    comments varchar(10000),
    rating integer
);
