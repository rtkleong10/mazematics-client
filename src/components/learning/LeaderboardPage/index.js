import React, { Component } from 'react'

export class LeaderboardPage extends Component {
    render() {
        let leaderboardData = [
            {
                "name": "Bob",
                "timing": 10.2
            },
            {
                "name": "Joe",
                "timing": 11.2
            },
            {
                "name": "Caleb",
                "timing": 12.1
            },
            {
                "name": "Cathy",
                "timing": 13.1231
            },
            {
                "name": "Sarah",
                "timing": 14.321
            },
            {
                "name": "May",
                "timing": 15.123
            },
            {
                "name": "Harry",
                "timing": 16.143
            },
            {
                "name": "Matthew",
                "timing": 17.341
            },
            {
                "name": "Clyde",
                "timing": 19.241
            },
            {
                "name": "Elizabeth",
                "timing": 21.2321
            }
        ]

        return (
            <div className="container">
                <h1>Leaderboard</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Timing (in minutes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboardData.map(row =>
                                <tr>
                                    <th scope="row">{row.name}</th>
                                    <td>{row.timing.toFixed(2)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default LeaderboardPage
