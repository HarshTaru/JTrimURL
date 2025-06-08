import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { formatDate } from '../utils/FormatDate';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";


const Dashboard = () => {
    const [clicks, setClicks] = useState(0);
    const [linksCount, setLinksCount] = useState(0);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [newUrl, setNewUrl] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const authToken = localStorage.getItem('authToken');
            const linksRes = await fetch(`${API_BASE_URL}/api/urls/myurls`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (!linksRes.ok) {
                throw new Error('Failed to fetch links');
            }

            const linksData = await linksRes.json();

            setClicks(linksData.reduce((sum, link) => sum + link.clickCount, 0));
            setLinksCount(linksData.length);
            setLinks(linksData);
        } catch (err) {
            console.error(err);
            setError('Error fetching dashboard data.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            window.location.href = '/auth';
            return;
        }

        fetchData();
    }, []);

    function Hero() {
        return (
            <section className="pt-16 pb-20 max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mb-4 select-none">
                    Welcome to your JTrimURL Dashboard
                </h1>
                <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-10">
                    Manage your links efficiently and securely. Create new links, track clicks, and organize your URLs all in one place.
                </p>
            </section>
        );
    }

    function MetricCard({ label, value }) {
        return (
            <div className="bg-white rounded-3xl shadow-sm border-2 p-8 text-center flex flex-col select-none">

                <div className="text-4xl font-extrabold text-gray-900 mb-2">{value}</div>
                <div className="text-gray-500 font-semibold">{label}</div>
            </div>
        );
    }

    function Metrics() {
        return (
            <section className="max-w-7xl mx-auto px-6 mb-20 mt-0">
                <div className="flex justify-center gap-6" >
                    <MetricCard key="linkCount" label="Total Links" value={linksCount.toString()} />
                    <MetricCard key="clicksCount" label="Total Clicks" value={clicks.toString()} />
                </div>
            </section>
        );
    }

    const handleCreateLink = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken || !newUrl.trim()) return;

        try {
            setCreating(true);
            setCreateError(null);
            let processedUrl = newUrl.trim();
            if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
                processedUrl = 'https://' + processedUrl;
            }
            const response = await fetch(`${API_BASE_URL}/api/urls/shorten`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl: processedUrl })
            });

            if (!response.ok) throw new Error('Failed to shorten URL');

            const data = await response.json();
            await fetchData();
            setShowModal(false);
            setNewUrl('');
        } catch (err) {
            setCreateError(err.message || 'Something went wrong.');
        } finally {
            setCreating(false);
        }
    };

    function LinksActions() {
        const redirectIfNoAuth = (e) => {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                e.preventDefault();
                window.location.href = '/auth';
            }
        };

        const redirectToManageLinks = (e) => {
            redirectIfNoAuth(e);
            window.location.href = '/manage';
        };

        return (
            <section id="links" className="max-w-7xl mx-auto mb-16 px-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 select-none">Your Links</h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="rounded-lg bg-black text-white px-5 py-2 font-semibold hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
                        >
                            Create New Link
                        </button>
                        <button
                            onClick={redirectToManageLinks}
                            className="rounded-lg border border-gray-300 text-gray-700 px-5 py-2 font-semibold hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Manage Links
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    function LinksTable() {
        if (!links || links.length === 0)
            return <p className="text-center text-gray-500">No links to display. Create one to get started.</p>;

        

        return (
            <section className="max-w-7xl mx-auto mb-24 px-6 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-300 pb-3 font-semibold text-gray-700">Short URL</th>
                            <th className="border-b border-gray-300 pb-3 font-semibold text-gray-700">Original URL</th>
                            <th className="border-b border-gray-300 pb-3 font-semibold text-gray-700">Clicks</th>
                            <th className="border-b border-gray-300 pb-3 font-semibold text-gray-700">Created On</th>
                            <th className="border-b border-gray-300 pb-3 font-semibold text-gray-700 text-center">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {links.map(({ id, originalUrl, shortUrl, clickCount, createdDate }) => (
                            <tr key={id} className="hover:bg-gray-50 transition-colors" onClick={() => {
                                if (shortUrl) {
                                    window.open(`${API_BASE_URL}/${shortUrl}`, '_blank');
                                }
                            }}>
                                <td className="py-4 pr-6 font-semibold text-gray-900 hover:underline cursor-pointer ">
                                    {shortUrl}
                                </td>
                                <td className="py-4 pr-6 text-gray-600 truncate max-w-xs">{originalUrl}</td>
                                <td className="py-4 pr-6">{clickCount}</td>
                                <td className="py-4 pr-6 text-gray-500 ">{formatDate(createdDate)}</td>
                                <td className="py-4 text-center">
                                    <button
                                        className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-900 transition-colors duration-200"
                                        onClick={async () => {
                                            if (!shortUrl) return;
                                            window.location.href = '/manage';
                                            setTimeout(fetchData, 1000);
                                        }}
                                    >
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    }
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Hero />
                {loading ? (
                    <div className="text-center py-32 text-lg text-gray-600">Loading dashboard...</div>
                ) : error ? (
                    <div className="text-center py-32 text-lg text-red-500">{error}</div>
                ) : (
                    <>
                        <Metrics />
                        <LinksActions />
                        <LinksTable />
                    </>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-all duration-1000">

                        <div className="bg-white rounded-2xl shadow-neutral-500 shadow-2xl px-10 py-12 max-w-md w-full mx-5">
                            <h2 className="text-2xl font-bold mb-4">Create Short URL</h2>
                            <input
                                type="text"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                placeholder="Enter original URL"
                                className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {createError && <p className="text-red-500 mb-2">{createError}</p>}
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateLink}
                                    disabled={creating}
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
                                >

                                    {creating ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );

};

export default Dashboard;
