import "./ResidentModal.scss";
import React from "react";
import {connect} from 'react-redux';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {setModal, addResident, updateResident} from "./../redux/actions/actions";

/**
 * Модальное окно для изменения или добавления данных о жильце
 */
class ResidentModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            phone:"",
            email:"",
            isSendBtnDisabled:true
        }
        this.close = this.close.bind(this);
        this.nameInputHandler = this.nameInputHandler.bind(this);
        this.phoneInputHandler = this.phoneInputHandler.bind(this);
        this.emailInputHandler = this.emailInputHandler.bind(this);
        this.sendHandler = this.sendHandler.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        return {
            name:state.name || props.residentName,
            phone:state.phone || props.residentPhone,
            email:state.email || props.residentEmail,
            isSendBtnDisabled:!state.phone
        }
    }

    /**
     * Закрытие окна
     */
    close(){
        this.setState({
            isSendBtnDisabled:true
        });
        this.props.setModal({
            title:"",
            isOpened:false,
            type:"add"
        });
    }

    /**
     * Обработчик ввода имени
     * @param {*} e 
     */
    nameInputHandler(e){
        this.setState({
            name:e.target.value
        });
    }

    /**
     * Обработчик ввода телефона(включая валидацию)
     * @param {*} e 
     */
    phoneInputHandler(e){
        const phone = e.target.value;
        if (phone===""){
            this.setState({
                isSendBtnDisabled:true,
                phone
            })
        }
        else{
            this.setState({
                isSendBtnDisabled:false,
                phone
            })
        }
    }

    /**
     * Обработчик ввода email
     * @param {*} e 
     */
    emailInputHandler(e){
        this.setState({
            email:e.target.value
        });
    }

    /**
     * Обработчик на кнопку отправки запроса
     */
    sendHandler(){
        if (this.props.type==="add"){
            this.props.addResident(
                {
                    name:this.state.name,
                    phone:this.state.phone,
                    email:this.state.email,
                    bindId:this.props.bindId
                }
            );
        }
        else {
            this.props.updateResident({
                clientId:this.props.residentId,
                addressId:this.props.bindId,
                name:this.state.name,
                phone:this.state.phone,
                email:this.state.email
            });
        }
        this.props.setModal({
            title:"",
            isOpened:false,
            type:""
        });
    }

    render(){
        return (
            <Modal
                className="resident-modal"
                open={this.props.isOpened}
                onClose={this.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="resident-modal__box">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {this.props.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onInput={this.nameInputHandler}
                                defaultValue={this.props.residentName}
                                fullWidth
                                id="new-resident-name"
                                label="Имя"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onInput={this.phoneInputHandler}
                                defaultValue={this.props.residentPhone}                                
                                fullWidth
                                id="new-resident-phone"
                                label="Телефон"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onInput={this.emailInputHandler}
                                defaultValue={this.props.residentEmail}
                                fullWidth
                                id="new-resident-email"
                                label="Email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                size="large"
                                disabled={this.state.isSendBtnDisabled}
                                onClick={this.sendHandler}
                            >
                                {this.props.type==="add"?"Добавить":"Изменить"}
                            </Button>
                        </Grid>                        
                    </Grid>
                </Box>
            </Modal>
        );
    }
}

function mapStateToProps(state){
    return {
        title:state.modal.title,
        isOpened:state.modal.isOpened,
        type:state.modal.type,
        bindId:state.flat?.id,
        residentId:state.resident?.clientId ,
        residentName:state.resident?.name,
        residentPhone:state.resident?.phone,
        residentEmail:state.resident?.email
    }
}

function mapDispatchToProps(dispatch){
    return {
        setModal:(value)=>dispatch(setModal(value)),
        addResident:(value)=>dispatch(addResident(value)),
        updateResident:(value)=>dispatch(updateResident(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResidentModal);