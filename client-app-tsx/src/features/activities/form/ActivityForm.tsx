import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';

interface DetailParams {
  Id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: selectedActivity,
    loadActivityDetail,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    Id: '',
    Title: '',
    Category: '',
    Description: '',
    Date: '',
    City: '',
    Venue: ''
  });

  useEffect(() => {
    if (match.params.Id && activity.Id.length === 0) {
      loadActivityDetail(match.params.Id).then(
        () => selectedActivity && setActivity(selectedActivity)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivityDetail,
    clearActivity,
    match.params.Id,
    selectedActivity,
    activity.Id.length
  ]);
  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  // const handleSubmit = () => {
  //   if (activity.Id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       Id: uuid()
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.Id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.Id}`)
  //     );
  //   }
  // };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => {
              return (
                <Form onSubmit={() => handleSubmit()}>
                  <Field
                    placeholder='Title'
                    name='Title'
                    value={activity.Title}
                    component={TextInput}
                  />
                  <Field
                    placeholder='Description'
                    name='Description'
                    value={activity.Description}
                    rows={3}
                    component={TextAreaInput}
                  />
                  <Field
                    placeholder='Category'
                    name='Category'
                    value={activity.Category}
                    component={SelectInput}
                    options={category}
                  />
                  <Field
                    type='datetime-local'
                    placeholder='Date'
                    name='Date'
                    value={activity.Date}
                    component={TextInput}
                  />
                  <Field
                    placeholder='City'
                    name='City'
                    value={activity.City}
                    component={TextInput}
                  />
                  <Field
                    placeholder='Venue'
                    name='Venue'
                    value={activity.Venue}
                    component={TextInput}
                  />
                  <Button
                    floated='right'
                    loading={submitting}
                    positive
                    type='submit'
                    content='Submit'
                  />
                  <Button
                    floated='right'
                    type='button'
                    content='Cancel'
                    onClick={() => history.push('/activities')}
                  />
                </Form>
              );
            }}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
