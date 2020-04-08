import React, { useContext, useState } from 'react';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { PhotoUploadWidget } from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    deletePhoto,
    loading,
  } = rootStore.profileStore;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              handleUploadImage={handleUploadImage}
              uploadingPhoto={uploadingPhoto}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile?.Photos.map((photo) => (
                  <Card key={photo.Id}>
                    <Image src={photo.Url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          basic
                          positive
                          loading={loading && target === photo.Id}
                          name={photo.Id}
                          content='Main'
                          disabled={profile.Image === photo.Url}
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                        />
                        <Button
                          basic
                          negative
                          icon='trash'
                          name={photo.Id}
                          disabled={photo.IsMain}
                          loading={loading && deleteTarget === photo.Id}
                          onClick={(e) => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
