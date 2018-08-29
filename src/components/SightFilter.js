import React, { Component } from 'react';

class SightFilter extends Component {

    handleFilter = (e) => {
        this.props.onQueryChange(e);
    }

    render() {
        return (
            <div>
                <input id="searchItems" type="text" aria-role="Search filter input field" aria-label="search places" placeholder="Filter sights..." value={this.props.query} onChange={this.handleFilter}/>
            </div>
        );
    }
}

export default SightFilter;