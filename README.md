# nodejs-express-vuejs-mongodb
[vi]
>Express là 1 trong những framework của web application
* Cần biết: JS, hiểu về builtin cơ bản FS,path
* Biết sử dụng package cơ bản npm
* Biết databae căn bản
>Kiến thức học được:
* Exppress
-Khởi tạo dự án
-Cài nodemon để live server
* Router 
* Middleware
- Middleware nào áp dụng trước thì chạy trước
* Cấu hình các method POST,PUT,GET,DELETE
-Cài body-parser để đổ data vào request, dữ liệu được truyền từ body (kiến thức trên đã lỗi thời với express bản hiện tại nay không cần thêm gì nữa :D)
* Authenticate 
* Restful API
* Express static
* Bài toán phân trang
* Cơ chế CORS
* JWT và xác thực phân quyền sử dụng API
* OAUTH2 đăng nhập ( face,google)
>MongoDB:
-Tải và cài đặt tại
https://www.mongodb.com/try/download/community 
- Tải mongo compass cho GUI hoặc mongoRobo
- Tạo db tên club-manager
- DB->Collection->document | Schema cho document
- Tạo collection tên Users
- Cài package mongoose
- Tạo CURD trong file connectDB.js
- Operator trong mongoose
- Populate nối bảng