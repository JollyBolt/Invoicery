## Demo
Check out the site [here](https://invoicery.ishansen.in/).
<h1 align="center"> Invoicery </h1>
<p align="center">
<img  src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"  />
<img  src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"  />
<img  src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"  />
<img  src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"  />
<img  src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"  />
<img  src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"  />
<img  src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"  />

</p>
<p>Invoicery is a GST billing software that allows users to create complex GST bills in under a minute. The software also enables the storage of product, customer, and invoice information. Users can print invoices in PDF format and access a comprehensive dashboard displaying various analytics.</p>

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Installation](#installation)
<!-- - [Usage](#usage) -->
<!-- - [Contributing](#contributing)
- [License](#license) -->

## Features

- **Rapid GST Bill Creation:** Generate complex GST bills in less than a minute.
- **Data Management:** Store and manage product, customer, and invoice information.
- **PDF Invoices:** Print invoices in PDF format.
- **Analytics Dashboard:** View comprehensive analytics including:
  - Total revenue
  - Number of invoices issued
  - Total products and customers
  - Yearly revenue per month
  - Monthly revenue breakdown by customer
- **Interactive Charts:** Utilize area charts, bar charts, and pie charts for data visualization.
- **Customer-specific Analytics:** Detailed analytics page for each customer.


## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **State Management:** Redux Toolkit
- **PDF Generation:** react-to-print
- **Tables:** tanstack table
- **Authentication:** JSON Web Tokens (JWT)
- **Form Handling:** react-hook forms
- **Charts:** Recharts

## Screenshots

- **Dashboard:**
<img src="https://github.com/user-attachments/assets/72be3713-6c74-4878-bf21-f2b46ce29f56">

- **Customer Detail:**
<img src="https://github.com/user-attachments/assets/1602c548-b1d1-4d39-aa83-fd222301da51">

- **Invoice Table:**
<img src="https://github.com/user-attachments/assets/b3302686-eb8d-429a-b144-46e96c4a6e7d">

- **Edit Invoice:**
<img src="https://github.com/user-attachments/assets/03d103ef-18b0-47b1-a9a1-72e12fa969f2">

## Installation

### Frontend

1. Clone the repository:

    ```sh
    git clone https://github.com/JollyBolt/Invoicery.git
    ```

2. Navigate to the project directory:

    ```sh
    cd invoicery
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    VITE_URL = your_server_url
    ```

5. Start the development server:

    ```sh
    npm run dev
    ```

### Backend 

1. Clone the server repository:

    ```sh
    git clone https://github.com/JollyBolt/Invoicery-server.git
    ```

2. Navigate to the project directory:

    ```sh
    cd invoicery-server
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT = XXXX
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ORIGIN = your_frontend_url
    NODE_ENV = your_node_env
    ```

5. Start the development server:

    ```sh
    npm run dev
    ```
