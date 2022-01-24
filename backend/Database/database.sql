CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    username varchar(50),
    passwrd varchar(255),
    user_type numeric
);

CREATE TABLE IF NOT EXISTS marfa (
    tip_marfa varchar(15)
);

CREATE TABLE IF NOT EXISTS transportatori (
    transportatorID SERIAL PRIMARY KEY,
    userID INTEGER,
    firstName varchar(50),
    lastName varchar(50),
    telefon varchar(15),
    email varchar(50),
    FOREIGN KEY(userID) REFERENCES users(userID)
);

CREATE TABLE IF NOT EXISTS expeditori (
    expeditorID SERIAL PRIMARY KEY,
    userID INTEGER,
    firstName varchar(50),
    lastName varchar(50),
    telefon varchar(15),
    email varchar(50),
    FOREIGN KEY(userID) REFERENCES users(userID)
);

CREATE TABLE IF NOT EXISTS contracte (
    contractID SERIAL PRIMARY KEY,
    transportatorID INTEGER,
    expeditorID INTEGER,
    cerereID INTEGER,
    FOREIGN KEY(transportatorID) REFERENCES transportatori(transportatorID),
    FOREIGN KEY(expeditorID) REFERENCES expeditori(expeditorID),
    FOREIGN KEY(cerereID) REFERENCES cereri(cerereID)
);

CREATE TABLE IF NOT EXISTS camion (
    camionID SERIAL PRIMARY KEY,
    transportatorID INTEGER,
    tip_camion VARCHAR(20),
    volum INTEGER,
    latime INTEGER,
    lungime INTEGER,
    inaltime INTEGER,
    greutate INTEGER,
    disponibilitate VARCHAR(20),
    FOREIGN KEY(transportatorID) REFERENCES transportatori(transportatorID)
);

CREATE TABLE IF NOT EXISTS curse (
    cursaID SERIAL PRIMARY KEY,
    camionID INTEGER,
    data_plecarii DATE,
    locul_plecarii VARCHAR(20),
    data_sosirii DATE,
    locul_sosirii VARCHAR(20),
    pret_km_gol INTEGER,
    pret_km_incarcat INTEGER,
    FOREIGN KEY(camionID) REFERENCES camion(camionID)
);

CREATE TABLE IF NOT EXISTS cereri (
    cerereID SERIAL PRIMARY KEY,
    expeditorID INTEGER,
    tip_marfa VARCHAR(50),
    masa INTEGER,
    volum INTEGER,
    data_plecarii DATE,
    data_max_plecarii DATE,
    locul_plecarii VARCHAR(50),
    data_sosirii DATE,
    data_max_sosirii DATE,
    locul_sosirii VARCHAR(50),
    buget INTEGER,
    stare VARCHAR(50),
    FOREIGN KEY(expeditorID) REFERENCES expeditori(expeditorID)
);


-- drop table cereri;
-- drop table curse;
-- drop table camion;
-- drop table transportatori;
-- drop table expeditori;
