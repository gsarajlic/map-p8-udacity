import React, { Component } from 'react';

class SightFilter extends Component {

    handleFilter = (e) => {
        this.props.onQueryChange(e);
    }

    render() {
        return (
            <div id="searchDiv">
                <input id="searchItems" type="text" aria-label="type text to search places" placeholder="Filter sights..." value={this.props.query} onChange={this.handleFilter}/>
            </div>
        );
    }
}

export default SightFilter;