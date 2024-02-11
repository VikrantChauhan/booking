## ✨ Bus Booking API

This app is built on express js - `A light-weight Nodejs Framework`. It has jwt authentication added with protected routes.

## 🚀 Usage

Make sure you have `nodejs` installed

Just run the following command at the root of your project and answer questions:

```sh
cd ./your_project
```

Followed by:

```sh
npm install
```

Just run project with:

```sh
npm start
```

## 🚀 API Documentation

Postman documentation Link ( app hosted on aws - http://ec2-13-201-91-115.ap-south-1.compute.amazonaws.com/ ) - https://documenter.getpostman.com/view/6757680/2s9YywdeAu

`User`

1. Register a user with name, email and password.
2. Login with email and password.
3. Copy the jwt token from reponse and put it as Authorization value in header.

`Booking`

1. Create a bus with name and number of seats.
2. Patch API to update the status of seat - booked / open. (Use Authorization in header).
3. Admin can use reset patch API to reset all seats to open.

## Author

👤 **Vikrant Chauhan**
