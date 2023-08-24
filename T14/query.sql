CREATE TABLE jurusan(
    id  CHAR(3) PRIMARY KEY NOT NULL,
    nama VARCHAR(100) NOT NULL
);

CREATE TABLE matakuliah(
    id CHAR( 3) PRIMARY KEY NOT NULL,
    nama VARCHAR(100) NOT NULL,
    SKS INTEGER(1) NOT NULL
);

CREATE TABLE dosen(
    nip CHAR(5) PRIMARY KEY NOT NULL,
    nama VARCHAR(100) NOT NULL
);

CREATE TABLE mahasiswa(
    nim CHAR(6) PRIMARY KEY NOT NULL,
    nama VARCHAR(50) NOT NULL,
    alamat VARCHAR(100) NOT NULL,
    idjurusan char(3) NOT NULL,
    FOREIGN KEY(idjurusan) REFERENCES jurusan(id)
);

INSERT INTO jurusan(id, nama) VALUES
("001", "Teknik Informatika"),
('002', "Sistem Informasi"),
("003", "Manajemen");

INSERT INTO matakuliah (id, nama, SKS) VALUES
("1301", "Algoritma", "3"),
("1302", "Basis Data", "2"),
("1303", "Java", "3"),
("1304", "PPKN", "2"),
("1305", "Machine Learning", "3");

INSERT INTO dosen(nip, nama) VALUES
("001DN", "Aisyah"),
("002DN", "Kulsum"),
("003DN", "Dani"),
("004DN", "Budi");

INSERT INTO mahasiswa(nim, nama, alamat, idjurusan) VALUES
("230001", "Fadli", "Ciamis", "001"),
("230002", "Rahman", "Bandung", "001"),
("230003", "Fatih", "Bandung", "002"),
("230004", "Kila", "Sumedang", "002"),
("230005", "Bunga", "Sumedang", "003"),
("230006", "Zena", "Jakarta", "003");

CREATE TABLE kontrak(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nim CHAR(6) NOT NULL,
    idmatakuliah CHAR(3) NOT NULL,
    nip CHAR(5) NOT NULL,
    sks CHAR(1) NOT NULL,
    nilai VARCHAR(1) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(idmatakuliah) REFERENCES matakuliah(id),
    FOREIGN KEY(nip) REFERENCES dosen(nip)
);


INSERT INTO kontrak(nim, idmatakuliah, nip, sks, nilai) VALUES
("230001", "1301","001DN", 3, "A"),
("230001", "1302","002DN", 2, "B"),
("230001", "1303","003DN", 3, "B"),
("230002", "1303","003DN", 3, "A"),
("230003", "1304","004DN", 2, "C"),
("230004", "1305","003DN", 3, "D");

UPDATE kontrak SET nilai="A" WHERE id=1;
UPDATE kontrak SET nilai="A" WHERE id=2;
UPDATE kontrak SET nilai="A" WHERE id=5;
UPDATE kontrak SET nilai="B" WHERE id=6;


-- SELECT * FROM (namatabel); <-- menampilkan tabel tertentu
-- DROP TABLE (namatabel); <-- menghapus tabel

-- UPDATE kontrak SET nilai="A" WHERE id=1;
-- / UPDATE *namatabel* <-- memilih tabel yang akan di update
-- / SET *namafield*=A <-- memilih field yang akan di update, =A adalah nilai baru yang akan replace nilai lama
-- / WHERE *namafield*id=1 <-- membatasi bahwa yang akan  di update adalah kolom id dengan number id ke-1

-- .schema *masukannamatabel* <-- untuk melihat struktur data di tabel
-- .headers on <-- untuk menampilkan header yang ada di tabel tersebut
-- .mode column <-- untuk merapihkan tabel dengan meghilangkan 'VERTICAL BAR' menjadi 'SPACE BAR'