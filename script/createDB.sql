drop table if exists customer;
drop table if exists item;

create table customer (
  id serial primary key,
  email varchar not null unique,
  firstname varchar,
  lastname varchar,
  password varchar not null
);

alter table customer
  owner to webshop;

-- create unique index customer_index
  -- on customer (email, password);
  
create table item (
  id serial primary key,
  title varchar not null,
  description varchar not null,
  price numeric (12,2) not null,
  image varchar,
  seller_id integer not null references customer (id),
  buyer_id integer references customer (id),
  sold timestamp -- without time zone or with time zone?
);

alter table item
  owner to webshop;
  
  