import React, { Component } from 'react';

class SightList extends Component {
    

    handleClick = (e) => {
        this.props.onSightClick(e);
    }

    render() {
        return (
            <ul id="list" type="text" name="List of locations">
                {this.props.sights.map(s =>
                <li tabIndex={0} 
                    className="listbutton"
                    key={s.venue.id} onClick={this.handleClick} 
                    value={s.venue.name}> {s.venue.name}
                </li>
                    ) 
                }
            </ul>
        );
    }
}

export default SightList;