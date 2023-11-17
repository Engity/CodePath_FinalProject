import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useLayoutEffect } from 'react'
import '../assets/styles/DisplayCard.css'
import databaseUtils from '../utils/databaseUtils';

const DisplayCard = ({ info, createMode }) => {
    const { id } = useParams();
    const [currentData, setCurrentData] = useState(!createMode ? info[id] : {
        'name': '',
        'weight': '',
        'speed': '',
        'color': 'red',
    });

    const dbID = !createMode ? info[id].id: -1;

    if ((!info || info.length == 0) && !createMode) {
        return <div className='DisplayCard'><></></div>;
    }

    let { name, weight, speed, color } = (!createMode ? info[id] : { name: '', weight: '', speed: '', color: 'red' });
    let details = [
        { key: 'Name', data: name },
        { key: 'Weight', data: weight },
        { key: 'Speed', data: speed },
        { key: 'Color', data: color },
    ];

    //Update the temporary data 
    const updateData = (e, key) => {
        setCurrentData({
            ...currentData,
            [key]: e.target.value,
        });
    }
    const navigate = useNavigate();
    const deleteData = () => {
        confirm("Are you sure you want to delete this crewmate?");
        databaseUtils.deleteData(dbID).then(() => {
            alert("Delete successfully");
            navigate('/crewmates');
        });
        
    }

    const saveData = async () => {
        if (isNaN(currentData.weight) || isNaN(currentData.speed) || currentData.weight < 0 || currentData.speed < 0) {
            alert("Value cannot be a negative number.");
            return;
        }

        if (createMode) {
            databaseUtils.createNewData(currentData).then(() => {
                alert("Create successfully");
                window.location.reload();
            });

        }
        else {
            databaseUtils.updateData(currentData, dbID).then(() => {
                alert("Update successfully")
            });
        }
    }

    return <div className='DisplayCard'>
        <h2>Crewmate</h2>
        <br></br>
        <img src={'/src/assets/images/' + currentData.color + 'Sprite.png'} style={{ width: 100 + 'px', height: 100 + 'px' }} />
        <table className='detailTable'>
            <thead></thead>
            <tbody>
                {details.map((detail) => {
                    return <tr key={detail.key} className="table-row" >
                        <th className="colHeader" key={"header" + detail.key}>
                            {detail.key}
                        </th>
                        <th className="colData" key={"data" + detail.key}>
                            {detail.key == 'Color' ?
                                //Select Option
                                <select name="colors" id="colors" onChange={(e) => { updateData(e, detail.key.toLowerCase()) }} defaultValue={detail.data}>
                                    <option value="red" >Red</option>
                                    <option value="blue" >Blue</option>
                                    <option value="yellow" >Yellow</option>
                                </select>
                                :
                                //Text option
                                <input type='text' defaultValue={createMode ? '' : detail.data} onChange={(e) => { updateData(e, detail.key.toLowerCase()) }} />
                            }
                        </th>
                    </tr>
                })}
            </tbody>
            <tfoot></tfoot>
        </table>

        <br></br>
        <div className='buttonContainer'>
            <button className="cardButton" onClick={saveData}> Save </button>
            {!createMode?<button className="cardButton" onClick={deleteData}> Delete </button> : <></>}
            
        </div>

    </div>
}
export default DisplayCard