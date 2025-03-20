# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''DataTable <- function(id=NULL, bordered=NULL, box_selected_keys=NULL, box_type=NULL, col_filtered=NULL, data=NULL, filterDropdownVisible=NULL, footer=NULL, locale=NULL, pagination=NULL, row_filtered=NULL, scroll=NULL, searchText=NULL, selectedcell=NULL, showHeader=NULL, size=NULL, style=NULL, title=NULL) {
    
    props <- list(id=id, bordered=bordered, box_selected_keys=box_selected_keys, box_type=box_type, col_filtered=col_filtered, data=data, filterDropdownVisible=filterDropdownVisible, footer=footer, locale=locale, pagination=pagination, row_filtered=row_filtered, scroll=scroll, searchText=searchText, selectedcell=selectedcell, showHeader=showHeader, size=size, style=style, title=title)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DataTable',
        namespace = 'visdcc',
        propNames = c('id', 'bordered', 'box_selected_keys', 'box_type', 'col_filtered', 'data', 'filterDropdownVisible', 'footer', 'locale', 'pagination', 'row_filtered', 'scroll', 'searchText', 'selectedcell', 'showHeader', 'size', 'style', 'title'),
        package = 'visdcc'
        )

    structure(component, class = c('dash_component', 'list'))
}
