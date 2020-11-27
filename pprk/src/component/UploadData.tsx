//ref: https://coders-shelf.com/react-firebase-image-upload/

import React, { useState, createContext }from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {IList} from '../domain/entity';
import firebase, { storage } from "../firebase";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        urlInput: {
            '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            },
        },
        stdButton: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        repNum: {
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '7ch',
            },
        },
        multilineColor:{
            color:'white'
        },
    }),
);

const UploadData: React.FC = () =>
{

    const classes = useStyles();

    const [image, setImage] = useState("");

    const handleImage = (event: any) => {
      const image = event.target.files[0];
      setImage(image);
    };

    const onSubmit = (event: any) => 
    {
      event.preventDefault();
      if (image === "") {
        console.log("ファイルが選択されていません");
      }
      
      // アップロード処理
      let _time = new Date();
      let img: any = image;
      const uploadTask = storage.ref().child('images/' + _time).put(img);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );
    };

    const next = (snapshot: any) => 
    {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percent + "% done");
      console.log(snapshot);
    };

    const error = (error: any) => {
      // エラーハンドリング
      console.log(error);
    };

    const complete = () => 
    {
        console.log("complete!");
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={handleImage} />
                <button>Upload</button>
            </form>
        </div>
    )
}

export default UploadData;