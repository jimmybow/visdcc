import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, State
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

app = dash.Dash(external_scripts = external_scripts,
                external_stylesheets = external_stylesheets)

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

if __name__ == '__main__':
    app.run_server(debug=True)
    