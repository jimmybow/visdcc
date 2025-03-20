# -*- coding: utf-8 -*-
"""
Created on Sat Feb  3 20:50:16 2018

@author: jimmybow
"""

import dash
from dash import dcc
from dash import html
from dash.dependencies import Input, Output, State
import visdcc

app = dash.Dash()

app.layout = html.Div([
      visdcc.Network(id = 'net',
                     selection = {'nodes':[], 'edges':[]},
                     options = dict(height= '600px', width= '100%')),
      html.Div(id = 'nodes'),
      html.Div(id = 'edges')
])
      
@app.callback(
    Output('nodes', 'children'),
    [Input('net', 'selection')])
def myfun(x): 
    s = 'Selected nodes : '
    if len(x['nodes']) > 0 : s += str(x['nodes'][0])
    return s

@app.callback(
    Output('edges', 'children'),
    [Input('net', 'selection')])
def myfun(x): 
    s = 'Selected edges : '
    if len(x['edges']) > 0 : s = [s] + [html.Div(i) for i in x['edges']]
    return s

if __name__ == '__main__':
    app.run(debug=True)
