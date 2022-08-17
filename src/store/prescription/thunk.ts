import intl from 'react-intl-universal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PrescriptionFormApi } from 'api/form';
import { TFormConfig } from 'api/form/models';
import { capitalize } from 'lodash';

import { globalActions } from 'store/global';
import { RootState } from 'store/types';

import { ICompletePrescriptionReview, TCompleteAnalysis } from './types';
import { cleanAnalysisData } from './utils';

const fetchFormConfig = createAsyncThunk<TFormConfig, { code: string }>(
  'prescription/fetchFormConfig',
  async (args, thunkApi) => {
    const { data, error } = await PrescriptionFormApi.fetchConfig(args.code);

    if (error) {
      thunkApi.dispatch(
        globalActions.displayNotification({
          message: capitalize(intl.get('notification.error')),
          description: intl.get('notification.error.prescription.form.config'),
          type: 'error',
        }),
      );
      return thunkApi.rejectWithValue(error.response?.config);
    }

    return data!.config;
  },
);

const createPrescription = createAsyncThunk<
  void,
  ICompletePrescriptionReview,
  { state: RootState }
>('prescription/createPrescription', async (args, thunkApi) => {
  const analysisData = thunkApi.getState().prescription.analysisData;
  const analysisInfo = {
    ...analysisData.analysis,
  };

  if (args.comment) {
    analysisInfo.comment = args.comment;
  }

  if (args.resident_supervisor) {
    analysisInfo.resident_supervisor = args.resident_supervisor;
  }

  const prescriptionData: TCompleteAnalysis = cleanAnalysisData({
    ...analysisData,
    analysis: analysisInfo,
  });

  const { data, error } = await PrescriptionFormApi.createPrescription(prescriptionData);

  if (error) {
    thunkApi.dispatch(
      globalActions.displayNotification({
        message: capitalize(intl.get('notification.error')),
        description: intl.get('notification.error.prescription.form.create'),
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue(error.response?.config);
  }

  return data!.config;
});

export { fetchFormConfig, createPrescription };
