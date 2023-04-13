import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        
        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
        // Dispatch
        // dispatch(newNote);
        // dispatch(activateNote);
    }
}

export const startLoadingNotes = ( uid ) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('UID must exist');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))

    }
}