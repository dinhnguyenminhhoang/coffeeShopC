import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { firebaseConfig, firebaseUrl } from "../../utils/resuableFuc";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseUrl);

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `coffee/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
        uploadImage.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((downloadUrl) => resolve(downloadUrl))
                    .catch((error) => reject(error));
            }
        );
    });
}

const UploadImage = ({ onUploadSuccess, className }) => {
    const [fileList, setFileList] = React.useState([]);

    const handleChange = (info) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1);
        setFileList(newFileList);

        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            const downloadUrl = await helperForUploadingImageToFirebase(file);
            onSuccess(downloadUrl);
            onUploadSuccess(downloadUrl); // Call the callback function with the URL
        } catch (error) {
            onError(error);
        }
    };

    return (
        <Upload
            fileList={fileList}
            onChange={handleChange}
            customRequest={customRequest}
            style={{ width: "100%" }}
        >
            <Button icon={<UploadOutlined />} className={className}>
                Upload
            </Button>
        </Upload>
    );
};

export default UploadImage;
