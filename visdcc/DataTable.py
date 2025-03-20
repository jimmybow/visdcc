# AUTO GENERATED FILE - DO NOT EDIT

import typing  # noqa: F401
import numbers # noqa: F401
from typing_extensions import TypedDict, NotRequired, Literal # noqa: F401
from dash.development.base_component import Component, _explicitize_args
try:
    from dash.development.base_component import ComponentType # noqa: F401
except ImportError:
    ComponentType = typing.TypeVar("ComponentType", bound=Component)


class DataTable(Component):
    """A DataTable component.


Keyword arguments:

- id (string; required)

- bordered (boolean; default False)

- box_selected_keys (list; optional)

- box_type (string; optional)

- col_filtered (list; optional)

- data (dict; default {dataSource:[{key: 1, name: 'Jacky', age: 20},            {key: 2, name: 'Mei'  , age: 18},            {key: 3, name: 'Jimmy', age: 32} ],columns :[{title: 'Names',           dataIndex: 'name',           key: 'name',           Is_click: True},          {title: 'Ages',           dataIndex: 'age',           key: 'age'}       ]                  })

- filterDropdownVisible (list; optional)

- footer (string; optional)

- locale (dict; optional)

- pagination (dict; optional)

- row_filtered (list; optional)

- scroll (dict; default { x: 300, y: 300 })

- searchText (list; optional)

- selectedcell (dict; optional)

- showHeader (boolean; default True)

- size (string; optional)

- title (string; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'visdcc'
    _type = 'DataTable'

    @_explicitize_args
    def __init__(
        self,
        id: typing.Optional[typing.Union[str, dict]] = None,
        data: typing.Optional[dict] = None,
        style: typing.Optional[typing.Any] = None,
        pagination: typing.Optional[dict] = None,
        scroll: typing.Optional[dict] = None,
        bordered: typing.Optional[bool] = None,
        showHeader: typing.Optional[bool] = None,
        selectedcell: typing.Optional[dict] = None,
        title: typing.Optional[str] = None,
        footer: typing.Optional[str] = None,
        box_selected_keys: typing.Optional[typing.Sequence] = None,
        box_type: typing.Optional[str] = None,
        size: typing.Optional[str] = None,
        locale: typing.Optional[dict] = None,
        row_filtered: typing.Optional[typing.Sequence] = None,
        searchText: typing.Optional[typing.Sequence] = None,
        col_filtered: typing.Optional[typing.Sequence] = None,
        filterDropdownVisible: typing.Optional[typing.Sequence] = None,
        **kwargs
    ):
        self._prop_names = ['id', 'bordered', 'box_selected_keys', 'box_type', 'col_filtered', 'data', 'filterDropdownVisible', 'footer', 'locale', 'pagination', 'row_filtered', 'scroll', 'searchText', 'selectedcell', 'showHeader', 'size', 'style', 'title']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'bordered', 'box_selected_keys', 'box_type', 'col_filtered', 'data', 'filterDropdownVisible', 'footer', 'locale', 'pagination', 'row_filtered', 'scroll', 'searchText', 'selectedcell', 'showHeader', 'size', 'style', 'title']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DataTable, self).__init__(**args)
