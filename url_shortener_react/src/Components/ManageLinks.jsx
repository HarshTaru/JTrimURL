import React, { useState, useEffect, setTimeout } from "react";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";
import Navbar from "./Navbar";
import { formatDate } from "../utils/FormatDate";
import Footer from "./Footer";

function ManageLinks() {
  const [links, setLinks] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const authToken = localStorage.getItem('authToken');
      const linksRes = await fetch('http://localhost:8080/api/urls/myurls', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!linksRes.ok) {
        throw new Error('Failed to fetch links');
      }

      const linksData = await linksRes.json();

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

  const handleOpen = async (shortUrl) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/login";
      return;
    }
    
    const result = await fetch(`http://localhost:8080/public/${shortUrl}`,  {
      headers: { Authorization: `Bearer ${authToken}` },
      method: 'GET',
    });
    const parsedResult = await result.json();
    const url = parsedResult.originalUrl;
    await fetchData();
    console.log(url);
    window.open(url, '_blank');
    
  };

  const handleDelete = async (shortUrl) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/login";
      return;
    }
    setLinkToDelete(shortUrl);
    setShowConfirmModal(true);
  };

  const handleAnalytics = (shortUrl) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/login";
      return;
    }
    window.open(`/analytics/${shortUrl}`, '_blank');
  }

  const confirmDelete = async () => {
    if (!linkToDelete) return;
    const authToken = localStorage.getItem("authToken");
    await fetch(`http://localhost:8080/api/urls/delete/${linkToDelete}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    });
    setShowConfirmModal(false);
    setLinkToDelete(null);
    await fetchData();
  };

  return (
    <main className="max-w-6xl mx-auto mt-12">
      <h1 className="text-4xl font-extrabold mb-8 select-none">Manage Links</h1>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : links.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No links found. Create some links to get started.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-200">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-600 font-semibold px-6 py-4">
                  Short URL
                </th>
                <th className="text-gray-600 font-semibold px-6 py-4">
                  Original URL
                </th>
                <th className="text-gray-600 font-semibold px-6 py-4">
                  Clicks
                </th>
                <th className="text-gray-600 font-semibold px-6 py-4">
                  Created On
                </th>
                <th
                  className="text-gray-600 font-semibold px-6 py-4 text-center"
                  aria-label="Actions"
                >

                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map(
                ({ id, shortUrl, originalUrl, clickCount, createdDate }) => (
                  <tr
                    key={id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 break-words max-w-[180px]">
                      {shortUrl}
                    </td>
                    <td
                      className="px-6 py-4 text-gray-600 truncate max-w-[320px]"
                      title={originalUrl}
                    >
                      {originalUrl}
                    </td>
                    <td className="px-6 py-4">{clickCount}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(createdDate)}</td>
                    <td className="px-6 py-4 space-x-4 whitespace-nowrap">
                      <button
                        onClick={() => handleOpen(shortUrl)}
                        className="inline-flex items-center px-3 py-2 bg-black hover:bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                        aria-label={`Open ${shortUrl} in new tab`}
                        title="Open"
                        type="button"
                      >
                        <FiExternalLink className="mr-2" />
                        Open
                      </button>
                      <button
                        onClick={() => handleDelete(shortUrl)}
                        className="inline-flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        aria-label={`Delete link ${shortUrl}`}
                        title="Delete"
                        type="button"
                      >
                        <FiTrash2 className="mr-2" />
                        Delete
                      </button>
                      <button
                        onClick={() => handleAnalytics(shortUrl)}
                        className="inline-flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                        aria-label={`Open analaytics ${shortUrl}`}
                        title="See analytics"
                        type="button"
                      >
                        <FiExternalLink className="mr-2" />
                        Analytics
                      </button>

                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {showConfirmModal && (
            <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this link?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </main>
  );
}

export default function ManageLinksPage() {
  return (
    <div className="bg-white text-gray-700 font-sans min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <ManageLinks />
      </div>
      <Footer />
    </div>
  );
}
