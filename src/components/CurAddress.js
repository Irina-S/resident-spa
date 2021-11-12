import "./CurAddress.scss";
import React from "react";
import {connect} from 'react-redux';
import Button from "@mui/material/Button";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {setModal} from "./../redux/actions/actions";

/**
 * Компонент, отображающий текущий выбранный адрес и кнопку добавления нвого жильца по этому адресу
 */
class CurAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isAddBtnDisabled:props.flat?false:true
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        return {
            isAddBtnDisabled:props.flat?false:true
        }
    }

    /**
     * Открытие окна
     */
    openModal(){
        this.props.setModal({
            title:"Добавить нового жильца",
            isOpened:true,
            type:"add"
        });
    }

    /**
     * Закрытие окна
     */
    closeModal(){       
    }


    render(){
        return (
            <div className="cur-addr">
                <p><strong>Выбранный адрес:</strong> {`${this.props.street?.name?this.props.street.name+",":""} ${this.props.house?.name?this.props.house.name+",":""} ${this.props.flat?.name ?? ""}`}</p>
                <Button 
                    variant="outlined" 
                    onClick={this.openModal}
                    disabled={this.state.isAddBtnDisabled}
                >
                    <GroupAddIcon/>
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        street:state.street,
        house:state.house,
        flat:state.flat
    }
}

function mapDispatchToProps(dispatch){
    return {
        setModal:(value)=>dispatch(setModal(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurAddress);