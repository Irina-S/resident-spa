import "./Form.scss";
import React from "react";
import {connect} from 'react-redux';
import {getStreets, getHouses, getFlats, getResidents, setStreet, setHouse, setFlat} from './../redux/actions/actions';
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

/**
 * Форма для выбора адреса
 */
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            street:null,
            house:null,
            flat:null
        }
        this.selectStreet = this.selectStreet.bind(this);
        this.selectHouse = this.selectHouse.bind(this);
        this.selectFlat = this.selectFlat.bind(this);
    }

    componentDidMount(){
        this.props.getStreets();
    }

    /**
     * Обработчик выбора улицы
     * @param {*} e 
     */
    selectStreet(e){
        const street = e.target.value;
        this.setState({
            street:street
        });
        this.props.setStreet(street);
        this.props.getHouses(street.id);
    }

    /**
     * Обработка выбора дома
     * @param {*} e 
     */
    selectHouse(e){
        const house = e.target.value;
        this.setState({
            house:house
        });
        this.props.setHouse(house);
        this.props.getFlats(house.id);
    }

    /**
     * Обработка выбора квартиры
     * @param {*} e 
     */
    selectFlat(e){
        const flat = e.target.value;
        this.setState({
            flat:flat
        });
        this.props.setFlat(flat);
        this.props.getResidents(flat.id);
    }

    render(){
        return (
            <form className="residents-form">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="street-label">Улица</InputLabel>
                            <Select
                                labelId="street-label"
                                id="street"
                                options={this.props.streets}
                                value={this.state.street ?? ""}
                                onChange={this.selectStreet}
                                label="Улица"
                            >
                                {
                                    
                                    this.props.streets.map((street)=>{
                                        return <MenuItem key={street.id} value={street}>{street.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="house-label">Дом</InputLabel>
                            <Select
                                labelId="house-label"
                                id="house"
                                options={this.props.houses}
                                value={this.state.house ?? ""}
                                onChange={this.selectHouse}
                                label="Дом"
                            >
                                {
                                    
                                    this.props.houses.map((house)=>{
                                        return <MenuItem key={house.id} value={house}>{house.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="flat-label">Квартира</InputLabel>
                            <Select
                                labelId="flat-label"
                                id="flat"
                                options={this.props.flats}
                                value={this.state.flat ?? ""}
                                onChange={this.selectFlat}
                                label="Дом"
                            >
                                {
                                    
                                    this.props.flats.map((flat)=>{
                                        return <MenuItem key={flat.id} value={flat}>{flat.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                
            </form>
        );
    }
}


function mapStateToProps(state){
    return {
        streets:state.streets,
        houses:state.houses,
        flats:state.flats
    }
}

function mapDispatchToProps(dispatch){
    return {
        getStreets:(value)=>dispatch(getStreets(value)),
        getHouses:(value)=>dispatch(getHouses(value)),
        getFlats:(value)=>dispatch(getFlats(value)),
        getResidents:(value)=>dispatch(getResidents(value)),
        setStreet:(value)=>dispatch(setStreet(value)),
        setHouse:(value)=>dispatch(setHouse(value)),
        setFlat:(value)=>dispatch(setFlat(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);