

export class User {
  id?: number;
    username?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(username?: string, password?: string, id?: number, createdAt?: Date, updatedAt?: Date) {
   this.id = id;
      this.username = username;
      this.password = password;
   this.createdAt =createdAt;
   this.updatedAt = updatedAt;
     
    }
}
