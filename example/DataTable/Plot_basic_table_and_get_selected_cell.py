# -*- coding: utf-8 -*-
"""
Created on Sat Feb  3 20:50:16 2018

@author: jimmybow
"""

from dash import Dash, html, dcc
from dash.dependencies import Input, Output, State
import visdcc

external_stylesheets = ['https://unpkg.com/antd@3.16.1/dist/antd.css',
                        'https://rawgit.com/jimmybow/CSS/master/visdcc/DataTable/Filter.css']

Data_Sample = {
    'dataSource':[  {'key': 1, 'name': 'Jacky', 'age': 20},
                    {'key': 2, 'name': 'Mei'  , 'age': 18},
                    {'key': 3, 'name': 'Jay', 'age': 72},
                    {'key': 4, 'name': 'Sandy'  , 'age': 14},
                    {'key': 5, 'name': 'Jerry', 'age': 56},
                    {'key': 6, 'name': 'May'  , 'age': 22},
                    {'key': 7, 'name': 'Jimmy', 'age': 34},
                    {'key': 8, 'name': 'Jeff'  , 'age': 28},
                    {'key': 9, 'name': 'Bob', 'age': 15}     ],
    'columns':[{'title': 'Names',
                'dataIndex': 'name',
                'key': 'name',
                'Is_sort': True, 
                'Is_click': True,
                'width': 150,
                'fixed': True    },
               {'title': 'Ages',
                'dataIndex': 'age',
                'key': 'age',
                'Is_sort': True,
                'Is_click': True }  ]
}

app = Dash(__name__, external_stylesheets = external_stylesheets)

app.layout = html.Div([
    visdcc.DataTable(id         = 'table' ,
                     box_type   = 'radio',
                     data       = Data_Sample,
                     scroll     = {'x':600,'y':400},
                     pagination = {'pageSize': 5},
                     style      = {'width':'25%'} 
                     ),
    html.Div(id = 'text1'),                 
    html.Div(id = 'text2'),
    html.Div(id = 'text3'),
    html.Div(id = 'text4'),
    html.Div(id = 'text5')
])
           
@app.callback(
    Output('text1', 'children'),
    [Input('table', 'box_selected_keys')])
def myfun(x): 
    if x == None  : return('')
    else          : return("Selected row key is " + ', '.join([str(i) for i in x])  )
    
@app.callback(
    Output('text2', 'children'),
    [Input('table', 'selectedcell')])
def myfun(x): 
    if x == None  : return('')
    else          : return('Clicked cell is on row : {} col : {}'.format(x['row'], x['col'])  )    

@app.callback(
    Output('text3', 'children'),
    [Input('table', 'row_filtered')])
def myfun(x): 
    if x == None  : return('')
    else          : return("row_filtered are " + str(x) ) 
    
@app.callback(
    Output('text4', 'children'),
    [Input('table', 'col_filtered')])
def myfun(x): 
    if x == None  : return('')
    else          : return("col_filtered are " + str(x) )     
    
@app.callback(
    Output('text5', 'children'),
    [Input('table', 'searchText')])
def myfun(x): 
    if x == None  : return('')
    else          : return("searchText are " + str(x) )    

if __name__ == '__main__':
    app.run(debug=True)
