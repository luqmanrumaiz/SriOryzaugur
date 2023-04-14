import React from 'react';

function Header(props) {
    return (
            <header className="bg-green-700 shadow">
                <div className="mx-auto  py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white">{props.heading}</h1>
                </div>
            </header>
    );
}

export default Header;