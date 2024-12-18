export const USER_ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
  } as const;


  export const USER_STATUS = {
    Active: 'Active',
    Blocked: 'Blocked',
  } as const;
  
  export const UserSearchableFields = [
    'name',
    'email',
    'phone',
    'role',
    'status',
  ];

  export const paymentSearchableFields = [
    'name',
    'email',
    'phone',
    'role',
    'status',
  ];
  