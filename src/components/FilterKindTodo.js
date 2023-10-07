const FilterKindTodos = ({handleKindTodos}) => {
    return (
        <>
            <span style={{ color: 'blue' }} >Show Status Todos :</span>
            <select onChange={(e) => handleKindTodos(e)} style={{ minWidth: '100%' }}>
                <option value="all">All</option>
                <option value="checked">Checked Todos</option>
                <option value="Remaning">Remaning Todos</option>

            </select>

        </>
    )
}
export default FilterKindTodos