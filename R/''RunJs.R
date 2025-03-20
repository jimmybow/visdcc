# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''RunJs <- function(id=NULL, event=NULL, event0=NULL, event1=NULL, event2=NULL, event3=NULL, event4=NULL, event5=NULL, event6=NULL, event7=NULL, event8=NULL, event9=NULL, run=NULL, style=NULL) {
    
    props <- list(id=id, event=event, event0=event0, event1=event1, event2=event2, event3=event3, event4=event4, event5=event5, event6=event6, event7=event7, event8=event8, event9=event9, run=run, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Run_js',
        namespace = 'visdcc',
        propNames = c('id', 'event', 'event0', 'event1', 'event2', 'event3', 'event4', 'event5', 'event6', 'event7', 'event8', 'event9', 'run', 'style'),
        package = 'visdcc'
        )

    structure(component, class = c('dash_component', 'list'))
}
