import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const initialSampleWork = {
  title: '',
  category: '',
  image: '',
  features: '', // comma separated
  link: '',
};

const AdminPanel: React.FC = () => {
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sample works state
  const [sampleWorks, setSampleWorks] = useState<any[]>([]);
  const [newSampleWork, setNewSampleWork] = useState(initialSampleWork);
  const [sampleWorkError, setSampleWorkError] = useState('');

  // Quotes state
  const [quotes, setQuotes] = useState<any[]>([]);

  // Messages state
  const [messages, setMessages] = useState<any[]>([]);

  // IoT Requests state
  const [iotRequests, setIotRequests] = useState<any[]>([]);

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setAuthError(error.message);
    else setUser(data.user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Fetch data
  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user);
      else setUser(null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchSampleWorks();
    fetchQuotes();
    fetchMessages();
    fetchIotRequests();
  }, [user]);

  const fetchSampleWorks = async () => {
    const { data, error } = await supabase.from('sample_works').select('*').order('created_at', { ascending: false });
    if (!error) setSampleWorks(data || []);
  };

  const fetchQuotes = async () => {
    const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });
    if (!error) setQuotes(data || []);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (!error) setMessages(data || []);
  };

  const fetchIotRequests = async () => {
    const { data, error } = await supabase.from('iot_requests').select('*').order('created_at', { ascending: false });
    if (!error) setIotRequests(data || []);
  };

  // Add sample work
  const handleAddSampleWork = async (e: React.FormEvent) => {
    e.preventDefault();
    setSampleWorkError('');
    if (!newSampleWork.title || !newSampleWork.category) {
      setSampleWorkError('Title and category are required.');
      return;
    }
    const featuresArr = newSampleWork.features.split(',').map(f => f.trim()).filter(Boolean);
    const { error } = await supabase.from('sample_works').insert([
      { ...newSampleWork, features: featuresArr },
    ]);
    if (error) setSampleWorkError(error.message);
    else {
      setNewSampleWork(initialSampleWork);
      fetchSampleWorks();
    }
  };

  // Delete sample work
  const handleDeleteSampleWork = async (id: string) => {
    await supabase.from('sample_works').delete().eq('id', id);
    fetchSampleWorks();
  };

  // UI
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Admin Login</h2>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          {authError && <div className="text-red-500 text-sm mt-4 w-full text-center">{authError}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">A</span>
          <span className="text-2xl font-bold text-blue-700 tracking-tight">Admin Panel</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 py-8 px-4 space-y-6 sticky top-[72px] h-[calc(100vh-72px)]">
          <nav className="flex flex-col gap-2">
            <a href="#sample-works" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Sample Works</a>
            <a href="#quotes" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Quotes</a>
            <a href="#messages" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Messages</a>
            <a href="#iot-requests" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">IoT Requests</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-2 sm:px-6 space-y-12">
          {/* Sample Works Section */}
          <section id="sample-works" className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Sample Works</h2>
            <form onSubmit={handleAddSampleWork} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Title"
                value={newSampleWork.title}
                onChange={e => setNewSampleWork({ ...newSampleWork, title: e.target.value })}
                required
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
              />
              <input
                type="text"
                placeholder="Category"
                value={newSampleWork.category}
                onChange={e => setNewSampleWork({ ...newSampleWork, category: e.target.value })}
                required
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newSampleWork.image}
                onChange={e => setNewSampleWork({ ...newSampleWork, image: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base md:col-span-2"
              />
              <input
                type="text"
                placeholder="Features (comma separated)"
                value={newSampleWork.features}
                onChange={e => setNewSampleWork({ ...newSampleWork, features: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base md:col-span-2"
              />
              <input
                type="text"
                placeholder="Link"
                value={newSampleWork.link}
                onChange={e => setNewSampleWork({ ...newSampleWork, link: e.target.value })}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base md:col-span-2"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 md:col-span-2"
              >
                Add Sample Work
              </button>
            </form>
            {sampleWorkError && <div className="text-red-500 text-sm mb-2">{sampleWorkError}</div>}
            <ul className="divide-y divide-gray-200">
              {sampleWorks.map((work, idx) => (
                <li key={work.id ? String(work.id) : `idx-${idx}`} className="py-3 flex items-center justify-between hover:bg-blue-50 rounded-lg px-2 transition">
                  <div>
                    <span className="font-semibold text-gray-800">{work.title}</span>
                    <span className="ml-2 text-gray-500">({work.category})</span>
                  </div>
                  <button
                    onClick={() => handleDeleteSampleWork(work.id)}
                    className="text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded border border-red-100 hover:border-red-300 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Quotes Section */}
          <section id="quotes" className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Quotes</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Project Type</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Details</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q, idx) => (
                    <tr key={q.id ? String(q.id) : `idx-${idx}`} className="border-t border-gray-100 hover:bg-blue-50">
                      <td className="px-4 py-2">{q.name}</td>
                      <td className="px-4 py-2">{q.email}</td>
                      <td className="px-4 py-2">{q.project_type}</td>
                      <td className="px-4 py-2">{q.details}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{q.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Messages Section */}
          <section id="messages" className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Messages</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-purple-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Project Type</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Details</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((m, idx) => (
                    <tr key={m.id ? String(m.id) : `idx-${idx}`} className="border-t border-gray-100 hover:bg-purple-50">
                      <td className="px-4 py-2">{m.name}</td>
                      <td className="px-4 py-2">{m.email}</td>
                      <td className="px-4 py-2">{m.project_type}</td>
                      <td className="px-4 py-2">{m.details}</td>
                      <td className="px-4 py-2 text-xs text-gray-500">{m.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* IoT Requests Section */}
          <section id="iot-requests" className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">IoT Service Requests</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Number</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Message</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">File</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {iotRequests.map((req, idx) => (
                    <tr key={req.id ? String(req.id) : `idx-${idx}`} className="border-t border-gray-100 hover:bg-green-50">
                      <td className="px-4 py-2">{req.name}</td>
                      <td className="px-4 py-2">{req.email}</td>
                      <td className="px-4 py-2">{req.number}</td>
                      <td className="px-4 py-2">{req.message}</td>
                      <td className="px-4 py-2">
                        {req.file_url ? (
                          <a href={req.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-500">{req.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel; 