import '../../style/HCP/HCPconnect.css'
import React, { useQuery } from 'react';
import axios from 'axios';


export const useUserData = () =>
  useQuery(
    ['UserData'],
    async () => {
      return axios.get('http://localhost:4444/hcp/viewapts');
    },
  )
