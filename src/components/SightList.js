import React, { Component } from 'react';

class SightList extends Component {
    

    handleClick = (e) => {
        this.props.onSightClick(e);
    }

    render() {
        return (
            <ul id="list" type="text" name="List of locations">
                {this.props.sights.map(s =>
                    <button className="listbutton" tabIndex={0} key={s.venue.id} onClick={this.handleClick} value={s.venue.name} name="">{s.venue.name}</button>
                    ) 
                }
            </ul>
        );
    }
}

export default SightList;