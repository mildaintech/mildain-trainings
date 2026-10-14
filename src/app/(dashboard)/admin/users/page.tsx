"use client";

import React, { useState, useEffect } from "react";
import { Search, Mail, Calendar, User as UserIcon } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Registered Students</h1>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Registration Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No students found.</td></tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}