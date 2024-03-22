import React, { useEffect, useState } from "react";
import { Permission } from "../../../types/Permission";
import { groupPermissionsByType } from "../../../lib/GroupPermissionsByType";

interface Props {
  show: boolean;
  handleClose: () => void;
  Element: any;
}

const ViewRole: React.FC<Props> = ({ show, handleClose, Element }) => {
  const [groupedPermissions, setGroupedPermissions] = useState<Record<string, Permission[]>>({});

  useEffect(() => {
    if (Element && Element.permissions) {
      const grouped = groupPermissionsByType(Element.permissions);
      setGroupedPermissions(grouped);
    }
  }, [Element]);

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal bg-green-50 text-gray-900">
            <div className="modal-header">
              <h3 className="modal-title text-lg font-semibold">Voir plus</h3>
            </div>
            <div className="modal-content">
              <h4 className="mb-2">Role Name: {Element.name}</h4>
              <h4 className="mb-2">Permissions:</h4>
              {Object.entries(groupedPermissions).map(([type, perms]) => (
                <div key={type} className="mb-4">
                  <h5 className="text-lg font-semibold mb-2">{type}</h5>
                  <ul>
                    {perms.map((perm) => (
                      <li key={`${type}-${perm._id}`} className="ml-4">
                        <span className="text-sm">{perm.key}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={handleClose} className="modal-close">
              <svg
                className="fill-current text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M10.606 9l5.353-5.353a1 1 0 10-1.414-1.414L9 7.586 3.647 2.233a1 1 0 00-1.414 1.414L7.586 9l-5.353 5.353a1 1 0 001.414 1.414L9 10.414l5.353 5.353a1 1 0 001.414-1.414L10.414 9z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewRole;
