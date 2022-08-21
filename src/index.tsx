import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';


const App: FC = () => {
    const person = {};

    const promise = new Promise((resolved, rejected) => {
        resolved(2)
    });
    return (<p>ahamed site new sunni222</p>);
};

const root = createRoot(document.getElementById('root')!);

root.render(<App />);