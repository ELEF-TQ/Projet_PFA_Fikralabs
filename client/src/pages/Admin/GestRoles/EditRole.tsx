import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../context/store';
import { fetchRoles, updateRole } from '../../../context/features/RoleSlice';
import { Permission } from '../../../types/Permission';
import { groupPermissionsByType } from '../../../utils/GroupPermissionsByType';
import { Role } from '../../../types/Role';

interface Props {
  show: boolean;
  handleClose: () => void;
  Element: Role;
}

const EditRole: React.FC<Props> = ({ show, handleClose, Element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { permissions } = useSelector((state:RootState) => state.permissions);
  const [groupedPermissions, setGroupedPermissions] = useState<Record<string, Permission[]>>({});

  const { isLoading } = useSelector((state: RootState) => state.roles);
  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
  });

  useEffect(() => {
    if (show && Element) {
      setFormData({
        name: Element.name || '',
        permissions: Element.permissions.map((perm: Permission) => perm._id) || [],
      });
    }
  }, [show, Element]);

  useEffect(() => {
    if (permissions) {
      const grouped = groupPermissionsByType(permissions);
      setGroupedPermissions(grouped);
    }
  }, [show, permissions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTypeSelect = (perms: Permission[]) => {
    const selectedPermissionIds = perms.map((perm) => perm._id);
  
    const updatedPermissions = formData.permissions.includes(selectedPermissionIds[0])
      ? formData.permissions.filter((perm: string) => !selectedPermissionIds.includes(perm))
      : [...formData.permissions, ...selectedPermissionIds];
  
    setFormData({
      ...formData,
      permissions: updatedPermissions,
    });
  };

  const handleSubmit = () => {
    console.log(formData)
    dispatch(updateRole({ Id: Element._id, formData })).then(() => {
      dispatch(fetchRoles());
      handleClose();
    });
  };

  return (
    <>
      {show && (
        <div className="modal-overlay fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="modal bg-white w-96 p-6 rounded-lg">
            <div className="modal-header mb-4">
              <h3 className="modal-title text-lg font-semibold">Modifier un rôle</h3>
            </div>
            <div className="modal-content">
              <div className="mb-4">
                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du rôle
                </label>
                <input
                  type="text"
                  id="roleName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 Input__Style"
                  placeholder="Entrez le nom du rôle"
                />
              </div>
              {Object.entries(groupedPermissions).map(([type, perms]) => (
                <div key={type} className="mb-2">
                  <label htmlFor={type} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id={type}
                      checked={perms.some((perm) => formData.permissions.includes(perm._id))}
                      onChange={() => handleTypeSelect(perms)}
                      className="mr-2"
                    />
                    <span className="text-sm">G-{type.toUpperCase()}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                className={`btn bg-primary-color text-white font-semibold py-2 px-4 rounded ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'En cours...' : 'Modifier'}
              </button>
              <button
                className="btn bg-red-500 text-white font-semibold py-2 px-4 ml-2 rounded"
                onClick={handleClose}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditRole;
