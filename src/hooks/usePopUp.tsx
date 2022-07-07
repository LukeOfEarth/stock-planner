import React, { createContext, useContext, useState } from 'react';
import { IProvider } from '../models';

enum EPopUpType {
    Error,
    Add
}

interface IPopUpProps {
    show: boolean;
    active: boolean;
    type: EPopUpType;
    setPopUpState: (s: IPopUpState) => void;
    trigger: Function;
}

export interface IPopUpState {
    show: boolean;
    active: boolean;
    type: EPopUpType;
    data: any;
}

const PopUpContext = createContext<Partial<IPopUpProps>>({});

export const ProvidePopUp : React.FC<IProvider> = ({ children }) => {
    const popUp = useProvidePopUp();
    return (<PopUpContext.Provider value={popUp} >
        {children}
    </PopUpContext.Provider>)
};

const useProvidePopUp = () => {
    const [popUpState, setPopUpState] = useState<IPopUpState>({ show: false, type: EPopUpType.Error, data: undefined, active: false });

    const trigger = () => {

    }

    const dismiss = () => {

    }

    return {
        show: popUpState.show,
        type: popUpState.type,
        active: popUpState.active,
        setPopUpState,
        trigger
    }
}

export const usePopUp = () => {
    return useContext(PopUpContext);
}

const renderContent : React.FC<IPopUpState> = (state : IPopUpState) => {
    switch(state.type) {
        case EPopUpType.Error: {
            return <></>
        }
        case EPopUpType.Add: {
            return <></>
        }
        default: {
            return <></>
        }
    }
} 

export const PopUp : React.FC<{}> = ({}) => {
    const { show, type, active } = usePopUp();

    return (
        <></>
    );
}