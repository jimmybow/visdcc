import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Icon } from 'antd';

export default class DataTable extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            filterDropdownVisible: this.props.data.columns.map(x => false),
            col_filtered         : this.props.data.columns.map(x => false),
            searchText           :this.props.data.columns.map(x => ''),
            row_filtered         : this.props.data.dataSource.map(x => true)
        }
    }
	
    onInputChange(j, e){
        var value = this.state.searchText
        value[j] = e.target.value 
        this.setState({ searchText: value })        
        const {setProps} = this.props
        if (setProps) setProps({ searchText: value })
    }
    
    onSearch(col, col_name, e){
        const {data, setProps} = this.props;
        const reg2 = new RegExp('x', 'gi')
        var filterDropdownVisible_value = this.state.filterDropdownVisible
        var filtered_value = this.state.col_filtered
        
        filterDropdownVisible_value[col]= false
        filtered_value[col]= !!this.state.searchText[col]
        if (filtered_value.filter(x=>x).length == 0)  var value = data.dataSource.map(x => true)
        else {   
            var value = data.dataSource.map((record) => {
                var match = true 
                var j=0
                var match_list = []
                for (j=0;j<data.columns.length;j++){
                    var reg = new RegExp(this.state.searchText[j], 'gi');
                    if (typeof(record[data.columns[j].dataIndex])=='string') {match = !!record[data.columns[j].dataIndex].match(reg)}
                    else {
                        if (this.state.searchText[j] == '') {match = true}
                        else { try {match = !!eval(this.state.searchText[j].replace(reg2, 'record.' + data.columns[j].dataIndex))} 
                               catch (exception) {match = false} }       
                    }
                    match_list.push(match)
                }

                if (match_list.filter(x=>!x).length>0) {
                    return false;
                }
                return true;
            })
        }

        this.setState({
            filterDropdownVisible: filterDropdownVisible_value,
            col_filtered: filtered_value,
            row_filtered: value
        })
        
        if (setProps) setProps({
            filterDropdownVisible: filterDropdownVisible_value,
            col_filtered: filtered_value,
            row_filtered: value
        })
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
    
    gg_filterVisibleChange(col){
        return (visible) => {
            var value = this.state.filterDropdownVisible
            value[col] = visible
            this.setState({
                filterDropdownVisible: value
            })
            const {setProps} = this.props
            if (setProps) setProps({ filterDropdownVisible: value })
        }
    }
    
    gg_filterDropdown(col){
        const {data} = this.props;
        return (
        <div className="custom-filter-dropdown">
            <Input
                placeholder="Search"
                value={this.state.searchText[col]}
                onChange={(e)=>(this.onInputChange(col, e))}
                onPressEnter={(e)=>(this.onSearch(col, data.columns[col].dataIndex, e))}
            />
            <Button type="primary" onClick={(e)=>(this.onSearch(col, data.columns[col].dataIndex, e))}>Search</Button>
        </div>
        )
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

            this.setState({
                filterDropdownVisible: new_data.columns.map(x => false),
                col_filtered: new_data.columns.map(x => false),
                searchText: new_data.columns.map(x => ''),
                row_filtered: new_data.dataSource.map(x => true)
            })
            
			setProps({data                  : new_data,
                      row_filtered          : new_data.dataSource.map(x => true),
                      filterDropdownVisible : new_data.columns.map(x => false),
                      col_filtered          : new_data.columns.map(x => false),
                      searchText            : new_data.columns.map(x => '')                           })

            
		}    
    }
	
    componentWillReceiveProps(nextProps) {
        const {data, setProps} = this.props;
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

        if (JSON.stringify(nextProps.data.dataSource) != JSON.stringify(data.dataSource)) {
            this.setState({row_filtered          : nextProps.data.dataSource.map(x => true),
                           filterDropdownVisible : nextProps.data.columns.map(x => false),
                           col_filtered          : nextProps.data.columns.map(x => false),
                           searchText            : nextProps.data.columns.map(x => '')      })
            setProps({row_filtered          : nextProps.data.dataSource.map(x => true),
                      filterDropdownVisible : nextProps.data.columns.map(x => false),
                      col_filtered          : nextProps.data.columns.map(x => false),
                      searchText            : nextProps.data.columns.map(x => '')      })
        }
	}	
    
    render() {
        const {id, style, data, pagination, scroll ,bordered, showHeader, title, footer,
               setProps, box_selected_keys, box_type, size, locale} = this.props; 
        if (title )     { var title_value  = () => title    } else { var title_value  = null }	
        if (footer)     { var footer_value = () => footer   } else { var footer_value = null }
        if (pagination) { var pagination_value = pagination } else { var pagination_value = false }
        if (this.state.col_filtered.filter(x=>x).length>0 ) { var dataSource_value = data.dataSource.filter((x, index) => this.state.row_filtered[index])  } 
        else { var dataSource_value = data.dataSource }
        
        var rowSelection = {
            onChange: (selectedRowKeys) => {
                setProps({box_selected_keys: selectedRowKeys})
            },
            type: box_type
        }
        if (box_type == null) var rowSelection = null      
        var j = 0;
        var columns_value = data.columns.map(x => Object.assign({}, x))
        for (j=0;j<data.columns.length;j++){
            columns_value[j].filterDropdown = this.gg_filterDropdown(j)     
			columns_value[j].filterIcon =  <Icon type="filter" style={{ color: this.state.col_filtered[j] ? '#108ee9' : '#aaa' }} />
            columns_value[j].filterDropdownVisible = this.state.filterDropdownVisible[j],
            columns_value[j].onFilterDropdownVisibleChange = this.gg_filterVisibleChange(j)
		}
        
        return (
            <Table id =           {id} 
                   style =        {style} 
                   dataSource =   {dataSource_value} 
                   columns =      {columns_value}
                   pagination =   {pagination_value} 
                   scroll =       {scroll}
                   bordered =     {bordered}	
                   showHeader =   {showHeader}		
                   title  =       {title_value} 
                   footer =       {footer_value}
                   rowSelection = {rowSelection}
                   size =         {size} 
                   locale =       {locale}                   />
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
    box_type         :PropTypes.string,
    size             :PropTypes.string,
    locale           :PropTypes.object,
    row_filtered     :PropTypes.array,
    searchText       :PropTypes.array,
    col_filtered     :PropTypes.array,
    filterDropdownVisible:PropTypes.array
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
    scroll : { x: 300, y: 300 },
    bordered : false,
    showHeader: true   
}        