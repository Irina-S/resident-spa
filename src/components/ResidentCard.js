import "./ResidentCard.scss";
import React from "react";
import {connect} from 'react-redux';
import {setResident,setModal} from './../redux/actions/actions';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteResident } from "../redux/actions/actions";

/**
 * Карточка жильца
 */
class ResidentCard extends React.Component{
    constructor(props){
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
    }

    /**
     * Обработчик для кнопки удаления жильца
     */
    deleteHandler(){
        this.props.deleteResident({
            cliendId:this.props.id,
            addressId:this.props.addressId
        });
    }

    /**
     * Обработчик кнопки редактирования жильца
     */
    editHandler(){
        this.props.setResident({
            addressId:this.props.addressId,
            clientId:this.props.id,
            name:this.props.name,
            phone:this.props.phone,
            email:this.props.email
        });
        this.props.setModal({
            title:`Редактирование данных о ${this.props.name}`,
            isOpened:true,
            type:"update"
        });
    }

    render(){
        return (
            <div className="resident-card">
                {this.props.name?<strong className="resident-card__title">{this.props.name}</strong>:""}
                <p><CallIcon sx={{fontSize:16}}/> {this.props.phone}</p>
                {this.props.email?<p><EmailIcon sx={{fontSize:16}}/> {this.props.email}</p>:""}

                <ButtonGroup aria-label="text button group" fullWidth>
                    <Button onClick={this.editHandler}><EditIcon/></Button>
                    <Button onClick={this.deleteHandler}><DeleteIcon/></Button>
                </ButtonGroup>
            </div>        
        );
    }
}


function mapStateToProps(state){
    return {
        addressId:state.flat?.id
    }
}

function mapDispatchToProps(dispatch){
    return {
            deleteResident:(value)=>dispatch(deleteResident(value)),
            setResident:(value)=>dispatch(setResident(value)),
            setModal:(value)=>dispatch(setModal(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResidentCard);