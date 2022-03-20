# -*- coding: utf-8 -*-
"""
Created on Sat Feb  3 20:50:16 2018

@author: jimmybow
"""

from dash import html, dcc, callback_context as ctx
from dash_extensions.enrich import DashProxy as Dash, MultiplexerTransform, Input, Output, State
from flask import Flask, request, send_file
import visdcc

server = Flask(__name__)
app = Dash(server=server, prevent_initial_callbacks=True, transforms=[MultiplexerTransform()])


app.layout = html.Div([
      visdcc.Network(id = 'net', 
                     options = dict(height= '600px', width= '100%')),
      dcc.Input(id = 'label',
                placeholder = 'Enter a scale ...',
                type = 'text',
                value = ''  ),
      dcc.Input(id = 'labelx',
                placeholder = 'Enter x position ...',
                type = 'text',
                value = ''  ),    
      dcc.Input(id = 'labely',
                placeholder = 'Enter y position ...',
                type = 'text',
                value = ''  ), 
      dcc.Input(id = 'node',
                placeholder = 'Enter node id ...',
                type = 'text',
                value = ''  )              
])

@app.callback(
    Output('net', 'run'),
    [Input('label', 'value'),
     Input('labelx', 'value'),
     Input('labely', 'value')])
def myfun(z, x, y):
    if z == '': z = '1'
    if x == '': x = '1'
    if y == '': y = '1'
    javascript = "this.net.moveTo({{'position': {{'x': {}, 'y': {}}}, 'scale': {}}})".format(x,y,z)
    print(javascript)
    return javascript

@app.callback(
    Output('net', 'run'),
    [Input('node', 'value')])
def myfun(x):
    if x == '': return ""
    else: 
        javascript = "this.net.fit({{'nodes':[{}], 'animation': true}})".format(x)
        print(javascript)
        return javascript


if __name__ == '__main__':
    app.run_server(debug=True)