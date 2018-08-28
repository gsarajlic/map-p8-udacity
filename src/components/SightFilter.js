import React, { Component } from 'react';

class SightFilter extends Component {

    handleFilter = (e) => {
        this.props.onQueryChange(e);
    }

    render() {
        return (
            <div>
                <input id="searchItems" type="text" name="Enter location name" placeholder="Filter sights..." value={this.props.query} onChange={this.handleFilter}/>
            </div>
        );
    }
}

export default SightFilter;