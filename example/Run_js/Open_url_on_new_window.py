# -*- coding: utf-8 -*-
"""
Created on Sat Feb  3 20:50:16 2018

@author: jimmybow
"""

from dash import Dash, html, dcc
from dash.dependencies import Input, Output, State
import visdcc

app = Dash(__name__)

app.layout = html.Div([
    html.Button('open url', id = 'button'),
    visdcc.Run_js(id = 'javascript')
])
           
@app.callback(
    Output('javascript', 'run'),
    [Input('button', 'n_clicks')])
def myfun(x): 
    if x: 
        return "window.open('https://yahoo.com/')"
    return ""

if __name__ == '__main__':
    app.run_server(debug=True)
