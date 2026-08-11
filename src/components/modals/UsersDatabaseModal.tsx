import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Search,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Download,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserProfileData, useAuth } from '../../context/AuthContext';
import { useAudioSound } from '../../hooks/useAudioSound';

interface UsersDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UsersDatabaseModal: React.FC<UsersDatabaseModalProps> = ({ isOpen, onClose }) => {
  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);
  
  // Add/Edit user state
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formProvider, setFormProvider] = useState('password');
  const [formOrders, setFormOrders] = useState(0);

  const { playClickSound, playSuccessSound } = useAudioSound();
  const { user: currentAuthUser } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setErrorMsg(null);

    // Subscribe to real-time changes in Firestore `users` collection
    const usersCollectionRef = collection(db, 'users');
    
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        const fetchedUsers: UserProfileData[] = [];
        snapshot.forEach((docSnap) => {
          fetchedUsers.push({
            ...(docSnap.data() as UserProfileData),
            uid: docSnap.id,
          });
        });

        // Sort by newest first
        fetchedUsers.sort((a, b) => {
          const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        setUsersList(fetchedUsers);
        setLoading(false);
      },
      (err) => {
        console.warn('Firestore users fetch warning:', err);
        setErrorMsg('Note: Connecting to live Firestore database...');

        // Fallback: If current user is logged in, ensure at least admin user is shown
        if (currentAuthUser) {
          const fallbackAdminUser: UserProfileData = {
            uid: currentAuthUser.uid,
            displayName: currentAuthUser.displayName || 'Bhavya Pradeep (Admin)',
            email: currentAuthUser.email || 'bhavyapradeep72@gmail.com',
            phoneNumber: currentAuthUser.phoneNumber || '+91 9876543210',
            photoURL: currentAuthUser.photoURL || null,
            provider: currentAuthUser.providerData[0]?.providerId || 'google.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            orderCount: 1,
          };
          setUsersList((prev) => (prev.length === 0 ? [fallbackAdminUser] : prev));
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  const isAdmin = currentAuthUser?.email?.toLowerCase() === 'bhavyapradeep72@gmail.com';

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
        <div className="bg-[#FFFBF5] text-[#2C1810] border border-[#EAE0D2] rounded-3xl p-6 sm:p-8 max-w-md text-center shadow-2xl relative">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5EBE0] text-[#2C1810] flex items-center justify-center cursor-pointer hover:bg-[#EAE0D2]"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#D48C29] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-syne font-bold mb-2">Restricted Admin Access</h3>
          <p className="text-xs text-[#8C7063] mb-5 leading-relaxed">
            The Users Database is restricted exclusively to administrator account <strong className="text-[#2C1810]">bhavyapradeep72@gmail.com</strong>.
          </p>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 bg-[#D48C29] text-white rounded-xl text-xs font-bold font-syne uppercase tracking-wider cursor-pointer hover:bg-[#B8751E]"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  // Filtered users list based on search and provider filter
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.phoneNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.uid || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvider =
      providerFilter === 'all' ||
      (providerFilter === 'google' && (u.provider.includes('google') || u.provider === 'google.com')) ||
      (providerFilter === 'email' && (u.provider.includes('password') || u.provider === 'email')) ||
      (providerFilter === 'phone' && (u.provider.includes('phone') || u.phoneNumber));

    return matchesSearch && matchesProvider;
  });

  // Calculate statistics
  const totalUsersCount = usersList.length;
  const googleCount = usersList.filter((u) => u.provider?.includes('google')).length;
  const emailCount = usersList.filter((u) => u.provider?.includes('password') || u.provider === 'email').length;
  const phoneCount = usersList.filter((u) => u.phoneNumber || u.provider?.includes('phone')).length;

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);

    try {
      const targetUid = editingUserId || `user_${Date.now()}`;
      const userDocRef = doc(db, 'users', targetUid);

      const payload: Partial<UserProfileData> = {
        uid: targetUid,
        displayName: formName.trim() || 'Waffle Lover',
        email: formEmail.trim() || null,
        phoneNumber: formPhone.trim() || null,
        provider: formProvider,
        updatedAt: new Date().toISOString(),
        orderCount: Number(formOrders) || 0,
      };

      if (!editingUserId) {
        payload.createdAt = new Date().toISOString();
        payload.favoriteItems = [];
        await setDoc(userDocRef, payload);
      } else {
        await updateDoc(userDocRef, payload);
      }

      playSuccessSound();
      setIsAddingUser(false);
      setEditingUserId(null);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormOrders(0);
    } catch (err: any) {
      console.error('Error saving user in Firestore:', err);
      setErrorMsg(err.message || 'Failed to save user to database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (!confirm('Are you sure you want to delete this user document from Firestore?')) return;
    playClickSound();
    setLoading(true);

    try {
      await deleteDoc(doc(db, 'users', uid));
      playSuccessSound();
      if (selectedUser?.uid === uid) setSelectedUser(null);
    } catch (err: any) {
      console.error('Error deleting user document:', err);
      setErrorMsg(err.message || 'Failed to delete user document.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    playClickSound();
    const headers = ['UID', 'Name', 'Email', 'Phone', 'Provider', 'Created At', 'Orders'];
    const rows = usersList.map((u) => [
      u.uid,
      `"${u.displayName || ''}"`,
      u.email || '',
      u.phoneNumber || '',
      u.provider || '',
      u.createdAt || u.updatedAt || '',
      u.orderCount || 0,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `waffle_users_db_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#FFFBF5] text-[#2C1810] border border-[#EAE0D2] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#EAE0D2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D48C29] text-white flex items-center justify-center shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-syne font-bold text-[#2C1810]">
                  Users Firestore Database
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Firestore
                </span>
              </div>
              <p className="text-xs text-[#8C7063]">
                Manage all registered customer accounts in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#EAE0D2] text-[#2C1810] hover:border-[#D48C29] text-xs font-syne font-bold transition-all shadow-xs cursor-pointer"
              title="Export database as CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#D48C29]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setIsAddingUser(true);
                setEditingUserId(null);
                setFormName('');
                setFormEmail('');
                setFormPhone('');
                setFormOrders(0);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D48C29] hover:bg-[#B8751E] text-white text-xs font-syne font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add User</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-[#F5EBE0] hover:bg-[#EAE0D2] text-[#2C1810] flex items-center justify-center transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="px-5 py-3 bg-[#FFF3E0]/60 border-b border-[#EAE0D2] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D48C29]" />
            <div>
              <p className="text-[10px] text-[#8C7063] font-bold uppercase">Total Accounts</p>
              <p className="font-syne font-bold text-sm text-[#2C1810]">{totalUsersCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-[10px] text-[#8C7063] font-bold uppercase">Google Auth</p>
              <p className="font-syne font-bold text-sm text-[#2C1810]">{googleCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-700" />
            <div>
              <p className="text-[10px] text-[#8C7063] font-bold uppercase">Email Accounts</p>
              <p className="font-syne font-bold text-sm text-[#2C1810]">{emailCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-[10px] text-[#8C7063] font-bold uppercase">Phone Records</p>
              <p className="font-syne font-bold text-sm text-[#2C1810]">{phoneCount}</p>
            </div>
          </div>
        </div>

        {/* Search & Provider Filter Toolbar */}
        <div className="p-4 bg-white border-b border-[#EAE0D2] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#8C7063] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or UID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FFFBF5] border border-[#EAE0D2] focus:border-[#D48C29] text-xs font-sans text-[#2C1810] outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 text-xs font-syne font-bold">
            <span className="text-[11px] text-[#8C7063] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {[
              { id: 'all', label: 'All Users' },
              { id: 'google', label: 'Google' },
              { id: 'email', label: 'Email' },
              { id: 'phone', label: 'Phone' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setProviderFilter(tab.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  providerFilter === tab.id
                    ? 'bg-[#2C1810] text-white shadow-xs'
                    : 'bg-[#FFFBF5] border border-[#EAE0D2] text-[#8C7063] hover:text-[#2C1810]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1">{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-500 font-bold hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Modal Body: Add/Edit Form vs Table View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {isAddingUser || editingUserId ? (
            <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-[#EAE0D2] shadow-sm animate-fade-in">
              <h3 className="text-base font-syne font-bold text-[#2C1810] mb-4 flex items-center justify-between">
                <span>{editingUserId ? 'Edit User Document' : 'Add New User to Firestore'}</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingUser(false);
                    setEditingUserId(null);
                  }}
                  className="text-xs text-[#8C7063] hover:text-[#2C1810] underline"
                >
                  Cancel
                </button>
              </h3>

              <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
                <div>
                  <label className="font-syne font-bold uppercase text-[10px] text-[#8C7063] block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Patel"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#EAE0D2] focus:border-[#D48C29] outline-none"
                  />
                </div>

                <div>
                  <label className="font-syne font-bold uppercase text-[10px] text-[#8C7063] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. priya@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#EAE0D2] focus:border-[#D48C29] outline-none"
                  />
                </div>

                <div>
                  <label className="font-syne font-bold uppercase text-[10px] text-[#8C7063] block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#EAE0D2] focus:border-[#D48C29] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-syne font-bold uppercase text-[10px] text-[#8C7063] block mb-1">
                      Provider
                    </label>
                    <select
                      value={formProvider}
                      onChange={(e) => setFormProvider(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EAE0D2] bg-white focus:border-[#D48C29] outline-none"
                    >
                      <option value="google.com">Google Account</option>
                      <option value="password">Email / Password</option>
                      <option value="phone">Phone SMS</option>
                      <option value="admin">Admin Created</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-syne font-bold uppercase text-[10px] text-[#8C7063] block mb-1">
                      Order Count
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formOrders}
                      onChange={(e) => setFormOrders(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#EAE0D2] focus:border-[#D48C29] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-4 rounded-xl bg-[#D48C29] hover:bg-[#B8751E] text-white font-syne font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save User Document to Firestore'}
                </button>
              </form>
            </div>
          ) : loading && usersList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8C7063]">
              <Loader2 className="w-8 h-8 animate-spin text-[#D48C29] mb-3" />
              <p className="text-xs font-syne font-bold">Connecting to Firestore Database...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-[#8C7063]">
              <User className="w-12 h-12 text-[#EAE0D2] mb-3" />
              <p className="text-sm font-syne font-bold text-[#2C1810]">No users found</p>
              <p className="text-xs max-w-sm mt-1">
                {searchQuery || providerFilter !== 'all'
                  ? 'No user documents match your search or filter criteria.'
                  : 'Your Firestore users database is currently empty.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#EAE0D2] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FFFBF5] border-b border-[#EAE0D2] font-syne font-bold text-[10px] uppercase text-[#8C7063]">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Auth Provider</th>
                    <th className="py-3 px-4">Created At</th>
                    <th className="py-3 px-4 text-center">Orders</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE0D2]">
                  {filteredUsers.map((u) => {
                    const isCurrentAuth = currentAuthUser?.uid === u.uid;

                    return (
                      <tr
                        key={u.uid}
                        className={`hover:bg-[#FFFBF5]/80 transition-colors ${
                          isCurrentAuth ? 'bg-[#FFF3E0]/40 font-medium' : ''
                        }`}
                      >
                        {/* User Column */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {u.photoURL ? (
                              <img src={u.photoURL} alt={u.displayName || 'User'} className="w-8 h-8 rounded-full border border-[#D48C29]" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-[#D48C29] text-white flex items-center justify-center text-xs font-bold font-syne">
                                {((u.displayName || u.email || u.phoneNumber || 'U')[0]).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#2C1810]">
                                  {u.displayName || 'Waffle Lover'}
                                </span>
                                {isCurrentAuth && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D48C29] text-white font-bold">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] font-mono text-[#8C7063] truncate max-w-[120px]">
                                {u.uid}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Column */}
                        <td className="py-3 px-4">
                          <div className="space-y-0.5">
                            {u.email && (
                              <p className="text-[11px] text-[#2C1810] flex items-center gap-1 truncate max-w-[180px]">
                                <Mail className="w-3 h-3 text-[#D48C29] shrink-0" /> {u.email}
                              </p>
                            )}
                            {u.phoneNumber && (
                              <p className="text-[11px] text-[#2C1810] flex items-center gap-1">
                                <Phone className="w-3 h-3 text-emerald-600 shrink-0" /> {u.phoneNumber}
                              </p>
                            )}
                            {!u.email && !u.phoneNumber && (
                              <span className="text-[10px] text-[#8C7063] italic">No contact info</span>
                            )}
                          </div>
                        </td>

                        {/* Auth Provider */}
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-syne capitalize ${
                            u.provider?.includes('google')
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : u.provider?.includes('phone')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            <Shield className="w-3 h-3" />
                            {u.provider || 'Firebase'}
                          </span>
                        </td>

                        {/* Created At */}
                        <td className="py-3 px-4 text-[#8C7063] text-[11px]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Recent'}
                          </div>
                        </td>

                        {/* Order Count */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#FFF3E0] text-[#D48C29] font-bold text-xs">
                            {u.orderCount || 0}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                playClickSound();
                                setEditingUserId(u.uid);
                                setFormName(u.displayName || '');
                                setFormEmail(u.email || '');
                                setFormPhone(u.phoneNumber || '');
                                setFormProvider(u.provider || 'password');
                                setFormOrders(u.orderCount || 0);
                              }}
                              className="p-1.5 rounded-lg hover:bg-[#FFF3E0] text-[#D48C29] transition-colors cursor-pointer"
                              title="Edit User Document"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.uid)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                              title="Delete from Firestore"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-[#FFFBF5] border-t border-[#EAE0D2] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7063] gap-2">
          <span>Connected to Firestore collection <code className="px-1.5 py-0.5 rounded bg-white border border-[#EAE0D2] text-[#D48C29]">users/</code></span>
          <span>Total user records synced: <strong>{usersList.length}</strong></span>
        </div>

      </div>
    </div>
  );
};
