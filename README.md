# Visdcc
Dash Core Components for Visualization.

- [Installing](#installing-)
- [Basic Usage](#basic-usage-)
  - [visdcc.Network](#1-visdccnetwork-)
    - [Plot basic network](#plot-basic-network-)
    - [Get selected nodes and edges](#get-selected-nodes-and-edges-)
    - [Animate or move the camera](#animate-or-move-the-camera-)
    - [Animate or move the camera by javascript](#animate-or-move-the-camera-by-javascript-)    
  - [visdcc.DataTable](#2-visdccdatatable-)
    - [Plot basic table and get selected cell](#plot-basic-table-and-get-selected-cell-)
  - [visdcc.Run_js](#3-visdccrun_js-)
    - [Open url on new window](#open-url-on-new-window-)
    - [Apply jQuery Datatables](#apply-jquery-datatables-)
    - [Add event and callback](#add-event-and-callback-)
- Advanced Usage
    - [Dash app with decision tree](https://github.com/jimmybow/tree_vis)
- [Learning more about dash ...](https://dash.plotly.com/)  

# Installing :
```
pip install visdcc
pip install dash==3.0.0
```

# Basic Usage :
```
from dash import Dash, html, dcc
from dash.dependencies import Input, Output, State
import visdcc

app = Dash(__name__)
app.layout = html.Div(...)

@app.callback(...)
def myfun(...):
    ...
    return ...

if __name__ == '__main__':
    app.run()
```
See detail [example code](example)

[↑](#visdcc)
# 1. visdcc.Network : 
See documents of vis.js : https://visjs.github.io/vis-network/docs/network/

CSS : https://cdnjs.cloudflare.com/ajax/libs/vis/4.20.1/vis.min.css

[↑](#visdcc)
### Plot basic network :
```
app.layout = html.Div([
      visdcc.Network(id = 'net', 
                     options = dict(height= '600px', width= '100%')),
      dcc.Input(id = 'label',
                placeholder = 'Enter a label ...',
                type = 'text',
                value = ''  ),
      html.Br(),html.Br(),
      dcc.RadioItems(id = 'color',
                     options=[{'label': 'Red'  , 'value': '#ff0000'},
                              {'label': 'Green', 'value': '#00ff00'},
                              {'label': 'Blue' , 'value': '#0000ff'} ],
                     value='Red'  )             
])

@app.callback(
    Output('net', 'data'),
    [Input('label', 'value')])
def myfun(x):
    data ={'nodes':[{'id': 1, 'label':    x    , 'color':'#00ffff'},
                    {'id': 2, 'label': 'Node 2'},
                    {'id': 4, 'label': 'Node 4'},
                    {'id': 5, 'label': 'Node 5'},
                    {'id': 6, 'label': 'Node 6'}                    ],
           'edges':[{'id':'1-3', 'from': 1, 'to': 3},
                    {'id':'1-2', 'from': 1, 'to': 2} ]
           }
    return data

@app.callback(
    Output('net', 'options'),
    [Input('color', 'value')])
def myfun(x):
    return {'nodes':{'color': x}}
```
[↑](#visdcc)
### Get selected nodes and edges :

```
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
```
[↑](#visdcc)
### Animate or move the camera :

```
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
    Output('net', 'moveTo'),
    [Input('label', 'value'),
     Input('labelx', 'value'),
     Input('labely', 'value')])
def myfun(z, x, y):
    if z == '': z = 1
    if x == '': x = 1
    if y == '': y = 1
    return {'position': {'x': int(x), 'y': int(y)}, 'scale': int(z)}

@app.callback(
    Output('net', 'fit'),
    [Input('node', 'value')])
def myfun(x):
    if x == '': return {'Is_used': False}
    else: return {'nodes': [x], 'animation': True}
```

[↑](#visdcc)
### Animate or move the camera by javascript :

```
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
```

[↑](#visdcc)
# 2. visdcc.DataTable : 
See documents of antd.js : https://ant.design/components/table/
  - Using regular expression to filter the string.
  - Using boolean expression like `x > 20 & x < 70` to filter the number.

CSS : 
  - https://unpkg.com/antd@3.1.1/dist/antd.css
  - https://rawgit.com/jimmybow/CSS/master/visdcc/DataTable/Filter.css

[↑](#visdcc)
### Plot basic table and get selected cell :
```
external_stylesheets = ['https://unpkg.com/antd@3.1.1/dist/antd.css',
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
                'width': 120,
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

```
[↑](#visdcc)
# 3. visdcc.Run_js : 
Run your javascript !

### Open url on new window :
```
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
```
[↑](#visdcc)
### Apply jQuery Datatables :
```
def generate_html_table_from_df(df, id):
    Thead = html.Thead(
        [html.Tr([html.Th(col) for col in df.columns])]
    )
    Tbody = html.Tbody(
        [html.Tr(
            [html.Td( df.iloc[i, j], id = '{}_{}_{}'.format(id, i, j) ) for j in range(len(df.columns))]
         ) for i in range(len(df))]
    )
    return html.Table([Thead, Tbody], id = id, className = "display")

df = pd.DataFrame({'name': ['Jacky', 'Mei', 'Jay', 'Sandy', 'Jerry', 'Jimmy', 'Jeff',
                            'Jacky', 'Mei', 'Jay', 'Sandy', 'Jerry', 'Jimmy', 'Jeff',
                            'Jacky', 'Mei', 'Jay', 'Sandy', 'Jerry', 'Jimmy', 'Jeff'],
                   'age': [18, 71, 14, 56, 22, 28, 15,
                           18, 71, 14, 56, 22, 28, 15,
                           18, 71, 14, 56, 22, 28, 15]}, columns = ['name', 'age'])

external_scripts = ['https://code.jquery.com/jquery-3.3.1.min.js',
                    'https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js']
external_stylesheets = ['https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.css']

app = Dash(__name__, 
    external_scripts = external_scripts,
    external_stylesheets = external_stylesheets
)

app.layout = html.Div([
    html.Button('apply datatable', id = 'button'),
    visdcc.Run_js(id = 'javascript'),
    html.Br(),
    html.Div(
        generate_html_table_from_df(df, id = 'datatable'), 
        style = {'width': '40%'}
    ),
    html.H1(id = 'output_div')
])
           
@app.callback(
    Output('javascript', 'run'),
    [Input('button', 'n_clicks')])
def myfun(x): 
    if x: 
        return "$('#datatable').DataTable()"
    return ""

@app.callback(
    Output('output_div', 'children'),
    [Input('datatable_{}_{}'.format(i, j), 'n_clicks') for i in range(len(df)) for j in range(len(df.columns))])
def myfun(*args): 
    ctx = dash.callback_context
    if not ctx.triggered or ctx.triggered[0]['value'] is None:  return ""
    input_id = ctx.triggered[0]['prop_id'].split('.')[0]
    row = input_id.split('_')[1]
    col = input_id.split('_')[2]
    return "you click on row {} col {}".format(row, col)
```
[↑](#visdcc)
### Add event and callback :
```
def generate_html_table_from_df(df, id):
    Thead = html.Thead(
        [html.Tr([html.Th(col) for col in df.columns])]
    )
    Tbody = html.Tbody(
        [html.Tr(
            [html.Td( df.iloc[i, j], id = '{}_{}_{}'.format(id, i, j) ) for j in range(len(df.columns))]
         ) for i in range(len(df))]
    )
    return html.Table([Thead, Tbody], id = id, className = "display")

df = pd.DataFrame({'name': ['Jacky', 'Mei', 'Jay', 'Sandy', 'Jerry', 'Jimmy', 'Jeff',
                            'Jacky', 'Mei', 'Jay', 'Sandy', 'Jerry', 'Jimmy', 'Jeff',
                            'Jacky', 'Mei', 'Jay', 'Sandy', 'Jerry', 'Jimmy', 'Jeff'],
                   'age': [18, 71, 14, 56, 22, 28, 15,
                           18, 71, 14, 56, 22, 28, 15,
                           18, 71, 14, 56, 22, 28, 15]}, columns = ['name', 'age'])

external_scripts = ['https://code.jquery.com/jquery-3.3.1.min.js',
                    'https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js']
external_stylesheets = ['https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.css']

app = Dash(__name__, 
    external_scripts = external_scripts,
    external_stylesheets = external_stylesheets
)

app.layout = html.Div([
    html.Button('Add mousemove event', id = 'button'),
    visdcc.Run_js(id = 'javascript', run = "$('#datatable').DataTable()", event = 'null'),
    html.Br(),
    html.Div(
        generate_html_table_from_df(df, id = 'datatable'), 
        style = {'width': '40%'}
    ),
    html.Div(id = 'output_div')
])
         
@app.callback(
    Output('javascript', 'run'),
    [Input('button', 'n_clicks')])
def myfun(x): 
    if x is None: return ""
    return '''
    var target = $('#datatable')[0]
    target.addEventListener('mousemove', function(evt) {
        setProps({ 
            'event': {'x':evt.x, 'y':evt.y }
        })
        console.log(evt)
    })
    console.log(this)
    '''

@app.callback(
    Output('output_div', 'children'),
    [Input('javascript', 'event')])
def myfun(x): 
    return str(x)
```
[↑](#visdcc)
