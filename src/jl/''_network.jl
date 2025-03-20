# AUTO GENERATED FILE - DO NOT EDIT

export ''_network

"""
    ''_network(;kwargs...)

A Network component.

Keyword arguments:
- `id` (String; required)
- `data` (Dict; optional)
- `event` (Dict; optional): Using 'setProps' to set event props
- `event0` (Dict; optional)
- `event1` (Dict; optional)
- `event2` (Dict; optional)
- `event3` (Dict; optional)
- `event4` (Dict; optional)
- `event5` (Dict; optional)
- `event6` (Dict; optional)
- `event7` (Dict; optional)
- `event8` (Dict; optional)
- `event9` (Dict; optional)
- `fit` (Dict; optional)
- `focus` (Dict; optional)
- `moveTo` (Dict; optional)
- `options` (Dict; optional)
- `run` (String; optional): run your javascript here
- `selection` (Dict; optional)
- `style` (Dict; optional)
"""
function ''_network(; kwargs...)
        available_props = Symbol[:id, :data, :event, :event0, :event1, :event2, :event3, :event4, :event5, :event6, :event7, :event8, :event9, :fit, :focus, :moveTo, :options, :run, :selection, :style]
        wild_props = Symbol[]
        return Component("''_network", "Network", "visdcc", available_props, wild_props; kwargs...)
end

