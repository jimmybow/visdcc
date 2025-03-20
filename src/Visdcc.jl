
module Visdcc
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.60"

include("jl/''_datatable.jl")
include("jl/''_network.jl")
include("jl/''_run_js.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "visdcc",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "visdcc.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "visdcc.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
