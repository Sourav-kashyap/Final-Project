import {PermissionKey} from './permissionsKeys';

export const RolePermissions: {[role: string]: PermissionKey[]} = {
  admin: [PermissionKey.ViewUser, PermissionKey.DeleteUser],
  user: [],
};
