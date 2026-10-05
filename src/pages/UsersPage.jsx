import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Activity,
  User,
  Plus,
  Check,
  X,
  Lock,
  Eye,
  Edit,
  Trash2,
  Printer,
  Download
} from 'lucide-react';
import { useErp } from '../context/ErpContext';

export default function UsersPage({ defaultSection = 'list' }) {
  const { section: urlSection } = useParams();
  const navigate = useNavigate();
  const activeSection = urlSection || defaultSection;

  const {
    usersList,
    roles,
    permissions,
    setPermissions,
    activityLogs,
    showToast
  } = useErp();

  const handlePermissionToggle = (roleName, permKey) => {
    setPermissions(prev => ({
      ...prev,
      [roleName]: {
        ...prev[roleName],
        [permKey]: !prev[roleName]?.[permKey]
      }
    }));
    showToast(`Updated ${permKey} permission for ${roleName} (Demo)`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header & Subtabs */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">Access Control & Security</span>
            <h1 className="text-xl font-black text-slate-900 dark:text-white capitalize">User Management & Permissions Matrix</h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'list', label: 'Users Directory', icon: User },
            { id: 'roles', label: 'User Roles', icon: Users },
            { id: 'permissions', label: 'Permissions Matrix', icon: ShieldCheck },
            { id: 'activity', label: 'Activity Audit Log', icon: Activity },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = tab.id === activeSection;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id === 'list' ? '/users' : `/users/${tab.id}`)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. USERS LIST */}
      {(activeSection === 'list' || activeSection === 'users') && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Active System Operators</h3>
            <button
              onClick={() => showToast("Add user dialog opened (Demo)")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Operator
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border-b">
                  <th className="p-3">Username</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Assigned Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-blue-600">{u.username}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="p-3 text-slate-500">{u.email}</td>
                    <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">{u.role}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. ROLES LIST */}
      {activeSection === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map(r => (
            <div key={r.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{r.name}</h3>
                <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-bold rounded-lg">
                  {r.usersCount} Users
                </span>
              </div>
              <p className="text-xs text-slate-500">{r.description}</p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-right">
                <button
                  onClick={() => navigate('/users/permissions')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Configure Matrix Permissions →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. PERMISSIONS MATRIX TOGGLE SWITCHES */}
      {activeSection === 'permissions' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Role Access Control Switches Matrix</h2>
            <p className="text-xs text-slate-500">Toggle View, Create, Edit, Delete, Print, Export for each security role</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 font-bold border-b text-slate-600">
                  <th className="p-3.5">Security Role</th>
                  <th className="p-3.5 text-center">View</th>
                  <th className="p-3.5 text-center">Create</th>
                  <th className="p-3.5 text-center">Edit</th>
                  <th className="p-3.5 text-center">Delete</th>
                  <th className="p-3.5 text-center">Print</th>
                  <th className="p-3.5 text-center">Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {['Admin', 'Manager', 'Accountant', 'SalesStaff', 'Cashier'].map(roleKey => {
                  const rolePerms = permissions[roleKey] || {};
                  return (
                    <tr key={roleKey} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-slate-900 dark:text-white text-sm">{roleKey}</td>
                      {['View', 'Create', 'Edit', 'Delete', 'Print', 'Export'].map(permKey => {
                        const isChecked = rolePerms[permKey] ?? false;
                        return (
                          <td key={permKey} className="p-3.5 text-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handlePermissionToggle(roleKey, permKey)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. USER ACTIVITY AUDIT LOG */}
      {activeSection === 'activity' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Real-Time Audit Trail
          </h3>

          <div className="space-y-3">
            {activityLogs.map(log => (
              <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold flex items-center justify-center">
                    {log.user[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="font-bold text-slate-900 dark:text-white">{log.user}</strong>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-semibold">{log.role}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      <strong>{log.action}:</strong> {log.detail}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
