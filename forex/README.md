# Foreign Currency BE - Shopee ID Test

## About this app
This APIs will be used by front-end engineers to develop an application that store and display foreign
exchange rate for currencies on a daily basis. Developed using:
1. Node.js with Express framework
2. MySQL with Sequelize framework
3. HTML and JQuery

## How to run this app
### Via Docker
1. Install Docker from
2. Access the app folder via CMD, then run `docker-compose up`
3. This APIs will run on localhost at port 3000 (<http://localhost:3000>)

### Manual
1. Nyalakan server MySQL, lalu buat sebuah database dengan nama "forex", dengan username "forex" dan password "forex1234".
2. Jalankan file database.js melalui node `node database.js`. File ini akan otomatis membuat semua tabel yang dibutuhkan sesuai struktur yang telah dimodelkan pada database.
3. 

## After running this app
1. You can access all the APIs via Postman, click here.
2. You can access the app, here are the list of all pages.

## Main dependencies
1. Node.js
2. MySQL

## APIs Docs
You can access the docs via
1. Postman collection (<https://www.getpostman.com/collections/091d2c13f1024e9a5895>)
2. Published Docs uding Postman ()

## Struktur Database dan Penjelasannya
Aplikasi ini dikembangkan dengan model arsitektur MVC (Model-View-Controller). Seluruh struktur database dimodelkan dengan ORM pada framework Sequelize yang disimpan pada folder "models". Apabila digambarkan secara sederhana ke dalam class diagram, struktur dan relasi antar tabel dari database tersebut dapat digambarkan seperti pada gambar di bawah ini.

Terdapat dua tabel, yaitu Forex dan Log. Forex adalah tabel untuk menyimpan daftar forex. Terdapat dua atribut utama di tabel Forex, yaitu "from" dan "to". Log adalah tabel untuk mencatat seluruh rate setiap forex per tanggal. Terdapat tiga atribut utama di tabel Log, yaitu "date", "rate", dan "forex_id". "forex_id" adalah atribut di tabel Log yang merupakan foreign key untuk menghubungkan antara tabel Log dengan tabel Forex. 

## Ada masalah? atau ada pertanyaan?
Silahkan kontak saya melalui surel aslamabdurrohim@gmail.com atau akun LINE aslamabdurrohim.

Terima kasih.

Muhammad Aslam Abdurrohim