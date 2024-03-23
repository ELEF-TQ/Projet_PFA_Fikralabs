import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../context/store";
import { fetchPermissions } from "../../../context/features/PermissionSlice";
import { groupPermissionsByType } from "../../../lib/GroupPermissionsByType";
import { Permission } from "../../../types/Permission";
import { createRole, fetchRoles } from "../../../context/features/RoleSlice";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddRole: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { permissions, isLoading } = useSelector((state: RootState) => state.permissions);
  const [groupedPermissions, setGroupedPermissions] = useState<Record<string, Permission[]>>({});
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [roleName, setRoleName] = useState<string>("");

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    if (permissions) {
      const grouped = groupPermissionsByType(permissions);
      setGroupedPermissions(grouped);
    }
  }, [permissions]);

  const handleTypeSelect = (perms: Permission[]) => {
    const isSelected = selectedPermissions.some((permId) =>
      perms.some((perm) => perm._id === permId)
    );

    if (isSelected) {
      // Remove permissions associated with the type being unchecked
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((permId) => !perms.some((perm) => perm._id === permId))
      );
    } else {
      // Add permissions associated with the type being checked
      const newPermissions = perms.map((perm) => perm._id);
      setSelectedPermissions((prevPermissions) => [
        ...prevPermissions.filter((permId) => !perms.some((perm) => perm._id === permId)),
        ...newPermissions,
      ]);
    }
  };

  const handleSubmit = () => {
    const formData = {
      name: roleName,
      permissions: selectedPermissions,
    };
    dispatch(createRole(formData)).then(()=>{
      handleClose();
      dispatch(fetchRoles())
    })
  };

  return (
    <>
      {show && (
        <div className="modal-overlay fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="modal bg-white w-96 p-6 rounded-lg">
            <div className="modal-header mb-4">
              <h3 className="modal-title text-lg font-semibold">Ajouter un nouveau Role</h3>
            </div>
            <div className="modal-content">
              <div className="mb-4">
                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
                  Nom du rôle
                </label>
                <input
                  type="text"
                  id="roleName"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className=" mt-1 p-2    Input__Style"
                />
              </div>
              {Object.entries(groupedPermissions).map(([type, perms]) => (
                <div key={type} className="mb-2 w-fit">
                  <label htmlFor={type} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id={type}
                      onChange={() => handleTypeSelect(perms)}
                      className="mr-2"
                    />
                    <span className="text-sm">G-{type.toUpperCase()}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                className={`btn bg-green-500 text-white font-semibold py-2 px-4 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={isLoading || !roleName}
              >
                {isLoading ? "En cours..." : "Ajouter"}
              </button>
              <button
                className="btn bg-red-500 text-white font-semibold py-2 px-4 rounded"
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

export default AddRole;
