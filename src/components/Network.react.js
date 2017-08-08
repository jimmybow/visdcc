import React, {Component} from 'react';
import PropTypes from 'prop-types';
import vis from 'vis';

export default class Network extends Component {
    constructor(props) {
        super(props);
        this.nn = new vis.DataSet()
        this.ee = new vis.DataSet()
        this.net = 0       
    }    
        
    componentDidMount() {
        const {id, data, options} = this.props;    
        var gd = document.getElementById(id);      
        this.nn.add(data.nodes)
        this.ee.add(data.edges)
        this.net = new vis.Network(gd, {nodes: this.nn, edges: this.ee}, options)  
    }
    
    componentWillReceiveProps(nextProps) {    
        if (this.props.data !== nextProps.data){ 
            var new_id = nextProps.data.nodes.map(function(x) {return x.id })
            var remove_aim = this.nn.getIds().filter(function(x){ return new_id.indexOf(x) == -1 })
            this.nn.remove(remove_aim)
            this.nn.update(nextProps.data.nodes) 
            this.ee.remove(this.ee.getIds())
            this.ee.update(nextProps.data.edges)            
        }
        if (this.props.options !== nextProps.options){
            this.net.setOptions({physics: {enabled:false}})
        }  
    }
    
    shouldComponentUpdate(nextProps){
            return (this.props.data !== nextProps.data );
    }
    
    render() {
        const {id, style} = this.props;              
        return (
            <div id = {id} style = {style}></div>
        );
    }
}

Network.propTypes = {
    id : PropTypes.string.isRequired,
    data : PropTypes.object,   
    options : PropTypes.object,
    style: PropTypes.object
};
        
Network.defaultProps = {
    data :{nodes:[{id: 1, label: 'Node 1'},
                  {id: 2, label: 'Node 2'},
                  {id: 3, label: 'Node 3'},
                  {id: 4, label: 'Node 4'},
                  {id: 5, label: 'Node 5'} ],
           edges :[{from: 1, to: 3},
                   {from: 1, to: 2},
                   {from: 2, to: 4},
                   {from: 2, to: 5} ]
           },
    options:{}
}        

         
