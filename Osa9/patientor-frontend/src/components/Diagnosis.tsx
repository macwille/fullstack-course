import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Diagnosis as Type } from '../types';

type Props = {
  code: string;
};

const Diagnosis: React.FC<Props> = ({ code }) => {
  const [diagnosis, setDiagnosis] = React.useState<Type | undefined>();

  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisFromApi } = await axios.get<Type>(
          `${apiBaseUrl}/diagnoses/${code}`
        );
        setDiagnosis(diagnosisFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnosis();
  }, [code]);

  if (diagnosis) {
    return (
      <li key={code}><b>{code}</b> - {diagnosis.name}.</li>
    );
  }

  return (
    <li key={code}>{code}</li>
  );
}

export default Diagnosis;