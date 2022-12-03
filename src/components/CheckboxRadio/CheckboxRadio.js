import React, {useState} from 'react';

const CheckboxRadio = ({handleFilters, list}) => {
    const [Value, setValue] = useState('0');

    const renderRadioBox = () => (
        list && list.map((value) => (
            <div key={value.id} className="checkbox ml-3">
                <label>
                    <input
                        style={{"border-radius": "50%"}}
                        type="radio"
                        name="price"
                        value={`${value.id}`}/>
                    <span className="cr"></span>
                    {"   "}{value.label}
                </label>
            </div>
        ))
    );

    const handleChange = (event) => {
        setValue(event.target.value)
        handleFilters(event.target.value)
    };

    return (
        <ul className="list-unstyled">
            <li onChange={handleChange} value={Value}>
                {renderRadioBox()}
            </li>
        </ul>
    );
}

export default CheckboxRadio;