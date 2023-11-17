import { createClient } from '@supabase/supabase-js';
const VITE_DB_KEY = import.meta.env.VITE_DB_KEY
const VITE_DB_URL = import.meta.env.VITE_DB_URL
const supabase = createClient(VITE_DB_URL, VITE_DB_KEY);

const fetchingDataFromDB = async () => {
    const { data, error, status } = await supabase
        .from('posts')
        .select();

    //Error
    if (status != 200) {
        console.log(error.message);
        return [];
    }
    return data;
}

const fetchPostByID = async (id) => {
    const { data, error, status } = await supabase
        .from('posts')
        .select()
        .eq('id', id)

    //Error
    if (status != 200) {
        console.log(error.message);
        return [];
    }
    return data[0];
}

const fetchCommentsByPostID = async (id) => {

    const { data, error, status } = await supabase
        .from('comments')
        .select()
        .eq('postID', id);

    //Error
    if (status != 200) {
        console.log(error.message);
        return [];
    }
    return data;
}

const createNewComment = async (data) => {
    //Create request
    const { error, status } = await supabase
        .from('comments')
        .insert(data)


    if (status.toString()[0] != '2') {
        return error;
    }

    return true;
}



const createNewData = async (data, updateLastModified = false) => {
    //Create request

    //Update the last modified time
    if (updateLastModified) {
        data.lastModified = (new Date()).toISOString();
    }

    const { error, status } = await supabase
        .from('posts')
        .insert(data)


    if (status.toString()[0] != '2') {
        return error;
    }

    return true;
}

const updateData = async (data, id, updateLastModified = false) => {

    //Update the last modified time
    if (updateLastModified) {
        data.lastModified = (new Date()).toISOString();
    }

    //Update Request
    const { error, status } = await supabase
        .from('posts')
        .update(data)
        .eq('id', id);
    //console.log('Update', data, status, error);
    if (status.toString()[0] != '2') {
        return error;
    }

    return true;
}

const deleteData = async (id) => {
    const { error, status } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
    if (status.toString()[0] != '2') {
        return error;
    }

    return true;
}

const deleteComments = async (id) => {
    const { error, status } = await supabase
        .from('comments')
        .delete()
        .eq('postID', id)
    if (status.toString()[0] != '2') {
        return error;
    }
}

export default { fetchingDataFromDB, fetchPostByID, fetchCommentsByPostID, createNewComment, createNewData, updateData, deleteData, supabase, deleteComments }