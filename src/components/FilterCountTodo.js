const FilterCountTodos = ({handleCountTodos}) => {

  
    return (
        <>
            <span style={{ color: 'blue' }} >show count todos :</span>
            <select onChange={(e) => handleCountTodos(e)} style={{ minWidth: '100%' }}>
                <option value="200">All</option>
                <option value="3">3</option>
                <option value="7">7</option>
                <option value="11">11</option>
                <option value="33">33</option>
                <option value="111">111</option>

            </select>

        </>
    )
}
export default FilterCountTodos