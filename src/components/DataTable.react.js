import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

export default class DataTable extends Component {
    constructor(props) {
        super(props); 
	}
	
	handleClick(row, col){
		const {setProps, selectedcell} = this.props;  		
		if (setProps) setProps({  selectedcell: {row:row, col:col}  })
	}
    
    gg(col, ff){
        return (text, record) => <a id = {col} key = {col} href="javascript:;" onClick = {(e)=>(ff.handleClick(record.key, col, e) )}	>{text}</a>
    }
    
    gg_sort(col){
        return (a, b) => {
            if (typeof(a[col])=='string' & typeof(b[col])=='string'){
                if (a[col] < b[col]) {
                    return(-1)
                }
                if (a[col] > b[col]) {
                    return(1)
                }
                return(0)
            } else {
                return(a[col] - b[col])
            }
        }
    }
    
	componentDidMount() { 
	    const {data, setProps} = this.props;  
		if (setProps){ 
		    var j = 0
			var cols_index = [];
            var cols_sort = [];
			var new_data = data;
			for (j=0;j<data.columns.length;j++){
			    if (new_data.columns[j].Is_click == true) cols_index.push(j)
                if (new_data.columns[j].Is_sort == true) cols_sort.push(j)    
			}

            var cols_f = cols_index.map( (col) => this.gg(col, this)    , this)
			for (j=0;j<cols_index.length;j++){
			    new_data.columns[cols_index[j]].render = cols_f[j]
			}	
            var cols_f = new_data.columns.map( (x) => this.gg_sort(x.dataIndex)    , this)
            for (j=0;j<cols_sort.length;j++){
			    new_data.columns[cols_sort[j]].sorter = cols_f[cols_sort[j]]
			}	

			setProps({data:new_data})     
		}    
    }
	
	componentWillReceiveProps(nextProps) {
		var col_render_counts = [];
        var col_sorter_counts = [];
		var cols_index = [];
        var cols_sort = [];
		var j = 0;
		for (j=0;j<nextProps.data.columns.length;j++){
			    if (nextProps.data.columns[j].render) col_render_counts.push(j)
                if (nextProps.data.columns[j].sorter) col_sorter_counts.push(j)    
				if (nextProps.data.columns[j].Is_click == true) cols_index.push(j)
                if (nextProps.data.columns[j].Is_sort == true) cols_sort.push(j)     
		}
	    

		if ((col_render_counts.length == 0 & cols_index.length > 0)|
            (col_sorter_counts.length == 0 & cols_sort.length  > 0) ){ 
			var new_data = nextProps.data
            
            var cols_f = cols_index.map( (col) => this.gg(col, this)    , this)
			for (j=0;j<cols_index.length;j++){
			    new_data.columns[cols_index[j]].render = cols_f[j]
			}	
            var cols_f = new_data.columns.map( (x) => this.gg_sort(x.dataIndex)    , this)
            for (j=0;j<cols_sort.length;j++){
			    new_data.columns[cols_sort[j]].sorter = cols_f[cols_sort[j]]
			}
		}       
	}	
    
    render() {
        const {id, style, data, pagination, scroll ,bordered, showHeader, title, footer,
               setProps, box_selected_keys, box_type} = this.props; 
        if (title ) { var title_value  = () => title  } else { var title_value  = null }	
        if (footer) { var footer_value = () => footer } else { var footer_value = null }
        var rowSelection = {
            onChange: (selectedRowKeys) => {
                setProps({box_selected_keys: selectedRowKeys})
            },
            type: box_type
        }
        if (box_type == null) var rowSelection = null        
        return (
            <Table id =           {id} 
                   style =        {style} 
                   dataSource =   {data.dataSource} 
                   columns =      {data.columns}
                   pagination =   {pagination} 
                   scroll =       {scroll}
                   bordered =     {bordered}	
                   showHeader =   {showHeader}		
                   title  =       {title_value} 
                   footer =       {footer_value}
                   rowSelection = {rowSelection}          />
        );
    }
}

DataTable.propTypes = {
    id               :PropTypes.string.isRequired,
    data             :PropTypes.object,   
    style            :PropTypes.object,
    pagination       :PropTypes.object,
    scroll           :PropTypes.object,
    bordered         :PropTypes.bool,
    showHeader       :PropTypes.bool,
    selectedcell     :PropTypes.object,
    title            :PropTypes.string,
    footer           :PropTypes.string,
    box_selected_keys:PropTypes.array,
    box_type         :PropTypes.string
};
        
DataTable.defaultProps = {
    data :{dataSource:[{key: 1, name: 'Jacky', age: 20},
                       {key: 2, name: 'Mei'  , age: 18},
                       {key: 3, name: 'Jimmy', age: 32} ],
           columns :[{title: 'Names',
                      dataIndex: 'name',
                      key: 'name',
                      Is_click: true},
                     {title: 'Ages',
                      dataIndex: 'age',
                      key: 'age'}       ]                  },
	pagination : {pageSize: 10}, 
    scroll : { x: 300, y: 300 },
	bordered : false,
    showHeader: true
}        

         
