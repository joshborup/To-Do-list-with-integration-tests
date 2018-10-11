drop table if exists todos;

create table if not exists todos (
  id serial primary key,
  name text not null unique,
  description text,
  created_at timestamp not null
);

insert into todos (name, description, created_at) values
('Get Groceries','bananas, bread, milk', '2018-10-07T07:00:00'),
('Walk Dogs',null, '2018-10-07T07:00:01'),
('Pick up kids', 'Yell at sean for failing his spelling test', '2018-10-07T07:00:02');