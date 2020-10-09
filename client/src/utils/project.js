import React from "react";
import useGlobalHook from 'use-global-hook';

import * as actions from './projectActions';

const initialState = {
  id: "",
  title: "",
  description: "",
  owner: "",
  created_at: "",
  updated_at: "",
  users: [],
  stages: [],
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;