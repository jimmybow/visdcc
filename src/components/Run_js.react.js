import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Run_js extends Component {
    render() {
        const {id, run, style, setProps} = this.props;
        if ( run ){
            try { eval(run) } 
            catch (exception) { console.log(exception) }  
            if (setProps) setProps( {run: ''} )
        }
        return (
            <div id = {id} style = {style}></div>
        )
    }
}

Run_js.propTypes = {
    id : PropTypes.string.isRequired,
    run : PropTypes.string,
    style: PropTypes.object
};