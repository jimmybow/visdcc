# AUTO GENERATED FILE - DO NOT EDIT

export ''_datatable

"""
    ''_datatable(;kwargs...)

A DataTable component.

Keyword arguments:
- `id` (String; required)
- `bordered` (Bool; optional)
- `box_selected_keys` (Array; optional)
- `box_type` (String; optional)
- `col_filtered` (Array; optional)
- `data` (Dict; optional)
- `filterDropdownVisible` (Array; optional)
- `footer` (String; optional)
- `locale` (Dict; optional)
- `pagination` (Dict; optional)
- `row_filtered` (Array; optional)
- `scroll` (Dict; optional)
- `searchText` (Array; optional)
- `selectedcell` (Dict; optional)
- `showHeader` (Bool; optional)
- `size` (String; optional)
- `style` (Dict; optional)
- `title` (String; optional)
"""
function ''_datatable(; kwargs...)
        available_props = Symbol[:id, :bordered, :box_selected_keys, :box_type, :col_filtered, :data, :filterDropdownVisible, :footer, :locale, :pagination, :row_filtered, :scroll, :searchText, :selectedcell, :showHeader, :size, :style, :title]
        wild_props = Symbol[]
        return Component("''_datatable", "DataTable", "visdcc", available_props, wild_props; kwargs...)
end

