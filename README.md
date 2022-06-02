# 💪 BilFit (Gym Management)
CS319 Spring 2022 Group Project
### ~ Veni Vidi Code ~

### 📃 Group Members
- [Ferhat Korkmaz 21901940](https://github.com/ferhatkorkmaz11)    
- [Kaan Tek 21901946](https://github.com/KaanTekTr)
- [Kerem Şahin 21901724](https://github.com/KeremSahin22)
- [Melih Fazıl Keskin 21901831](https://github.com/MelihFazl)
- [Miray Ayerdem 21901987](https://github.com/mirayayerdem)

### 🖋️ Description
BilFit is a website spesifically designed for Bilkent University to manage the sports activites and the gym usage in the campus.  With this all-around website with user friendly design,  not only can students maintain a healthy life , but also the gym staff can easily keep track of the reservations of the activities in the sports facilities in Bilkent University.

### 🛠️ Features
- There are be three types of users as gym member, gym staff and admin
- Admin can add and delete the accounts of gym members and gym staff since there is not a register function for users.
- Normal user authentication is provided by Student ID
- Keeping the personal record of users (height, weight, e-mail, phone number etc.)
- Reservation making and cancelling as a user for necessary activities like gym, swimming pool etc. 
- Reservation can be done for all gyms in the campus (Main Sports Hall, East Sports Hall, Dormitories Sports Hall). 
- Managing the reservations as gym staff (monitoring, approving, cancelling)
- Gym staff is able to restrict some Gym Members. The restricted gym members are not able to make any reservation.
- Announcements related to sport tournaments etc. is visible.
- Registration for tournaments is available for the gym members.
- Requesting personal gym program from the staff. Staff can see and give a response to the requests by sending a gym program.
- Registration for tournaments is available for the gym members.
- Gym staff is able to manage tournaments and courses.

### 🤵‍♂️🤵‍♀️ Actors
- Admin
- Gym Staff
- Gym Member

### 📑 Reports
- [Requirement Analysis Report](Reports/VeniVidiCode_RequirementAnalysis_Iteration2.pdf.pdf)
- [Design Report](Reports/VeniVidiCode_Detailed_Design_Iteration2.pdf.pdf)
- [Final Report](VeniVidiCode_Final_Report.pdf.pdf)

### 🎥 Demo
- [Demo Video](https://youtu.be/pTd-nj87Mrc)

### ⚙️ Build Instructions
1. Install XAMPP. Then, start Apache and MySQL servers.
2. Clone our repository https://github.com/MelihFazl/bilfit.
3. Navigate to the path /bilfit/backend/bilfit from the cloned project and open IntelliJ from
there. Then, please wait for the Maven indexing to finish.
4. Open “”application.properties” which can be found under “src/main/resources”. Then,
change the value 5551 on line “spring.datasource.url=jdbc:mysql://localhost:5551/bilfit”
according to your MySQL port that can be found on XAMPP.
5. Go to the browser and type “”localhost/phpmyadmin”.
6. Create a new database called “bilfit”.
7. Now, you can run “BilfitApplication.java” under “src/main/java/com.venividicode.bilfit/”.
8. If everything works fine, you should be able to make a HTTP request to the server.
9. Install Postman. Then, make a GET request to the following endpoint:
“http://localhost:8080/initConstants”. This will allow to initiate necessary entities to
successfully start the application such as an admin user with id 444 and password
“admin”, sport centers, and sport locations.
10. If query is successful, you should get the response as “true”.
11. On terminal, cd into the root directory of the cloned project which is simply “bilfit”. From
there run the command “npm install”. Then run the command “npm start”. Note that you
need to have Node.js installed on your computer in order to run “npm” commands. If you
don’t have this installed, simply download it from the internet.
12. After “npm start”, you should be able to see the application running on your browser. If
you cannot see it, you can visit “localhost:3000, localhost:3001, localhost:3002...”
13. If everything works fine, you should see the login page of Bilfit on your browser. Choose
admin from the radio button under the input fields, and then login with the credentials
given on step 9.
14. After logging in, please follow 3.1 Admin under 3. User’s Guide to get detailed
information about adding new users (In Final Report).
