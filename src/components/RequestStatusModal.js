import "./RequestStatusModal.scss";
import React from "react";
import {connect} from 'react-redux';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {setRequestStatus} from "./../redux/actions/actions";

/**
 * Модальное окно для отображения статуса выполнения запроса к серверу на добавление/удаление/изменение данных жильцов
 */
class RequestStatusModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOpened:false,
            boxClassNames:{
                'request-modal__box':true
            }
        }

        this.close = this.close.bind(this);
    }

    static getDerivedStateFromProps(props,state){
        return {
            isOpened:props.status===null?false:true,
            boxClassNames:{
                'request-modal__box':true,
                'request-modal__box_success':props.status===true?true:false,
                'request-modal__box_error':props.status===false?true:false
            }
        }
    }

    /**
     * Закрытие окна
     */
    close(){
        this.props.setRequestStatus(null);
    }

    render(){
        return (
            <Modal
                className="request-modal"
                open={this.state.isOpened}
                onClose={this.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className={this.state.boxClassNames}
                >
                    {
                        this.props.status===true?<CheckIcon sx={{fontSize:90}}/>:<ErrorOutlineIcon sx={{fontSize:90}}/>
                    }
                    <strong>
                        {
                            this.props.status===true?"Успешно!":"Ошибка!"
                        }
                    </strong>
                </Box>
            </Modal>            
        );
    }
}

function mapStateToProps(state){
    return {
        status:state.request
    }
}

function mapDispatchToProps(dispatch){
    return {
            setRequestStatus:(value)=>dispatch(setRequestStatus(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestStatusModal);