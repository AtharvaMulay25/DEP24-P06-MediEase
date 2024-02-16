import React, { useState } from 'react';
import { SideTopBar } from '../components/SideTopBar';

const AdminHome = () => {
    return(
        <section>
            <div className="h-screen z-0">
                <SideTopBar />
            </div>
            <div className="flex-shrink z-0" style={{ position: 'absolute', top: '80px', left: '55px' }}>
                <h1> ADMINHOME </h1>
            </div>
        </section>
    )
}

export default AdminHome;