# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
import numbers # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args
try:
    from dash.development.base_component import ComponentType # noqa: F401
except ImportError:
    ComponentType = typing.TypeVar("ComponentType", bound=Component)


class Run_js(Component):
    """A Run_js component.


Keyword arguments:

- id (string; required)

- event (dict; optional):
    Using 'setProps' to set event props.

- event0 (dict; optional)

- event1 (dict; optional)

- event2 (dict; optional)

- event3 (dict; optional)

- event4 (dict; optional)

- event5 (dict; optional)

- event6 (dict; optional)

- event7 (dict; optional)

- event8 (dict; optional)

- event9 (dict; optional)

- run (string; optional):
    run your javascript here."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'visdcc'
    _type = 'Run_js'

    @_explicitize_args
    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        run: typing.Optional[str] = None,
        style: typing.Optional[typing.Any] = None,
        event: typing.Optional[dict] = None,
        event0: typing.Optional[dict] = None,
        event1: typing.Optional[dict] = None,
        event2: typing.Optional[dict] = None,
        event3: typing.Optional[dict] = None,
        event4: typing.Optional[dict] = None,
        event5: typing.Optional[dict] = None,
        event6: typing.Optional[dict] = None,
        event7: typing.Optional[dict] = None,
        event8: typing.Optional[dict] = None,
        event9: typing.Optional[dict] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'event', 'event0', 'event1', 'event2', 'event3', 'event4', 'event5', 'event6', 'event7', 'event8', 'event9', 'run', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'event', 'event0', 'event1', 'event2', 'event3', 'event4', 'event5', 'event6', 'event7', 'event8', 'event9', 'run', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(Run_js, self).__init__(**args)
