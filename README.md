# Service Discovery

**Service Discovery** is used in distributed systems, with the main aim of helping servers get information about other servers like IP address. So, it can avail services of that server.

  

→ This prevents each server from maintaining a static list of other server’s information.

→ The registry which stores information of all the servers is dynamic in nature as it checks regularly if the servers in the network are active or not. If not it removes it from the list, so other servers don’t request for its services.


# Tech-Stack
Note:  All the modules have been downloaded with type protection.

  

1.  Scripting Language: TypeScript
    
2.  Backend: Express
    
3.  Additional Modules: Cors and Axios
    
4.  Database: PostgreSQL
5.  ORM: Prisma

## Ideation 

![idea_design](https://github.com/user-attachments/assets/ffb8b5d1-006c-48b0-b2ff-cee36faf97d6)


## System Design & Request flow

![SD-Request-flow](https://github.com/user-attachments/assets/f978b000-3c37-405d-91b1-c30e0784abc4)


1. Mock Server sends a request to the Registry.
2. The registry handles the requesut and utilises the prisma client to make CRUD operations in the DB.
3. The appropriate changes have been made to the NEON-DB ( Postgres-SQL ).
4. The Registry responds back to the server.

## Routes & Further Details

Please check out the Google Doc: [Google_Doc](https://docs.google.com/document/d/1Lv0VRWAC6q-zJi5c3Xgf-lZRqARYJGKPGnGVex6Ztbo/edit?usp=sharing)

## Outputs 

1. Server Activation / entry into the Registry
   ![GIT-HUB-1](https://github.com/user-attachments/assets/19581c33-61c0-417c-a1b0-4c0ba2c958f0)

2. Server Details Fetch
   ![GIT-HUB-2](https://github.com/user-attachments/assets/29cba230-a1d1-46aa-b889-1e6bf9dbfeae)

3. Fetching other server data
   ![GIT-HUB-4](https://github.com/user-attachments/assets/b31f9f51-e7c0-4448-8d3d-c4472548c2a1)

4. Server Deactivation/Removal from the Registry
   ![GIT-HUB-3](https://github.com/user-attachments/assets/ca25f2ff-9628-4d8b-ab6a-2b01f7426795)



