import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../context/store";
import { fetchPermissions } from "../../../context/features/PermissionSlice";
import { groupPermissionsByType } from "../../../lib/GroupPermissionsByType";
import { Permission } from "../../../types/Permission";

const GestPermissions = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { permissions } = useSelector((state: RootState) => state.permissions);
    const [groupedPermissions, setGroupedPermissions] = useState<Record<string, Permission[]>>({});

    useEffect(() => {
        dispatch(fetchPermissions());
    }, [dispatch]);

    useEffect(() => {
        if (permissions) {
            const grouped = groupPermissionsByType(permissions);
            setGroupedPermissions(grouped);
        }
    }, [permissions]);

    // Function to handle delete permission
    const handleDeletePermission = (permissionId: string) => {
        // Dispatch action to delete permission
    };

    // Function to handle add permission
    const handleAddPermission = (groupType: string) => {
        // Implement logic to add permission for the specified group type
    };

    return (
        <div className="p-4">
            <h1 className="mb-8 font-semibold text-3xl text-gray-800">Gestion des Permissions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(groupedPermissions).map(([type, perms]) => (
                    <div key={type} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-semibold text-xl">{type}</h2>
                            <button
                                type="button"
                                onClick={() => handleAddPermission(type)}
                                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-blue-500"
                            >
                                <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Ajouter
                            </button>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {perms.map(permission => (
                                    <tr key={permission._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{permission.key}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => handleDeletePermission(permission._id)}
                                                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-red-800"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GestPermissions;
