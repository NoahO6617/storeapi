export interface User {
    id: number;
    email: string;
    created_at: Date;
  }
  
  export interface CreateUserDTO {
    email: string;
    password: string;
  };  