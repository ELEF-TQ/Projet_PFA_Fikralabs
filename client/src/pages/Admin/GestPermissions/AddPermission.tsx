import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../context/store";
import { createPermission } from "../../../context/features/PermissionSlice";
import { Permission } from "../../../types/Permission";
import "../style.css"; // Import CSS file for styling

interface Props {
  show: boolean;
  moduleType: string;
  currentPerms: Permission[];
  handleClose: () => void;
}

const AddPermission: React.FC<Props> = ({ show, handleClose, moduleType, currentPerms }) => {
  const dispatch = useDispatch<AppDispatch>();

  interface FormData {
    add: boolean;
    update: boolean;
    delete: boolean;
    view: boolean;
  }

  const initializeFormData = (): FormData => {
    const permsMap = currentPerms.reduce((acc, perm) => {
      const keyParts = perm.key.split('_');
      if (keyParts.length === 2 && keyParts[1].toUpperCase() === moduleType.toUpperCase()) {
        const action = keyParts[0].toLowerCase();
        acc[action] = true;
      }
      return acc;
    }, {} as Record<string, boolean>);

    return {
      add: permsMap['ADD'] || false,
      update: permsMap['UPDATE'] || false,
      delete: permsMap['DELETE'] || false,
      view: permsMap['VIEW'] || false,
    };
  };

  const [formData, setFormData] = useState<FormData>(() => initializeFormData());

  const handleSubmit = () => {
    const permissions = Object.entries(formData).reduce((acc, [action, checked]) => {
      if (checked) {
        acc.push(`${action.toUpperCase()}_${moduleType.toUpperCase()}`);
      }
      return acc;
    }, [] as string[]);

 
    dispatch(createPermission(permissions));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const checkedValue = checked as boolean;
    setFormData({
      ...formData,
      [name]: checkedValue,
    });
  };

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Add New Permission for {moduleType}</h3>
            </div>
            <div className="modal-content">
              {["ADD", "UPDATE", "DELETE", "VIEW"].map((action) => (
                <div className="checkbox-item" key={action}>
                  <input
                    type="checkbox"
                    id={action.toLowerCase()}
                    name={action.toLowerCase()}
                    checked={formData[action.toLowerCase() as keyof FormData]}
                    disabled={currentPerms.some(perm => perm.key === `${action.toUpperCase()}_${moduleType.toUpperCase()}`)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={action.toLowerCase()}>{action} {moduleType}</label>
                </div>
              ))}

              <div className="flex justify-between">
                <button
                  className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Add
                </button>
                <button
                  className="btn bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPermission;
