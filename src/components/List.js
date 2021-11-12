import "./List.scss";
import ResidentCard from "./ResidentCard";
import React from "react";
import {connect} from 'react-redux';
import Grid from "@mui/material/Grid";

/**
 * Список карточек жильцов
 */
class List extends React.Component{
    render(){
        return (
            <div className="residents">
                <Grid container spacing={2}>
                    {
                        this.props.residents.map((resident)=>{
                            return (
                                <Grid item xs={4} key={resident.id}>
                                    <ResidentCard
                                        id={resident.id}
                                        name={resident.name}
                                        phone={resident.phone}
                                        email={resident.email}
                                    />
                                </Grid>
                            );
                        })
                    }                    
                </Grid>

            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        residents:state.residents
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);