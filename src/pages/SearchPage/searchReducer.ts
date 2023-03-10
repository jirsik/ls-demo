// action types
const LOADING_STARTED = 'LOADING_STARTED';
const LOADING_DONE = 'LOADING_DONE';

// action creators
export const searchLoadingStartedAC = (): SearchActionType => ({
  type: LOADING_STARTED,
});

export const searchLoadingDoneAC = (data: SearchDataType[]): SearchActionType => ({
  type: LOADING_DONE,
  data,
});

// reducer
const searchReducer = (state: SearchStateType, action: SearchActionType): SearchStateType => {
  switch (action.type) {
    case LOADING_STARTED: {
      return {
        data: [],
        loading: true,
      };
    }
    case LOADING_DONE: {
      return {
        data: action.data as SearchDataType[],
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

// types
export type SearchStateType = {
  loading: boolean;
  data: SearchDataType[];
};

export type SearchDataType = {
  id: string;
  url: string;
  name: string;
  type: {
    id: number;
    name: string;
  };
  sport: {
    id: number;
    name: string;
  };
  gender: {
    id: number;
    name: string;
  };
  defaultCountry: {
    id: number;
    name: string;
  };
  images: Array<{
    path: string;
    usageId: number;
    variantTypeId: number;
  }>;
  [key: string]: any;
};

type SearchActionType = {
  type: typeof LOADING_STARTED | typeof LOADING_DONE;
  data?: SearchDataType[];
};

export default searchReducer;
