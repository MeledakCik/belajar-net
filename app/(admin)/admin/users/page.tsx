"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  Edit2,
  Trash2,
  Activity,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  X,
  Save,
  UserCheck,
  Mail,
  User as UserIcon,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface UserData {
  id: number;
  full_name: string;
  username: string;
  email: string;
  status: "online" | "offline";
}

export default function AdminUserManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://www.belajar-net-backend.web.id/api/users",
      );
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const encodedData = btoa(JSON.stringify(newUser));
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p: encodedData }),
      });

      if (res.ok) {
        setIsAddModalOpen(false);
        setNewUser({ full_name: "", username: "", email: "", password: "" });
        fetchUsers();
        toast.success("User baru berhasil diinjeksi ke sistem!");
      } else {
        toast.error("Gagal menambah user");
      }
    } catch (err) {
      toast.error("Koneksi proxy terputus");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const rawPayload = {
        full_name: currentUser.full_name,
        email: currentUser.email,
        username: currentUser.username,
      };
      const encodedData = btoa(JSON.stringify(rawPayload));
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p: encodedData }), // Di Network Tab cuma muncul {"p": "..."}
      });

      if (res.ok) {
        setUsers(
          users.map((u) =>
            u.id === currentUser.id ? { ...u, ...rawPayload } : u,
          ),
        );
        setIsEditModalOpen(false);
        toast.success("Data berhasil disinkronkan!");
      }
    } catch (err) {
      toast.error("Gagal sinkronisasi data.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/users/${deleteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== deleteId));
        toast.success("Entitas berhasil dimusnahkan!", {
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        });
        setDeleteId(null);
        setIsEditModalOpen(false);
      } else {
        toast.error("Gagal menghapus data");
      }
    } catch (err) {
      toast.error("Gagal terhubung ke proxy");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0f1a]">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-400 font-mono text-xs tracking-widest uppercase animate-pulse">
          Synchronizing Cloud Data...
        </p>
      </div>
    );

  return (
    <div className="h-screen overflow-hidden p-2 md:p-2 flex flex-col bg-[#0b0f1a] text-slate-200 font-poppins">
      <div className="p-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="p-2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-blue-500 mb-2 hover:text-blue-400 transition-all group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Back to Hub
            </span>
          </button>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4 mt-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/5">
              <Users className="text-blue-500" size={32} />
            </div>
            Control Room
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium tracking-wide">
            Manage access protocols and user directories.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/30 active:scale-95 text-sm uppercase tracking-wider"
        >
          <UserPlus size={20} /> Add New Identity
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-2">
        <div className="lg:col-span-3 relative group">
          <Search
            className="absolute top-5 left-4 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, username, or email..."
            className="w-full bg-[#161b2c] border border-slate-800/60 p-5 pl-14 rounded-[1.5rem] focus:border-blue-500/50 outline-none transition-all focus:ring-4 focus:ring-blue-500/5 shadow-2xl text-sm placeholder:text-slate-600 text-white"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-gradient-to-br from-blue-600/10 to-[#161b2c] border border-blue-500/20 p-4 rounded-[10px] flex items-center justify-between backdrop-blur-md shadow-2xl">
          <div>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
              Live Status
            </p>
            <p className="text-2xl font-black text-white">
              {users.filter((u) => u.status === "online").length}{" "}
              <span className="text-slate-500 text-sm font-medium uppercase ml-1">
                Active
              </span>
            </p>
          </div>
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Activity className="text-blue-500 animate-pulse" size={28} />
          </div>
        </div>
      </div>
      <div className="bg-[#161b2c]/30 border border-white/5 rounded-[20px] mt-6 overflow-hidden backdrop-blur-sm shadow-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-800/30">
                <th className="p-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5">
                  User Identity
                </th>
                <th className="p-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5">
                  Status
                </th>
                <th className="p-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5 text-right">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-500/[0.04] transition-all group"
                >
                  <td className="p-7">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#0b0f1a] flex items-center justify-center font-black text-blue-400 border border-slate-800 shadow-2xl group-hover:border-blue-500/40 transition-all duration-300">
                        {user.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                          {user.full_name}
                        </p>
                        <p className="text-slate-500 text-xs font-mono mt-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-7">
                    <span
                      className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        user.status === "online"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                          : "bg-slate-800/40 border-slate-700/40 text-slate-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${user.status === "online" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-700"}`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-7 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="p-3.5 bg-slate-800/40 hover:bg-blue-600 hover:text-white text-slate-400 rounded-xl transition-all border border-white/5 hover:scale-110 active:scale-95"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(user.id)}
                        className="p-3.5 bg-slate-800/40 hover:bg-rose-600 hover:text-white text-slate-400 rounded-xl transition-all border border-white/5 hover:scale-110 active:scale-95"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deleteId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-[#0b0f1a]/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#161b2c] border border-rose-500/30 w-full max-w-sm rounded-[3rem] p-10 shadow-[0_0_80px_-15px_rgba(244,63,94,0.4)] animate-in zoom-in-95 border-b-8 border-b-rose-600">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center border border-rose-500/20 shadow-inner">
                <AlertTriangle className="text-rose-500" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Access Revocation
                </h3>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed font-medium">
                  Are you sure you want to terminate this identity? This action
                  cannot be undone.
                </p>
              </div>

              <div className="flex w-full gap-4 pt-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Abort
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 p-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-rose-600/30"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {(isEditModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-lg bg-black/70 animate-in fade-in duration-300">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-12 shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)] relative animate-in zoom-in-95">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setIsAddModalOpen(false);
              }}
              className="absolute top-10 right-10 p-2.5 hover:bg-slate-800/50 rounded-full text-slate-500 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
              {isAddModalOpen ? (
                <UserPlus className="text-blue-500" size={32} />
              ) : (
                <Edit2 className="text-blue-500" size={32} />
              )}
              {isAddModalOpen ? "New Identity" : "Update Data"}
            </h2>
            <form
              onSubmit={isAddModalOpen ? handleAddUser : handleUpdate}
              className="space-y-6"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Legal Full Name
                </label>
                <div className="relative">
                  <UserCheck
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600"
                    size={20}
                  />
                  <input
                    required
                    type="text"
                    className="w-full bg-[#161b2c] border border-white/5 p-5 pl-14 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm text-white shadow-inner"
                    value={
                      isAddModalOpen
                        ? newUser.full_name
                        : currentUser?.full_name
                    }
                    onChange={(e) =>
                      isAddModalOpen
                        ? setNewUser({ ...newUser, full_name: e.target.value })
                        : setCurrentUser({
                            ...currentUser!,
                            full_name: e.target.value,
                          })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                    Alias
                  </label>
                  <div className="relative">
                    <UserIcon
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600"
                      size={20}
                    />
                    <input
                      required
                      type="text"
                      className="w-full bg-[#161b2c] border border-white/5 p-5 pl-14 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm text-white"
                      value={
                        isAddModalOpen
                          ? newUser.username
                          : currentUser?.username
                      }
                      onChange={(e) =>
                        isAddModalOpen
                          ? setNewUser({ ...newUser, username: e.target.value })
                          : setCurrentUser({
                              ...currentUser!,
                              username: e.target.value,
                            })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                    E-Mail
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600"
                      size={20}
                    />
                    <input
                      required
                      type="email"
                      className="w-full bg-[#161b2c] border border-white/5 p-5 pl-14 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm text-white"
                      value={
                        isAddModalOpen ? newUser.email : currentUser?.email
                      }
                      onChange={(e) =>
                        isAddModalOpen
                          ? setNewUser({ ...newUser, email: e.target.value })
                          : setCurrentUser({
                              ...currentUser!,
                              email: e.target.value,
                            })
                      }
                    />
                  </div>
                </div>
              </div>
              {isAddModalOpen && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                    Security Key
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600"
                      size={20}
                    />
                    <input
                      required
                      type="password"
                      className="w-full bg-[#161b2c] border border-white/5 p-5 pl-14 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm text-white"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 transition-all active:scale-95 mt-6"
              >
                <Save size={22} />{" "}
                {isAddModalOpen ? "Register Protocol" : "Update System"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
