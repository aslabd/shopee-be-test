# Foreign Currency BE - Shopee ID Test

## About this app
This APIs will be used by front-end engineers to develop an application that store and display foreign
exchange rate for currencies on a daily basis. Developed using:
1. Node.js with Express framework
2. MySQL with Sequelize framework

## How to run this app
### Via Docker
1. Access the app folder via CMD, then run `docker-compose up --build`
2. This APIs will run on localhost at port 3000 (<http://localhost:3000>)

### Secara Manual
1. Pull repository ini di suatu folder.
2. Masuk ke dalam folder "forex".
3. Jalankan `npm install` pada root aplikasi.
4. Nyalakan server MySQL. Buat sebuah database baru bernama "forex".
5. Jalankan file database.js melalui node dengan perintah `node database.js`
5. Jalankan aplikasi dengan perintah `npm start`.

## Main dependencies
1. Node.js
2. MySQL

## APIs Docs
Dokumentasi dapat dilihat pada:
1. Postman collection (<https://www.getpostman.com/collections/091d2c13f1024e9a5895>)
2. Published Docs using Postman (<>)

## Struktur Database dan Penjelasannya
Aplikasi ini dikembangkan dengan model arsitektur MVC (Model-View-Controller). Seluruh struktur database dimodelkan dengan ORM pada framework Sequelize yang disimpan pada folder "models". Apabila digambarkan secara sederhana ke dalam class diagram, struktur dan relasi antar tabel dari database tersebut dapat digambarkan seperti pada gambar di bawah ini.

![alt text](https://raw.githubusercontent.com/aslabd/shopee-be-test/master/forex/class-diagram.png "Class Diagram")

Terdapat dua tabel, yaitu Forex dan Log. Forex adalah tabel untuk menyimpan daftar forex. Terdapat dua atribut utama di tabel Forex, yaitu "from" dan "to". Log adalah tabel untuk mencatat seluruh rate setiap forex per tanggal. Terdapat tiga atribut utama di tabel Log, yaitu "date", "rate", dan "forex_id". "forex_id" adalah atribut di tabel Log yang merupakan foreign key untuk menghubungkan antara tabel Log dengan tabel Forex. 

## Ada masalah? atau ada pertanyaan?
Silahkan kontak saya melalui surel aslamabdurrohim@gmail.com atau akun LINE aslamabdurrohim.

Terima kasih.

Muhammad Aslam Abdurrohim