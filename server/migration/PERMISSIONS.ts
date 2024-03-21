export const CLIENT_PERMISSIONS = {
    VIEW_CLIENT: 'view_client',
    ADD_CLIENT: 'add_client',
    DELETE_CLIENT: 'delete_client',
    UPDATE_CLIENT: 'update_client',
  } as const;
  
export const POMPISTE_PERMISSIONS = {
    VIEW_POMPISTE: 'view_pompiste',
    ADD_POMPISTE: 'add_pompiste',
    DELETE_POMPISTE: 'delete_pompiste',
    UPDATE_POMPISTE: 'update_pompiste',
  } as const;
  
export const SERVICE_PERMISSIONS = {
    VIEW_SERVICE: 'view_service',
    ADD_SERVICE: 'add_service',
    DELETE_SERVICE: 'delete_service',
    UPDATE_SERVICE: 'update_service',
  } as const;
  
export const COUPON_PERMISSIONS = {
    VIEW_COUPON: 'view_coupon',
    ADD_COUPON: 'add_coupon',
    DELETE_COUPON: 'delete_coupon',
    UPDATE_COUPON: 'update_coupon',
  } as const;
  
export const REVIEW_PERMISSIONS = {
    VIEW_REVIEW: 'view_review',
    DELETE_REVIEW: 'delete_review',
    UPDATE_REVIEW: 'update_review',
  } as const;
  
export const ADMIN_PERMISSIONS = {
    VIEW_ADMIN: 'view_admin',
    ADD_ADMIN: 'add_admin',
    DELETE_ADMIN: 'delete_admin',
    UPDATE_ADMIN: 'update_admin',
  } as const;
  
export const ROLE_PERMISSIONS = {
    VIEW_ROLE: 'view_role',
    ADD_ROLE: 'add_role',
    DELETE_ROLE: 'delete_role',
    UPDATE_ROLE: 'update_role',
  } as const;
  
export const CONVERSION_PERMISSIONS = {
    VIEW_CONVERSION: 'view_conversion',
    ACCEPT_CONVERSION: 'accept_conversion',  
  } as const;

export const PERMISSIONS = {
    ...CLIENT_PERMISSIONS,
    ...POMPISTE_PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    ...ROLE_PERMISSIONS,
    ...SERVICE_PERMISSIONS,
    ...COUPON_PERMISSIONS,
    ...REVIEW_PERMISSIONS,
    ...CONVERSION_PERMISSIONS,
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
