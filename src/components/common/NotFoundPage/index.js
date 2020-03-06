import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="container">
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for can't be found.</p>
            <Link className="btn btn-primary" to="/">Return to Home</Link>
        </div>
    )
}
