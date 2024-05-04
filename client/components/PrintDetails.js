import React from 'react';
import { Button, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const PrintDetails = ({ dataForPDF }) => {
    const downloadFile = async (uri) => {
        const targetUri = FileSystem.documentDirectory + getFileName(uri)
    
        const downloadedFile = await FileSystem.downloadAsync(uri, targetUri)
    
        if (downloadedFile.status === 200) {
            if (Platform.OS === 'android') {
                const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (!permissions.granted) {
                    return;
                }
                
                try {
                    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
                    .then((r) => {
                        console.log(r);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
  return (
    <Button title="Download PDF" onPress={createAndDownloadPDF} />
  );
};

export default PrintDetails;
