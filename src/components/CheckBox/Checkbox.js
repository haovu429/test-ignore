import React, {useState} from 'react'

const CheckBox = ({handleFilters, list}) => {
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        handleFilters(newChecked)
    };

    const renderCheckboxLists = () => list && list.map((value, index) => (
        <li key={index}>
            <div className="checkbox ml-3">
                <label>
                    <input
                        style={{ color: "black" }}
                        onChange={() => handleToggle(value.name)}
                        type="checkbox"
                        checked={Checked.indexOf(value.name) === -1 ? false : true}/>
                        {"  "}
                    {value.label}
                </label>
            </div>
        </li>
    ));

    return (
        <ul className="list-unstyled">
            {renderCheckboxLists()}
        </ul>
    )
}

export default CheckBox
