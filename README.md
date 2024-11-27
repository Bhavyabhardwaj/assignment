# Admin Dashboard Backend  

This is the backend of the **Admin Dashboard** application designed for managing users, roles, and permissions. The backend provides RESTful APIs and database support, enabling secure and efficient handling of user data, role definitions, and permission assignments.  

## **Features**  

- **User Management:** APIs for creating, editing, deleting, and fetching user data.  
- **Role Management:** APIs for defining roles and assigning permissions dynamically.  
- **Database Support:** Uses PostgreSQL with Prisma ORM for schema definition and migrations.  
- **Dockerized PostgreSQL:** Simplified database setup using Docker.  
## **Getting Started**  

### **1. Prerequisites**  

Ensure you have the following installed on your machine:  
- **Node.js** (v16 or later recommended)  
- **Docker** (to set up PostgreSQL)  

---

### **2. Installation Steps**  

1. **Clone the Repository:**  
   ```bash  
   git clone <repository-url>  
   cd <project-directory>  
   ```  

2. **Install Dependencies:**  
   ```bash  
   npm install  
   ```  

3. **Set Up the Database:**  
   Run the PostgreSQL container using Docker:  
   ```bash  
   docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres  
   ```  

4. **Configure the Database Schema:**  
   - Run Prisma migrations to set up the database schema:  
     ```bash  
     npx prisma migrate dev  
     ```  
   - Generate Prisma client:  
     ```bash  
     npx prisma generate  
     ```  

5. **Build the TypeScript Files:**  
   ```bash  
   npx tsc -b  
   ```  

6. **Start the Server:**  
   ```bash  
   node dist/server.js  
   ```  

---

### **3. Environment Variables**  

Create a `.env` file in the root directory with the following details:  
```env  
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"  
```  


## **Contributing**  

Contributions are welcome! Feel free to submit a pull request or open an issue for discussion.  
 
