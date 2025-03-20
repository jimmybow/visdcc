# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''Network <- function(id=NULL, data=NULL, event=NULL, event0=NULL, event1=NULL, event2=NULL, event3=NULL, event4=NULL, event5=NULL, event6=NULL, event7=NULL, event8=NULL, event9=NULL, fit=NULL, focus=NULL, moveTo=NULL, options=NULL, run=NULL, selection=NULL, style=NULL) {
    
    props <- list(id=id, data=data, event=event, event0=event0, event1=event1, event2=event2, event3=event3, event4=event4, event5=event5, event6=event6, event7=event7, event8=event8, event9=event9, fit=fit, focus=focus, moveTo=moveTo, options=options, run=run, selection=selection, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'Network',
        namespace = 'visdcc',
        propNames = c('id', 'data', 'event', 'event0', 'event1', 'event2', 'event3', 'event4', 'event5', 'event6', 'event7', 'event8', 'event9', 'fit', 'focus', 'moveTo', 'options', 'run', 'selection', 'style'),
        package = 'visdcc'
        )

    structure(component, class = c('dash_component', 'list'))
}
