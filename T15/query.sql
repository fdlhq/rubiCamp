CREATE TABLE jurusan(
    idjurusan  CHAR(3) PRIMARY KEY NOT NULL,
    namajurusan VARCHAR(100) NOT NULL
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
("1306", "Data Mining", "3");

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
    jurusanmahasiswa VARCHAR(50) NOT NULL,
    idmatakuliah CHAR(3) NOT NULL,
    nip CHAR(5) NOT NULL,
    sks CHAR(1) NOT NULL,
    nilai VARCHAR(1) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(idmatakuliah) REFERENCES matakuliah(id),
    FOREIGN KEY(nip) REFERENCES dosen(nip),
    FOREIGN KEY(jurusanmahasiswa) REFERENCES jurusan(idjurusan)
);

INSERT INTO kontrak(nim, jurusanmahasiswa, idmatakuliah, nip, sks, nilai) VALUES
("230001", "001", "1301", "001DN", 3, "A"),
("230001", "001", "1302", "002DN", 2, "B"),
("230001", "001", "1303", "003DN", 3, "B"),
("230001", "001", "1306", "001DN", 3, "A"),
("230001", "001", "1305", "003DN", 3, "C"),
("230001", "001", "1304", "004DN", 2, "B"),
("230002", "001", "1303", "003DN", 3, "A"),
("230002", "001", "1306", "001DN", 3, "A"),
("230003", "002", "1304", "004DN", 2, "C"),
("230003", "002", "1301", "001DN", 3, "A"),
("230003", "002", "1302", "002DN", 2, "B"),
("230003", "002", "1303", "003DN", 3, "B"),
("230003", "002", "1306", "001DN", 3, "A"),
("230004", "002", "1305", "003DN", 3, "D"),
("230005", "003", "1305", "003DN", 3, "D"),
("230006", "003", "1306", "001DN", 3, "A");

UPDATE kontrak SET nilai="D" WHERE id=16;
UPDATE kontrak SET nilai="E" WHERE id=11;
UPDATE kontrak SET nilai="D" WHERE id=5;
UPDATE kontrak SET nilai="E" WHERE id=13;

ALTER TABLE jurusan RENAME COLUMN nama to namajurusan;



=========================
--1-- Tampilkan seluruh data mahasiswa beserta nama jurusannya
--cara 1 dengan menggunakan sub query dan kedua menggunakan left join
SELECT *, (SELECT namajurusan FROM jurusan WHERE jurusan.idjurusan=mahasiswa.idjurusan) AS namajurusan FROM mahasiswa; 
SELECT nim, nama, alamat, tanggallahir, namajurusan FROM mahasiswa LEFT JOIN jurusan ON mahasiswa.idjurusan = jurusan.idjurusan;
==========================



ALTER TABLE mahasiswa
ADD tanggallahir DATE;

UPDATE mahasiswa
SET tanggallahir='1995-01-06'
WHERE nim=230001;

UPDATE mahasiswa
SET tanggallahir='2006-03-07'
WHERE nim=230002;

UPDATE mahasiswa
SET tanggallahir='1998-11-11'
WHERE nim=230003;

UPDATE mahasiswa
SET tanggallahir='2003-12-16'
WHERE nim=230004;

UPDATE mahasiswa
SET tanggallahir='2007-05-17'
WHERE nim=230005;

UPDATE mahasiswa
SET tanggallahir='2005-02-14'
WHERE nim=230006;

INSERT INTO mahasiswa (nim, nama, alamat, idjurusan, tanggallahir)
VALUES ('230007', 'Bimbim', 'Bekasi', '001', '2005-08-17');



=========================
--2-- Tampilkan mahasiswa yang memiliki umur dibawah 20 Tahun
SELECT nim, nama, (strftime('%Y','now')- strftime('%Y',tanggallahir)) AS umur FROM mahasiswa WHERE umur < 20;
=========================



=========================
--3-- Tampilkan mahasiswa yang memiliki nilai "B" keatas
SELECT nama, nilai FROM mahasiswa LEFT JOIN kontrak ON mahasiswa.nim = kontrak.nim WHERE nilai <= "B";
=========================



=========================
--4-- Tampilkan mahasiswa yang memiliki SKS lebih dari 10
SELECT nim, SUM(sks) AS totalsks FROM kontrak GROUP BY nim; 
=========================



=========================
--5-- Tampilkan mahasiswa yang mengambil mata kuliah data mining
SELECT DISTINCT kontrak.nim, kontrak.idmatakuliah FROM kontrak JOIN matakuliah on matakuliah.id = kontrak.idmatakuliah
WHERE kontrak.idmatakuliah = "1306"; 
=========================



=========================
--6-- Tampilkan jumlah mahasiswa untuk setiap dosen
SELECT nip, COUNT(nim) AS jumlahmahasiswa FROM kontrak GROUP BY nip; 
=========================



=========================
--7-- Urutkan mahasiswa berdasarkan umurnya
SELECT nim, nama, (strftime('%Y','now')- strftime('%Y',tanggallahir)) AS umur FROM mahasiswa WHERE umur
ORDER BY tanggallahir ASC;
=========================



=========================
--8-- Tampilkan kontrak mata kuliah yang harus diulang (nilai D dan E), serta tampilkan
----- data mahasiswa, jurusan dan dosen secara lengkap, gunakan mode JOIN dan WHERE clause(solusi terdiri dari 2 syntax SQL)
SELECT * FROM kontrak JOIN dosen ON kontrak.nip = dosen.nip
JOIN jurusan ON kontrak.jurusanmahasiswa = jurusan.idjurusan WHERE nilai >= "D";
=========================


-- SELECT * FROM (namatabel); <-- menampilkan tabel tertentu
-- DROP TABLE (namatabel); <-- menghapus tabel

-- UPDATE kontrak SET nilai="A" WHERE id=1;
-- / UPDATE *namatabel* <-- memilih tabel yang akan di update
-- / SET *namafield*=A <-- memilih field yang akan di update, =A adalah nilai baru yang akan replace nilai lama
-- / WHERE *namafield*id=1 <-- membatasi bahwa yang akan  di update adalah kolom id dengan number id ke-1

-- .schema *masukannamatabel* <-- untuk melihat struktur data di tabel
-- .headers on <-- untuk menampilkan header yang ada di tabel tersebut
-- .mode column <-- untuk merapihkan tabel dengan meghilangkan 'VERTICAL BAR' menjadi 'SPACE BAR'
-- .width 5 <-- memberi jarak di kolom id sebesar 5