import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <footer className="container py-4 mt-4 text-muted text-right">
            Made with <FontAwesomeIcon icon={faHeart} className="text-danger" /> by ItWorksOnMyMachine
        </footer>
    );
}