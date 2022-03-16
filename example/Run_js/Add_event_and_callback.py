from dash import Dash, html, dcc
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import visdcc
import pandas as pd

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
app.config.suppress_callback_exceptions = True

app.layout = html.Div([
    html.Button('Add mousemove event', id = 'button'),
    html.Div(id = 'content'),
    html.Br(),
    html.Div(
        generate_html_table_from_df(df, id = 'datatable'), 
        style = {'width': '40%'}
    ),
    html.Div(id = 'output_div')
])

@app.callback(
    Output('content', 'children'),
    [Input('button', 'n_clicks')])
def myfun(x): 
    if x is None: 
        return visdcc.Run_js(id = 'javascript', run = "$('#datatable').DataTable()")
    raise PreventUpdate

           
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

if __name__ == '__main__':
    app.run_server(debug=True)