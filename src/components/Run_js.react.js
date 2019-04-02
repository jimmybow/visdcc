import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Run_js extends Component {
    componentDidMount() {
        const {id, run, style, setProps} = this.props;
        if ( run ){
            try { eval(run) } 
            catch (exception) { console.log(exception) }  
            if (setProps) setProps( {run: ''} )
        }
    }

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
    /**
     * run your javascript here
     */
    run : PropTypes.string,
    style: PropTypes.object,
    /**
     * Using 'setProps' to set event props
     */
    event: PropTypes.object,
    event0: PropTypes.object,
    event1: PropTypes.object,
    event2: PropTypes.object,
    event3: PropTypes.object,
    event4: PropTypes.object,
    event5: PropTypes.object,
    event6: PropTypes.object,
    event7: PropTypes.object,
    event8: PropTypes.object,
    event9: PropTypes.object
};