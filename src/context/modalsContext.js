import React, {useEffect, useState} from 'react'

export const ModalsContext = React.createContext();

const ModalsContextProvider = ({children}) => {
    const [modal_control, setmodal_control] = useState({
        type: "",
        show_modal_new_edit_account: false,
        show_modal_change_password: false,
        show_modal_new_edit_subplies: false,
        show_modal_delete: false,
        data: {}
    });

    const showModal = (objInit) => {
        setmodal_control({...modal_control, type:objInit.type || "", [objInit.modal_name]:true, data: objInit.data || null});
    }

    const closeModal = (objInit) => {
        setmodal_control({...modal_control,type:"", [objInit.modal_name]:false, data: null});
    }

    return (
        <ModalsContext.Provider value={{
            modal_control,
            showModal,
            closeModal
        }}> {children}
        </ModalsContext.Provider>
    )
}

export default ModalsContextProvider
