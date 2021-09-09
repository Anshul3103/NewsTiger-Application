import React, { Component } from 'react'
import loading from "./ajax-loader.gif"
export class Spinner extends Component {
    render() {
        return (
            <div className="text-center my-3">
                <img src={loading} alt="loader" />
            </div>
        )
    }
}

export default Spinner
