**Objective:**
The objective of Doccure brings health practitioners and patients along and permits patients to speak with practitioners and obtain individual healthcare recommendations. Helping peoples to look for specialist doctors and obtain appointment is our main objective.
To build a system with perfection, requirement collection is a must. Patient can also book diagnosis test prescribed by the doctors and download test reports.

**Proposed System:**
In the proposed system the doctors and patients are brought to one platform will allow patients to be more flexible they can register and search for the doctors basing on the location the list of doctors will be shown and patient can book by selecting the time slots and the doctor will confirm the booking so everything is computerized an done very fast which will save time. Patient also book a diagnosis test that is prescribed by doctors after consultation or appointment. Admin can control overall system.

**System Diagram:**
![image](https://github.com/vivekkal/DoccureWeb/assets/45705158/4a99ccdc-aa72-400a-9c53-ec94c5538e6d)
* The proposed system is 3-tier architecture in which there are 4 users that is patient, doctor, pathology and admin. When the user first visits Doccure he will be displayed all the available features on the homepage with a navigation bar that would navigate the user to different sections of the web app.
* All the users need to register on the web application as per their role like patient who need healthcare services, Doctor as Health Expert and Pathology Lab as Diagnosis test provider. After Registration Patient can search doctors as per their need and book appointment with doctor. Appointment booking request is shown on the doctor dashboard and doctor can confirm or cancel the appointment. After confirmation from the patient can able to see the appointment date with doctor. Patient can consult with doctor through Chat or Video Call about their health issues and take prescription from the doctor.
* Health expert’s that are doctors can register their self on the Doccure and mention their Specialization, Services and time slots. Doctor also mention their fees and give good health tips to patient. Pathology Lab can register on the system and mentions which diagnosis test are available in their lab. If doctor prescribed to patient to take diagnosis test then patient can book diagnosis test online through our system. After testing pathology lab can send reports to the patient through our system. Patient can view and download test reports from their account.
* Admin can control overall system and see patient doctor and pathology lab data. Admin can authenticate user’s credentials. To store all the data we used MongoDB database. It is document-oriented database program and classified as a NoSQL database program.

**Doccure Data Model:**
![image](https://github.com/vivekkal/DoccureWeb/assets/45705158/32583ece-fe0d-4f74-aed8-bfc9b689ac72)

**Implementation Details:**
The below Figure shows the high-level conceptual view and interaction of the Doctor's Appointment and Prescription system. In this system a registered user can request for particular doctor's appointment then the system will send an acknowledgment to the patient if the doctor accepts the request and the doctor writes a prescription through the system. The admin can control and manage the whole system.
![image](https://github.com/vivekkal/DoccureWeb/assets/45705158/f187247a-e058-4cf3-b0df-096969bcc867)

To implement this system we used MERN technology. This technology stack is a set of frameworks and tools used to develop a software product. This set of frameworks and tools are very specifically chosen to work together in creating a well-functioning software. MERN stack is a web development framework. It consists of MongoDB, ExpressJS, ReactJS, and NodeJS as its working components.
**ReactJS:**
React.js is an open-source JavaScript library for designing user interfaces. It is efficient, flexible, and allows us to create reusable UI components. Hence, we implemented a user interface using this library because it has reusable codes that make it simple to use and learn. React library has JSX (JavaScript XML), which is HTML-like syntax, which is processed into JavaScript calls. We have designed the UI of our whole system using ReactJS.
**NodeJS:**
Node.js is an open-source and cross-platform runtime environment for executing JavaScript code outside a browser. It uses JavaScript everywhere so it's easy for a JavaScript programmer to build back-end services using Node.js. Hence, we have used NodeJS for text chat and video call features of a patient consulting a doctor.
**ExpressJS:**
Express.js is a Node.js framework. It's the most popular framework as of now (the most starred on NPM). It is usually beneficial because we don't have to repeat the same code over and over again. Node.js is a low-level I/O mechanism that has an HTTP module.
**MongoDB:**
MongoDB is a document-oriented NoSQL database used for high-volume data storage. Instead of using tables and rows as in the traditional relational databases, MongoDB makes use of collections and documents. We have used MongoDB Atlas to store the data of our web application. MongoDB Atlas is a fully-managed cloud database that stores, manage, and deploys data on cloud service providers such as AWS, and Azure. It reduces management time and cost, which saves valuable resources for other tasks.
**Socket.io:** 
Socket.IO is a JavaScript library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. It has two parts, a client-side library that runs in the browser, and a server-side library for node.js. Both components have an identical API. Sockets have traditionally been the solution around which most real-time systems are architected, providing a bi-directional communication channel between a client and a server. This means that the server can push messages to clients. Whenever an event occurs, the idea is that the server will get it and push it to the concerned connected clients. Thus, we used socket.io to add video and chat functionality.
**NodeMailer:** 
Nodemailer is a single module with zero dependencies for Node.js, designed for sending emails. Its main features include platform-independence, security in particular email delivery with TLS/STARTTLS and DKIM email authentication, Unicode support, HTML content and embedded image attachments, different transport methods besides SMTP support etc. Nodemailer is a Node.js module that allows us to send emails from our server with ease. Whether we want to communicate with our users or just notify ourself when something has gone wrong, one of the options for doing so is through mail. 
**React-to-PDF:** A Library React-to-PDF is used for generating the PDF. This library converts HTML elements into PDF. We need to pass a reference of an HTML element to the library and it generates the PDF for that element.


