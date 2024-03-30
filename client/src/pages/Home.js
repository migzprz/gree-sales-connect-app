import MainHeader from "../components/MainHeader"
import React, { useState, useEffect } from 'react';
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import '../index.css';
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {

    return (
        <>
            <MainHeader/>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Dashboard/>
            </div>
        </>

    );
};

export default Home;
