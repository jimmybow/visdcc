# Visdcc
Dash Core Components for vis.js <br/> 
Documents of vis.js : http://visjs.org/docs/network/

# Installing :
```
pip install visdcc
```

# Requirements：

* **dash** -- The core dash backend
* **dash-renderer** -- The dash front-end
* **dash-html-components** -- HTML components
* **dash-core-components** -- Supercharged components

# Usage :
```
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, Event, State
import visdcc

app = dash.Dash()
app.layout = html.Div(...)

@app.callback(...)
def myfun(...):
    ...
    return ...

if __name__ == '__main__':
    app.run_server()
```

# 1. visdcc.Network : 

Plot basic network
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

# 2. Get Selected Nodes and Edges :

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

# 3. Animate or move the camera :

```
app = dash.Dash()
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
                value = ''  )              
])

@app.callback(
    Output('net', 'moveTo'),
    [Input('label', 'value'),
     Input('labelx', 'value'),
     Input('labely', 'value')])
def myfun(z, x, y):
    if z == '': z = 1
    return {'position': {'x': x, 'y': y}, 'scale': z}
```

## Dash

Go to this link to learn about [Dash][].

## Getting started

```sh
# Install dependencies
$ npm install

# Watch source for changes and build to `lib/`
$ npm start
```

## Development

### Demo server

You can start up a demo development server to see a demo of the rendered
components:

```sh
$ builder run demo
$ open http://localhost:9000
```

You have to maintain the list of components in `demo/Demo.react.js`.

### Code quality and tests

#### To run lint and unit tests:

```sh
$ npm test
```

#### To run unit tests and watch for changes:

```sh
$ npm run test-watch
```

#### To debug unit tests in a browser (Chrome):

```sh
$ npm run test-debug
```

1. Wait until Chrome launches.
2. Click the "DEBUG" button in the top right corner.
3. Open up Chrome Devtools (`Cmd+opt+i`).
4. Click the "Sources" tab.
5. Find source files
  - Navigate to `webpack:// -> . -> spec/components` to find your test source files.
  - Navigate to `webpack:// -> [your/repo/path]] -> visdcc -> src` to find your component source files.
6. Now you can set breakpoints and reload the page to hit them.
7. The test output is available in the "Console" tab, or in any tab by pressing "Esc".

#### To run a specific test

In your test, append `.only` to a `describe` or `it` statement:

```javascript
describe.only('Foo component', () => {
    // ...
})l
```

### Testing your components in Dash

1. Build development bundle to `lib/` and watch for changes

        # Once this is started, you can just leave it running.
        $ npm start

2. Install module locally (after every change)

        # Generate metadata, and build the JavaScript bundle
        $ npm run install-local

        # Now you're done. For subsequent changes, if you've got `npm start`
        # running in a separate process, it's enough to just do:
        $ python setup.py install

3. Run the dash layout you want to test

        # Import visdcc to your layout, then run it:
        $ python my_dash_layout.py


**TODO:** There is a workflow that links your module into `site-packages` which would
make it unnecessary to re-run `2.` on every change: `python setup.py develop`.
Unfortunately, this doesn't seem to work with resources defined in
`package_data`.

See https://github.com/plotly/dash-components-archetype/issues/20


## Installing python package locally

Before publishing to PyPi, you can test installing the module locally:

```sh
# Install in `site-packages` on your machine
$ npm run install-local
```

## Uninstalling python package locally

```sh
$ npm run uninstall-local
```

## Publishing

For now, multiple steps are necessary for publishing to NPM and PyPi,
respectively. **TODO:**
[#5](https://github.com/plotly/dash-components-archetype/issues/5) will roll up
publishing steps into one workflow.

Ask @chriddyp to get NPM / PyPi package publishing accesss.

1. Preparing to publish to NPM

        # Bump the package version
        $ npm version major|minor|patch

        # Push branch and tags to repo
        $ git push --follow-tags

2. Preparing to publish to PyPi

        # Bump the PyPi package to the same version
        $ vi setup.py

        # Commit to github
        $ git add setup.py
        $ git commit -m "Bump pypi package version to vx.x.x"

3. Publish to npm and PyPi

        $ npm run publish-all

## Builder / Archetype

We use [Builder][] to centrally manage build configuration, dependencies, and
scripts.

To see all `builder` scripts available:

```sh
$ builder help
```

See the [dash-components-archetype][] repo for more information.


[Builder]: https://github.com/FormidableLabs/builder
[Dash]: https://github.com/plotly/dash2
[dash-components-archetype]: https://github.com/plotly/dash-components-archetype
