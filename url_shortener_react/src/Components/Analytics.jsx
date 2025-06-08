import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from './Navbar';
import Footer from './Footer';
import '../App.css'
Chart.register(...registerables);


const Analytics = () => {
    const { shortUrl } = useParams();
    // Set default start date to 30 days ago and end date to today (yyyy-mm-dd format)
    const formatDate = (date) => date.toISOString().slice(0, 10);
    console.log("startDate", formatDate(new Date()));
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return formatDate(date);
    });
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const [clicks, setClicks] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Total Clicks',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
        }],
    });

    const fetchShortUrlAnalytics = async () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            window.location.href = "/login";
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:8080/api/urls/analytics/${shortUrl}?startDate=${startDate}T00:00:00&endDate=${endDate}T23:59:59`
                , {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        Accept: "application/json",
                    },
                }
            );

            if (!res.ok) {
                console.error("Failed to fetch analytics");
                return;
            }

            const result = await res.json();
            const labels = result.map((item) => item.clickDate);
            const values = result.map((item) => item.count);
            // const labels = ["2023-10-01", "2023-10-02", "2023-10-03","2023-10-01", "2023-10-02", "2023-10-03"]; // Placeholder for labels
            // const values = [10, 20, 15,10,25,50]; // Placeholder for values
            setClicks(result.map((item) => item.count).reduce((a, b) => a + b, 0));
            setChartData({
                labels: labels,
                datasets: [

                    {
                        label: "Total Clicks",
                        data: values,
                        backgroundColor: "rgba(0, 0, 0, 1)",
                        borderColor: "rgba(0, 0, 0, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchShortUrlAnalytics();
    }, [startDate, endDate]);

    return (
        <div className>
            <Navbar />
            <main className="max-w-5xl mx-auto mt-12 mb-10 flex flex-col gap-1">

                <div className='flex items-center justify-between'>

                    <span className="text-2xl font-bold mb-10 text-black drop-shadow select-none">
                        Analytics Dashboard
                    </span>
                    <span className="text-2xl font-bold mb-10 text-black drop-shadow select-none ">
                        Total Clicks : {clicks}</span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg text-gray-700">Start Date:</span>
                        <DatePicker
                            selected={new Date(startDate)}
                            onChange={(date) => setStartDate(date.toISOString().slice(0, 10))}
                            selectsStart
                            startDate={new Date(startDate)}
                            endDate={new Date(endDate)}
                            className="border border-black rounded-lg p-2 shadow-sm focus:ring-2 focus:gray-400"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg text-gray-700">End Date:</span>
                        <DatePicker
                            selected={new Date(endDate)}
                            onChange={(date) => setEndDate(date.toISOString().slice(0, 10))}
                            selectsEnd
                            startDate={new Date(startDate)}
                            endDate={new Date(endDate)}
                            className="border border-black rounded-lg p-2 shadow-sm focus:ring-2 focus:gray-400"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 pb-20 border border-gray-200 max-w-full">
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                    labels: {
                                        boxWidth: 10,
                                        boxHeight: 10,
                                        pointStyle: 'circle',
                                        usePointStyle: true,
                                        color: 'black',
                                        font: { size: 16, weight: 'bold' }
                                    }
                                },
                                title: {
                                    display: true,
                                    text: 'Total Clicks Over date range',
                                    color: 'black',
                                    font: { size: 22, weight: 'bold' }
                                },
                            },
                            scales: {
                                x: {
                                    offset: true, // ✅ Adds space before first and after last tick
                                    ticks: {
                                        color: 'black',
                                    },
                                    grid: {
                                        color: '#ccc',
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    grace: '5%', // Optional: adds padding on Y-axis
                                    ticks: {
                                        color: 'black',
                                    },
                                    grid: {
                                        color: '#ccc',
                                    },
                                }
                            }
                        }}

                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Analytics;
